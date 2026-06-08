"use client";
import type { Team } from "@/lib/types";

interface LobbyProps {
  teamName: string;
  teams: Team[];
  isHost: boolean;
  onStart: () => Promise<void>;
}

export function Lobby({ teamName, teams, isHost, onStart }: LobbyProps) {
  const count = teams.length;

  return (
    <section>
      <div className="eyebrow">You&apos;re in</div>
      <h1 className="mt-1.5 mb-0.5 [font-size:clamp(34px,11vw,52px)] leading-[0.92] [font-weight:800] tracking-[-1.5px]">
        {teamName || "—"}
      </h1>
      <div className="card">
        <p className="text-muted text-sm leading-[1.4]">Waiting for the host to start the clock…</p>
        <div className="text-muted mt-4 text-center font-mono text-[13px]">
          {count} team{count === 1 ? "" : "s"} ready
        </div>
      </div>
      {isHost && (
        <button className="btn-primary mt-3.5" onClick={onStart}>
          ▶ Start the 10-minute clock (host)
        </button>
      )}
    </section>
  );
}
