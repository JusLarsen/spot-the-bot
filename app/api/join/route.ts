export const runtime = "nodejs";

import { adminDb, ensureCurrentSession } from "@/lib/firebase-admin";
import { parseJsonBody } from "@/lib/api-utils";
import type { JoinRequest, JoinResponse, Team } from "@/lib/types";
import { sessionTeamPath } from "@/lib/types";

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
  // Join the active session, creating a fresh lobby session if none exists yet.
  const sessionId = await ensureCurrentSession(db);
  const teamId = generateTeamId();

  const team: Team = {
    id: teamId,
    name,
    correct: 0,
    wrong: 0,
    totalMs: 0,
    answered: {},
  };

  await db.ref(sessionTeamPath(sessionId, teamId)).set(team);

  const response: JoinResponse = { teamId, sessionId };
  return Response.json(response, { status: 200 });
}
