// Regenerate lib/questions.public.ts (prompts only, no answers) from the
// full server bank. Run: npm run gen:questions
import { writeFileSync } from "node:fs";
import { FULL_QUESTIONS } from "../lib/questions.server";

const esc = (s: string) => JSON.stringify(s);
const rows = FULL_QUESTIONS.map(
  (q) =>
    `  { id: ${esc(q.id)}, type: ${esc(q.type)}, category: ${esc(q.category)}, body: ${esc(q.body)} },`,
).join("\n");

const out = `import type { PublicQuestion } from "./types";

// PROMPTS ONLY — no answers. Safe to ship to the browser. Generated from
// lib/questions.server.ts by scripts/gen-public-questions.ts — do not edit by hand.
export const PUBLIC_QUESTIONS: PublicQuestion[] = [
${rows}
];

export const PUBLIC_BY_ID: Record<string, PublicQuestion> = Object.fromEntries(
  PUBLIC_QUESTIONS.map((q) => [q.id, q]),
);
`;

writeFileSync(new URL("../lib/questions.public.ts", import.meta.url), out);
console.log(`regenerated lib/questions.public.ts — ${FULL_QUESTIONS.length} prompts`);
