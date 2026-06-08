"use client";
import { useState } from "react";
import type { Team } from "@/lib/types";
import { DURATION_CHOICES_MIN } from "@/lib/types";

interface LobbyProps {
  teamName: string;
  teams: Team[];
  isHost: boolean;
  onStart: (durationMs: number) => Promise<void>;
  onReset?: () => Promise<void>;
}

export function Lobby({ teamName, teams, isHost, onStart, onReset }: LobbyProps) {
  const count = teams.length;
  const [minutes, setMinutes] = useState(10);
  const [starting, setStarting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = starting || resetting;

  async function handleStart() {
    if (busy) return;
    setStarting(true);
    setError(null);
    try {
      await onStart(minutes * 60_000);
    } catch {
      setError("Couldn't start — try again.");
      setStarting(false);
    }
  }

  async function handleReset() {
    if (busy || !onReset) return;
    if (!window.confirm("Reset the game and delete all team scores? This can't be undone.")) return;
    setResetting(true);
    setError(null);
    try {
      await onReset();
    } catch {
      setError("Couldn't reset — try again.");
    } finally {
      setResetting(false);
    }
  }

  return (
    <section>
      <div className="eyebrow">{isHost ? "Host" : "You're in"}</div>
      <h1 className="page-heading mt-1.5 mb-0.5">{isHost ? "Lobby" : teamName || "—"}</h1>
      <div className="card">
        <p className="text-muted text-sm leading-[1.4]">
          {isHost
            ? "Teams are joining. Pick a length and start when ready."
            : "Waiting for the host to start the clock…"}
        </p>
        <div className="text-muted mt-4 text-center font-mono text-[13px]">
          {count} team{count === 1 ? "" : "s"} ready
        </div>
        {isHost && count > 0 && (
          <div className="mt-3 font-mono text-[12px]">
            {teams.map((t) => (
              <div key={t.id} className="text-ink/80 border-t border-white/5 py-1 first:border-t-0">
                {t.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {isHost && (
        <>
          {/* duration picker */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {DURATION_CHOICES_MIN.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMinutes(m)}
                className={[
                  "rounded-xl border py-3 font-mono text-sm transition-colors",
                  minutes === m
                    ? "border-acid text-acid bg-acid/10"
                    : "border-acid/20 text-muted hover:border-acid/40",
                ].join(" ")}
              >
                {m} min
              </button>
            ))}
          </div>

          <button className="btn btn-primary mt-3.5" onClick={handleStart} disabled={busy}>
            {starting ? "Starting…" : `▶ Start the ${minutes}-minute clock`}
          </button>

          {onReset && (
            <button className="btn btn-ghost" onClick={handleReset} disabled={busy}>
              {resetting ? "Resetting…" : "Reset game"}
            </button>
          )}

          {error && (
            <p className="text-rust mt-3 text-center font-mono text-[12px]" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </section>
  );
}
