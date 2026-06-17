"use client";
import { useState, useEffect, useRef } from "react";
import type { Team } from "@/lib/types";
import { fmtClock } from "@/lib/game";
import { ConfirmDialog } from "./ConfirmDialog";
import { Avatar } from "./Avatar";

interface HostBoardProps {
  teams: Team[];
  timeLeftMs: number;
  onEnd: () => Promise<void>;
  onReset: () => Promise<void>;
}

export function HostBoard({ teams, timeLeftMs, onEnd, onReset }: HostBoardProps) {
  const isLow = timeLeftMs <= 60_000;
  const [confirm, setConfirm] = useState<"end" | "reset" | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function runConfirmed() {
    if (!confirm || pending) return;
    const action = confirm;
    setPending(true);
    setError(false);
    try {
      await (action === "end" ? onEnd() : onReset());
      setConfirm(null);
    } catch {
      setError(true);
      setConfirm(null);
    } finally {
      setPending(false);
    }
  }

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
        <button className="btn btn-ghost" onClick={() => setConfirm("end")}>
          End now →
        </button>
        <button className="btn btn-ghost" onClick={() => setConfirm("reset")}>
          Reset game
        </button>
      </div>

      {error && (
        <p className="text-rust mt-3 text-center font-mono text-[12px]" role="alert">
          That didn&apos;t go through — try again.
        </p>
      )}

      <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
        Updates live as teams answer. Project this screen for the room.
      </p>

      {confirm === "end" && (
        <ConfirmDialog
          title="End the game?"
          message="Stop the clock now and show final results to the whole room?"
          confirmLabel="End game"
          busy={pending}
          onConfirm={runConfirmed}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm === "reset" && (
        <ConfirmDialog
          title="Reset the game?"
          message="This deletes every team's score and returns everyone to the lobby. It can't be undone."
          confirmLabel="Reset game"
          busy={pending}
          onConfirm={runConfirmed}
          onCancel={() => setConfirm(null)}
        />
      )}
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
      {teams.slice(0, 24).map((team, i) => (
        <TeamRow
          key={team.id}
          team={team}
          rank={i + 1}
          isMe={team.id === myId}
          isGold={crownTop && i === 0}
        />
      ))}
    </>
  );
}

function TeamRow({
  team,
  rank,
  isMe,
  isGold,
}: {
  team: Team;
  rank: number;
  isMe: boolean;
  isGold: boolean;
}) {
  const correct = team.correct || 0;
  const wrong = team.wrong || 0;
  const totalSecs = ((team.totalMs || 0) / 1000).toFixed(1);

  // Flash the row whenever this team answers (its correct+wrong total changes).
  const answered = correct + wrong;
  const prev = useRef(answered);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (answered === prev.current) return;
    prev.current = answered;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 800);
    return () => clearTimeout(t);
  }, [answered]);

  return (
    <div
      className={["lb-row", isMe && "me", isGold && "gold", flash && "flash"]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="lb-rank">{isGold ? <span className="crown">👑</span> : `#${rank}`}</div>
      <Avatar name={team.avatar} teamId={team.id} className="lb-avatar" />
      <div className="lb-name">
        {team.name || "(unnamed)"}
        <div className="lb-meta">
          <span className="text-rust">{wrong} wrong</span> · {totalSecs}s
        </div>
      </div>
      <div className="lb-pts text-acid">{correct} correct</div>
    </div>
  );
}
