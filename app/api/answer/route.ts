export const runtime = "nodejs";

import { adminDb, encodeKey } from "@/lib/firebase-admin";
import { BY_ID } from "@/lib/questions.server";
import type { AnswerRequest, AnswerResponse, GameState, Team } from "@/lib/types";
import { STATE_KEY, teamKey } from "@/lib/types";

const MIN_ELAPSED_MS = 0;

export async function POST(request: Request): Promise<Response> {
  let body: Partial<AnswerRequest>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { teamId, questionId, choice, elapsedMs } = body;

  if (typeof teamId !== "string" || !teamId) {
    return Response.json({ error: "teamId is required" }, { status: 400 });
  }
  if (typeof questionId !== "string" || !questionId) {
    return Response.json({ error: "questionId is required" }, { status: 400 });
  }
  if (choice !== "human" && choice !== "bot") {
    return Response.json({ error: "choice must be 'human' or 'bot'" }, { status: 400 });
  }
  if (typeof elapsedMs !== "number") {
    return Response.json({ error: "elapsedMs must be a number" }, { status: 400 });
  }

  const db = adminDb();
  const now = Date.now();

  // Load and validate game state.
  const stateSnap = await db.ref(encodeKey(STATE_KEY)).get();
  if (!stateSnap.exists()) {
    return Response.json({ error: "Game not started" }, { status: 409 });
  }
  const state = stateSnap.val() as GameState;

  if (state.phase !== "live" || now >= state.endsAt) {
    return Response.json({ error: "Game is not accepting answers right now" }, { status: 409 });
  }

  // Load team record.
  const teamRef = db.ref(encodeKey(teamKey(teamId)));
  const teamSnap = await teamRef.get();
  if (!teamSnap.exists()) {
    return Response.json({ error: "Team not found" }, { status: 404 });
  }
  const team = teamSnap.val() as Team;
  // RTDB omits empty objects, so a team that hasn't answered yet comes back
  // with `answered` undefined — normalize the record before using it.
  const answered: Record<string, boolean> = team.answered ?? {};
  team.correct = team.correct ?? 0;
  team.wrong = team.wrong ?? 0;
  team.totalMs = team.totalMs ?? 0;

  // Validate the question exists in the server bank.
  const question = BY_ID[questionId];
  if (!question) {
    return Response.json({ error: "Unknown questionId" }, { status: 400 });
  }

  // Idempotency: if already answered, return current counts without re-counting.
  if (answered[questionId]) {
    const response: AnswerResponse = {
      correct: choice === question.answer,
      answer: question.answer,
      source: question.source,
      reveal: question.reveal,
      correctCount: team.correct,
      wrongCount: team.wrong,
    };
    return Response.json(response, { status: 200 });
  }

  // Score the answer.
  const isCorrect = choice === question.answer;
  const clampedMs = Math.max(MIN_ELAPSED_MS, elapsedMs);

  const updatedTeam: Team = {
    ...team,
    correct: team.correct + (isCorrect ? 1 : 0),
    wrong: team.wrong + (isCorrect ? 0 : 1),
    totalMs: team.totalMs + clampedMs,
    answered: { ...answered, [questionId]: true },
  };

  await teamRef.set(updatedTeam);

  const response: AnswerResponse = {
    correct: isCorrect,
    answer: question.answer,
    source: question.source,
    reveal: question.reveal,
    correctCount: updatedTeam.correct,
    wrongCount: updatedTeam.wrong,
  };
  return Response.json(response, { status: 200 });
}
