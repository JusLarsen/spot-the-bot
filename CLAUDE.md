# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Spot the Bot** is a live **team** game for a room of people (a leadership session). Each team uses one device, picks a team name, and works through a shuffled bank of text samples deciding **human vs AI** together. The host starts a single shared **countdown clock** (host-selectable length, default 10 min); when it ends, the team with the most correct answers wins (ties broken by least total answer time — one trophy winner). Teams can **join an in-progress round** (until the final 60s), and each game's leaderboard is **saved under a short code** and revisitable at `/r/<CODE>`.

## Architecture

- **Next.js App Router** deployed to Vercel. All UI is in `app/`. Shared logic and contracts are in `lib/`.
- **Firebase Realtime Database (RTDB)** holds live game state. The client (`lib/firebase-client.ts`) subscribes read-only. All writes go through Next.js API route handlers using the Firebase Admin SDK (`lib/firebase-admin.ts`). RTDB rules deny all client writes — see `database.rules.json`.
- **Server-authoritative API routes** in `app/api/`. Route handlers validate the host token and write scores/state via Admin SDK. Clients never write to RTDB directly.
- **Anti-cheat question split**: `lib/questions.server.ts` is the full question bank (answers, reveal, source) — guarded by `import "server-only"` at the top. Never import it into client code; the build will fail if you do. `lib/questions.public.ts` is prompts-only and is safe for the browser. Regenerate the public file with `npm run gen:questions`.
- **Game sessions**: a run of the game (lobby → live → ended) is a session, keyed by its own short **code** and stored at `sessions/<CODE>/state` + `sessions/<CODE>/teams/<id>`. A tiny root pointer `currentSessionCode` names the active session; the single-session client follows it (it never types a code). `sessions/<CODE>/state` holds `{phase, startedAt, endsAt, version, code}`. The `live` phase runs a single shared host-set countdown (`endsAt - startedAt`); every team plays self-paced through its own deterministic, run-capped shuffle (`/api/order?teamId=`). No per-round host sync. **Multi-session + join codes are a planned, purely additive next step** (mint several sessions; a player enters one via a code from the URL instead of the pointer) — don't break that seam.
- **Reset mints a new session.** `/api/host` `reset` creates a fresh `sessions/<CODE>` and repoints `currentSessionCode`; it does **not** delete the old session node, so its saved leaderboard at `/r/<CODE>` persists. `end` just flips the current session to `ended` — the session node itself is the durable archive.
- **Late join**: teams may join an in-progress session while `> LATE_JOIN_CUTOFF_MS` (60s) remain on the clock; inside the final minute joining is blocked (see `canJoin`/`wrappingUp` in `app/page.tsx`).
- **Scoped RTDB subscriptions.** To keep fan-out linear for a full room, team devices subscribe to the `currentSessionCode` pointer + `sessions/<CODE>/state` + their own `sessions/<CODE>/teams/<id>` during `live`, and to all teams (`subscribeSessionTeams`) only in `lobby`/`ended`; the host subscribes to all teams. See `lib/use-game.ts` and `subscribeSessionTeams`/`subscribeKey` in `lib/firebase-client.ts`.
- **Question bank**: 152 samples across 5 categories (`bbq`, `business`, `disney`, `speech`, `movies`). Most AI samples deliberately show common AI tells (training moments); a minority carry the server-only `sneaky` flag, surfaced in `AnswerResponse` for "don't feel bad" reveal messaging on a miss.
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

## Commands

- `npm run dev` — Next.js dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript (`tsc --noEmit`)
- `npm run test` — Vitest (single run)
- `npm run test:watch` — Vitest in watch mode
- `npm run gen:questions` — Regenerate `lib/questions.public.ts` from the server bank
- `npm run gen:avatars` — Regenerate the team-avatar icon set + `lib/avatars.ts` manifest via PixelLab (resumable; needs `PIXELLAB_API_KEY`)

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
