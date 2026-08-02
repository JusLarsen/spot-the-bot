# PROJECT_CONTEXT.md — spot-the-bot

## What it is

**Spot the Bot** is a live, team-based human-vs-AI detection game built for a Traeger
leadership/training session. A room of ~24–30 teams each grab one device, pick a team
name, and work through a shuffled bank of 150 text samples deciding **human vs AI**
together. The host runs a single shared countdown (host-selectable length, default
10 min). When it ends, the team with the most correct answers wins — ties broken by
least total answer time, so there's one clean trophy winner.

It is fundamentally a **training tool**: most AI samples are deliberately "obvious"
(they showcase common AI tells — hedging, listy parallelism, hollow uplift), while a
minority are `sneaky`. When a team misses a sneaky one, the reveal reassures them
("even pros miss these") instead of just scoring it wrong.

Live at **spot-the-bot-psi.vercel.app**.

## Current state

Production-ready and deployed. Migrated from the original static single-file prototype
to a **Next.js App Router app on Vercel backed by Firebase Realtime Database**, with
server-authoritative API routes so clients can never write to the database or see
answers before they guess. Load-tested at 30 concurrent connections. 55 passing Vitest
unit tests over the pure game logic.

Question bank: 150 samples across 5 categories — **bbq** (40, Traeger influencers like
Diva Q / Matt Pittman), **movies** (48, Star Wars / Avengers / Spaceballs), **business**
(22, business-book quotes), **disney** (24, famous + obscure Disney/Pixar lines),
**speech** (16, famous/funny speeches). Each category mixes authentic human quotes with
AI-generated imitations.

## Key decisions (and why)

- **Next.js on Vercel over the static single-file prototype.** The original was one
  HTML file on GitHub Pages with world-open RTDB rules. Moving to Next.js bought us
  real session management, a server tier for anti-cheat, and Vercel's preview/prod
  deploy flow — "not a big lift since we'd just built the thing."
- **Kept Firebase RTDB (not Firestore).** We only need a small live shared-state tree
  with instant push sync; RTDB's `onValue` semantics are the simplest fit. Firestore's
  document/query model would be overkill.
- **Server-authoritative writes; clients are read-only.** `database.rules.json` denies
  all client writes (`{".read": true, ".write": false}`). Every mutation goes through a
  Next.js API route using the Firebase Admin SDK. This is the security boundary — not
  key secrecy — so the public Firebase config in the browser is fine.
- **Anti-cheat question split.** `lib/questions.server.ts` (full bank with answers,
  reveal text, sources) is guarded by `import "server-only"` so the build fails if it
  leaks into client code. `lib/questions.public.ts` is prompts-only, generated from it.
  Answers reach the browser only in the `/api/answer` response, after the guess.
- **Team-based, 10-minute discussion format.** Changed from the original ~70-phone
  free-for-all to ~24 teams discussing each sample. Fewer devices, richer training
  conversation, highest-score-wins instead of sudden-death.
- **Server-computed per-team question order with a run cap.** `/api/order?teamId=`
  returns a deterministic shuffle (seeded by team ID, so a reload resumes the same
  order) with same-answer runs capped at 3 (`limitRuns`). The client can't do this —
  it never sees which samples are AI. Caps prevent a team noticing "it's been bot 6
  times, must be human now."
- **Scoped RTDB subscriptions (O(N), not O(N²)).** Team devices subscribe to
  `game:state` plus their own `team:<id>` during live play, and to all teams only in
  lobby/ended. The host subscribes to all teams. This keeps fan-out linear for a full
  room — verified ~14× reduction vs subscribing every device to the whole tree.
- **Host is a facilitator, never a contestant.** Unlocking host mode deletes any team
  this device created; the host screen shows live standings + controls (Start / End /
  Reset) and never appears on the leaderboard. Host entry is the dedicated `/host` route
  (in-page passphrase) or a hidden gesture on the main page. `HOST_TOKEN` is validated
  server-side on every host call.
- **Session identity in `localStorage`.** `stb_role` / `stb_team` persist role and team
  ID so a dropped phone or reload rejoins the same team instead of spawning a duplicate
  (a real bug we hit during testing: a dropped host tab created a second host).
- **Training-oriented corpus with `sneaky` tells.** Investigators catalogued common AI
  ticks; we made most AI samples clearly exhibit them (training moments) and flagged a
  minority as `sneaky` for the "don't feel bad" reveal.
- **All confirmations are in-UI dialogs**, not native `window.confirm` — themed
  `ConfirmDialog` for End / Reset so the projected host screen stays on-brand.

## Architecture at a glance

- **UI**: `app/` (App Router), `components/` (Join, Lobby, Play, HostBoard, FinalBoard,
  HostLogin, ConfirmDialog). Tailwind v4 (CSS-first `@theme`), Traeger-orange palette.
- **Shared logic/contracts**: `lib/` — `types.ts` (all shared types + constants),
  `game.ts` (pure scoring/shuffle/run-cap logic, unit-tested), `use-game.ts` (client
  hook with scoped subscriptions + session restore), `firebase-client.ts` (read-only
  subscribe), `firebase-admin.ts` (server writes), `team-names.ts` (random BBQ team
  names), the question split files.
- **API**: `app/api/{join,answer,host,order}/route.ts` — server-authoritative.
- **Key encoding**: RTDB disallows `:`, so `game:state` → `game__state` and
  `team:<id>` → `team__<id>` on the wire; decode on read.

See `README.md` for setup, env vars, and component/data-flow diagrams.

## History

- **v1**: Claude.ai artifact using `window.storage` for shared state.
- **v2**: static single HTML file on GitHub Pages; storage migrated to Firebase RTDB
  (world-open rules); hidden host unlock; sudden-death scoring; ~70 phones.
- **v3 (current)**: full rewrite to Next.js App Router on Vercel; server-authoritative
  API routes + Admin SDK; client-write-denied RTDB rules; anti-cheat question split;
  team format with host-selectable shared clock; 150-question training corpus across 5
  categories; run-capped per-team order; scoped subscriptions; in-UI dialogs; live on
  Vercel.
