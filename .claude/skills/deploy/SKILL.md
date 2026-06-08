---
name: deploy
description: Deploy Spot the Bot to GitHub Pages. Validates the Firebase config is filled in (not PASTE_ME), then commits and pushes index.html to main. Use when the user says deploy, ship, push live, or go live.
disable-model-invocation: true
---

# Deploy Spot the Bot

This repo serves `index.html` from GitHub Pages on every push to `main` — pushing **is** deploying. Work carefully; a bad push goes live to the room immediately.

## Steps

1. **Guard the Firebase config.** Check `index.html` for the string `PASTE_ME`:

   ```bash
   grep -n "PASTE_ME" index.html
   ```

   If any match exists, **STOP** and tell the user the Firebase config is still a placeholder — the game won't connect. Do not commit or push.

2. **Flag the public-key reality (once, if config is real).** The page is public, so the Firebase config ships in the committed file. Firebase web API keys are public client identifiers by design — confirm with the user that the **RTDB rules** are their security boundary, then continue. Don't block on this; just surface it.

3. **Lint and review before shipping.** Run `npm run lint`. If there are lint errors (warnings are OK), report them and ask before continuing. For substantive game-logic changes, suggest running `/review` first.

4. **Show what will ship.** Run `git status` and `git diff --stat` so the user sees exactly what's going live.

5. **Commit and push to `main`.** This repo intentionally pushes straight to `main` (see CLAUDE.md). Use a clear message describing the change. End the commit message with the standard co-author trailer.

   ```bash
   git add -A && git commit -m "<message>" && git push origin main
   ```

6. **Confirm.** Report the deployed URL (`https://JusLarsen.github.io/spot-the-bot/`) and remind the user GitHub Pages can take ~1 minute to update.

## Notes

- Never push if step 1 finds `PASTE_ME`.
- Do a `Reset game` (host control) before the live session to clear any practice scores.
