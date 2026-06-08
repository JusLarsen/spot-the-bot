import "server-only";
// Server-side Firebase Admin: the ONLY writer to RTDB. Initialized from the
// FIREBASE_SERVICE_ACCOUNT secret. API route handlers use adminDb() to read
// the full tree and write scores/state with rules locked to read-only clients.
import {
  initializeApp,
  getApps,
  getApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getDatabase, type Database } from "firebase-admin/database";

function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is not set (see .env.example)");
  }
  // Accept either raw JSON or base64-encoded JSON.
  const json = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  return JSON.parse(json) as {
    project_id: string;
    client_email: string;
    private_key: string;
  };
}

let _app: App | undefined;

export function adminDb(): Database {
  if (!getApps().length) {
    const sa = serviceAccount();
    _app = initializeApp({
      credential: cert({
        projectId: sa.project_id,
        clientEmail: sa.client_email,
        privateKey: sa.private_key.replace(/\\n/g, "\n"),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  } else {
    _app = getApp();
  }
  return getDatabase(_app);
}

// RTDB keys can't contain ":", so encode ":" -> "__" for admin paths too.
export const encodeKey = (k: string) => k.replace(/:/g, "__");

/** Constant-time-ish host token check. */
export function isValidHostToken(token: string | undefined): boolean {
  const expected = process.env.HOST_TOKEN;
  return !!expected && typeof token === "string" && token === expected;
}
