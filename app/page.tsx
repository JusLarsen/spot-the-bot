"use client";
import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/use-game";
import { GAME_MS, LATE_JOIN_CUTOFF_MS } from "@/lib/types";
import { Join } from "@/components/Join";
import { Lobby } from "@/components/Lobby";
import { Play } from "@/components/Play";
import { HostBoard } from "@/components/HostBoard";
import { FinalBoard } from "@/components/FinalBoard";
import { HostLogin } from "@/components/HostLogin";
import { ResultsLookup } from "@/components/ResultsLookup";
import { ExitHostButton } from "@/components/ExitHostButton";
import { ConnectionGate } from "@/components/ConnectionGate";

export default function Home() {
  const game = useGame();
  const {
    ready,
    connectionError,
    phase,
    state,
    teams,
    me,
    isHost,
    hostUnlocked,
    timeLeftMs,
    current,
    bankCleared,
    answeredCount,
    lastResult,
    join,
    submit,
    next,
    setAvatar,
    unlockHost,
    exitHost,
    startGame,
    endGame,
    resetGame,
  } = game;

  // The hidden host unlock opens an in-page dialog (not a browser prompt).
  const [showHostLogin, setShowHostLogin] = useState(false);

  // ---- HOST UNLOCK: type "host" anywhere ----
  const comboBufRef = useRef("");
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key && e.key.length === 1) {
        comboBufRef.current = (comboBufRef.current + e.key.toLowerCase()).slice(-6);
      }
      if (comboBufRef.current.endsWith("host")) {
        comboBufRef.current = "";
        setShowHostLogin(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---- HOST UNLOCK: 5-tap on .eyebrow ----
  const eyebrowTapsRef = useRef(0);
  const eyebrowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target?.closest(".eyebrow")) return;
      eyebrowTapsRef.current += 1;
      if (eyebrowTimerRef.current) clearTimeout(eyebrowTimerRef.current);
      eyebrowTimerRef.current = setTimeout(() => {
        eyebrowTapsRef.current = 0;
      }, 1200);
      if (eyebrowTapsRef.current >= 5) {
        eyebrowTapsRef.current = 0;
        setShowHostLogin(true);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!ready) {
    return <ConnectionGate error={connectionError} />;
  }

  const showHostBoard = isHost && phase === "live";
  const showPlay = !isHost && phase === "live" && !!me;
  // Late join: a team may join an in-progress session while >60s remain; inside
  // the final minute we stop new joins (no real chance to play).
  const canJoin =
    !isHost && !me && (phase === "lobby" || (phase === "live" && timeLeftMs > LATE_JOIN_CUTOFF_MS));
  const wrappingUp = !isHost && !me && phase === "live" && timeLeftMs <= LATE_JOIN_CUTOFF_MS;
  // Host views (live standings + final results) are projected for the room — go wide.
  const wide = isHost && (phase === "live" || phase === "ended");
  const durationMs = state ? Math.max(1, state.endsAt - state.startedAt) : GAME_MS;

  return (
    <>
      {hostUnlocked && <ExitHostButton onExit={exitHost} />}

      <div className={wide ? "wrap host-wide" : "wrap"}>
        {canJoin && (
          <>
            <Join onJoin={join} live={phase === "live"} />
            <ResultsLookup />
          </>
        )}

        {phase === "lobby" && (me || isHost) && (
          <Lobby
            teamName={me?.name ?? "Host"}
            teams={teams}
            isHost={isHost}
            me={me}
            onStart={startGame}
            onReset={isHost ? resetGame : undefined}
            onChangeAvatar={setAvatar}
          />
        )}

        {showPlay && (
          <Play
            current={current}
            bankCleared={bankCleared}
            answeredCount={answeredCount}
            lastResult={lastResult}
            timeLeftMs={timeLeftMs}
            durationMs={durationMs}
            me={me}
            onSubmit={submit}
            onNext={next}
          />
        )}

        {wrappingUp && (
          <section>
            <div className="eyebrow">Live now</div>
            <h1 className="page-heading">Round wrapping up</h1>
            <div className="card">
              <p className="text-muted text-sm leading-[1.4]">
                This round is in its final seconds. Hang tight — you&apos;ll be able to hop in when
                the host starts the next one.
              </p>
            </div>
          </section>
        )}

        {showHostBoard && (
          <HostBoard teams={teams} timeLeftMs={timeLeftMs} onEnd={endGame} onReset={resetGame} />
        )}

        {phase === "ended" && (
          <FinalBoard
            teams={teams}
            myId={me?.id ?? null}
            isHost={isHost}
            sessionCode={state?.code}
            onReset={resetGame}
          />
        )}
      </div>

      {showHostLogin && !isHost && (
        <div className="modal-overlay" onClick={() => setShowHostLogin(false)}>
          <div className="w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
            <HostLogin
              onUnlock={async (t) => {
                const ok = await unlockHost(t);
                if (ok) setShowHostLogin(false);
                return ok;
              }}
              onCancel={() => setShowHostLogin(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
