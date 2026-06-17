"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Team } from "@/lib/types";
import { LeaderboardRows } from "./HostBoard";
import { ConfirmDialog } from "./ConfirmDialog";
import { Avatar } from "./Avatar";

interface FinalBoardProps {
  teams: Team[];
  myId: string | null;
  isHost: boolean;
  sessionCode?: string; // the game's short code — saved results live at /r/<code>
  onReset: () => Promise<void>;
}

export function FinalBoard({ teams, myId, isHost, sessionCode, onReset }: FinalBoardProps) {
  const winner = teams[0] ?? null;
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Absolute URL for the QR / share link. FinalBoard only renders client-side
  // (the page shows "Connecting…" until Firebase is ready, so it's never in the
  // SSR HTML) — a lazy initializer can read window with no hydration mismatch.
  const [origin] = useState(() => (typeof window !== "undefined" ? window.location.origin : ""));
  const resultsPath = sessionCode ? `/r/${sessionCode}` : "";
  const resultsUrl = origin && resultsPath ? `${origin}${resultsPath}` : "";

  async function doReset() {
    if (resetting) return;
    setResetting(true);
    try {
      await onReset();
    } finally {
      setResetting(false);
      setConfirmReset(false);
    }
  }

  return (
    <section>
      <div className="eyebrow">Final Results</div>
      <h1 className="page-heading mt-1.5 mb-0.5">Time&apos;s up!</h1>

      {winner && (
        <div className="card winner-banner mt-4">
          <div className="award">Least Appetizing Robot Snack</div>
          <div className="mt-2 flex justify-center">
            <Avatar name={winner.avatar} teamId={winner.id} size={72} />
          </div>
          <h2>{winner.name}</h2>
        </div>
      )}

      <div className="card mt-4">
        <LeaderboardRows teams={teams} myId={myId} crownTop={true} />
      </div>

      {sessionCode && (
        <div className="card mt-4 text-center">
          <div className="eyebrow">Saved · revisit anytime</div>
          <div className="text-acid mt-1 font-mono text-3xl tracking-[4px]">{sessionCode}</div>
          {resultsUrl && (
            <>
              {isHost && (
                <div className="mt-3 flex justify-center">
                  <div className="rounded-xl bg-white p-3">
                    <QRCodeSVG value={resultsUrl} size={148} />
                  </div>
                </div>
              )}
              <div className="text-muted mt-3 font-mono text-[12px] break-all">
                {origin.replace(/^https?:\/\//, "")}
                {resultsPath}
              </div>
            </>
          )}
        </div>
      )}

      {isHost && (
        <div className="hostbar">
          <button
            className="btn btn-ghost"
            onClick={() => setConfirmReset(true)}
            disabled={resetting}
          >
            {resetting ? "Resetting…" : "Reset game"}
          </button>
        </div>
      )}

      <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
        {teams.length
          ? "Highest correct wins; ties broken by total answer time."
          : "No teams played."}
      </p>

      {confirmReset && (
        <ConfirmDialog
          title="Reset the game?"
          message="This clears every team's score and returns everyone to the lobby for a fresh round."
          confirmLabel="Reset game"
          busy={resetting}
          onConfirm={doReset}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </section>
  );
}
