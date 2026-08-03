// Load-tests the LIVE app end-to-end with N simulated team devices:
//
//   reset -> N RTDB subscriber clients -> join storm -> order fetch ->
//   start -> paced answer storm -> score integrity check -> end -> reset
//
// Each simulated team behaves like the real client: it holds its own Firebase
// websocket (a separate app instance = a separate RTDB connection, so this
// genuinely exercises the concurrent-connection limit) subscribed to the
// session pointer, the session state, and its own team record — plus one
// "host monitor" client subscribed to all teams, like the host board.
//
//   HOST_TOKEN=... node scripts/load-test.mjs --teams 100 --answers 15
//
// HOST_TOKEN comes from the env or .env.local. The test finishes with an
// end + reset, so the live app is left in a fresh lobby; the test session
// itself remains archived at /r/<CODE> like any other session.
//
// Options: --teams N (default 100) --answers M per team (default 15)
//          --pace ms mean gap between a team's answers (default 4000)
//          --base URL (default the production deployment)

import { initializeApp, deleteApp } from "firebase/app";
import { getDatabase, ref, onValue, goOffline } from "firebase/database";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Public client identifiers (already shipped in the live JS bundle).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBay5j5u0_ZGsIcFGjFYN09WmHmFbQQL3k",
  authDomain: "spot-the-bot-1ec2b.firebaseapp.com",
  databaseURL: "https://spot-the-bot-1ec2b-default-rtdb.firebaseio.com",
  projectId: "spot-the-bot-1ec2b",
  appId: "1:1057970614265:web:6e32f87b0bd58b13a89728",
};

// ---- args / env ----
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const TEAMS = Number(arg("teams", 100));
const ANSWERS = Number(arg("answers", 15));
const PACE = Number(arg("pace", 4000));
const BASE = arg("base", "https://spot-the-bot-psi.vercel.app");

function hostToken() {
  const usable = (v) => (v && v !== "[SENSITIVE]" ? v : null);
  if (usable(process.env.HOST_TOKEN)) return process.env.HOST_TOKEN;
  const p = resolve(ROOT, ".env.local");
  if (existsSync(p)) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^\s*HOST_TOKEN\s*=\s*"?([^"\n]+)"?\s*$/);
      if (m && usable(m[1].trim())) return m[1].trim();
    }
  }
  console.error("No usable HOST_TOKEN in env or .env.local — the test needs host control");
  process.exit(1);
}
const TOKEN = hostToken();

// ---- helpers ----
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (ms) => ms * (0.5 + Math.random());
const pct = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
const stats = (arr) => {
  if (!arr.length) return "n/a";
  const s = [...arr].sort((a, b) => a - b);
  return `p50 ${pct(s, 0.5)}ms  p95 ${pct(s, 0.95)}ms  max ${s[s.length - 1]}ms`;
};

async function api(path, init, latencies, errors) {
  const t0 = Date.now();
  try {
    const res = await fetch(`${BASE}${path}`, init);
    latencies?.push(Date.now() - t0);
    if (!res.ok) {
      errors?.push(`${path} -> ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    latencies?.push(Date.now() - t0);
    errors?.push(`${path} -> ${e.message}`);
    return null;
  }
}
const host = (action, extra = {}) =>
  api(`/api/host`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, token: TOKEN, ...extra }),
  });

// ---- phase 0: fresh session ----
console.log(`load test: ${TEAMS} teams, ${ANSWERS} answers each, ~${PACE}ms pace -> ${BASE}\n`);
const resetRes = await host("reset");
if (!resetRes?.ok) {
  console.error("host reset failed — check HOST_TOKEN");
  process.exit(1);
}
console.log(`phase 0  reset -> fresh session ${resetRes.code ?? ""}`);

// ---- phase 1: RTDB connection storm ----
// One Firebase app instance per team = one real websocket per team.
const clients = [];
let connectFailures = 0;
const connectLat = [];
const t1 = Date.now();
for (let i = 0; i < TEAMS + 1; i++) {
  const app = initializeApp(FIREBASE_CONFIG, `lt-${i}`);
  const db = getDatabase(app);
  clients.push({ app, db, ownSeen: new Map(), lags: [] });
}
await Promise.all(
  clients.map(
    (c) =>
      new Promise((done) => {
        const t0 = Date.now();
        const timeout = setTimeout(() => {
          connectFailures++;
          done();
        }, 15000);
        const unsub = onValue(
          ref(c.db, "currentSessionCode"),
          () => {
            connectLat.push(Date.now() - t0);
            clearTimeout(timeout);
            unsub();
            done();
          },
          () => {
            connectFailures++;
            clearTimeout(timeout);
            done();
          },
        );
      }),
  ),
);
console.log(
  `phase 1  ${TEAMS + 1} RTDB connections: ${connectFailures === 0 ? "ALL CONNECTED" : `${connectFailures} FAILED`} in ${Date.now() - t1}ms  (first snapshot ${stats(connectLat)})`,
);
if (connectFailures > 0) {
  console.error(
    "\nCONNECTION FAILURES — if the count above stops right at 100, this is the Spark-plan simultaneous-connection cap.",
  );
}

// ---- phase 2: join storm (all at once — the host just said "go") ----
const joinLat = [];
const joinErrors = [];
const t2 = Date.now();
await Promise.all(
  clients.slice(0, TEAMS).map(async (c, i) => {
    const data = await api(
      "/api/join",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `LoadTest ${String(i + 1).padStart(3, "0")}` }),
      },
      joinLat,
      joinErrors,
    );
    if (data) {
      c.teamId = data.teamId;
      c.sessionId = data.sessionId;
    }
  }),
);
const joined = clients.filter((c) => c.teamId);
const sessions = new Set(joined.map((c) => c.sessionId));
console.log(
  `phase 2  joins: ${joined.length}/${TEAMS} ok in ${Date.now() - t2}ms  (${stats(joinLat)})  sessions converged: ${sessions.size === 1 ? "YES" : `NO — ${sessions.size} distinct!`}`,
);
joinErrors.slice(0, 5).forEach((e) => console.log(`         join error: ${e}`));

// Each joined client now subscribes to its own team record (as the real app
// does during live play) and records propagation lag for its own answers.
for (const c of joined) {
  onValue(ref(c.db, `sessions/${c.sessionId}/teams/${c.teamId}`), (snap) => {
    const v = snap.val();
    if (!v?.answered) return;
    for (const qid of Object.keys(v.answered)) {
      const sentAt = c.ownSeen.get(qid);
      if (sentAt && sentAt > 0) {
        c.lags.push(Date.now() - sentAt);
        c.ownSeen.set(qid, -1); // recorded
      }
    }
  });
}
// The "host monitor" client watches all teams, like the host board.
const monitor = clients[TEAMS];
let monitorUpdates = 0;
onValue(ref(monitor.db, `sessions/${joined[0].sessionId}/teams`), () => monitorUpdates++);

// ---- phase 3: order fetch ----
const orderLat = [];
const orderErrors = [];
const t3 = Date.now();
await Promise.all(
  joined.map(async (c) => {
    const data = await api(`/api/order?teamId=${c.teamId}`, undefined, orderLat, orderErrors);
    if (data?.order) c.order = data.order;
  }),
);
console.log(
  `phase 3  orders: ${joined.filter((c) => c.order).length}/${joined.length} ok in ${Date.now() - t3}ms  (${stats(orderLat)})`,
);

// ---- phase 4: start the clock ----
const startRes = await host("start", { durationMs: 10 * 60 * 1000 });
if (!startRes?.ok) {
  console.error("host start failed; aborting");
  process.exit(1);
}
console.log("phase 4  game started (10 min clock)");

// ---- phase 5: paced answer storm ----
const answerLat = [];
const answerErrors = [];
let answered = 0;
const t5 = Date.now();
await Promise.all(
  joined.map(async (c) => {
    await sleep(jitter(PACE)); // teams don't all answer in lockstep
    for (let k = 0; k < ANSWERS && c.order && k < c.order.length; k++) {
      const qid = c.order[k];
      c.ownSeen.set(qid, Date.now());
      const data = await api(
        "/api/answer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: c.sessionId,
            teamId: c.teamId,
            questionId: qid,
            choice: Math.random() > 0.5 ? "human" : "bot",
            elapsedMs: 1000,
          }),
        },
        answerLat,
        answerErrors,
      );
      if (data) answered++;
      await sleep(jitter(PACE));
    }
  }),
);
const stormSecs = ((Date.now() - t5) / 1000).toFixed(0);
console.log(
  `phase 5  answers: ${answered}/${joined.length * ANSWERS} ok over ${stormSecs}s (~${(answered / stormSecs).toFixed(1)}/s)  (${stats(answerLat)})`,
);
answerErrors.slice(0, 5).forEach((e) => console.log(`         answer error: ${e}`));
const allLags = joined.flatMap((c) => c.lags);
console.log(
  `         RTDB propagation (answer 200 -> own-team snapshot): ${stats(allLags)}  monitor saw ${monitorUpdates} team updates`,
);

// ---- phase 6: score integrity ----
await sleep(3000); // let the last writes settle
const finalTeams = await (
  await fetch(`${FIREBASE_CONFIG.databaseURL}/sessions/${joined[0].sessionId}/teams.json`)
).json();
let integrityFailures = 0;
for (const c of joined) {
  const t = finalTeams?.[c.teamId];
  const expected = Math.min(ANSWERS, c.order?.length ?? 0);
  const got = Object.keys(t?.answered ?? {}).length;
  const scored = (t?.correct ?? 0) + (t?.wrong ?? 0);
  if (got !== expected || scored !== expected) {
    integrityFailures++;
    if (integrityFailures <= 5)
      console.log(
        `         INTEGRITY ${c.teamId}: expected ${expected}, answered ${got}, scored ${scored}`,
      );
  }
}
console.log(
  `phase 6  score integrity: ${integrityFailures === 0 ? `ALL ${joined.length} TEAMS EXACT` : `${integrityFailures} teams WRONG`}`,
);

// ---- phase 7: clean up (end + reset -> fresh lobby) ----
await host("end");
const finalReset = await host("reset");
console.log(
  `phase 7  ended + reset -> fresh lobby session ${finalReset?.code ?? "?"} (test session archived at /r/${joined[0].sessionId})`,
);

for (const c of clients) {
  try {
    goOffline(c.db);
    await deleteApp(c.app);
  } catch {
    /* already closed */
  }
}

const failed =
  connectFailures > 0 ||
  joined.length < TEAMS ||
  sessions.size !== 1 ||
  integrityFailures > 0 ||
  answerErrors.length > 0;
console.log(`\n${failed ? "RESULT: FAILURES FOUND — see above" : "RESULT: CLEAN PASS"}`);
process.exit(failed ? 1 : 0);
