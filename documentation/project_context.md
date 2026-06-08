# PROJECT_CONTEXT.md — spot-the-bot

## Current state

Single-file game complete and functional. Storage layer migrated from the original
artifact's `window.storage` to **Firebase Realtime Database** so it runs as a static
page outside Claude. Ready to deploy to GitHub Pages once Firebase config is pasted in.

## Key decisions (and why)

- **Single HTML file, no build step.** Lowest possible operational risk for a live
  room. Nothing to compile, nothing to break at runtime beyond the network.
- **Firebase RTDB over polling/localStorage.** Needed true cross-device shared state
  for ~70 phones. RTDB `onValue` gives instant push sync; localStorage can't share
  across devices. Chose RTDB over Firestore for simpler real-time semantics here.
- **CDN modular Firebase SDK**, not npm/compat — keeps the file buildless.
- **Speed-weighted scoring + sudden-death backstop.** Hard requirement was "no ties"
  because there's one physical trophy. Composite score (correct, then fastest)
  makes ties near-impossible; sudden death guarantees resolution if one occurs.
- **Hidden host unlock** (type `host` / 5× eyebrow tap) so attendees can't hijack
  game flow. Honor-system was rejected for a 70-person room.
- **Inline SVG image rounds** rather than hosted images, to avoid live hotlink
  failure. Real images are a documented opt-in swap.

## Open items / decisions pending

- [ ] Paste real `firebaseConfig` into index.html (placeholders are `PASTE_ME`).
- [ ] Decide RTDB security rules: test mode (expires 30 days, world-open) vs locked
      (see below). For a one-off session within 30 days, test mode is acceptable.
- [ ] Optional: swap inline-SVG image rounds for real AI-vs-photo pairs on a reliable
      host. Decide where to host the images first.
- [ ] Optional: generate QR-code slide for the live URL.
- [ ] Run a practice pass, then host "Reset game" before the real session.

## Locked-down RTDB rules (non-expiring, still open read/write)

Acceptable for ephemeral, no-PII game data. Paste in Firebase console → Realtime
Database → Rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

If you want to actually restrict writes, that requires Firebase Auth or a shared-secret
path scheme — overkill for a single session, but note it here as the next step if this
gets reused.

## Deploy target

- Repo: `git@github.com:JusLarsen/spot-the-bot.git`
- GitHub Pages, `main` / root, entry `index.html`
- Expected URL: `https://JusLarsen.github.io/spot-the-bot/`

## History

- v1: built as a Claude.ai artifact using `window.storage` (shared) for state.
- v2 (current): migrated storage to Firebase RTDB; renamed entry to `index.html`;
  added hidden host unlock; prepped for GitHub Pages.
