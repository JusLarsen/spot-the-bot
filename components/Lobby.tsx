"use client";
import { useState } from "react";
import type { Team } from "@/lib/types";

interface LobbyProps {
  teamName: string;
  teams: Team[];
  isHost: boolean;
  onStart: () => Promise<void>;
}

export function Lobby({ teamName, teams, isHost, onStart }: LobbyProps) {
  const count = teams.length;
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(false);

  async function handleStart() {
    if (starting) return;
    setStarting(true);
    setError(false);
    try {
      await onStart();
    } catch {
      setError(true);
      setStarting(false);
    }
  }

  return (
    <section>
      <div className="eyebrow">You&apos;re in</div>
      <h1 className="page-heading mt-1.5 mb-0.5">{teamName || "—"}</h1>
      <div className="card">
        <p className="text-muted text-sm leading-[1.4]">Waiting for the host to start the clock…</p>
        <div className="text-muted mt-4 text-center font-mono text-[13px]">
          {count} team{count === 1 ? "" : "s"} ready
        </div>
      </div>
      {isHost && (
        <>
          <button className="btn btn-primary mt-3.5" onClick={handleStart} disabled={starting}>
            {starting ? "Starting…" : "▶ Start the 10-minute clock (host)"}
          </button>
          {error && (
            <p className="text-rust mt-3 text-center font-mono text-[12px]" role="alert">
              Couldn&apos;t start — try again.
            </p>
          )}
        </>
      )}
    </section>
  );
}
