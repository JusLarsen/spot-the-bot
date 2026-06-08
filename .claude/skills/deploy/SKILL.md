---
name: deploy
description: Deploy Spot the Bot to Vercel. Validates env vars and quality checks pass, then pushes the branch. Use when the user says deploy, ship, push live, or go live.
disable-model-invocation: true
---

# Deploy Spot the Bot

This repo deploys to **Vercel** automatically:

- Push any branch → preview deployment
- Merge to `main` → production deployment

There is no manual deploy step; pushing the branch **is** the deploy trigger. Work carefully — production reflects `main` immediately after merge.

## Steps

1. **Verify no empty `NEXT_PUBLIC_*` values are committed.** These variables must be non-empty for the build to compile and the Firebase client to connect. Check that `.env.example` values are filled in the Vercel dashboard — they are never committed.

   Confirm with the user that the Vercel project has all required environment variables set:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `FIREBASE_SERVICE_ACCOUNT`
   - `HOST_TOKEN`

2. **Run quality checks locally before pushing:**

   ```bash
   npm run lint
   npm run typecheck
   npm run test
   ```

   If any check fails, fix the issue before pushing. Do not push broken code.

3. **Optionally run a local build check** (requires `.env.local` to be filled in):

   ```bash
   npm run build
   ```

4. **For substantive game-logic changes, run `/review` first.** This delegates to the global `code-reviewer` agent and surfaces correctness and security issues before they go live.

5. **Show what will ship.** Run `git status` and `git diff --stat` so the user sees exactly what's on the branch.

6. **Push the branch.** Follow the global rule: never push directly to `main`. Push the feature branch; the user creates the PR.

   ```bash
   git push origin <branch-name>
   ```

   Vercel will post a preview URL in the PR automatically.

7. **Before a live session**, ask the user to run **Reset game** (host control) to clear any practice scores from the database.

## Notes

- Never push directly to `main` — push the branch and let the user merge.
- The `FIREBASE_SERVICE_ACCOUNT` and `HOST_TOKEN` values are secrets — they must exist as Vercel environment variables, not in committed files.
- The CI workflow (`.github/workflows/ci.yml`) runs lint, typecheck, test, and build on every push. A failing CI run means the code is not ready to merge.
- `lib/questions.server.ts` must never be imported by client code — `"server-only"` guards this at build time, but double-check any new imports in `app/` or `lib/use-game.ts`.
