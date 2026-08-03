# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Spot the Bot** is a live **team** game for a room of people at an event. Each team uses one device, picks a team name, and works through a shuffled bank of text samples deciding **human vs AI** together. The host starts a single shared **countdown clock** (host-selectable length, default 10 min); when it ends, the team with the most correct answers wins (ties broken by least total answer time — one trophy winner). Teams can **join an in-progress round** (until the final 60s), and each game's leaderboard is **saved under a short code** and revisitable at `/r/<CODE>`.

## Architecture

- **Next.js App Router** deployed to Vercel. All UI is in `app/`. Shared logic and contracts are in `lib/`.
- **Firebase Realtime Database (RTDB)** holds live game state. The client (`lib/firebase-client.ts`) subscribes read-only. All writes go through Next.js API route handlers using the Firebase Admin SDK (`lib/firebase-admin.ts`). RTDB rules deny all client writes — see `database.rules.json`.
- **Server-authoritative API routes** in `app/api/`. Route handlers validate the host token and write scores/state via Admin SDK. Clients never write to RTDB directly.
- **Anti-cheat question split**: `lib/questions.server.ts` is the full question bank (answers, reveal, source) — guarded by `import "server-only"` at the top. Never import it into client code; the build will fail if you do. `lib/questions.public.ts` is prompts-only and is safe for the browser. Regenerate the public file with `npm run gen:questions`.
- **Game sessions**: a run of the game (lobby → live → ended) is a session, keyed by its own short **code** and stored at `sessions/<CODE>/state` + `sessions/<CODE>/teams/<id>`. A tiny root pointer `currentSessionCode` names the active session; the single-session client follows it (it never types a code). `sessions/<CODE>/state` holds `{phase, startedAt, endsAt, version, code}`. The `live` phase runs a single shared host-set countdown (`endsAt - startedAt`); every team plays self-paced through its own deterministic, run-capped shuffle (`/api/order?teamId=`). No per-round host sync. **Multi-session + join codes are a planned, purely additive next step** (mint several sessions; a player enters one via a code from the URL instead of the pointer) — don't break that seam.
- **Reset mints a new session.** `/api/host` `reset` creates a fresh `sessions/<CODE>` and repoints `currentSessionCode`; it does **not** delete the old session node, so its saved leaderboard at `/r/<CODE>` persists. `end` just flips the current session to `ended` — the session node itself is the durable archive.
- **Late join**: teams may join an in-progress session while `> LATE_JOIN_CUTOFF_MS` (60s) remain on the clock; inside the final minute joining is blocked (see `canJoin`/`wrappingUp` in `app/page.tsx`).
- **Scoped RTDB subscriptions.** To keep fan-out linear for a full room, team devices subscribe to the `currentSessionCode` pointer + `sessions/<CODE>/state` + their own `sessions/<CODE>/teams/<id>` during `live`, and to all teams (`subscribeSessionTeams`) only in `lobby`/`ended`; the host subscribes to all teams. See `lib/use-game.ts` and `subscribeSessionTeams`/`subscribeKey` in `lib/firebase-client.ts`.
- **Question bank**: 258 samples across 9 categories (`bbq`, `business`, `disney`, `speech`, `movies`, plus the comedy cohorts `genx`, `millennial`, `genz`, `alpha`). `category` is **organizational only** — never shown to players, never affects ordering. Most AI samples deliberately show common AI tells (training moments); a minority carry the server-only `sneaky` flag, surfaced in `AnswerResponse` so `Play.tsx` can frame the reveal — "even the pros miss these" on a miss, "you caught it" on a hit. See the content rules below before editing any sample.
- **Team avatars**: ~104 pixel-art BBQ-food/veggie icons in `public/avatars/`, listed in the client-safe manifest `lib/avatars.ts` (regenerate both icons + manifest with `npm run gen:avatars`, which calls the PixelLab API — needs `PIXELLAB_API_KEY`). A team **chooses** its avatar on the join screen (random default) — sent in `JoinRequest.avatar` and honored by `/api/join` if it passes `isValidAvatar`, else random — and can keep changing it in the **lobby** via the validated `/api/avatar` route. **Avatars lock once the game starts**: it's UI-locked (the play screen shows the read-only `Avatar`, not the editable `AvatarChooser`) AND server-enforced (`/api/avatar` 409s unless `state.phase === "lobby"`). The requested name must exist in the manifest, and the write `update()`s only the `avatar` field so it never clobbers scores. The picker UI is `AvatarChooser` (button + state) wrapping `AvatarPicker` (the grid modal); `Avatar` is the read-only display. Voting-button sprites (`lib/sprites.ts`) are a separate, unrelated set.
- **Session identity persists across reloads, split by scope.** Team identity (`stb_team` = `{id, name, sessionId, avatar}`) is **device-scoped in `localStorage`** so a reload or dropped phone resumes the same team. Host role + token (`stb_role` = "host", `stb_host_token`) are **tab-scoped in `sessionStorage`** so two tabs of one browser don't share a role — one tab can be host while another is a team, and opening/reloading a tab can't silently promote it. `restoreSession()` purges any legacy `localStorage` `stb_role`/`stb_host_token` (the old shared-localStorage design trapped every tab as host). Anything that mints a team ID or changes role must keep the right storage tier in sync — see the storage-key comments in `lib/use-game.ts`.

## Invariants — preserve these

- **Host and team are decoupled; the host _view_ is never a contestant.** Host role/token are **tab-scoped** (`sessionStorage`); team identity is **browser-scoped** (`localStorage`). A host tab has `me === null` and never appears on the leaderboard or answers. Entering host mode does **not** delete the browser's team (no "unclaim") — the team survives for other tabs and for reconnect. The **"HOST MODE" badge is an exit toggle** (`components/ExitHostButton.tsx`): `exitHost()` drops host on that tab only, issues **no** server action (so the live game keeps running — host mode is only needed to _change_ state), and drops back into the browser's team if it has one (reconnect) else the Join screen. Re-entering host needs the passphrase. Tradeoff of decoupling: if one browser both joins a team and hosts, that team stays on the board — for real events the host device has no team, so this doesn't arise. (The server `unclaim` action still exists but is no longer called.)
- **Host entry:** the dedicated **`/host`** route shows an in-page passphrase form (`components/HostLogin.tsx`); the main page also exposes the same dialog via the hidden gesture (type "host" / 5-tap the eyebrow). The host picks the clock length at start (`DURATION_CHOICES_MIN`), sent as `durationMs` to `/api/host` (clamped server-side); `sessions/<CODE>/state.endsAt - startedAt` is the source of truth for the timer. The team name "host" is reserved.
- **Saved leaderboards**: every session is reachable read-only at `/r/<CODE>` (`app/r/[code]/page.tsx`, a server component reading `sessions/<CODE>` via the Admin SDK). The host final screen shows the code + a QR to that URL (`qrcode.react`); the landing page has a "view past results" code box (`components/ResultsLookup.tsx`). One code identifies a session for its whole lifecycle (and is the future join code).
- **Session identity persists for reconnect, split by scope** — team identity in `localStorage` (`stb_team`, device-scoped), host role/token in `sessionStorage` (`stb_role`/`stb_host_token`, tab-scoped). A page reload or dropped phone must resume the same team, not create a duplicate; a second tab must not inherit host role.
- **`:` encodes to `__` only for the legacy flat keys.** The session model uses **native nested RTDB paths** (`sessions/<code>/state`, `sessions/<code>/teams/<id>`) which contain no `:` and need no encoding. `encodeKey`/`subscribeKey` still apply the `:`→`__` swap, but it's a no-op for these paths. See `lib/types.ts` for the path builders.
- **Answers are never sent to the client before the guess.** `AnswerResponse` returns the truth only after the server validates the submitted choice. `lib/questions.server.ts` never leaves the server.
- **Leaderboard rows must use `textContent` / `createElement`, never `innerHTML`.** Team names are user-supplied; string-concatenated `innerHTML` opens an injection vector.

## Question-bank content rules

Learned the hard way in the 2026-08-02 audit. Every one of these was a real defect
that shipped, so check them before editing `lib/questions.server.ts`.

**Where the copy is read.** Samples, reveals and sources appear on **team members'
phones**, one table at a time — only the **scoreboard** is projected. So sources must
stay short and human-readable (never paste a URL into `source`; it renders to players
as "Source: …"), and reveals must stay short because the clock is running while they
read.

**Bot reveals: name the tell in ONE fun sentence.** Playtested: a two-sentence
explanation is a claim, and claims make tables argue with the game — but pure
coyness teaches nothing. The balance: say which common tell it was (the "isn't
just X, it's Y" flip, the echoed question, the list of three) inside a single
concise sentence with a grin ('AI — the "not just X" upgrade, snowball-fight
edition.'). Hard ceiling 110 characters, enforced by test. Sneaky reveals are the
same length in a warm register. Human reveals are provenance only (below).

**Reveal voice.** Written for ~300 non-technical people, many in sales, many who have
never used AI. Plain language only. Banned: aphorism, cadence, diction, register,
syntax, tricolon, pastiche, passive voice, parallelism, prose, "button" for a closing
line, "hedge" as a noun, maxim, truism, rhetorical, abstraction, metaphor, declarative,
inversion, intensifier. Describe what an ordinary person notices, and anchor to shared
references — quote cards, fridge magnets, LinkedIn posts, motivational posters, ads.
Plain AI reveals prefix `AI — `, sneaky ones `Sneaky — `, human ones take no prefix.

**Human-quote reveals are provenance ONLY — no exceptions.** The reveal for a real
quote is `That's <speaker> in <work> (<year>).` (or `That's <person>, <work>.` for
person-first sources), derived mechanically from `source`. Never write prose about
what makes the quote feel human — an AI explaining humanness is off-putting, and the
attribution IS the payoff. This rule exists because 121 reveals shipped as literary
analysis ("the rhythm of dawning horror, not information delivery") and all had to be
replaced. Enforced by `lib/questions.test.ts`.

**Three correctness rules for reveals:**

1. **Only cite text that is actually in the `body`.** A reveal quoting a phrase the
   player never saw sends them hunting for it. Three reveals shipped with this defect.
2. **Never assert an unverifiable claim about the quote** ("this is slightly
   misremembered", "he improvised this line") unless it is sourced.
3. **Reveals must not contradict each other across the bank.** `business-16` taught
   "garbled text = AI" while `bbq-6` and `business-6` taught "small messes = human" —
   the latter is correct (real LLM output is grammatically clean), so the former cost
   players points. Likewise a "weird specific detail" is taught as a _human_ signal, so
   no AI sample should lean on one as its tell.

**AI sample design.** Each non-sneaky AI sample must be built around **one nameable,
transferable tell**; the SAMPLE carries the lesson (the tic is right there in the
text), and the reveal just points at it in one sentence. The easy tier is exactly
**10 tells × 10 samples** — repetition of the lesson is the point, repetition of the
phrasing is the failure. Two distinct classes:

- _Prose-style tells_ — "not just X, it's Y", lists of three, "In today's world",
  machine vocabulary (delve/tapestry/testament to), hedge-everything, tidy uplifting
  closer, no concrete specifics. **Heavily over-represented; don't add more.**
- _Chatbot-interface tells_ — "Certainly! Here's…", the "want me to expand this?"
  sign-off, polite refusal + redirect, sycophancy ("you're absolutely right"),
  knowledge-cutoff leaks ("I don't have access to real-time information"), "I have no
  personal experiences, but research suggests…", answering a yes/no question with
  balanced pros-and-cons and refusing to pick. **These are what the audience actually
  meets in a forwarded email, and the bank under-uses them.**

**A tell must be _discriminating_ — something AI does that humans rarely do.** This is
the rule `business-16` broke, and it is easy to break again because plenty of bad
writing habits merely _feel_ machine-made. Rejected on these grounds, all of which
humans do as much or more: fabricated statistics (marketers invent numbers daily),
misattributed famous quotes (fake Einstein quotes long predate LLMs), emoji sprinkling,
marketing superlatives ("elevate", "game-changing", "seamless"), "In summary" /
"First… Second… Finally…" signposting, "As you know" exposition (a deliberate
screenwriting device), therapy-speak, and em-dash stuffing. The interface tells above
survive the test because a person would never write them — they aren't true of a
person. Before adding a tell, ask: would a competent human writer plausibly produce
this? If yes, it teaches the room to suspect the wrong things.

Before adding a sample, check the tell isn't already used twice. When generating a
batch across categories, **partition the tell list per category** — handing the same
list to parallel authors produces one-to-one clone sets (`genx-19…30` and
`millennial-19…30` are twelve matched pairs teaching the same twelve lessons).

**Difficulty tiers.** Non-sneaky = spotted in ~2 seconds, gets a laugh, free win.
If a sample has real checkable specifics or genuinely good writing, it belongs in the
`sneaky` tier, not the easy one. Sneaky reveals concede the difficulty and speak warmly
to the player; they must never read as cold analysis.

**Brand constraint.** This is played at a Traeger event. Don't quote people affiliated
with competing grill/smoker brands — Jeremy Yoder (Fat Stack Smokers) was removed for
this. Diva Q and Matt Pittman are Traeger's own; Malcom Reed's ties are accessories and
charcoal only. Aaron Franklin sells offset pits — kept deliberately, as a different
category from pellet, but it is a judgment call worth revisiting.

**Verifying human quotes.** Verify the **speaker separately from the wording** — a
correct quote with the wrong character is the most common defect here (three shipped).
Subtitle transcripts carry no speaker labels, so a summarizing fetch will invent
plausible attributions from context; confirm speakers against a labelled source.
Prefer subtitle rips and screenplays over quote-aggregator sites, which propagate
misquotes. Require two independent sources; if they disagree on wording, say so rather
than picking one. `springfieldspringfield.co.uk/movie_script.php?movie=<slug>` fetches
cleanly — but its slugs are unreliable (`the-naked-gun` serves the 2025 remake).

**Auditing at scale.** Template drift is a counting problem, not a reading problem: a
phrase can feel fresh on every individual record and still be the twelfth time the room
has seen it. Extract the fields with a script and count opener/closer phrases before
reading for quality. A prior pass missed that all 22 sneaky reveals were one recycled
sentence.

## Commands

- `npm run dev` — Next.js dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript (`tsc --noEmit`)
- `npm run test` — Vitest (single run)
- `npm run test:watch` — Vitest in watch mode
- `npm run gen:questions` — Regenerate `lib/questions.public.ts` from the server bank
- `npm run gen:avatars` — Regenerate the team-avatar icon set + `lib/avatars.ts` manifest via PixelLab (resumable; needs `PIXELLAB_API_KEY`)
- `npm run check:rules` — Probe the live RTDB for anonymous read access (exit 1 if rules are blocking). Run before any live session.
- `npm run deploy:rules` — Publish `database.rules.json` via `firebase-tools` (project in `.firebaserc`)

## Environment variables

| Variable                            | Where                     | Description                                                             |
| ----------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`      | Public (browser)          | Firebase web API key                                                    |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`  | Public (browser)          | Firebase auth domain                                                    |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Public (browser + server) | RTDB URL                                                                |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`   | Public (browser)          | Firebase project ID                                                     |
| `NEXT_PUBLIC_FIREBASE_APP_ID`       | Public (browser)          | Firebase web app ID                                                     |
| `FIREBASE_SERVICE_ACCOUNT`          | Secret (server only)      | Full service account JSON (single-line or base64)                       |
| `HOST_TOKEN`                        | Secret (server only)      | Passphrase for host controls — validated server-side                    |
| `PIXELLAB_API_KEY`                  | Secret (tooling only)     | PixelLab API key — only used by `npm run gen:avatars`, never at runtime |

Copy `.env.example` to `.env.local` and fill in values for local dev. Production values go in the Vercel dashboard.

## Git and deploy

This repo deploys to **Vercel**. Pushing to `main` triggers a production deployment; any other branch gets a preview deployment. Never push secrets — all sensitive values are Vercel environment variables, not committed files.

The global CLAUDE.md rule is "never push directly to `main`," but for this repo the user has explicitly authorized merging straight to `main` (there's no point keeping a non-Next app deployed). Prefer a feature branch when the change is risky; routine work can go to `main` per that standing authorization. Still never force-push or rewrite shared history.

## Type contracts

All shared types live in `lib/types.ts`. The `UseGame` hook interface, all API request/response shapes, and RTDB key helpers are defined there. Do not duplicate or redefine these elsewhere.

## Code review

A `code-reviewer` agent is configured globally (`~/.claude/agents/code-reviewer.md`). Use it via `subagent_type: code-reviewer` or the `/review` skill — do not write a project-local copy that shadows it.
