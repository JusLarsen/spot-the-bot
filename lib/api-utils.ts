import "server-only";
import { isValidSessionCode } from "./types";

/**
 * Parse a JSON request body. Returns the parsed body, or a ready-to-return 400
 * Response if the body isn't valid JSON. Usage in a route handler:
 *
 *   const body = await parseJsonBody<MyRequest>(request);
 *   if (body instanceof Response) return body;
 */
export async function parseJsonBody<T>(request: Request): Promise<Partial<T> | Response> {
  try {
    return (await request.json()) as Partial<T>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

/**
 * Validate that `sessionId` is a well-formed session code and `teamId` is a
 * non-empty string. On failure returns a ready-to-return 400 Response; on
 * success returns the two values narrowed to `string` so callers can use them
 * directly (the discriminated return preserves the type-narrowing the inline
 * `isValidSessionCode` guard used to provide). Used by route handlers that
 * operate on a specific team record (answer, avatar, etc.).
 *
 *   const checked = validateSessionAndTeam(body.sessionId, body.teamId);
 *   if (checked instanceof Response) return checked;
 *   const { sessionId, teamId } = checked;
 */
export function validateSessionAndTeam(
  sessionId: unknown,
  teamId: unknown,
): { sessionId: string; teamId: string } | Response {
  if (!isValidSessionCode(sessionId)) {
    return Response.json({ error: "invalid sessionId" }, { status: 400 });
  }
  if (typeof teamId !== "string" || !teamId) {
    return Response.json({ error: "teamId is required" }, { status: 400 });
  }
  return { sessionId, teamId };
}
