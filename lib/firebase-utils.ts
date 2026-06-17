// Browser-safe Firebase utilities — no server-only imports.
// Shared by firebase-admin.ts (server) and firebase-client.ts (browser).

/**
 * RTDB keys cannot contain ":", so encode ":" as "__" before using a value as
 * a key. This is a no-op for the nested session paths defined in lib/types.ts,
 * which contain only "/" separators and no colons.
 */
export const encodeKey = (k: string): string => k.replace(/:/g, "__");
