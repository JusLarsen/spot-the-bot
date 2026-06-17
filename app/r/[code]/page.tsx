export const runtime = "nodejs";

import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";
import { rankTeams } from "@/lib/game";
import { LeaderboardRows } from "@/components/HostBoard";
import type { GameState, Team } from "@/lib/types";

// Read-only archive view. A session's node (sessions/<code>) IS the archive —
// reset rolls to a new session and leaves old ones intact, so these persist.
async function loadSession(
  code: string,
): Promise<{ state: GameState | null; teams: Team[] } | null> {
  const snap = await adminDb().ref(`sessions/${code}`).get();
  if (!snap.exists()) return null;
  const val = snap.val() as { state?: GameState; teams?: Record<string, Team> };
  const teams = val.teams ? (Object.values(val.teams) as Team[]) : [];
  return { state: val.state ?? null, teams: rankTeams(teams) };
}

function formatWhen(ms: number): string {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = raw.toUpperCase();
  const data = await loadSession(code);

  if (!data || !data.state) {
    return (
      <div className="wrap">
        <section>
          <div className="eyebrow">Saved results</div>
          <h1 className="page-heading">No results for {code}</h1>
          <div className="card">
            <p className="text-muted text-sm leading-[1.4]">
              We couldn&apos;t find a game with that code. Double-check the code and try again.
            </p>
            <Link className="btn btn-ghost mt-3" href="/">
              Back to start
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const { state, teams } = data;
  const ended = state.phase === "ended";
  const when = formatWhen(state.endsAt || state.startedAt);

  return (
    <div className="wrap">
      <section>
        <div className="eyebrow">{ended ? "Final results" : "Standings · in progress"}</div>
        <h1 className="page-heading">
          Game <span className="text-acid">{code}</span>
        </h1>
        {when && <div className="text-muted mb-3 font-mono text-[12px]">{when}</div>}

        <div className="card">
          <LeaderboardRows teams={teams} myId={null} crownTop={ended} />
        </div>

        <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
          {teams.length
            ? "Highest correct wins; ties broken by total answer time."
            : "No teams played this round."}
        </p>
        <Link className="btn btn-ghost mt-3" href="/">
          Back to start
        </Link>
      </section>
    </div>
  );
}
