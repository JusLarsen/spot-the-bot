// Read-only avatar image for a team. Falls back to a deterministic per-team
// icon when no avatar is stored (legacy records / provisional state). Pure — no
// hooks — so it renders in both server (archive page) and client components.
import { avatarSrc } from "@/lib/avatars";
import { resolveAvatar } from "@/lib/avatar-utils";

interface AvatarProps {
  name?: string;
  teamId: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, teamId, size = 40, className }: AvatarProps) {
  const file = resolveAvatar(name, teamId);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarSrc(file)}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={["avatar-img", className].filter(Boolean).join(" ")}
    />
  );
}
