"use client";
// Client-side Firebase: READ-ONLY use of RTDB. All writes go through the
// server API routes (Admin SDK); RTDB rules deny client writes. We only
// subscribe here to keep the room's live state/standings in sync.
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getDatabase, ref, onValue, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let _app: FirebaseApp | undefined;
let _db: Database | undefined;

export function db(): Database {
  if (!_db) {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    _db = getDatabase(_app);
  }
  return _db;
}

// RTDB keys can't contain ":", so we encode ":" -> "__" on the wire.
const encodeKey = (k: string) => k.replace(/:/g, "__");

/**
 * Subscribe to a SINGLE key (e.g. "game:state" or "team:<id>"). The client
 * only receives updates for that path — used by team devices during play so
 * one team's answer doesn't fan out to every other device.
 */
export function subscribeKey<T>(key: string, cb: (val: T | null) => void): () => void {
  return onValue(ref(db(), encodeKey(key)), (snap) => cb(snap.exists() ? (snap.val() as T) : null));
}

/**
 * Subscribe to ALL team records (the full standings stream). Used by the host
 * (always) and by team devices only in lobby/ended — never during live play.
 * Returns the decoded list of team-record values.
 */
export function subscribeAllTeams(cb: (teams: unknown[]) => void): () => void {
  return onValue(ref(db(), "/"), (snap) => {
    const raw = (snap.val() as Record<string, unknown>) || {};
    const teams: unknown[] = [];
    for (const k in raw) if (k.startsWith("team__")) teams.push(raw[k]);
    cb(teams);
  });
}
