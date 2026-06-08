// Shared contracts for Spot the Bot. The parallel build chunks (UI, logic,
// client hook, server routes) all depend on these — change with care.

export type Phase = "lobby" | "live" | "ended";
export type Answer = "human" | "bot";
export type Category = "bbq" | "business" | "disney" | "speech";
export type QuestionType = "text" | "image";

/** Prompt shipped to the browser — deliberately has NO answer/reveal/source. */
export interface PublicQuestion {
  id: string;
  type: QuestionType;
  category: Category;
  body: string;
}

/** Full record, SERVER ONLY (see lib/questions.server.ts). */
export interface FullQuestion extends PublicQuestion {
  answer: Answer;
  source: string;
  reveal: string;
}

/** Shared game state in RTDB at key `game:state`. */
export interface GameState {
  phase: Phase;
  startedAt: number;
  endsAt: number;
  version: number;
}

/** A team record in RTDB at key `team:<id>`. */
export interface Team {
  id: string;
  name: string;
  correct: number;
  wrong: number;
  totalMs: number;
  answered: Record<string, boolean>; // keyed by question id
}

export const GAME_MS = 10 * 60 * 1000; // default clock if the host doesn't pick
export const DURATION_CHOICES_MIN = [5, 10, 15] as const; // host-selectable lengths
export const MIN_DURATION_MS = 60 * 1000;
export const MAX_DURATION_MS = 60 * 60 * 1000;
export const STATE_KEY = "game:state";
export const teamKey = (id: string) => `team:${id}`;

// ---- API contracts (client → Next route handlers, server-authoritative) ----

export interface JoinRequest {
  name: string;
}
export interface JoinResponse {
  teamId: string;
}

export interface AnswerRequest {
  teamId: string;
  questionId: string;
  choice: Answer;
  elapsedMs: number;
}
export interface AnswerResponse {
  correct: boolean;
  answer: Answer; // the truth, revealed only after the guess
  source: string;
  reveal: string;
  correctCount: number;
  wrongCount: number;
}

export type HostAction = "verify" | "start" | "end" | "reset";
export interface HostRequest {
  token: string;
  action: HostAction;
  durationMs?: number; // for "start" — game length the host chose
}
export interface HostResponse {
  ok: boolean;
}

export interface ApiError {
  error: string;
}

// ---- Client hook contract (implemented in lib/use-game.ts, consumed by UI) ----

/** Result of the most recent answer, for the reveal panel. */
export interface AnswerResult {
  correct: boolean;
  answer: Answer;
  source: string;
  reveal: string;
}

export interface UseGame {
  ready: boolean; // Firebase connected + initial snapshot in
  phase: Phase;
  state: GameState | null;
  teams: Team[]; // standings, sorted, host excluded
  me: Team | null; // this device's team (null when host or not joined)
  isHost: boolean;
  hostUnlocked: boolean;
  timeLeftMs: number;

  // play
  current: PublicQuestion | null; // current prompt for this team, or null when done/not playing
  answeredCount: number;
  lastResult: AnswerResult | null; // set after submit(), cleared on next()

  // team actions
  join: (name: string) => Promise<void>;
  submit: (choice: Answer) => Promise<void>;
  next: () => void;

  // host actions (guarded server-side by HOST_TOKEN)
  unlockHost: (token: string) => Promise<boolean>;
  startGame: (durationMs?: number) => Promise<void>;
  endGame: () => Promise<void>;
  resetGame: () => Promise<void>;
}
