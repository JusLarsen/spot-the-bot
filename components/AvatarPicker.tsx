"use client";
import { AVATARS, avatarSrc } from "@/lib/avatars";

interface AvatarPickerProps {
  current: string;
  onSelect: (avatar: string) => void;
  onClose: () => void;
}

/** Modal with a vertically-scrolling grid of every avatar; the current pick is
 * highlighted. Shared by the join screen and the lobby (via AvatarChooser). */
export function AvatarPicker({ current, onSelect, onClose }: AvatarPickerProps) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="avatar-picker" onClick={(e) => e.stopPropagation()}>
        <div className="avatar-picker-head">
          <div className="eyebrow">Pick your avatar</div>
          <button
            type="button"
            className="avatar-picker-close"
            onClick={onClose}
            aria-label="Close avatar picker"
            autoFocus
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
