"use client";
import { useGame } from "@/lib/use-game";
import { HostLogin } from "@/components/HostLogin";
import { Lobby } from "@/components/Lobby";
import { HostBoard } from "@/components/HostBoard";
import { FinalBoard } from "@/components/FinalBoard";
import { ExitHostButton } from "@/components/ExitHostButton";
import { ConnectionGate } from "@/components/ConnectionGate";

export default function HostPage() {
  const {
    ready,
    connectionError,
    phase,
    teams,
    timeLeftMs,
    hostUnlocked,
    unlockHost,
    exitHost,
    startGame,
    endGame,
    resetGame,
  } = useGame();

  if (!ready) {
    return <ConnectionGate error={connectionError} />;
  }

  if (!hostUnlocked) {
    return (
      <div className="wrap">
        <HostLogin onUnlock={unlockHost} />
      </div>
    );
  }

  return (
    <>
      <ExitHostButton onExit={exitHost} />
      <div className="wrap host-wide">
        {phase === "lobby" && (
          <Lobby teamName="Host" teams={teams} isHost onStart={startGame} onReset={resetGame} />
        )}
        {phase === "live" && (
          <HostBoard teams={teams} timeLeftMs={timeLeftMs} onEnd={endGame} onReset={resetGame} />
        )}
        {phase === "ended" && <FinalBoard teams={teams} myId={null} isHost onReset={resetGame} />}
      </div>
    </>
  );
}
