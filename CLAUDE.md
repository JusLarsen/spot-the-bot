# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Spot the Bot** is a live **team** game for a room of people (a leadership session). Each team uses one device, picks a team name, and works through a shuffled bank of text samples deciding **human vs AI** together. The host starts a single shared **10-minute clock**; when it ends, the team with the most correct answers wins (ties broken by least total answer time — one trophy winner).

## Architecture

- **Next.js App Router** deployed to Vercel. All UI is in `app/`. Shared logic and contracts are in `lib/`.
- **Firebase Realtime Database (RTDB)** holds live game state. The client (`lib/firebase-client.ts`) subscribes read-only. All writes go through Next.js API route handlers using the Firebase Admin SDK (`lib/firebase-admin.ts`). RTDB rules deny all client writes — see `database.rules.json`.
- **Server-authoritative API routes** in `app/api/`. Route handlers validate the host token and write scores/state via Admin SDK. Clients never write to RTDB directly.
- **Anti-cheat question split**: `lib/questions.server.ts` is the full question bank (answers, reveal, source) — guarded by `import "server-only"` at the top. Never import it into client code; the build will fail if you do. `lib/questions.public.ts` is prompts-only and is safe for the browser. Regenerate the public file with `npm run gen:questions`.
- **Game phases**: `game:state` holds `{phase: 'lobby'|'live'|'ended', startedAt, endsAt, version}`. The `live` phase runs the shared 10-min countdown; every team plays self-paced through its own deterministic shuffle. No per-round host sync.
- **Session identity persists in `localStorage`** (`stb_role` = "host"; `stb_team` = `{id, name}`) so a reload or dropped phone resumes the same team/host via session restore logic rather than spawning a duplicate. Anything that mints a team ID or changes role must keep these keys in sync.

## Invariants — preserve these

- **Host is never a contestant.** Unlocking host mode removes any team record this device created. The host device shows live standings and controls (Start / End / Reset) and never appears on the leaderboard.
- **Session identity persists in `localStorage`** (`stb_role`/`stb_team`) for reconnect — a page reload or dropped phone must resume the same team, not create a duplicate.
- **`:` encodes to `__` in RTDB keys.** Firebase disallows `:` in paths, so `game:state` → `game__state` and `team:<id>` → `team__<id>` on the wire. Decode on read. See `lib/firebase-client.ts` and `lib/firebase-admin.ts`.
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

## Environment variables

| Variable                            | Where                     | Description                                          |
| ----------------------------------- | ------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`      | Public (browser)          | Firebase web API key                                 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`  | Public (browser)          | Firebase auth domain                                 |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | Public (browser + server) | RTDB URL                                             |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`   | Public (browser)          | Firebase project ID                                  |
| `NEXT_PUBLIC_FIREBASE_APP_ID`       | Public (browser)          | Firebase web app ID                                  |
| `FIREBASE_SERVICE_ACCOUNT`          | Secret (server only)      | Full service account JSON (single-line or base64)    |
| `HOST_TOKEN`                        | Secret (server only)      | Passphrase for host controls — validated server-side |

Copy `.env.example` to `.env.local` and fill in values for local dev. Production values go in the Vercel dashboard.

## Git and deploy

This repo deploys to **Vercel**. Pushing to `main` triggers a production deployment; any other branch gets a preview deployment. Never push secrets — all sensitive values are Vercel environment variables, not committed files.

Follow the global CLAUDE.md rule: **never push directly to `main`**. Create a feature branch, push it, and let the user create the PR/merge.

## Type contracts

All shared types live in `lib/types.ts`. The `UseGame` hook interface, all API request/response shapes, and RTDB key helpers are defined there. Do not duplicate or redefine these elsewhere.

## Code review

A `code-reviewer` agent is configured globally (`~/.claude/agents/code-reviewer.md`). Use it via `subagent_type: code-reviewer` or the `/review` skill — do not write a project-local copy that shadows it.
