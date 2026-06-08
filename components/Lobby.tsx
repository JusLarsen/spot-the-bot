"use client";
import { useState } from "react";
import type { Team } from "@/lib/types";
import { DURATION_CHOICES_MIN } from "@/lib/types";
import { ConfirmDialog } from "./ConfirmDialog";

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
  const [confirmReset, setConfirmReset] = useState(false);
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

  async function doReset() {
    if (resetting || !onReset) return;
    setResetting(true);
    setError(null);
    try {
      await onReset();
      setConfirmReset(false);
    } catch {
      setError("Couldn't reset — try again.");
      setConfirmReset(false);
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

      {!isHost && (
        <div className="card mt-4">
          <div className="eyebrow">How to spot the bot</div>
          <ul className="text-muted mt-2 space-y-2 text-sm leading-[1.4]">
            <li>
              <b className="text-bot">It names nothing specific.</b> No real person, place, or
              moment — it would fit any quote. Real lines are anchored to something particular.
            </li>
            <li>
              <b className="text-bot">It hedges, then wraps up too neatly.</b> Over-explains, then
              lands a tidy moral or pep-talk button (&ldquo;brings people together,&rdquo;
              &ldquo;you were ready all along&rdquo;).
            </li>
            <li>
              <b className="text-bot">Polished but hollow.</b> Grand words and stock metaphors with
              no lived detail — a number, an odd specific, a rough edge.
            </li>
            <li>
              <b className="text-human">Humans are concrete and a little messy.</b> Specific names,
              weird particulars, unfinished thoughts.
            </li>
          </ul>
          <p className="text-muted mt-3 font-mono text-[11px] leading-[1.5]">
            Heads up: punchy, aphoristic, rule-of-three lines can be human too — polish and a clever
            rhythm aren&apos;t proof of a bot.
          </p>
        </div>
      )}

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
            <button className="btn btn-ghost" onClick={() => setConfirmReset(true)} disabled={busy}>
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

      {confirmReset && (
        <ConfirmDialog
          title="Reset the game?"
          message="This deletes every team's score and returns everyone to the lobby. It can't be undone."
          confirmLabel="Reset game"
          busy={resetting}
          onConfirm={doReset}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </section>
  );
}
