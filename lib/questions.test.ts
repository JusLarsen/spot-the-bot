import { describe, it, expect } from "vitest";
import { FULL_QUESTIONS } from "./questions.server";
import { PUBLIC_QUESTIONS } from "./questions.public";

// Data invariants for the question bank.
//
// Every defect the 2026-08-02 audit found was found by reading, not by testing —
// the bank is data and nothing asserted anything about it. Each block below
// corresponds to a class of defect that actually shipped.

const HUMAN = FULL_QUESTIONS.filter((q) => q.answer === "human");
const BOT = FULL_QUESTIONS.filter((q) => q.answer === "bot");
const SNEAKY = BOT.filter((q) => q.sneaky);
const EASY = BOT.filter((q) => !q.sneaky);

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

describe("question bank — anti-cheat boundary", () => {
  it("the public bank exposes no answers, reveals or sources", () => {
    // The whole point of the split. A leak here hands players the answer key.
    for (const q of PUBLIC_QUESTIONS) {
      expect(Object.keys(q).sort()).toEqual(["body", "category", "id", "type"]);
    }
  });

  it("public and server banks hold exactly the same ids", () => {
    // Shipped broken once: a prune removed 14 server records without
    // regenerating the public file, so those prompts 400'd at /api/answer
    // mid-game. Run `npm run gen:questions` after any bank edit.
    const server = FULL_QUESTIONS.map((q) => q.id).sort();
    const pub = PUBLIC_QUESTIONS.map((q) => q.id).sort();
    expect(pub).toEqual(server);
  });

  it("public bodies match their server counterparts verbatim", () => {
    const byId = new Map(FULL_QUESTIONS.map((q) => [q.id, q]));
    for (const q of PUBLIC_QUESTIONS) expect(q.body).toBe(byId.get(q.id)!.body);
  });
});

describe("question bank — structure", () => {
  it("has no duplicate ids", () => {
    const ids = FULL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no duplicate sample bodies", () => {
    // Two records shipped with the same body from different authors; another
    // pair shared a whole clause. A team can draw both in one run.
    const seen = new Map<string, string>();
    for (const q of FULL_QUESTIONS) {
      const key = normalize(q.body);
      expect(seen.has(key), `${q.id} duplicates ${seen.get(key)}`).toBe(false);
      seen.set(key, q.id);
    }
  });

  it("ids follow <category>-<n> and agree with the category field", () => {
    for (const q of FULL_QUESTIONS) {
      expect(q.id, `${q.id} malformed`).toMatch(/^[a-z]+-\d+$/);
      expect(q.id.replace(/-\d+$/, "")).toBe(q.category);
    }
  });

  it("only bot samples carry the sneaky flag", () => {
    for (const q of HUMAN) expect(q.sneaky, `${q.id}`).toBeFalsy();
  });

  it("bot samples are sourced AI-generated; human samples are not", () => {
    for (const q of BOT) expect(q.source, `${q.id}`).toBe("AI-generated");
    for (const q of HUMAN) {
      expect(q.source, `${q.id}`).not.toBe("AI-generated");
      expect(q.source.trim().length, `${q.id} has an empty source`).toBeGreaterThan(3);
    }
  });

  it("keeps human and bot samples roughly balanced", () => {
    const ratio = HUMAN.length / FULL_QUESTIONS.length;
    expect(ratio).toBeGreaterThan(0.35);
    expect(ratio).toBeLessThan(0.65);
  });
});

describe("question bank — reveal copy", () => {
  it("every reveal fits a phone screen; bot reveals are a one-line wink", () => {
    // Playtested: a two-sentence explanation is a claim, and claims invite
    // arguments at the table. Bot reveals are a single short gotcha — the
    // quoted tic does the teaching. Human reveals are provenance strings.
    for (const q of BOT) {
      expect(q.reveal.length, `${q.id} reveal is ${q.reveal.length} chars`).toBeLessThanOrEqual(
        110,
      );
    }
    for (const q of FULL_QUESTIONS) {
      expect(q.reveal.length, `${q.id} reveal is ${q.reveal.length} chars`).toBeLessThanOrEqual(
        240,
      );
    }
  });

  it("uses no writing-craft vocabulary", () => {
    // Audience is ~300 non-technical people, many in sales. "aphorism" and
    // "agentless passive" teach them nothing. 44 reveals shipped with these.
    const BANNED =
      /\b(aphorism|cadence|diction|syntax|tricolon|pastiche|parallelism|anaphora|truism|declarative|definitional|rhetorical|abstraction|intensifiers?|epithet|appositive)\b/i;
    for (const q of FULL_QUESTIONS) {
      const hit = q.reveal.match(BANNED);
      expect(hit?.[0], `${q.id} uses "${hit?.[0]}"`).toBeUndefined();
    }
  });

  it("human reveals are provenance only — 'That's <who> in/at <work>.'", () => {
    // The reveal for a real quote IS the attribution. Never prose about what
    // makes it "feel human" — 121 reveals shipped as literary analysis and all
    // had to be replaced. Derived mechanically from `source`; no exceptions.
    for (const q of HUMAN) {
      expect(q.reveal.startsWith("That's "), `${q.id}: "${q.reveal.slice(0, 60)}"`).toBe(true);
      // and it must actually name the source, not editorialize around it
      const anchor = normalize(q.source.split(" — ")[0]).slice(0, 16);
      expect(normalize(q.reveal).includes(anchor), `${q.id} reveal doesn't cite its source`).toBe(
        true,
      );
    }
  });

  it("bot reveals only quote text that is actually in their own sample", () => {
    // Three reveals shipped quoting phrases the player never saw, sending them
    // hunting for text that wasn't on screen. (Human reveals are provenance
    // strings now, so this check applies to bot samples.)
    // Convention: DOUBLE quotes in a reveal cite the sample and must match it
    // verbatim; SINGLE quotes mark hypothetical text (the email you'll get,
    // the reply that wasn't sent) and are exempt. Splitting on `"` keeps the
    // quote pairing honest — a length-filtered regex mis-paired quotes and
    // matched the text BETWEEN two quoted fragments.
    const loose = (s: string) => normalize(s);
    for (const q of BOT) {
      const body = loose(q.body);
      const segments = q.reveal.split('"');
      for (let i = 1; i < segments.length; i += 2) {
        const frag = segments[i].replace(/\.\.\.|…/g, "|").split("|")[0];
        if (loose(frag).length < 12) continue;
        // A quoted *pattern* with placeholders ("not just X, it's Y") is the
        // shape being taught, not a line from the sample.
        if (/\b[XY]\b/.test(frag)) continue;
        expect(body.includes(loose(frag)), `${q.id} quotes "${frag}" — not in its body`).toBe(true);
      }
    }
  });

  it("prefixes reveals by tier", () => {
    for (const q of EASY) expect(q.reveal.startsWith("AI — "), `${q.id}`).toBe(true);
    for (const q of SNEAKY) expect(q.reveal.startsWith("Sneaky — "), `${q.id}`).toBe(true);
    for (const q of HUMAN) {
      expect(/^(AI|Sneaky) — /.test(q.reveal), `${q.id} has a bot prefix`).toBe(false);
    }
  });

  it("has no two identical bot reveals", () => {
    // Human reveals are mechanical provenance, so two quotes by the same
    // character in the same film legitimately share one. Bot reveals are
    // teaching copy and must never repeat.
    const seen = new Map<string, string>();
    for (const q of BOT) {
      const key = normalize(q.reveal);
      expect(seen.has(key), `${q.id} duplicates ${seen.get(key)}`).toBe(false);
      seen.set(key, q.id);
    }
  });
});

describe("question bank — reveal variety", () => {
  // Repetition of a lesson is the point; repetition of phrasing is the failure.
  // A whole tier once collapsed into one recycled sentence, invisible per-record
  // but obvious to a team playing twenty in a row.
  const STOP = new Set([
    "that",
    "this",
    "with",
    "your",
    "they",
    "them",
    "what",
    "when",
    "have",
    "from",
    "into",
    "just",
    "like",
    "than",
    "then",
    "will",
    "some",
    "most",
    "does",
    "machine",
    "machines",
    "chatbot",
    "real",
    "people",
    "words",
    "word",
    "line",
    "about",
    "which",
    "because",
    "there",
    "their",
    "would",
    "could",
    "every",
  ]);
  const bag = (t: string) =>
    new Set(
      t
        .toLowerCase()
        .replace(/[^a-z0-9\s']/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !STOP.has(w)),
    );
  const similarity = (a: string, b: string) => {
    const A = bag(a);
    const B = bag(b);
    const shared = [...A].filter((w) => B.has(w)).length;
    return shared / (A.size + B.size - shared || 1);
  };

  it("no two bot reveals are near-copies of each other", () => {
    // Human reveals are provenance strings and naturally overlap; the variety
    // requirement is on the teaching copy.
    const all = BOT;
    const offenders: string[] = [];
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const s = similarity(all[i].reveal, all[j].reveal);
        if (s > 0.4) offenders.push(`${all[i].id}/${all[j].id} @ ${s.toFixed(2)}`);
      }
    }
    expect(offenders, `near-duplicate reveals: ${offenders.join(", ")}`).toEqual([]);
  });
});
