// Pure, framework-free game logic. No React, no Firebase — so it's trivially
// unit-testable (see lib/game.test.ts) and shared by both client and server.
import type { Team } from "./types";

/** Deterministic 32-bit string hash (FNV-1a) — used to seed a team's shuffle. */
export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small seeded PRNG so a team's question order is stable across reloads. */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A deterministic shuffle of [0..n) seeded by `seed` (Fisher–Yates). */
export function shuffledIndices(n: number, seed: number): number[] {
  const r = mulberry32(seed);
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ranking score: correct answers first, then lower total answer time. */
export function composite(t: Pick<Team, "correct" | "totalMs">): number {
  return (t.correct || 0) * 1e9 - (t.totalMs || 0);
}

/** Teams sorted best-first by composite (does not mutate the input). */
export function rankTeams(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => composite(b) - composite(a));
}

/**
 * First position in `order` whose question id is not yet answered — i.e. where
 * a (re)joining team should resume. Returns order.length when all are answered.
 */
export function nextUnansweredPos(order: string[], answered: Record<string, boolean>): number {
  let pos = 0;
  while (pos < order.length && answered[order[pos]]) pos++;
  return pos;
}

/** mm:ss for a millisecond duration (clamped at 0). */
export function fmtClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

/**
 * Reorder `ids` (already shuffled) so no more than `maxRun` consecutive items
 * share the same answer, while otherwise preserving the shuffle. Splits into two
 * answer-groups and greedily interleaves them, always drawing from the larger
 * remaining group (so neither is stranded into a long tail) and force-switching
 * at the run cap. For a roughly balanced set this guarantees runs <= maxRun.
 * Returns a permutation of the input.
 */
export function limitRuns(ids: string[], isBot: (id: string) => boolean, maxRun = 3): string[] {
  const human = ids.filter((id) => !isBot(id));
  const bot = ids.filter((id) => isBot(id));
  const out: string[] = [];
  let hi = 0;
  let bi = 0;
  let runBot: boolean | null = null;
  let runLen = 0;

  while (hi < human.length || bi < bot.length) {
    const hRem = human.length - hi;
    const bRem = bot.length - bi;
    let takeBot: boolean;
    if (hRem === 0) takeBot = true;
    else if (bRem === 0) takeBot = false;
    else if (runLen >= maxRun)
      takeBot = runBot !== true; // forced switch at the cap
    else if (bRem !== hRem)
      takeBot = bRem > hRem; // drain the larger group first
    else takeBot = runBot !== true; // tie: alternate away from the current run

    out.push(takeBot ? bot[bi++] : human[hi++]);
    if (takeBot === runBot) runLen++;
    else {
      runBot = takeBot;
      runLen = 1;
    }
  }
  return out;
}
