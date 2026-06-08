"use client";
import { useState, type FormEvent } from "react";

interface HostLoginProps {
  onUnlock: (token: string) => Promise<boolean>;
  onCancel?: () => void; // shown only when used as a modal (e.g. the hidden gesture)
}

export function HostLogin({ onUnlock, onCancel }: HostLoginProps) {
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || !token.trim()) return;
    setSubmitting(true);
    setError(false);
    const ok = await onUnlock(token.trim()).catch(() => false);
    if (!ok) {
      setError(true);
      setSubmitting(false);
      setToken("");
    }
    // on success the parent re-renders into the host view (hostUnlocked flips)
  }

  return (
    <section>
      <div className="eyebrow">Host access</div>
      <h1 className="mt-1.5 mb-0.5 text-3xl font-extrabold tracking-tight">Host login</h1>
      <form className="card" onSubmit={handleSubmit}>
        <label
          className="text-muted mb-2 block font-mono text-[11px] tracking-[2px] uppercase"
          htmlFor="host-token"
        >
          Host passphrase
        </label>
        <input
          id="host-token"
          type="password"
          autoFocus
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="••••••••"
          className="border-acid/20 text-ink focus:border-acid w-full rounded-xl border bg-[#0a0805] px-4 py-3.5 font-mono text-lg transition-shadow outline-none focus:shadow-[0_0_0_3px_rgba(255,106,26,0.12)]"
        />
        <button className="btn btn-primary" type="submit" disabled={submitting || !token.trim()}>
          {submitting ? "Checking…" : "Unlock host →"}
        </button>
        {error && (
          <p className="text-rust mt-3 text-center font-mono text-[12px]" role="alert">
            Wrong passphrase — try again.
          </p>
        )}
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}
