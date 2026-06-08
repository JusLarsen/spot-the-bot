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
 * Reorder an already-shuffled `ids` so that no more than `maxRun` of the same
 * answer appear consecutively, WITHOUT forcing strict alternation. It splits the
 * ids into the two answer-groups (preserving their shuffled order within each)
 * and lays them down in alternating chunks of a random 1..maxRun size — so runs
 * of 2–3 still occur naturally, but never more than maxRun. Chunk sizes come
 * from a PRNG seeded off the input, so the result is deterministic (stable for a
 * team across reloads). Returns a permutation of the input.
 */
export function limitRuns(ids: string[], isBot: (id: string) => boolean, maxRun = 3): string[] {
  const human = ids.filter((id) => !isBot(id));
  const bot = ids.filter((id) => isBot(id));
  // Nothing to interleave — one answer only; a long run is then unavoidable.
  if (human.length === 0 || bot.length === 0) return [...human, ...bot];

  // deterministic PRNG seeded off the input order (stable per team)
  let seed = 2166136261;
  for (const id of ids) {
    for (let i = 0; i < id.length; i++) {
      seed ^= id.charCodeAt(i);
      seed = Math.imul(seed, 16777619);
    }
  }
  const rand = mulberry32(seed >>> 0);

  // Use the SAME number of blocks k for both groups, so interleaving them
  // alternately never leaves two same-answer blocks adjacent (no stranding).
  // Each group's count is partitioned into k parts of size 1..maxRun.
  const lo = Math.max(Math.ceil(human.length / maxRun), Math.ceil(bot.length / maxRun));
  const hiCap = Math.min(human.length, bot.length);
  const k = Math.min(hiCap, Math.max(lo, Math.round((human.length + bot.length) / 4)));

  const partition = (total: number): number[] => {
    const a = new Array(k).fill(1);
    let extra = total - k; // distribute, each part may grow to maxRun
    let guard = total * maxRun + k;
    while (extra > 0 && guard-- > 0) {
      const i = Math.floor(rand() * k);
      if (a[i] < maxRun) {
        a[i]++;
        extra--;
      }
    }
    return a;
  };

  const hBlocks = partition(human.length);
  const bBlocks = partition(bot.length);

  const out: string[] = [];
  let hi = 0;
  let bi = 0;
  const botFirst = rand() < 0.5;
  for (let blk = 0; blk < k; blk++) {
    for (const tb of botFirst ? [true, false] : [false, true]) {
      const size = tb ? bBlocks[blk] : hBlocks[blk];
      for (let s = 0; s < size; s++) out.push(tb ? bot[bi++] : human[hi++]);
    }
  }
  // append any rounding leftovers (kept short, <= maxRun by construction)
  while (hi < human.length) out.push(human[hi++]);
  while (bi < bot.length) out.push(bot[bi++]);
  return out;
}
