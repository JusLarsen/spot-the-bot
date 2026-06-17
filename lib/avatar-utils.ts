// Avatar resolution helpers. Browser-safe — no server-only imports.
// lib/avatars.ts is auto-generated; do not edit it directly.
import { avatarForTeam } from "./avatars";

/**
 * Return the avatar file name to display for a team. Uses the explicitly stored
 * name when present, or falls back to the deterministic per-team icon derived
 * from the team ID.
 */
export function resolveAvatar(name: string | undefined, teamId: string): string {
  return name ?? avatarForTeam(teamId);
}
