"use client";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}

/** In-UI confirmation modal (replaces native window.confirm), matching the card theme. */
export function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  busy,
}: ConfirmDialogProps) {
  return (
    <div className="modal-overlay" onClick={busy ? undefined : onCancel}>
      <div className="w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
        <div className="card">
          <div className="eyebrow">{title}</div>
          <p className="text-ink mt-2 text-sm leading-[1.4]">{message}</p>
          <button className="btn btn-primary" onClick={onConfirm} disabled={busy} autoFocus>
            {busy ? "Working…" : confirmLabel}
          </button>
          <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
