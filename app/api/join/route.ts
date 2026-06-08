export const runtime = "nodejs";

import { adminDb, encodeKey } from "@/lib/firebase-admin";
import { parseJsonBody } from "@/lib/api-utils";
import type { GameState, JoinRequest, JoinResponse, Team } from "@/lib/types";
import { STATE_KEY, teamKey } from "@/lib/types";

function generateTeamId(): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let id = "t_";
  for (let i = 0; i < 9; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(request: Request): Promise<Response> {
  const body = await parseJsonBody<JoinRequest>(request);
  if (body instanceof Response) return body;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (name.length < 1 || name.length > 40) {
    return Response.json({ error: "name must be between 1 and 40 characters" }, { status: 400 });
  }

  const db = adminDb();
  const teamId = generateTeamId();

  const team: Team = {
    id: teamId,
    name,
    correct: 0,
    wrong: 0,
    totalMs: 0,
    answered: {},
  };

  // Write the new team record.
  await db.ref(encodeKey(teamKey(teamId))).set(team);

  // Bootstrap game state if it doesn't exist yet.
  const stateRef = db.ref(encodeKey(STATE_KEY));
  const stateSnap = await stateRef.get();
  if (!stateSnap.exists()) {
    const initialState: GameState = {
      phase: "lobby",
      startedAt: 0,
      endsAt: 0,
      version: 1,
    };
    await stateRef.set(initialState);
  }

  const response: JoinResponse = { teamId };
  return Response.json(response, { status: 200 });
}
