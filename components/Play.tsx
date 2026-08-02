"use client";
import { useEffect, useRef, useState } from "react";
import type { PublicQuestion, AnswerResult, Answer } from "@/lib/types";
import { LOW_CLOCK_MS } from "@/lib/types";
import { fmtClock } from "@/lib/game";
import { humanSpriteFor, botSpriteFor } from "@/lib/sprites";
import { Avatar } from "./Avatar";

interface PlayProps {
  current: PublicQuestion | null;
  bankCleared: boolean;
  answeredCount: number;
  lastResult: AnswerResult | null;
  timeLeftMs: number;
  durationMs: number; // total game length, for the timer-bar fraction
  me: { id: string; correct: number; wrong: number; avatar?: string } | null;
  onSubmit: (choice: Answer) => Promise<void>;
  onNext: () => void;
}

export function Play({
  current,
  bankCleared,
  answeredCount,
  lastResult,
  timeLeftMs,
  durationMs,
  me,
  onSubmit,
  onNext,
}: PlayProps) {
  const correct = me?.correct ?? 0;
  const wrong = me?.wrong ?? 0;
  const timerFraction = Math.max(0, Math.min(1, timeLeftMs / Math.max(1, durationMs)));
  const isLow = timeLeftMs <= LOW_CLOCK_MS;
  const hasAnswered = lastResult !== null;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Move keyboard focus to "Next" when a result appears.
  useEffect(() => {
    if (hasAnswered) nextBtnRef.current?.focus();
  }, [hasAnswered]);

  async function handleChoice(choice: Answer) {
    if (submitting) return; // guard against double-tap while the request is in flight
    setSubmitting(true);
    setError(false);
    try {
      await onSubmit(choice);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!current) {
    const timeUp = timeLeftMs <= 0;
    // Three distinct states — never claim the bank is cleared on a transient null
    // (order still loading, a reconnect, session restoring). Only `bankCleared`
    // from the hook means genuinely done.
    const heading = timeUp ? "Time's up" : bankCleared ? "All done" : "One sec…";
    let message: string;
    if (timeUp) {
      message = "Time's up! Hang tight for the final results.";
    } else if (bankCleared) {
      message = "You've cleared the whole bank — incredible. Sit tight for the final results.";
    } else {
      message = "Loading your next sample…";
    }
    return (
      <section>
        <div className="roundbar">
          <span className="rno">{heading}</span>
          <span className="score">
            {correct} correct · {wrong} wrong
          </span>
        </div>
        <TimerBar fraction={timerFraction} />
        <div className={["clock", isLow && "low"].filter(Boolean).join(" ")}>
          {fmtClock(timeLeftMs)} left
        </div>
        <div className="stimulus flex items-center justify-center">
          <span className="text-muted font-mono text-sm">{message}</span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="roundbar">
        <span className="flex items-center gap-2">
          {/* Locked once live — the avatar is chosen at join and in the lobby. */}
          {me && <Avatar name={me.avatar} teamId={me.id} size={32} />}
          <span className="rno">Sample {hasAnswered ? answeredCount : answeredCount + 1}</span>
        </span>
        <span className="score">
          {hasAnswered ? `${correct} correct · ${wrong} wrong` : `${correct} correct`}
        </span>
      </div>

      {/* Timer bar */}
      <TimerBar fraction={timerFraction} />
      <div className={["clock", isLow && "low"].filter(Boolean).join(" ")} aria-live="off">
        {fmtClock(timeLeftMs)} left
      </div>

      {/* Question type label */}
      <div className="qtype">{current.type === "text" ? "TEXT SAMPLE" : "IMAGE"}</div>

      {/* Stimulus card */}
      <div className={["stimulus", current.type === "text" && "text"].filter(Boolean).join(" ")}>
        {current.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.body}
            alt={`Sample ${answeredCount + 1}`}
            className="block max-w-full rounded-lg"
          />
        ) : (
          current.body
        )}
      </div>

      {/* Choice buttons */}
      {!hasAnswered && (
        <div className="choices">
          <button
            className="choice human"
            onClick={() => handleChoice("human")}
            disabled={submitting}
            aria-label="Vote human"
          >
            <span className="ic" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={humanSpriteFor(current.id)} alt="" className="sprite" />
            </span>
            Human
          </button>
          <button
            className="choice bot"
            onClick={() => handleChoice("bot")}
            disabled={submitting}
            aria-label="Vote AI"
          >
            <span className="ic" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={botSpriteFor(current.id)} alt="" className="sprite" />
            </span>
            AI
          </button>
        </div>
      )}

      {error && !hasAnswered && (
        <div className="feedback wrong" role="alert">
          Answer didn&apos;t save — tap again.
        </div>
      )}

      {/* Result reveal */}
      {hasAnswered && lastResult && (
        <>
          <div className={`feedback ${lastResult.correct ? "right" : "wrong"}`} aria-live="polite">
            {lastResult.correct ? "✓ Correct" : "✗ Nope"}
          </div>
          {lastResult.sneaky && (
            <div className="text-amber mt-1 text-center font-mono text-[12px]">
              {lastResult.correct
                ? "😈 A sneaky one — and you caught it. Nice work."
                : "😈 A sneaky one — even the pros miss these."}
            </div>
          )}
          {!lastResult.sneaky && lastResult.answer === "bot" && (
            <div className="text-muted mt-1 text-center font-mono text-[12px]">
              {lastResult.correct
                ? "A classic AI tell — here's the one you spotted:"
                : "A classic AI tell — learn it for next time:"}
            </div>
          )}
          <div className="reveal">{lastResult.reveal}</div>
          <div className="cite">Source: {lastResult.source}</div>
          <button ref={nextBtnRef} className="btn btn-ghost mt-3.5" onClick={onNext}>
            Next sample →
          </button>
        </>
      )}
    </section>
  );
}

/** The shrinking progress bar shown above the clock (same in every play state). */
function TimerBar({ fraction }: { fraction: number }) {
  return (
    <div className="timer">
      <i style={{ transform: `scaleX(${fraction})` }} />
    </div>
  );
}
