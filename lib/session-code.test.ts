import { describe, it, expect } from "vitest";
import { makeShortCode, CODE_ALPHABET, CODE_LENGTH } from "./session-code";
import { mulberry32 } from "./game";

describe("makeShortCode", () => {
  it("uses only the unambiguous alphabet and the default length", () => {
    const code = makeShortCode(mulberry32(1));
    expect(code).toHaveLength(CODE_LENGTH);
    for (const ch of code) expect(CODE_ALPHABET).toContain(ch);
  });

  it("never contains ambiguous glyphs (I, O, 0, 1, L)", () => {
    for (let seed = 0; seed < 500; seed++) {
      const code = makeShortCode(mulberry32(seed), 6);
      expect(code).not.toMatch(/[IO01L]/);
    }
  });

  it("is deterministic for a given seed", () => {
    expect(makeShortCode(mulberry32(42))).toBe(makeShortCode(mulberry32(42)));
  });

  it("honors a custom length", () => {
    expect(makeShortCode(mulberry32(7), 6)).toHaveLength(6);
  });

  it("has reasonable spread across seeds (no degenerate constant output)", () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 1000; seed++) seen.add(makeShortCode(mulberry32(seed)));
    // 1000 seeds over a 31^4 space should yield mostly-unique codes.
    expect(seen.size).toBeGreaterThan(950);
  });
});
