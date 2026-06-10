export const runtime = "nodejs";

import {
  adminDb,
  ensureCurrentSession,
  createSession,
  isValidHostToken,
} from "@/lib/firebase-admin";
import { parseJsonBody } from "@/lib/api-utils";
import type { GameState, HostRequest, HostResponse } from "@/lib/types";
import {
  GAME_MS,
  MIN_DURATION_MS,
  MAX_DURATION_MS,
  CURRENT_SESSION_KEY,
  sessionStatePath,
  sessionTeamPath,
  isValidSessionCode,
} from "@/lib/types";

export async function POST(request: Request): Promise<Response> {
  const body = await parseJsonBody<HostRequest>(request);
  if (body instanceof Response) return body;

  if (!isValidHostToken(body.token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = body;
  if (
    action !== "verify" &&
    action !== "start" &&
    action !== "end" &&
    action !== "reset" &&
    action !== "unclaim"
  ) {
    return Response.json({ error: "Unknown action" }, { status: 400 });
  }

  if (action === "verify") {
    return Response.json({ ok: true } as HostResponse, { status: 200 });
  }

  const db = adminDb();
  const now = Date.now();

  // Unclaim: delete a team record so a device that joined as a team and then
  // unlocked host doesn't ghost on the leaderboard (host is never a contestant).
  if (action === "unclaim") {
    if (!isValidSessionCode(body.sessionId)) {
      return Response.json({ error: "invalid sessionId" }, { status: 400 });
    }
    if (typeof body.teamId !== "string" || !body.teamId) {
      return Response.json({ error: "teamId is required" }, { status: 400 });
    }
    await db.ref(sessionTeamPath(body.sessionId, body.teamId)).remove();
    return Response.json({ ok: true } as HostResponse, { status: 200 });
  }

  // Reset: END the outgoing session first (so it stops accepting answers and its
  // /r/<code> board freezes as a stable archive), THEN mint a fresh session and
  // repoint currentSessionCode at it. The old node is preserved, just finalized.
  if (action === "reset") {
    const prevSnap = await db.ref(CURRENT_SESSION_KEY).get();
    const prevCode = prevSnap.exists() ? (prevSnap.val() as string) : null;
    if (prevCode) {
      const prevRef = db.ref(sessionStatePath(prevCode));
      const ps = await prevRef.get();
      if (ps.exists()) {
        const prev = ps.val() as GameState;
        if (prev.phase !== "ended") {
          await prevRef.update({
            phase: "ended",
            endsAt: prev.phase === "live" ? now : prev.endsAt,
            version: prev.version + 1,
          });
        }
      }
    }
    const code = await createSession(db);
    return Response.json({ ok: true, code } as HostResponse, { status: 200 });
  }

  // start / end act on a specific session. Resolve + load it; never synthesize a
  // ghost session for an explicit (and possibly malicious) sessionId.
  let code: string;
  if (body.sessionId !== undefined) {
    if (!isValidSessionCode(body.sessionId)) {
      return Response.json({ error: "invalid sessionId" }, { status: 400 });
    }
    code = body.sessionId;
  } else {
    code = await ensureCurrentSession(db);
  }
  const stateRef = db.ref(sessionStatePath(code));
  const stateSnap = await stateRef.get();
  if (!stateSnap.exists()) {
    return Response.json({ error: "session not found" }, { status: 404 });
  }
  const current = stateSnap.val() as GameState;

  if (action === "start") {
    // Phase guard: only a lobby can be started — prevents double-start restarting
    // the clock and prevents resurrecting an already-ended /r/<code> archive.
    if (current.phase !== "lobby") {
      return Response.json({ error: "Game already started" }, { status: 409 });
    }
    const requested = typeof body.durationMs === "number" ? body.durationMs : GAME_MS;
    const durationMs = Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, requested));
    const nextState: GameState = {
      phase: "live",
      startedAt: now,
      endsAt: now + durationMs,
      version: current.version + 1,
      code,
    };
    await stateRef.set(nextState);
  } else {
    // action === "end": only a live game can be ended (avoids archiving a lobby
    // with startedAt:0 or re-ending an already-ended session).
    if (current.phase !== "live") {
      return Response.json({ error: "Game is not live" }, { status: 409 });
    }
    const nextState: GameState = {
      phase: "ended",
      startedAt: current.startedAt,
      endsAt: now,
      version: current.version + 1,
      code,
    };
    await stateRef.set(nextState);
  }

  return Response.json({ ok: true, code } as HostResponse, { status: 200 });
}
