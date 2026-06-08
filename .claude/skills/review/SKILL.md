---
name: review
description: Review current changes to Spot the Bot for correctness and live-event risk. Delegates to the global code-reviewer agent. Use when the user asks to review changes, check the diff, or before deploying game-logic changes.
---

# Review Spot the Bot changes

Delegate the review to the globally-configured `code-reviewer` agent (`~/.claude/agents/code-reviewer.md`) — do **not** write a project-local reviewer. Launch it via the Agent tool with `subagent_type: code-reviewer`.

In the delegation prompt, give the reviewer this context:

- The app is **Next.js App Router** on Vercel with Firebase RTDB for shared live state. Review `git diff` against `main`.
- It is a **team** game: one device per team, a single shared 10-minute clock (`game:state.endsAt`), each team self-paced through a deterministic shuffle of the question bank. Score = correct answers; `composite = correct * 1e9 - totalMs`.
- **Server-authoritative API routes** in `app/api/` are the only writers to RTDB. They validate the host token and team ID before every write. The client (`lib/firebase-client.ts`) is read-only.

## Highest-risk areas

- **API route auth and idempotency**: every route handler must validate `HOST_TOKEN` (for host actions) or a valid `teamId` (for answer submission). Check that a team cannot submit the same question twice to inflate their score, and that host actions are gated so a non-host cannot start, end, or reset.
- **Client hook subscription cleanup** (`lib/use-game.ts`): the `subscribeTree` unsubscribe function must be called on unmount to prevent zombie listeners. Check that the session-resume path does not re-subscribe without cleaning up the previous subscription.
- **Timer and end-of-game lock**: once `endsAt` is passed, the client must refuse further answer submissions — both in the hook and defensively on the server. A race between a late submission and time expiry must not award a point for a question answered after time.
- **RTDB rules locked read-only**: `database.rules.json` sets `.write: false` for all clients. Confirm no code path relies on client-side writes — all mutations go through `/api/` route handlers via Admin SDK.
- **Answers never leak to the client**: `lib/questions.server.ts` must never be imported outside of API routes and server-only modules. `lib/questions.public.ts` (prompts only) is what the browser gets. The `"server-only"` import guard enforces this at build time — check for any new direct imports.
- **Key encoding**: RTDB keys use `__` in place of `:` on the wire (`game__state`, `team__<id>`). Any new code reading or writing RTDB paths must apply `encodeKey` on write and decode on read — a mismatch silently creates orphaned keys.
- **Input validation**: team name, question ID, answer choice, and `elapsedMs` all come from the client and must be validated server-side before any RTDB write. Reject unknown question IDs, out-of-range `elapsedMs`, and invalid `Answer` values.

## Out of scope (intentional)

- No authentication; anyone can join, become host (with the token), or view scores. The open trust model is by design for this disposable event — do not report it.
- The host unlock UX (type "host" / tap eyebrow 5×) is intentionally obscure but not secret; security is the `HOST_TOKEN` check server-side.

Ask the reviewer for a concise summary (≤15 lines): the verdict plus any correctness or security findings with file locations.

For a deeper multi-agent quorum review, the user can run `/code-review ultra` instead.
