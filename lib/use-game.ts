"use client";
// Real implementation of the UseGame hook. Subscribes to the full RTDB tree
// via subscribeTree(), manages localStorage session resume, drives question
// ordering, and calls the server API routes for all write operations.
import { useState, useEffect, useRef, useCallback } from "react";
import { subscribeKey, subscribeSessionTeams } from "./firebase-client";
import { rankTeams, shuffledIndices, hashStr, nextUnansweredPos } from "./game";
import { CURRENT_SESSION_KEY, sessionStatePath, sessionTeamPath } from "./types";
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
  SetAvatarRequest,
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
      avatar: typeof o.avatar === "string" ? (o.avatar as string) : undefined,
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
  // The active session code (from the `currentSessionCode` pointer). The
  // single-session client follows it; all state/teams/answers are scoped to it.
  const [sessionCode, setSessionCode] = useState<string | null>(null);
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

  // Latest game state, readable inside subscription callbacks without re-subscribing.
  const gameStateRef = useRef<GameState | null>(null);
  // Guards one-time session restore on the first snapshot.
  const restoredRef = useRef(false);

  // Server-computed question order (same-answer runs capped at 3 — the client
  // can't do this itself since it never sees answers). Falls back to the local
  // shuffle if the request hasn't landed or fails.
  // Keyed by teamId so a previous team's order is never reused for a new one.
  const [serverOrder, setServerOrder] = useState<{ teamId: string; order: string[] } | null>(null);
  const myId = me?.id ?? null;
  useEffect(() => {
    if (!myId) return;
    let cancelled = false;
    fetch(`/api/order?teamId=${encodeURIComponent(myId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && Array.isArray(d.order))
          setServerOrder({ teamId: myId, order: d.order });
      })
      .catch(() => {
        /* keep the local-shuffle fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [myId]);

  // ---- derived read-only values ----
  const phase: Phase = gameState?.phase ?? "lobby";

  // The team's ordered question-id list: server order (run-capped) for THIS team
  // if it has landed, else the deterministic local shuffle.
  const orderIds: string[] =
    serverOrder && serverOrder.teamId === myId ? serverOrder.order : me ? buildOrderIds(me.id) : [];

  // Live team record drives answered; answered drives current question
  const answered: Record<string, boolean> = me?.answered ?? {};
  const answeredCount = Object.keys(answered).length;

  // The next unanswered question for this team, plus whether the bank is
  // GENUINELY exhausted. These are distinct: a null question with bankCleared
  // false means the order/session is still settling (a transient blip) — the UI
  // must show "loading next", not falsely declare the whole bank cleared.
  let nextQuestion: PublicQuestion | null = null;
  let bankCleared = false;
  if (me && phase === "live") {
    const pos = nextUnansweredPos(orderIds, answered);
    // Only "cleared" when the order has loaded AND every id in it is answered.
    bankCleared = orderIds.length > 0 && pos >= orderIds.length;
    if (timeLeftMs > 0 && pos < orderIds.length) {
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
  // Restore session from localStorage once, after the first game:state snapshot.
  // For a team we set a provisional record; the own-team subscription reconciles
  // it (real scores, or clears it if the host reset while we were away).
  const restoreSession = useCallback((): void => {
    const role = safeLocalGet<string>(LS_ROLE_KEY);
    if (role === "host") {
      hostTokenRef.current = safeLocalGet<string>(LS_HOST_TOKEN_KEY);
      setIsHost(true);
      setHostUnlocked(true);
      return;
    }
    const savedTeam = safeLocalGet<{
      id: string;
      name: string;
      sessionId?: string;
      avatar?: string;
    }>(LS_TEAM_KEY);
    if (!savedTeam) return;
    // Optimistically resume the saved session so play restores without waiting
    // for the pointer round-trip; the live pointer value still wins if present.
    if (savedTeam.sessionId) setSessionCode((p) => p ?? savedTeam.sessionId!);
    setMe(
      (prev) =>
        prev ?? {
          id: savedTeam.id,
          name: savedTeam.name,
          avatar: savedTeam.avatar,
          correct: 0,
          wrong: 0,
          totalMs: 0,
          answered: {},
        },
    );
  }, []);

  // ---- subscribe: the active-session pointer (everyone — one tiny key) ----
  // The single-session client follows `currentSessionCode` to find the live
  // session; multi-session later just reads the code from the URL instead.
  useEffect(() => {
    const unsub = subscribeKey<string>(CURRENT_SESSION_KEY, (val) => {
      setSessionCode(typeof val === "string" && val ? val : null);
      if (!restoredRef.current) {
        restoredRef.current = true;
        restoreSession();
      }
      setReady(true);
    });
    return unsub;
  }, [restoreSession]);

  // ---- subscribe: the active session's game state ----
  // sessionCode only ever goes null → code → code (a reset repoints to a NEW
  // code, never back to null), and both gameState and the ref start null, so we
  // never need to synchronously clear here — only set inside the callback.
  useEffect(() => {
    if (!sessionCode) return;
    const unsub = subscribeKey<unknown>(sessionStatePath(sessionCode), (val) => {
      const next = asGameState(val);
      gameStateRef.current = next;
      setGameState(next);
    });
    return unsub;
  }, [sessionCode]);

  // ---- subscribe: this device's OWN team record (team devices only) ----
  // Scoped to one key so other teams' answers never reach this device.
  const ownId = me?.id ?? null;
  useEffect(() => {
    if (!sessionCode || !ownId) return;
    const unsub = subscribeKey<unknown>(sessionTeamPath(sessionCode, ownId), (val) => {
      const rec = asTeam(val);
      setMe((prev) => {
        if (!prev || prev.id !== ownId) return prev;
        if (rec) return rec;
        // record gone — host reset rolled to a new session; if the active
        // session is back in lobby, drop our team so we re-join the new one.
        if (gameStateRef.current?.phase === "lobby") {
          safeLocalRemove(LS_TEAM_KEY);
          return null;
        }
        return prev;
      });
    });
    return unsub;
  }, [sessionCode, ownId]);

  // ---- subscribe: ALL teams (host always; team devices only in lobby/ended) ----
  // Team devices DROP this during live, so a team's answer only fans out to the
  // single host + that team's own device — O(N) instead of O(N^2).
  useEffect(() => {
    if (!sessionCode) return;
    if (!isHost && phase === "live") return;
    const unsub = subscribeSessionTeams(sessionCode, (raw) => {
      const next: Team[] = [];
      for (const v of raw) {
        const t = asTeam(v);
        if (t) next.push(t);
      }
      setTeams(rankTeams(next));
    });
    return unsub;
  }, [sessionCode, isHost, phase]);

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

    safeLocalSet(LS_TEAM_KEY, {
      id: data.teamId,
      name,
      sessionId: data.sessionId,
      avatar: data.avatar,
    });
    safeLocalRemove(LS_ROLE_KEY);

    // Adopt the joined session immediately (don't wait for the pointer to
    // propagate) so the team drops straight into play.
    setSessionCode(data.sessionId);

    // me will be populated by the RTDB subscription once the server writes it;
    // set a provisional record immediately so the UI doesn't flash.
    setMe({
      id: data.teamId,
      name,
      avatar: data.avatar,
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
      if (!me || !current || !sessionCode) return;
      setFrozenQuestion(current); // pin this question while its result is shown
      const elapsedMs = Date.now() - questionShownAtRef.current;
      const body: AnswerRequest = {
        sessionId: sessionCode,
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
        sneaky: data.sneaky,
      });
      // Score update (me.answered, me.correct, etc.) flows back via the RTDB
      // subscription — no local mutation needed.
    },
    [me, current, sessionCode],
  );

  const next = useCallback((): void => {
    setLastResult(null);
    setFrozenQuestion(null);
    // current recomputes automatically from the updated me.answered in the tree
  }, []);

  const setAvatar = useCallback(
    async (avatar: string): Promise<void> => {
      if (!me || !sessionCode) return;
      // Optimistic: show the new avatar immediately; the RTDB subscription
      // reconciles it (and the server rejects an unknown name, leaving the
      // stored value untouched). Also update the saved record for reconnects.
      setMe((prev) => (prev ? { ...prev, avatar } : prev));
      const saved = safeLocalGet<Record<string, unknown>>(LS_TEAM_KEY);
      if (saved) safeLocalSet(LS_TEAM_KEY, { ...saved, avatar });

      const body: SetAvatarRequest = { sessionId: sessionCode, teamId: me.id, avatar };
      const res = await fetch("/api/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`setAvatar failed: ${res.status}`);
    },
    [me, sessionCode],
  );

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

    // If this device joined as a team before unlocking, delete that team record
    // server-side — the host is never a contestant and must not ghost the board.
    const saved = safeLocalGet<{ id: string; name: string; sessionId?: string }>(LS_TEAM_KEY);
    if (saved?.id && saved.sessionId) {
      const unclaim: HostRequest = {
        action: "unclaim",
        token,
        sessionId: saved.sessionId,
        teamId: saved.id,
      };
      try {
        await fetch("/api/host", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(unclaim),
        });
      } catch {
        /* best-effort — proceed with unlock regardless */
      }
    }

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
    bankCleared,
    answeredCount,
    lastResult,
    join,
    submit,
    next,
    setAvatar,
    unlockHost,
    startGame,
    endGame,
    resetGame,
  };
}
