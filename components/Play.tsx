"use client";
import type { PublicQuestion, AnswerResult, Answer } from "@/lib/types";
import { GAME_MS } from "@/lib/types";
import { fmtClock } from "@/lib/game";

interface PlayProps {
  current: PublicQuestion | null;
  answeredCount: number;
  lastResult: AnswerResult | null;
  timeLeftMs: number;
  me: { correct: number; wrong: number } | null;
  onSubmit: (choice: Answer) => Promise<void>;
  onNext: () => void;
}

export function Play({
  current,
  answeredCount,
  lastResult,
  timeLeftMs,
  me,
  onSubmit,
  onNext,
}: PlayProps) {
  const correct = me?.correct ?? 0;
  const wrong = me?.wrong ?? 0;
  const timerFraction = Math.max(0, Math.min(1, timeLeftMs / GAME_MS));
  const isLow = timeLeftMs <= 60_000;
  const hasAnswered = lastResult !== null;

  if (!current) {
    return (
      <section>
        <div className="roundbar">
          <span className="rno">All done</span>
          <span className="score">{correct} correct</span>
        </div>
        <div className="timer">
          <i style={{ transform: `scaleX(${timerFraction})` }} />
        </div>
        <div className={["clock", isLow && "low"].filter(Boolean).join(" ")}>
          {fmtClock(timeLeftMs)} left
        </div>
        <div className="stimulus flex items-center justify-center">
          <span className="text-muted font-mono text-sm">
            You&apos;ve cleared the whole bank — incredible. Sit tight for the final results ⏳
          </span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="roundbar">
        <span className="rno">Sample {hasAnswered ? answeredCount : answeredCount + 1}</span>
        <span className="score">
          {hasAnswered ? `${correct} correct · ${wrong} wrong` : `${correct} correct`}
        </span>
      </div>

      {/* Timer bar */}
      <div className="timer">
        <i style={{ transform: `scaleX(${timerFraction})` }} />
      </div>
      <div className={["clock", isLow && "low"].filter(Boolean).join(" ")} aria-live="off">
        {fmtClock(timeLeftMs)} left
      </div>

      {/* Question type label */}
      <div className="qtype">{current.type === "text" ? "TEXT SAMPLE" : "IMAGE"}</div>

      {/* Stimulus card */}
      <div className={["stimulus", current.type === "text" && "text"].filter(Boolean).join(" ")}>
        {current.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.body} alt="sample" className="block max-w-full rounded-lg" />
        ) : (
          current.body
        )}
      </div>

      {/* Choice buttons */}
      {!hasAnswered && (
        <div className="choices">
          <button className="choice human" onClick={() => onSubmit("human")}>
            <span className="ic">🧑</span>Human
          </button>
          <button className="choice bot" onClick={() => onSubmit("bot")}>
            <span className="ic">🤖</span>AI
          </button>
        </div>
      )}

      {/* Result reveal */}
      {hasAnswered && lastResult && (
        <>
          <div className={`feedback ${lastResult.correct ? "right" : "wrong"}`}>
            {lastResult.correct ? "✓ Correct" : "✗ Nope"}
          </div>
          <div className="reveal">{lastResult.reveal}</div>
          <div className="cite">Source: {lastResult.source}</div>
          <button className="btn btn-ghost mt-3.5" onClick={onNext}>
            Next sample →
          </button>
        </>
      )}
    </section>
  );
}
