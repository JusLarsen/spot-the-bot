"use client";
import { useEffect, useRef } from "react";
import { useGame } from "@/lib/use-game";
import { Join } from "@/components/Join";
import { Lobby } from "@/components/Lobby";
import { Play } from "@/components/Play";
import { HostBoard } from "@/components/HostBoard";
import { FinalBoard } from "@/components/FinalBoard";

export default function Home() {
  const game = useGame();
  const {
    ready,
    phase,
    teams,
    me,
    isHost,
    hostUnlocked,
    timeLeftMs,
    current,
    answeredCount,
    lastResult,
    join,
    submit,
    next,
    unlockHost,
    startGame,
    endGame,
    resetGame,
  } = game;

  // ---- HOST UNLOCK: keyboard "host" sequence ----
  const comboBufRef = useRef("");
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key && e.key.length === 1) {
        comboBufRef.current = (comboBufRef.current + e.key.toLowerCase()).slice(-6);
      }
      if (comboBufRef.current.endsWith("host")) {
        comboBufRef.current = "";
        promptHostUnlock(unlockHost);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockHost]);

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
        promptHostUnlock(unlockHost);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [unlockHost]);

  if (!ready) {
    return (
      <div className="wrap">
        <div className="eyebrow mt-10 text-center">Connecting…</div>
      </div>
    );
  }

  // Host in live phase sees the host board, not the play view
  const showHostBoard = isHost && phase === "live";
  const showPlay = !isHost && phase === "live";

  return (
    <>
      {hostUnlocked && <div className="role-toggle text-acid">HOST MODE ✓</div>}

      <div className="wrap">
        {phase === "lobby" && !me && !isHost && <Join onJoin={join} />}

        {phase === "lobby" && (me || isHost) && (
          <Lobby teamName={me?.name ?? "Host"} teams={teams} isHost={isHost} onStart={startGame} />
        )}

        {showPlay && (
          <Play
            current={current}
            answeredCount={answeredCount}
            lastResult={lastResult}
            timeLeftMs={timeLeftMs}
            me={me}
            onSubmit={submit}
            onNext={next}
          />
        )}

        {showHostBoard && (
          <HostBoard teams={teams} timeLeftMs={timeLeftMs} onEnd={endGame} onReset={resetGame} />
        )}

        {phase === "ended" && (
          <FinalBoard teams={teams} myId={me?.id ?? null} isHost={isHost} onReset={resetGame} />
        )}
      </div>
    </>
  );
}

async function promptHostUnlock(unlockHost: (token: string) => Promise<boolean>) {
  const token = window.prompt("Host passphrase:");
  if (!token) return;
  const ok = await unlockHost(token);
  if (!ok) {
    window.alert("Wrong passphrase.");
  }
}
