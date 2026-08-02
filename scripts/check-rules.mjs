// Verifies the LIVE Realtime Database rules still allow anonymous client reads.
//
// The rules are not deployed by CI — they're published to the Firebase console
// (by `npm run deploy:rules`, or by hand), so they can drift from
// database.rules.json in this repo. Firebase's default "test mode" rules also
// expire on a timer. When reads start returning permission_denied every player
// device shows "Can't connect" while the server API routes keep working (the
// Admin SDK bypasses rules) — so nothing in the app logs looks wrong.
//
// Run this before a live session.
//
//   npm run check:rules
//
// Exit 0 = clients can read. Exit 1 = rules are blocking; run
// `npm run deploy:rules` (or publish database.rules.json in the console).

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// The pointer every client subscribes to first — the exact read that gates the
// whole app. Checking this path checks the thing that actually breaks.
const PROBE_PATH = "currentSessionCode";

function databaseUrl() {
  if (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) {
    return process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  }
  const envPath = resolve(ROOT, ".env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*NEXT_PUBLIC_FIREBASE_DATABASE_URL\s*=\s*"?([^"\n]+)"?\s*$/);
      if (m) return m[1].trim();
    }
  }
  // Fall back to the default RTDB instance for the project in .firebaserc, so
  // the check works in a fresh clone with no .env.local.
  const rcPath = resolve(ROOT, ".firebaserc");
  if (existsSync(rcPath)) {
    const projectId = JSON.parse(readFileSync(rcPath, "utf8"))?.projects?.default;
    if (projectId) return `https://${projectId}-default-rtdb.firebaseio.com`;
  }
  throw new Error(
    "No database URL: set NEXT_PUBLIC_FIREBASE_DATABASE_URL, add .env.local, or add .firebaserc",
  );
}

const url = `${databaseUrl().replace(/\/$/, "")}/${PROBE_PATH}.json`;
console.log(`Probing ${url}`);

let res;
try {
  res = await fetch(url);
} catch (err) {
  console.error(`\n✗ Could not reach the database: ${err.message}`);
  process.exit(1);
}

const body = await res.text();

if (res.ok) {
  // A missing pointer (null) is fine — it means "no session yet", not "denied".
  console.log(`\n✓ Clients can read the database (HTTP ${res.status}, body: ${body.trim()})`);
  process.exit(0);
}

console.error(`\n✗ Clients CANNOT read the database (HTTP ${res.status}): ${body.trim()}`);
console.error('\n  Every player device will show "Can\'t connect".');
console.error("  Fix: npm run deploy:rules   (or publish database.rules.json in the");
console.error("  Firebase console under Realtime Database → Rules)");
process.exit(1);
