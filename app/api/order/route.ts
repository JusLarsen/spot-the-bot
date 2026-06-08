export const runtime = "nodejs";

import { FULL_QUESTIONS } from "@/lib/questions.server";
import { shuffledIndices, hashStr, limitRuns } from "@/lib/game";
import type { OrderResponse } from "@/lib/types";

// Per-team question order, computed server-side so we can cap same-answer runs
// (the client can't — it never sees answers). Deterministic by teamId, so a
// reload resumes the same order. Returns ids only; no answers leak.
const BOT_IDS = new Set(FULL_QUESTIONS.filter((q) => q.answer === "bot").map((q) => q.id));

export async function GET(request: Request): Promise<Response> {
  const teamId = new URL(request.url).searchParams.get("teamId") || "seed";
  const shuffled = shuffledIndices(FULL_QUESTIONS.length, hashStr(teamId)).map(
    (i) => FULL_QUESTIONS[i].id,
  );
  const order = limitRuns(shuffled, (id) => BOT_IDS.has(id), 3);
  const response: OrderResponse = { order };
  return Response.json(response, { status: 200 });
}
