---
name: review
description: Review the current changes to Spot the Bot for correctness and live-event risk. Delegates to the global code-reviewer agent. Use when the user asks to review changes, check the diff, or before deploying game-logic changes.
---

# Review Spot the Bot changes

Delegate the review to the globally-configured `code-reviewer` agent (`~/.claude/agents/code-reviewer.md`) — do **not** write a project-local reviewer. Launch it via the Agent tool with `subagent_type: code-reviewer`.

In the delegation prompt, give the reviewer this context:

- The app is `index.html` + `questions.js` (buildless, Firebase RTDB shared state across live team devices). Review `git diff` against `main`.
- It's a **team** game: one device per team, a single shared 10-minute clock (`game:state.endsAt`), each team self-paced through its own deterministic shuffle of `QUESTIONS`. Score = correct answers; `composite = correct*1e9 - totalMs`.
- Highest-risk areas: the phase machine (`applyState`/`setState` across `lobby`/`live`/`ended`), the clock + end-of-game lock (`clockTick`/`timeUp`/`maybeShowBoard` — make sure answering is blocked once time is up and a single winner falls out), the deterministic shuffle + resume (`shuffledIndices`/`buildOrder`/`loadCurrent` — no skipped/duplicated questions, correct resume after reload), `recordAnswer` scoring/dedup, and the poll-vs-`onValue` sync paths.
- Security to weigh: any value rendered to the DOM (leaderboard rows are built with `createElement`/`textContent` on purpose — flag any regression to `innerHTML`).
- **Out of scope (intentional):** no authentication; anyone can join, become host, or reset. The open trust model is by design for this disposable demo — do not report it.

Ask the reviewer for a concise summary (≤15 lines): the verdict plus any correctness or security findings with file locations.

For a deeper multi-agent quorum review, the user can run `/code-review ultra` instead.
