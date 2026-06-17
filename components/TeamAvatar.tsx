"use client";
import { useState } from "react";
import { AVATARS, avatarSrc, avatarForTeam } from "@/lib/avatars";

interface TeamAvatarProps {
  teamId: string;
  avatar?: string;
  size?: number;
  onChange: (avatar: string) => Promise<void>;
}

/** This team's avatar, shown as a button. Tapping opens a vertical grid to pick
 * a new one. Used wherever the player controls their own team (lobby + play). */
export function TeamAvatar({ teamId, avatar, size = 56, onChange }: TeamAvatarProps) {
  const [open, setOpen] = useState(false);
  const current = avatar ?? avatarForTeam(teamId);

  async function choose(next: string) {
    setOpen(false);
    if (next === current) return;
    try {
      await onChange(next);
    } catch {
      // The optimistic update is reconciled by the RTDB subscription; a failed
      // write simply snaps back to the stored value. Nothing to surface here.
    }
  }

  return (
    <>
      <button
        type="button"
        className="avatar-btn"
        onClick={() => setOpen(true)}
        aria-label="Change your team avatar"
        title="Change avatar"
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

interface AvatarPickerProps {
  current: string;
  onSelect: (avatar: string) => void;
  onClose: () => void;
}

function AvatarPicker({ current, onSelect, onClose }: AvatarPickerProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="avatar-picker" onClick={(e) => e.stopPropagation()}>
        <div className="avatar-picker-head">
          <div className="eyebrow">Pick your avatar</div>
          <button
            type="button"
            className="avatar-picker-close"
            onClick={onClose}
            aria-label="Close avatar picker"
          >
            ✕
          </button>
        </div>
        <div className="avatar-grid">
          {AVATARS.map((a) => {
            const selected = a === current;
            return (
              <button
                key={a}
                type="button"
                className={["avatar-cell", selected && "selected"].filter(Boolean).join(" ")}
                onClick={() => onSelect(a)}
                aria-pressed={selected}
                aria-label={a.replace(/\.png$/, "").replace(/-/g, " ")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarSrc(a)} alt="" className="avatar-img" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
