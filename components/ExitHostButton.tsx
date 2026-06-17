"use client";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

/** The fixed "HOST MODE" badge — now a real button that leaves host mode on this
 * tab. Exiting is purely local (no server action), so the live game keeps
 * running; the host only needs to be unlocked to CHANGE game state. A confirm
 * guards against an accidental tap mid-event. Shared by `/` and `/host`. */
export function ExitHostButton({ onExit }: { onExit: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <button
        type="button"
        className="role-toggle text-acid"
        onClick={() => setConfirm(true)}
        title="Leave host mode"
      >
        HOST MODE · exit
      </button>
      {confirm && (
        <ConfirmDialog
          title="Leave host mode?"
          message="The game keeps running — host mode is only needed to change it. You'll re-enter the passphrase to come back."
          confirmLabel="Leave host mode"
          onConfirm={() => {
            setConfirm(false);
            onExit();
          }}
          onCancel={() => setConfirm(false)}
        />
      )}
    </>
  );
}
