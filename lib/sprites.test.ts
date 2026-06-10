import { describe, it, expect } from "vitest";
import { BOT_SPRITES, HUMAN_SPRITE, botSpriteFor } from "./sprites";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

describe("sprites manifest", () => {
  it("every manifest entry exists on disk in public/sprites", () => {
    const onDisk = new Set(readdirSync(resolve(process.cwd(), "public/sprites")));
    for (const path of [...BOT_SPRITES, HUMAN_SPRITE]) {
      expect(onDisk).toContain(path.replace("/sprites/", ""));
    }
  });

  it("the human placeholder is excluded from the bot pool", () => {
    expect(BOT_SPRITES).not.toContain(HUMAN_SPRITE);
  });

  it("botSpriteFor is deterministic and always in the pool", () => {
    for (const id of ["bbq-1", "movies-48", "disney-17", "speech-9"]) {
      const pick = botSpriteFor(id);
      expect(pick).toBe(botSpriteFor(id));
      expect(BOT_SPRITES).toContain(pick);
    }
  });

  it("spreads across the pool (different questions get different robots)", () => {
    const picks = new Set(Array.from({ length: 152 }, (_, i) => botSpriteFor(`q-${i}`)));
    expect(picks.size).toBeGreaterThan(BOT_SPRITES.length / 2);
  });
});
