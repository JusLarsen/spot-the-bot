import { describe, it, expect } from "vitest";
import { AVATARS, avatarSrc, isValidAvatar, randomAvatar, avatarForTeam } from "./avatars";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

describe("avatars manifest", () => {
  it("every manifest entry exists on disk in public/avatars", () => {
    const onDisk = new Set(readdirSync(resolve(process.cwd(), "public/avatars")));
    for (const file of AVATARS) expect(onDisk).toContain(file);
  });

  it("ships a sizable, unique, .png-only set", () => {
    expect(AVATARS.length).toBeGreaterThanOrEqual(100);
    expect(new Set(AVATARS).size).toBe(AVATARS.length);
    for (const file of AVATARS) expect(file).toMatch(/\.png$/);
  });

  it("avatarSrc maps to the public path", () => {
    expect(avatarSrc("corn.png")).toBe("/avatars/corn.png");
  });

  it("isValidAvatar accepts manifest names and rejects anything else", () => {
    expect(isValidAvatar(AVATARS[0])).toBe(true);
    expect(isValidAvatar("not-a-real-avatar.png")).toBe(false);
    expect(isValidAvatar("../secrets.png")).toBe(false);
    expect(isValidAvatar(42)).toBe(false);
    expect(isValidAvatar(undefined)).toBe(false);
  });

  it("randomAvatar always returns a manifest entry", () => {
    for (let i = 0; i < 50; i++) expect(AVATARS).toContain(randomAvatar());
  });

  it("avatarForTeam is deterministic and always in the pool", () => {
    for (const id of ["t_abc", "t_xyz", "t_123456789"]) {
      const a = avatarForTeam(id);
      expect(a).toBe(avatarForTeam(id));
      expect(AVATARS).toContain(a);
    }
  });
});
