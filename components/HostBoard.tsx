"use client";
import type { Team } from "@/lib/types";
import { fmtClock } from "@/lib/game";

interface HostBoardProps {
  teams: Team[];
  timeLeftMs: number;
  onEnd: () => Promise<void>;
  onReset: () => Promise<void>;
}

export function HostBoard({ teams, timeLeftMs, onEnd, onReset }: HostBoardProps) {
  const isLow = timeLeftMs <= 60_000;

  return (
    <section>
      <div className="eyebrow">Host · Live Standings</div>
      <h1 className="page-heading mt-1.5 mb-0.5">Standings</h1>
      <div className={["clock", "mt-2", "text-left", isLow && "low"].filter(Boolean).join(" ")}>
        {fmtClock(timeLeftMs)} left
      </div>

      <div className="card">
        <LeaderboardRows teams={teams} myId={null} crownTop={false} />
      </div>

      <div className="hostbar">
        <button className="btn btn-ghost" onClick={onEnd}>
          End now →
        </button>
        <button className="btn btn-ghost" onClick={onReset}>
          Reset game
        </button>
      </div>

      <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
        Updates live as teams answer. Project this screen for the room.
      </p>
    </section>
  );
}

interface LeaderboardRowsProps {
  teams: Team[];
  myId: string | null;
  crownTop: boolean;
}

export function LeaderboardRows({ teams, myId, crownTop }: LeaderboardRowsProps) {
  if (!teams.length) {
    return <p className="text-muted py-2 text-center font-mono text-[11px]">No teams yet.</p>;
  }

  return (
    <>
      {teams.slice(0, 24).map((team, i) => {
        const isMe = team.id === myId;
        const isGold = crownTop && i === 0;
        const totalSecs = ((team.totalMs || 0) / 1000).toFixed(1);

        return (
          <div
            key={team.id}
            className={["lb-row", isMe ? "me" : "", isGold ? "gold" : ""].filter(Boolean).join(" ")}
          >
            <div className="lb-rank">
              {isGold ? <span className="crown">👑</span> : `#${i + 1}`}
            </div>
            <div className="lb-name">
              {team.name || "(unnamed)"}
              <div className="lb-meta">
                {team.wrong || 0} wrong · {totalSecs}s
              </div>
            </div>
            <div className="lb-pts">{team.correct || 0} correct</div>
          </div>
        );
      })}
    </>
  );
}
