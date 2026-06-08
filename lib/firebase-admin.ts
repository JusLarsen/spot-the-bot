import "server-only";
// Server-side Firebase Admin: the ONLY writer to RTDB. Initialized from the
// FIREBASE_SERVICE_ACCOUNT secret. API route handlers use adminDb() to read
// the full tree and write scores/state with rules locked to read-only clients.
import { initializeApp, getApps, getApp, cert, type App } from "firebase-admin/app";
import { getDatabase, type Database } from "firebase-admin/database";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Resolve the service-account JSON from (in priority order):
//   1. FIREBASE_SERVICE_ACCOUNT  — raw JSON or base64 (use this on Vercel)
//   2. FIREBASE_SERVICE_ACCOUNT_PATH or ./service-account.json — a local file
//      (drop the downloaded key in the repo root; it's gitignored). No pasting.
function serviceAccount() {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  let json: string | undefined;

  if (inline) {
    json = inline.startsWith("{") ? inline : Buffer.from(inline, "base64").toString("utf8");
  } else {
    const path =
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH || resolve(process.cwd(), "service-account.json");
    if (existsSync(path)) json = readFileSync(path, "utf8");
  }

  if (!json) {
    throw new Error(
      "No Firebase service account found. Either drop the downloaded key at ./service-account.json " +
        "(local dev) or set FIREBASE_SERVICE_ACCOUNT to its JSON/base64 (Vercel). See .env.example.",
    );
  }
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
