import { describe, it, expect } from "vitest";
import type { Team } from "./types";
import {
  hashStr,
  mulberry32,
  shuffledIndices,
  composite,
  rankTeams,
  nextUnansweredPos,
  fmtClock,
} from "./game";

// ---------------------------------------------------------------------------
// hashStr
// ---------------------------------------------------------------------------

describe("hashStr", () => {
  it("returns a uint32 (non-negative integer in [0, 2^32))", () => {
    const h = hashStr("hello");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(2 ** 32);
    expect(Number.isInteger(h)).toBe(true);
  });

  it("is deterministic for the same input", () => {
    expect(hashStr("spot-the-bot")).toBe(hashStr("spot-the-bot"));
  });

  it("produces different values for different strings", () => {
    expect(hashStr("team-alpha")).not.toBe(hashStr("team-beta"));
    expect(hashStr("a")).not.toBe(hashStr("b"));
    expect(hashStr("abc")).not.toBe(hashStr("cba"));
  });

  it("handles the empty string without error", () => {
    const h = hashStr("");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(2 ** 32);
  });

  it("handles unicode characters", () => {
    const h = hashStr("🤖");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(2 ** 32);
  });

  it("returns a stable known value (FNV-1a regression)", () => {
    // Regression anchor: any change to the hash algorithm will break
    // deterministic team seeding, so this test intentionally pins the output.
    expect(hashStr("a")).toBe(3826002220);
  });
});

// ---------------------------------------------------------------------------
// mulberry32
// ---------------------------------------------------------------------------

describe("mulberry32", () => {
  it("outputs values in [0, 1)", () => {
    const rng = mulberry32(42);
    for (let i = 0; i < 1000; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("is deterministic for the same seed", () => {
    const rng1 = mulberry32(12345);
    const rng2 = mulberry32(12345);
    for (let i = 0; i < 20; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it("produces different sequences for different seeds", () => {
    const seq1 = Array.from({ length: 10 }, mulberry32(1));
    const seq2 = Array.from({ length: 10 }, mulberry32(2));
    expect(seq1).not.toEqual(seq2);
  });

  it("returns a new independent generator each call", () => {
    const rng1 = mulberry32(99);
    const rng2 = mulberry32(99);
    // Advance rng1 three times
    rng1();
    rng1();
    rng1();
    // rng2 should still start from the beginning
    const rng3 = mulberry32(99);
    expect(rng2()).toBe(rng3());
  });

  it("handles seed 0 without error", () => {
    const rng = mulberry32(0);
    const v = rng();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  });
});

// ---------------------------------------------------------------------------
// shuffledIndices
// ---------------------------------------------------------------------------

describe("shuffledIndices", () => {
  it("returns a permutation of [0..n-1]", () => {
    for (const n of [2, 5, 10, 20]) {
      const result = shuffledIndices(n, 42);
      expect(result).toHaveLength(n);
      expect([...result].sort((a, b) => a - b)).toEqual(Array.from({ length: n }, (_, i) => i));
    }
  });

  it("is deterministic for the same seed", () => {
    expect(shuffledIndices(10, 777)).toEqual(shuffledIndices(10, 777));
  });

  it("produces different orderings for different seeds (general case)", () => {
    // With n=10 the probability two random permutations match is 1/10! ≈ 0
    const a = shuffledIndices(10, 1);
    const b = shuffledIndices(10, 2);
    expect(a).not.toEqual(b);
  });

  it("handles n=0 by returning an empty array", () => {
    expect(shuffledIndices(0, 42)).toEqual([]);
  });

  it("handles n=1 by returning [0]", () => {
    expect(shuffledIndices(1, 42)).toEqual([0]);
  });

  it("does not mutate internal state between independent calls with the same seed", () => {
    const first = shuffledIndices(8, 100);
    const second = shuffledIndices(8, 100);
    expect(first).toEqual(second);
  });

  it("contains every index exactly once (no duplicates)", () => {
    const n = 15;
    const result = shuffledIndices(n, 555);
    const unique = new Set(result);
    expect(unique.size).toBe(n);
  });
});

// ---------------------------------------------------------------------------
// composite
// ---------------------------------------------------------------------------

describe("composite", () => {
  it("higher correct count always outranks lower correct count, regardless of time", () => {
    const more = composite({ correct: 5, totalMs: 999_999 }); // slow but more correct
    const fewer = composite({ correct: 4, totalMs: 1 }); // fast but fewer correct
    expect(more).toBeGreaterThan(fewer);
  });

  it("among equal correct counts, lower totalMs yields a higher composite", () => {
    const fast = composite({ correct: 3, totalMs: 1_000 });
    const slow = composite({ correct: 3, totalMs: 5_000 });
    expect(fast).toBeGreaterThan(slow);
  });

  it("equal correct and equal totalMs produce identical composite scores", () => {
    expect(composite({ correct: 2, totalMs: 3000 })).toBe(composite({ correct: 2, totalMs: 3000 }));
  });

  it("treats missing/zero correct as 0 correct", () => {
    // correct=0 should produce the same score as correct=undefined-like (0)
    expect(composite({ correct: 0, totalMs: 0 })).toBe(0);
  });

  it("treats missing/zero totalMs as 0ms", () => {
    expect(composite({ correct: 1, totalMs: 0 })).toBe(1e9);
  });
});

// ---------------------------------------------------------------------------
// rankTeams
// ---------------------------------------------------------------------------

/** Minimal helper to build a Team fixture. */
function makeTeam(id: string, correct: number, totalMs: number, wrong = 0): Team {
  return { id, name: id, correct, wrong, totalMs, answered: {} };
}

describe("rankTeams", () => {
  it("returns best team first (highest correct)", () => {
    const teams = [makeTeam("b", 2, 1000), makeTeam("a", 5, 5000)];
    const ranked = rankTeams(teams);
    expect(ranked[0].id).toBe("a");
    expect(ranked[1].id).toBe("b");
  });

  it("breaks ties on totalMs (lower is better)", () => {
    const teams = [makeTeam("slow", 3, 9000), makeTeam("fast", 3, 1000), makeTeam("mid", 3, 5000)];
    const ranked = rankTeams(teams);
    expect(ranked.map((t) => t.id)).toEqual(["fast", "mid", "slow"]);
  });

  it("does not mutate the original array", () => {
    const teams = [makeTeam("b", 1, 100), makeTeam("a", 2, 200)];
    const original = [...teams];
    rankTeams(teams);
    expect(teams).toEqual(original);
  });

  it("handles an empty array", () => {
    expect(rankTeams([])).toEqual([]);
  });

  it("handles a single-element array", () => {
    const teams = [makeTeam("only", 3, 500)];
    expect(rankTeams(teams)).toEqual(teams);
  });

  it("ranks three teams with distinct correct counts correctly", () => {
    const teams = [
      makeTeam("third", 1, 500),
      makeTeam("first", 7, 10000),
      makeTeam("second", 4, 200),
    ];
    const ranked = rankTeams(teams);
    expect(ranked.map((t) => t.id)).toEqual(["first", "second", "third"]);
  });

  it("more correct always outranks fewer regardless of speed", () => {
    const fast_few = makeTeam("fast-few", 1, 100);
    const slow_many = makeTeam("slow-many", 10, 999_000);
    const ranked = rankTeams([fast_few, slow_many]);
    expect(ranked[0].id).toBe("slow-many");
  });

  it("returns a new array reference", () => {
    const teams = [makeTeam("x", 1, 100)];
    const ranked = rankTeams(teams);
    expect(ranked).not.toBe(teams);
  });
});

// ---------------------------------------------------------------------------
// nextUnansweredPos
// ---------------------------------------------------------------------------

describe("nextUnansweredPos", () => {
  const order = ["q1", "q2", "q3", "q4", "q5"];

  it("returns 0 when nothing has been answered", () => {
    expect(nextUnansweredPos(order, {})).toBe(0);
  });

  it("returns the first unanswered position after some are answered", () => {
    expect(nextUnansweredPos(order, { q1: true, q2: true })).toBe(2);
  });

  it("returns order.length when all questions are answered", () => {
    const all: Record<string, boolean> = {};
    for (const id of order) all[id] = true;
    expect(nextUnansweredPos(order, all)).toBe(order.length);
  });

  it("skips only answered questions, not all preceding ones", () => {
    // q2 answered but q1 is not — should resume at q1
    expect(nextUnansweredPos(order, { q2: true })).toBe(0);
  });

  it("handles a single-element order that is unanswered", () => {
    expect(nextUnansweredPos(["q1"], {})).toBe(0);
  });

  it("handles a single-element order that is answered", () => {
    expect(nextUnansweredPos(["q1"], { q1: true })).toBe(1);
  });

  it("handles an empty order array", () => {
    expect(nextUnansweredPos([], {})).toBe(0);
  });

  it("correctly resumes mid-deck", () => {
    // q1 through q3 answered; should resume at index 3 (q4)
    expect(nextUnansweredPos(order, { q1: true, q2: true, q3: true })).toBe(3);
  });

  it("ignores answered keys that are not in the order array", () => {
    // Only q_other is answered, which isn't in order — should return 0
    expect(nextUnansweredPos(order, { q_other: true })).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// fmtClock
// ---------------------------------------------------------------------------

describe("fmtClock", () => {
  it("formats exactly 0ms as 0:00", () => {
    expect(fmtClock(0)).toBe("0:00");
  });

  it("clamps negative values to 0:00", () => {
    expect(fmtClock(-1)).toBe("0:00");
    expect(fmtClock(-99999)).toBe("0:00");
  });

  it("pads seconds with a leading zero", () => {
    expect(fmtClock(5000)).toBe("0:05");
    expect(fmtClock(9000)).toBe("0:09");
  });

  it("does not pad single-digit minutes", () => {
    expect(fmtClock(60_000)).toBe("1:00");
    expect(fmtClock(9 * 60_000)).toBe("9:00");
  });

  it("formats 10 minutes as 10:00", () => {
    expect(fmtClock(10 * 60_000)).toBe("10:00");
  });

  it("formats 1:30 correctly", () => {
    expect(fmtClock(90_000)).toBe("1:30");
  });

  it("rounds up partial seconds (ceil behavior)", () => {
    // 1ms remaining → rounds up to 1 second
    expect(fmtClock(1)).toBe("0:01");
    // 1001ms → 2 seconds
    expect(fmtClock(1001)).toBe("0:02");
    // exactly 1000ms → 1 second (no rounding needed)
    expect(fmtClock(1000)).toBe("0:01");
  });

  it("formats 9:59 (599000ms) correctly", () => {
    expect(fmtClock(599_000)).toBe("9:59");
  });

  it("formats values with mixed minutes and seconds", () => {
    expect(fmtClock(3 * 60_000 + 7_000)).toBe("3:07");
    expect(fmtClock(2 * 60_000 + 45_000)).toBe("2:45");
  });
});
