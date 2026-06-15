import { describe, it, expect } from "vitest";
import { BOT_SPRITES, HUMAN_SPRITES, botSpriteFor, humanSpriteFor } from "./sprites";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

describe("sprites manifest", () => {
  it("every manifest entry exists on disk in public/sprites", () => {
    const onDisk = new Set(readdirSync(resolve(process.cwd(), "public/sprites")));
    for (const path of [...BOT_SPRITES, ...HUMAN_SPRITES]) {
      expect(onDisk).toContain(path.replace("/sprites/", ""));
    }
  });

  it("the bot and human pools are disjoint", () => {
    const bots = new Set(BOT_SPRITES);
    for (const h of HUMAN_SPRITES) expect(bots.has(h)).toBe(false);
  });

  it("per-question pickers are deterministic and always in their pool", () => {
    for (const id of ["bbq-1", "movies-48", "disney-17", "speech-9"]) {
      const bot = botSpriteFor(id);
      const human = humanSpriteFor(id);
      expect(bot).toBe(botSpriteFor(id));
      expect(human).toBe(humanSpriteFor(id));
      expect(BOT_SPRITES).toContain(bot);
      expect(HUMAN_SPRITES).toContain(human);
    }
  });

  it("spreads across each pool (different questions get different sprites)", () => {
    const botPicks = new Set(Array.from({ length: 152 }, (_, i) => botSpriteFor(`q-${i}`)));
    const humanPicks = new Set(Array.from({ length: 152 }, (_, i) => humanSpriteFor(`q-${i}`)));
    expect(botPicks.size).toBeGreaterThan(BOT_SPRITES.length / 2);
    expect(humanPicks.size).toBeGreaterThan(HUMAN_SPRITES.length / 2);
  });
});
