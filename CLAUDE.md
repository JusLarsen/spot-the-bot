# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Spot the Bot** is a live **team** game for a room of people (a leadership session). Each team uses one device, picks a team name, and works through a shuffled bank of text samples deciding **human vs AI** together. The host starts a single shared **10-minute clock**; when it ends, the team with the most correct answers wins (ties broken by least total answer time → one trophy winner). Buildless: pure ES-module JS + inline CSS, no toolchain, shared state in Firebase Realtime Database.

## Architecture (read before editing `index.html`)

- **Two files, no build.** `index.html` is the whole app; `questions.js` exports the `QUESTIONS` bank (imported as an ES module). `index.html` loads Firebase via CDN ES modules. No bundler/transpiler/framework — keep it buildless.
- **Game flow / phases.** `game:state` holds `{phase: 'lobby'|'live'|'ended', startedAt, endsAt, version}`. `live` runs the global 10-min countdown; every team plays **self-paced, simultaneously**, through its own shuffle of the bank. No per-round host sync, no sudden death.
- **Shared state in Firebase RTDB.** Keys: `game:state` and `team:<id>` (`{id, name, correct, totalMs, answered:{globalQIdx:true}}`). `answered` is keyed by the **global** question index, so a team's score is stable across its private shuffle.
- **`:` is encoded to `__` in RTDB paths** (Firebase disallows `:`) — see `enc()` and the `onValue` decode loop. Preserve this when touching storage code.
- **Per-team shuffle is deterministic** (`shuffledIndices(n, hashStr(team.id))`) so reloads resume the same order at the first unanswered question. Scoring: `composite = correct*1e9 - totalMs`.
- **Two sync paths run together:** a 1.5s `setInterval` poll (`syncTick`) + a live `onValue` mirror of the whole tree into `DB`; a separate 250ms `clockTick` drives the countdown. Keep them consistent.
- **Leaderboard rows are built with `createElement`/`textContent`, never `innerHTML`** — this is deliberate (prevents injection via team names / fields). Don't switch to string-concatenated `innerHTML`.
- **Hidden host unlock is intentional:** type "host" (desktop) or tap the eyebrow 5× (mobile). The host device shows live standings + Start/End/Reset and does not play. Don't make it a visible control.
- **The host is never a contestant:** becoming host (`unlockHost`) deletes any `team:` record this device created and never makes one. `allTeams()`/standings must only ever contain real teams.
- **Identity persists in `localStorage`** (`stb_role`="host", `stb_team`={id,name}) so a reload or dropped phone resumes the *same* team/host via `restoreSession()` instead of spawning a duplicate. Anything that mints `me.id` or changes role must keep these in sync (join sets `stb_team`; unlockHost sets `stb_role`; reset/eviction clears `stb_team`).
- **Questions live in `questions.js`** as `QUESTIONS`: `{type:'text'|'image', answer:'human'|'bot', body, source, reveal, category}`. `source` is the citation shown after answering (real source, or "AI-generated in the style of …").

## Commands

Dev tooling is **dev-only** (the deployed page still loads everything from CDN). Run `npm install` once.

- `npm run lint` — ESLint over `index.html` (inline JS via eslint-plugin-html) and `questions.js`
- `npm run format` — Prettier over `index.html` + `questions.js`; `npm run format:check` to check only. A PostToolUse hook also auto-formats `.html` after edits.

## Git & deploy

This repo deploys to **GitHub Pages on push to `main`** — pushing to `main` *is* the deploy. For this repo specifically, **commit and push directly to `main`** (this overrides the global "never push to main / GitLab / no `gh`" rules; this project is on GitHub). Prefer the `/deploy` skill, which guards the Firebase config first.

## Firebase config

- `index.html` ships with `PASTE_ME` placeholders for the Firebase config. **Never deploy with placeholders still in place** — the game won't connect. `/deploy` checks this.
- The page is public (GitHub Pages), so the Firebase config necessarily ships in the committed file. Firebase **web** API keys are public client identifiers by design — the real security boundary is the **RTDB rules**, not key secrecy. For this disposable event, open test-mode rules are accepted; there is intentionally no auth.

## Code review

A `code-reviewer` agent is configured globally (`~/.claude/agents/code-reviewer.md`). Use it via `subagent_type: code-reviewer` or the `/review` skill — do not write a project-local copy that shadows it.
