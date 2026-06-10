export const runtime = "nodejs";

import {
  adminDb,
  ensureCurrentSession,
  createSession,
  isValidHostToken,
} from "@/lib/firebase-admin";
import { parseJsonBody } from "@/lib/api-utils";
import type { GameState, HostRequest, HostResponse } from "@/lib/types";
import { GAME_MS, MIN_DURATION_MS, MAX_DURATION_MS, sessionStatePath } from "@/lib/types";

export async function POST(request: Request): Promise<Response> {
  const body = await parseJsonBody<HostRequest>(request);
  if (body instanceof Response) return body;

  if (!isValidHostToken(body.token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = body;
  if (action !== "verify" && action !== "start" && action !== "end" && action !== "reset") {
    return Response.json({ error: "Unknown action" }, { status: 400 });
  }

  if (action === "verify") {
    const response: HostResponse = { ok: true };
    return Response.json(response, { status: 200 });
  }

  const db = adminDb();
  const now = Date.now();

  // Reset rolls to a brand-new session and leaves the old one intact (so its
  // /r/<code> leaderboard survives). Start/End act on the current session.
  if (action === "reset") {
    const code = await createSession(db);
    const response: HostResponse = { ok: true, code };
    return Response.json(response, { status: 200 });
  }

  const code = body.sessionId ?? (await ensureCurrentSession(db));
  const stateRef = db.ref(sessionStatePath(code));
  const stateSnap = await stateRef.get();
  const current: GameState = stateSnap.exists()
    ? (stateSnap.val() as GameState)
    : { phase: "lobby", startedAt: 0, endsAt: 0, version: 0, code };

  if (action === "start") {
    // Host-chosen duration, clamped to a sane range; fall back to the default.
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
    // action === "end": stop the clock now and freeze final standings. The
    // session node itself is the durable archive read by /r/<code>.
    const nextState: GameState = {
      phase: "ended",
      startedAt: current.startedAt,
      endsAt: now,
      version: current.version + 1,
      code,
    };
    await stateRef.set(nextState);
  }

  const response: HostResponse = { ok: true, code };
  return Response.json(response, { status: 200 });
}
