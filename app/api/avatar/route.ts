export const runtime = "nodejs";

import { adminDb } from "@/lib/firebase-admin";
import { parseJsonBody } from "@/lib/api-utils";
import { isValidAvatar } from "@/lib/avatars";
import type { SetAvatarRequest, SetAvatarResponse } from "@/lib/types";
import { sessionTeamPath, isValidSessionCode } from "@/lib/types";

// Change a team's avatar. Cosmetic, but writes still go through the server like
// every other RTDB mutation. The avatar must be a known manifest file name so a
// client can't stash arbitrary strings on the team record.
export async function POST(request: Request): Promise<Response> {
  const body = await parseJsonBody<SetAvatarRequest>(request);
  if (body instanceof Response) return body;

  const { sessionId, teamId, avatar } = body;

  if (!isValidSessionCode(sessionId)) {
    return Response.json({ error: "invalid sessionId" }, { status: 400 });
  }
  if (typeof teamId !== "string" || !teamId) {
    return Response.json({ error: "teamId is required" }, { status: 400 });
  }
  if (!isValidAvatar(avatar)) {
    return Response.json({ error: "unknown avatar" }, { status: 400 });
  }

  const db = adminDb();
  const teamRef = db.ref(sessionTeamPath(sessionId, teamId));
  const teamSnap = await teamRef.get();
  if (!teamSnap.exists()) {
    return Response.json({ error: "Team not found" }, { status: 404 });
  }

  // Touch only the avatar field — never overwrite scores/answered with a stale
  // client snapshot (an update() merges into the existing record).
  await teamRef.update({ avatar });

  const response: SetAvatarResponse = { ok: true, avatar };
  return Response.json(response, { status: 200 });
}
