// Pixel-art avatar sprites (48x48 PNGs in public/sprites/) for the voting
// screen. Both choice buttons cycle through their own pool, seeded by question
// id so the pick is stable while a question is on screen but varies across
// questions. The human and bot pools are disjoint sets of files (robots vs.
// human busts) so the two buttons never show the same sprite.
import { hashStr } from "./game";

const robots = [
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
  "robot-cowboy-01.png",
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
];

const humans = [
  "human-bow-01.png",
  "human-bow-02.png",
  "human-bow-03.png",
  "human-bow-04.png",
  "human-bow-05.png",
  "human-bow-06.png",
  "human-cap-01.png",
  "human-cap-02.png",
  "human-cap-03.png",
  "human-cap-04.png",
  "human-cap-05.png",
  "human-cap-06.png",
  "human-chef-01.png",
  "human-chef-02.png",
  "human-chef-03.png",
  "human-chef-04.png",
  "human-chef-05.png",
  "human-chef-06.png",
  "human-cowboy-01.png",
  "human-cowboy-02.png",
  "human-cowboy-03.png",
  "human-cowboy-04.png",
  "human-cowboy-05.png",
  "human-cowboy-06.png",
  "human-plain-01.png",
  "human-plain-02.png",
  "human-plain-03.png",
  "human-plain-04.png",
  "human-plain-05.png",
  "human-plain-06.png",
  "human-plain-07.png",
  "human-plain-08.png",
];

export const BOT_SPRITES: string[] = robots.map((f) => `/sprites/${f}`);
export const HUMAN_SPRITES: string[] = humans.map((f) => `/sprites/${f}`);

/** Deterministic per-question bot sprite (stable on re-render, varies across questions). */
export function botSpriteFor(questionId: string): string {
  return BOT_SPRITES[hashStr(questionId) % BOT_SPRITES.length];
}

/** Deterministic per-question human sprite. Salted so it doesn't track the bot pick for the same question. */
export function humanSpriteFor(questionId: string): string {
  return HUMAN_SPRITES[hashStr(`human:${questionId}`) % HUMAN_SPRITES.length];
}
