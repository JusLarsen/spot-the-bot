"use client";
import { useState } from "react";
import { avatarSrc } from "@/lib/avatars";
import { AvatarPicker } from "./AvatarPicker";

interface AvatarChooserProps {
  current: string; // already-resolved avatar file name to show
  size?: number;
  onSelect: (avatar: string) => void; // called only when a different avatar is picked
}

/** The team's avatar shown as a button; tapping opens the vertical picker grid.
 * Used on the join screen (pick before joining) and in the lobby (change until
 * the game starts). Selection is reported via onSelect — the caller decides
 * whether that's local state (join) or a server write (lobby). */
export function AvatarChooser({ current, size = 56, onSelect }: AvatarChooserProps) {
  const [open, setOpen] = useState(false);

  function choose(next: string) {
    setOpen(false);
    if (next !== current) onSelect(next);
  }

  return (
    <>
      <button
        type="button"
        className="avatar-btn"
        onClick={() => setOpen(true)}
        aria-label="Choose your team avatar"
        title="Choose avatar"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc(current)}
          alt=""
          style={{ width: size, height: size }}
          className="avatar-img"
        />
        <span className="avatar-btn-edit" aria-hidden="true">
          ✎
        </span>
      </button>

      {open && <AvatarPicker current={current} onSelect={choose} onClose={() => setOpen(false)} />}
    </>
  );
}
