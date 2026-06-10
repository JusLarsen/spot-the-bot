// Pixel-art avatar sprites (48x48 PNGs in public/sprites/) for the voting
// screen. The bot side cycles through the pool, seeded by question id so the
// pick is stable while a question is on screen but varies across questions.
// The human side shows a fixed placeholder (the cowboy — most person-coded
// silhouette) until a dedicated human-head sprite set lands; it is excluded
// from the bot pool so the two buttons never show the identical sprite.
import { hashStr } from "./game";

export const HUMAN_SPRITE = "/sprites/robot-cowboy-01.png";

export const BOT_SPRITES: string[] = [
  "robot-bow-01.png",
  "robot-bow-02.png",
  "robot-bow-03.png",
  "robot-bow-04.png",
  "robot-bow-05.png",
  "robot-bow-06.png",
  "robot-cap-01.png",
  "robot-cap-02.png",
  "robot-cap-03.png",
  "robot-cap-04.png",
  "robot-cap-05.png",
  "robot-cap-06.png",
  "robot-chef-01.png",
  "robot-chef-02.png",
  "robot-chef-03.png",
  "robot-chef-04.png",
  "robot-chef-05.png",
  "robot-chef-06.png",
  "robot-cowboy-02.png",
  "robot-cowboy-03.png",
  "robot-cowboy-04.png",
  "robot-cowboy-05.png",
  "robot-cowboy-06.png",
  "robot-plain-01.png",
  "robot-plain-02.png",
  "robot-plain-03.png",
  "robot-plain-04.png",
  "robot-plain-05.png",
  "robot-plain-06.png",
  "robot-plain-07.png",
  "robot-plain-08.png",
].map((f) => `/sprites/${f}`);

/** Deterministic per-question bot sprite (stable on re-render, varies across questions). */
export function botSpriteFor(questionId: string): string {
  return BOT_SPRITES[hashStr(questionId) % BOT_SPRITES.length];
}
