import "server-only";

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
