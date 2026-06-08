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
const decodeKey = (k: string) => k.replace(/__/g, ":");

/**
 * Subscribe to the whole game tree. Invokes `cb` with a decoded mirror
 * ({ "game:state": ..., "team:<id>": ... }) on every change. Returns an
 * unsubscribe function.
 */
export function subscribeTree(cb: (tree: Record<string, unknown>) => void): () => void {
  return onValue(ref(db(), "/"), (snap) => {
    const raw = (snap.val() as Record<string, unknown>) || {};
    const next: Record<string, unknown> = {};
    for (const k in raw) next[decodeKey(k)] = raw[k];
    cb(next);
  });
}
