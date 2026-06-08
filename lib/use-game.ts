"use client";
// STUB — real implementation is Chunk C. Foundation ships a typed no-op so the
// app compiles and the UI (Chunk A) can build against the `UseGame` contract.
// Chunk C replaces this with the live RTDB subscription, host unlock, session
// resume (localStorage), and the API-route-backed actions.
import type { UseGame } from "./types";

export function useGame(): UseGame {
  return {
    ready: false,
    phase: "lobby",
    state: null,
    teams: [],
    me: null,
    isHost: false,
    hostUnlocked: false,
    timeLeftMs: 0,
    current: null,
    answeredCount: 0,
    lastResult: null,
    join: async () => {},
    submit: async () => {},
    next: () => {},
    unlockHost: async () => false,
    startGame: async () => {},
    endGame: async () => {},
    resetGame: async () => {},
  };
}
