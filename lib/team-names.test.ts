import { describe, it, expect } from "vitest";
import { randomTeamName } from "./team-names";

describe("randomTeamName", () => {
  it("returns two non-empty words", () => {
    for (let i = 0; i < 50; i++) {
      const parts = randomTeamName().split(" ");
      expect(parts).toHaveLength(2);
      expect(parts[0].length).toBeGreaterThan(0);
      expect(parts[1].length).toBeGreaterThan(0);
    }
  });

  it("is deterministic for a fixed rng", () => {
    const rng = () => 0; // always first word in each list
    expect(randomTeamName(rng)).toBe(randomTeamName(rng));
  });

  it("never produces the reserved name 'host'", () => {
    for (let i = 0; i < 100; i++) {
      expect(randomTeamName().toLowerCase()).not.toBe("host");
    }
  });
});
