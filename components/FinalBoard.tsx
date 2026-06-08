"use client";
import type { Team } from "@/lib/types";
import { LeaderboardRows } from "./HostBoard";

interface FinalBoardProps {
  teams: Team[];
  myId: string | null;
  isHost: boolean;
  onReset: () => Promise<void>;
}

export function FinalBoard({ teams, myId, isHost, onReset }: FinalBoardProps) {
  const winner = teams[0] ?? null;

  return (
    <section>
      <div className="eyebrow">Final Results</div>
      <h1 className="page-heading mt-1.5 mb-0.5">Time&apos;s up!</h1>

      {winner && (
        <div className="card winner-banner mt-4">
          <div className="trophy">🏆</div>
          <div className="award">Least Appetizing Robot Snack</div>
          <h2>{winner.name}</h2>
        </div>
      )}

      <div className="card mt-4">
        <LeaderboardRows teams={teams} myId={myId} crownTop={true} />
      </div>

      {isHost && (
        <div className="hostbar">
          <button className="btn btn-ghost" onClick={onReset}>
            Reset game
          </button>
        </div>
      )}

      <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
        {teams.length
          ? "Highest correct wins; ties broken by total answer time."
          : "No teams played."}
      </p>
    </section>
  );
}
