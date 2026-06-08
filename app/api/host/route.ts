export const runtime = "nodejs";

import { adminDb, encodeKey, isValidHostToken } from "@/lib/firebase-admin";
import type { GameState, HostRequest, HostResponse } from "@/lib/types";
import { GAME_MS, STATE_KEY } from "@/lib/types";

export async function POST(request: Request): Promise<Response> {
  let body: Partial<HostRequest>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

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
  const stateRef = db.ref(encodeKey(STATE_KEY));

  // Load current state to get the version for all mutating actions.
  const stateSnap = await stateRef.get();
  const currentState = stateSnap.exists()
    ? (stateSnap.val() as GameState)
    : { phase: "lobby" as const, startedAt: 0, endsAt: 0, version: 0 };

  const now = Date.now();

  if (action === "start") {
    const nextState: GameState = {
      phase: "live",
      startedAt: now,
      endsAt: now + GAME_MS,
      version: currentState.version + 1,
    };
    await stateRef.set(nextState);
  } else if (action === "end") {
    const nextState: GameState = {
      phase: "ended",
      startedAt: currentState.startedAt,
      endsAt: now,
      version: currentState.version + 1,
    };
    await stateRef.set(nextState);
  } else if (action === "reset") {
    // Remove all team:* keys by listing them from RTDB root.
    const rootSnap = await db.ref("/").get();
    if (rootSnap.exists()) {
      const rootData = rootSnap.val() as Record<string, unknown>;
      const teamPrefix = "team__"; // encoded: "team:" -> "team__"
      const deletePromises = Object.keys(rootData)
        .filter((k) => k.startsWith(teamPrefix))
        .map((k) => db.ref(k).remove());
      await Promise.all(deletePromises);
    }

    const nextState: GameState = {
      phase: "lobby",
      startedAt: 0,
      endsAt: 0,
      version: currentState.version + 1,
    };
    await stateRef.set(nextState);
  }

  const response: HostResponse = { ok: true };
  return Response.json(response, { status: 200 });
}
