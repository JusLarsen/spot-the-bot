// Shared contracts for Spot the Bot. The parallel build chunks (UI, logic,
// client hook, server routes) all depend on these — change with care.

export type Phase = "lobby" | "live" | "ended";
export type Answer = "human" | "bot";
export type Category = "bbq" | "business" | "disney" | "speech" | "movies";
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
  sneaky?: boolean; // an AI sample designed to be hard to catch (for "don't feel bad" messaging)
}

/** State for a single game session, stored at `sessions/<code>/state`. */
export interface GameState {
  phase: Phase;
  startedAt: number;
  endsAt: number;
  version: number;
  code: string; // the session's own short code (also names its RTDB node)
}

/** A team record in RTDB at `sessions/<code>/teams/<id>`. */
export interface Team {
  id: string;
  name: string;
  avatar?: string; // avatar icon file name (in public/avatars/); assigned at join, changeable
  correct: number;
  wrong: number;
  totalMs: number; // server-measured answer time (tiebreaker) — never client-supplied
  answered: Record<string, boolean>; // keyed by question id
  joinedAt?: number; // server timestamp at join — baseline for the first answer's elapsed
  lastAnswerAt?: number; // server timestamp of the most recent answer — for server-side elapsed
}

/** A session short code contains only the unambiguous code alphabet — validate
 * anything client-supplied before interpolating it into an RTDB path. */
export const isValidSessionCode = (code: unknown): code is string =>
  typeof code === "string" && /^[A-HJ-NP-Z2-9]{3,12}$/.test(code);

export const GAME_MS = 10 * 60 * 1000; // default clock if the host doesn't pick
export const DURATION_CHOICES_MIN = [5, 10, 15] as const; // host-selectable lengths
export const MIN_DURATION_MS = 60 * 1000;
export const MAX_DURATION_MS = 60 * 60 * 1000;
export const LATE_JOIN_CUTOFF_MS = 60 * 1000; // no joining inside the final minute
/** Clock turns red at this threshold — distinct concept from the late-join cutoff. */
export const LOW_CLOCK_MS = 60 * 1000;

/** Confirmation dialog body for the "Reset game" action. */
export const RESET_CONFIRM_MESSAGE =
  "This clears every team's score and returns everyone to the lobby for a fresh round.";

// ---- Session model ----
// A session is one run of the game (lobby → live → ended), keyed by its short
// code. The single-session client follows `currentSessionCode` to find the
// active one; multi-session + join codes later are purely additive. These are
// native NESTED RTDB paths (with "/"), so the legacy ":" → "__" encoding does
// NOT apply to them.
export const CURRENT_SESSION_KEY = "currentSessionCode";
export const sessionStatePath = (code: string) => `sessions/${code}/state`;
export const sessionTeamsPath = (code: string) => `sessions/${code}/teams`;
export const sessionTeamPath = (code: string, teamId: string) => `sessions/${code}/teams/${teamId}`;

// ---- API contracts (client → Next route handlers, server-authoritative) ----

export interface JoinRequest {
  name: string;
}
export interface JoinResponse {
  teamId: string;
  sessionId: string; // the session the team joined (its short code)
  avatar: string; // the random avatar the server assigned this team
}

/** POST /api/avatar — change a team's avatar (cosmetic; server validates the
 * name against the manifest and writes it, like every other RTDB mutation). */
export interface SetAvatarRequest {
  sessionId: string;
  teamId: string;
  avatar: string; // must be a known avatar file name (see lib/avatars.ts)
}
export interface SetAvatarResponse {
  ok: boolean;
  avatar: string;
}

export interface AnswerRequest {
  sessionId: string;
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
  sneaky: boolean; // true if this was a deliberately tricky AI sample
  correctCount: number;
  wrongCount: number;
}

export const HOST_ACTIONS = ["verify", "start", "end", "reset", "unclaim"] as const;
export type HostAction = (typeof HOST_ACTIONS)[number];
export interface HostRequest {
  token: string;
  action: HostAction;
  durationMs?: number; // for "start" — game length the host chose
  sessionId?: string; // optional target session (defaults to the current one)
  teamId?: string; // for "unclaim" — the team record to delete when this device becomes host
}
export interface HostResponse {
  ok: boolean;
  code?: string; // the session code acted on (e.g. the new session after reset)
}

export interface ApiError {
  error: string;
}

/** GET /api/order?teamId= — the team's question order, same-answer runs capped. */
export interface OrderResponse {
  order: string[]; // question ids, in play order (no answers — safe for the client)
}

// ---- Client hook contract (implemented in lib/use-game.ts, consumed by UI) ----

/** Result of the most recent answer, for the reveal panel. */
export interface AnswerResult {
  correct: boolean;
  answer: Answer;
  source: string;
  reveal: string;
  sneaky: boolean;
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
  bankCleared: boolean; // true ONLY when every question is genuinely answered (not a transient null)
  answeredCount: number;
  lastResult: AnswerResult | null; // set after submit(), cleared on next()

  // team actions
  join: (name: string) => Promise<void>;
  submit: (choice: Answer) => Promise<void>;
  next: () => void;
  setAvatar: (avatar: string) => Promise<void>; // change this team's avatar

  // host actions (guarded server-side by HOST_TOKEN)
  unlockHost: (token: string) => Promise<boolean>;
  startGame: (durationMs?: number) => Promise<void>;
  endGame: () => Promise<void>;
  resetGame: () => Promise<void>;
}
