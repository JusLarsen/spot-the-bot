"use client";
// Real implementation of the UseGame hook. Subscribes to the full RTDB tree
// via subscribeTree(), manages localStorage session resume, drives question
// ordering, and calls the server API routes for all write operations.
import { useState, useEffect, useRef, useCallback } from "react";
import { subscribeTree } from "./firebase-client";
import { rankTeams, shuffledIndices, hashStr, nextUnansweredPos } from "./game";
import { PUBLIC_QUESTIONS, PUBLIC_BY_ID } from "./questions.public";
import type {
  UseGame,
  GameState,
  Team,
  Phase,
  Answer,
  AnswerResult,
  PublicQuestion,
  JoinRequest,
  JoinResponse,
  AnswerRequest,
  AnswerResponse,
  HostRequest,
  HostResponse,
  HostAction,
} from "./types";

// ---- localStorage key constants ----
const LS_ROLE_KEY = "stb_role";
const LS_TEAM_KEY = "stb_team";
const LS_HOST_TOKEN_KEY = "stb_host_token";

// ---- helpers ----

function safeLocalGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeLocalSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (SSR guard, private mode quota, etc.)
  }
}

function safeLocalRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// Decode tree Record<string,unknown> -> typed GameState or Team (best-effort)
function asGameState(v: unknown): GameState | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (
    typeof o.phase === "string" &&
    typeof o.startedAt === "number" &&
    typeof o.endsAt === "number" &&
    typeof o.version === "number"
  ) {
    return o as unknown as GameState;
  }
  return null;
}

function asTeam(v: unknown): Team | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (typeof o.id === "string" && typeof o.name === "string") {
    return {
      id: o.id as string,
      name: o.name as string,
      correct: (o.correct as number) ?? 0,
      wrong: (o.wrong as number) ?? 0,
      totalMs: (o.totalMs as number) ?? 0,
      answered: (o.answered as Record<string, boolean>) ?? {},
    };
  }
  return null;
}

// Derive the ordered question-id list for a team from their shuffled indices
function buildOrderIds(teamId: string): string[] {
  const indices = shuffledIndices(PUBLIC_QUESTIONS.length, hashStr(teamId));
  return indices.map((i) => PUBLIC_QUESTIONS[i].id);
}

export function useGame(): UseGame {
  // ---- raw tree state ----
  const [ready, setReady] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  // ---- session identity ----
  const [me, setMe] = useState<Team | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [hostUnlocked, setHostUnlocked] = useState(false);
  // Persisted host token is only ever read from localStorage on mount; stored
  // in a ref so actions always have the latest value without re-renders.
  const hostTokenRef = useRef<string | null>(null);

  // ---- play state ----
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  // While a reveal is showing, the displayed question is frozen so it doesn't
  // jump to the next one underneath the result (current recomputes from
  // me.answered, which updates the instant the server records the answer).
  const [frozenQuestion, setFrozenQuestion] = useState<PublicQuestion | null>(null);
  // Timestamp (Date.now()) when the current question first became visible.
  const questionShownAtRef = useRef<number>(0);

  // ---- clock ----
  const [timeLeftMs, setTimeLeftMs] = useState(0);

  // ---- tree mirror (latest snapshot, used in callbacks) ----
  const treeRef = useRef<Record<string, unknown>>({});
  // Guards one-time session restore on the first RTDB snapshot.
  const restoredRef = useRef(false);

  // ---- derived read-only values ----
  const phase: Phase = gameState?.phase ?? "lobby";

  // Build the team's ordered question-id list (stable per team id)
  const orderIds: string[] = me ? buildOrderIds(me.id) : [];

  // Live team record drives answered; answered drives current question
  const answered: Record<string, boolean> = me?.answered ?? {};
  const answeredCount = Object.keys(answered).length;

  // The next unanswered question for this team (null when done / not live).
  let nextQuestion: PublicQuestion | null = null;
  if (me && phase === "live" && timeLeftMs > 0) {
    const pos = nextUnansweredPos(orderIds, answered);
    if (pos < orderIds.length) {
      nextQuestion = PUBLIC_BY_ID[orderIds[pos]] ?? null;
    }
  }
  // While a result is showing, keep displaying the question that was answered.
  const current: PublicQuestion | null = lastResult ? frozenQuestion : nextQuestion;

  // Track when the current question became visible (for elapsedMs on submit).
  // Done in an effect — refs must not be written during render.
  const currentId = current?.id ?? null;
  useEffect(() => {
    if (currentId) questionShownAtRef.current = Date.now();
  }, [currentId]);

  // ---- session restore (runs once, on the first RTDB snapshot) ----
  const restoreSessionFromTree = useCallback(
    (tree: Record<string, unknown>, currentState: GameState | null): void => {
      const role = safeLocalGet<string>(LS_ROLE_KEY);
      if (role === "host") {
        hostTokenRef.current = safeLocalGet<string>(LS_HOST_TOKEN_KEY);
        setIsHost(true);
        setHostUnlocked(true);
        return;
      }

      const savedTeam = safeLocalGet<{ id: string; name: string }>(LS_TEAM_KEY);
      if (!savedTeam) return;

      const liveRecord = asTeam(tree[`team:${savedTeam.id}`]);
      if (!liveRecord) {
        // Team record wiped (host reset while we were away)
        if (!currentState || currentState.phase === "lobby") {
          safeLocalRemove(LS_TEAM_KEY);
        }
        return;
      }
      setMe(liveRecord);
    },
    [],
  );

  // ---- RTDB subscription ----
  useEffect(() => {
    const unsub = subscribeTree((tree) => {
      treeRef.current = tree;

      // Parse game state
      const nextState = asGameState(tree["game:state"]) ?? null;
      setGameState(nextState);

      // Parse all teams
      const nextTeams: Team[] = [];
      for (const key of Object.keys(tree)) {
        if (key.startsWith("team:")) {
          const t = asTeam(tree[key]);
          if (t) nextTeams.push(t);
        }
      }
      setTeams(rankTeams(nextTeams));

      // On the first snapshot only: restore session from localStorage.
      if (!restoredRef.current) {
        restoredRef.current = true;
        restoreSessionFromTree(tree, nextState);
      }
      setReady(true);

      // Keep me in sync with the live tree record (score updates flow in here)
      setMe((prevMe) => {
        if (!prevMe) return prevMe;
        const liveRecord = asTeam(tree[`team:${prevMe.id}`]);
        if (!liveRecord) {
          // Our record is gone; if we're in lobby it means host reset — clear
          if (nextState?.phase === "lobby") {
            safeLocalRemove(LS_TEAM_KEY);
            return null;
          }
          return prevMe; // gone mid-game (shouldn't happen) — keep local copy
        }
        return liveRecord;
      });
    });
    return unsub;
  }, [restoreSessionFromTree]);

  // ---- 250 ms clock tick ----
  useEffect(() => {
    const tick = () => {
      const endsAt = gameState?.endsAt ?? 0;
      const left = endsAt ? Math.max(0, endsAt - Date.now()) : 0;
      setTimeLeftMs(left);
    };
    tick(); // immediate
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [gameState]);

  // ---- actions ----

  const join = useCallback(async (name: string): Promise<void> => {
    const body: JoinRequest = { name };
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`join failed: ${res.status}`);
    const data: JoinResponse = await res.json();

    safeLocalSet(LS_TEAM_KEY, { id: data.teamId, name });
    safeLocalRemove(LS_ROLE_KEY);

    // me will be populated by the RTDB subscription once the server writes it;
    // set a provisional record immediately so the UI doesn't flash.
    setMe({
      id: data.teamId,
      name,
      correct: 0,
      wrong: 0,
      totalMs: 0,
      answered: {},
    });
    setIsHost(false);
    setHostUnlocked(false);
  }, []);

  const submit = useCallback(
    async (choice: Answer): Promise<void> => {
      if (!me || !current) return;
      setFrozenQuestion(current); // pin this question while its result is shown
      const elapsedMs = Date.now() - questionShownAtRef.current;
      const body: AnswerRequest = {
        teamId: me.id,
        questionId: current.id,
        choice,
        elapsedMs,
      };
      const res = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`submit failed: ${res.status}`);
      const data: AnswerResponse = await res.json();
      setLastResult({
        correct: data.correct,
        answer: data.answer,
        source: data.source,
        reveal: data.reveal,
      });
      // Score update (me.answered, me.correct, etc.) flows back via the RTDB
      // subscription — no local mutation needed.
    },
    [me, current],
  );

  const next = useCallback((): void => {
    setLastResult(null);
    setFrozenQuestion(null);
    // current recomputes automatically from the updated me.answered in the tree
  }, []);

  const unlockHost = useCallback(async (token: string): Promise<boolean> => {
    const body: HostRequest = { action: "verify", token };
    const res = await fetch("/api/host", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return false;
    const data: HostResponse = await res.json();
    if (!data.ok) return false;

    hostTokenRef.current = token;
    safeLocalSet(LS_ROLE_KEY, "host");
    safeLocalSet(LS_HOST_TOKEN_KEY, token);
    safeLocalRemove(LS_TEAM_KEY);
    setIsHost(true);
    setHostUnlocked(true);
    setMe(null);
    return true;
  }, []);

  // All host mutations share the same POST /api/host shape (guarded server-side
  // by HOST_TOKEN); only the action (and optional duration) differ.
  const callHost = useCallback(async (action: HostAction, durationMs?: number): Promise<void> => {
    const body: HostRequest = { action, token: hostTokenRef.current ?? "" };
    if (durationMs !== undefined) body.durationMs = durationMs;
    const res = await fetch("/api/host", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`host ${action} failed: ${res.status}`);
  }, []);

  const startGame = useCallback((durationMs?: number) => callHost("start", durationMs), [callHost]);
  const endGame = useCallback(() => callHost("end"), [callHost]);

  const resetGame = useCallback(async (): Promise<void> => {
    await callHost("reset");
    // Clear local team so this device (if it was ever a team) re-enters lobby.
    safeLocalRemove(LS_TEAM_KEY);
    setMe(null);
    // Host stays host — do NOT clear isHost/hostUnlocked.
  }, [callHost]);

  return {
    ready,
    phase,
    state: gameState,
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
  };
}
