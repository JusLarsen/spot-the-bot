import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Stub the Firebase client so the hook never touches a real RTDB. The pointer
// subscription fires its callback with null synchronously, which is what drives
// the one-time restoreSession() on mount.
vi.mock("./firebase-client", () => ({
  subscribeKey: vi.fn((_key: string, cb: (v: unknown) => void) => {
    cb(null);
    return () => {};
  }),
  subscribeSessionTeams: vi.fn((_code: string, cb: (raw: unknown[]) => void) => {
    cb([]);
    return () => {};
  }),
}));

import { useGame } from "./use-game";
import { subscribeKey } from "./firebase-client";

const ROLE_KEY = "stb_role";
const HOST_TOKEN_KEY = "stb_host_token";
const TEAM_KEY = "stb_team";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.unstubAllGlobals();
  // Reset the IMPLEMENTATION too — the connection-failure tests below swap in
  // failing ones, and mockClear alone would leak them into every later test.
  vi.mocked(subscribeKey).mockReset();
  vi.mocked(subscribeKey).mockImplementation((_key: string, cb: (v: unknown) => void) => {
    cb(null);
    return () => {};
  });
});

describe("useGame — connection failure surfacing", () => {
  it("reports a rules rejection instead of hanging on ready=false forever", () => {
    // A permission_denied never fires the VALUE callback, so `ready` can never
    // flip. Without the error callback the room just sits on "Connecting…".
    vi.mocked(subscribeKey).mockImplementation(
      (_key: string, _cb: (v: unknown) => void, onError?: (e: Error) => void) => {
        const err = new Error("permission_denied at /currentSessionCode");
        (err as Error & { code?: string }).code = "PERMISSION_DENIED";
        onError?.(err);
        return () => {};
      },
    );

    const { result } = renderHook(() => useGame());

    expect(result.current.ready).toBe(false);
    expect(result.current.connectionError).toMatch(/database\.rules\.json/);
  });

  it("reports a generic reach failure for non-permission errors", () => {
    vi.mocked(subscribeKey).mockImplementation(
      (_key: string, _cb: (v: unknown) => void, onError?: (e: Error) => void) => {
        onError?.(new Error("network unreachable"));
        return () => {};
      },
    );

    const { result } = renderHook(() => useGame());

    expect(result.current.connectionError).toBe(
      "Couldn't reach the game database (network unreachable).",
    );
  });

  it("reports a timeout when the first snapshot never arrives", () => {
    vi.useFakeTimers();
    // Subscribes but never calls back — a wedged socket or bad databaseURL.
    vi.mocked(subscribeKey).mockImplementation(() => () => {});

    const { result } = renderHook(() => useGame());
    expect(result.current.connectionError).toBeNull();

    act(() => {
      vi.advanceTimersByTime(12_000);
    });

    expect(result.current.connectionError).toMatch(/timed out/);
    vi.useRealTimers();
  });

  it("leaves connectionError null on a healthy connection", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.ready).toBe(true);
    expect(result.current.connectionError).toBeNull();
  });
});

describe("useGame — host/team role storage (two-tab fix)", () => {
  it("does NOT restore host from a stale localStorage role, and purges it (the two-tab bug)", () => {
    // The old design stored the role in (shared) localStorage, which trapped
    // every tab as host. A leftover value must no longer promote this tab.
    localStorage.setItem(ROLE_KEY, JSON.stringify("host"));
    localStorage.setItem(HOST_TOKEN_KEY, JSON.stringify("secret"));

    const { result } = renderHook(() => useGame());

    expect(result.current.isHost).toBe(false);
    expect(result.current.hostUnlocked).toBe(false);
    // legacy keys are purged so they can't linger as a stale credential
    expect(localStorage.getItem(ROLE_KEY)).toBeNull();
    expect(localStorage.getItem(HOST_TOKEN_KEY)).toBeNull();
  });

  it("restores host from the tab-scoped sessionStorage role", () => {
    sessionStorage.setItem(ROLE_KEY, JSON.stringify("host"));
    sessionStorage.setItem(HOST_TOKEN_KEY, JSON.stringify("secret"));

    const { result } = renderHook(() => useGame());

    expect(result.current.isHost).toBe(true);
    expect(result.current.hostUnlocked).toBe(true);
  });

  it("unlockHost writes role/token to sessionStorage, never localStorage", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
    );

    const { result } = renderHook(() => useGame());
    await act(async () => {
      await result.current.unlockHost("passphrase");
    });

    expect(JSON.parse(sessionStorage.getItem(ROLE_KEY)!)).toBe("host");
    expect(JSON.parse(sessionStorage.getItem(HOST_TOKEN_KEY)!)).toBe("passphrase");
    expect(localStorage.getItem(ROLE_KEY)).toBeNull();
    expect(localStorage.getItem(HOST_TOKEN_KEY)).toBeNull();
    expect(result.current.isHost).toBe(true);
  });

  it("exitHost clears host state on this tab WITHOUT any server call (game keeps running)", () => {
    sessionStorage.setItem(ROLE_KEY, JSON.stringify("host"));
    sessionStorage.setItem(HOST_TOKEN_KEY, JSON.stringify("secret"));
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { result } = renderHook(() => useGame());
    expect(result.current.isHost).toBe(true);

    act(() => {
      result.current.exitHost();
    });

    expect(result.current.isHost).toBe(false);
    expect(result.current.hostUnlocked).toBe(false);
    expect(sessionStorage.getItem(ROLE_KEY)).toBeNull();
    expect(sessionStorage.getItem(HOST_TOKEN_KEY)).toBeNull();
    // The key guarantee: leaving host issues no /api/host (or any) request, so
    // the live RTDB game is untouched and plays on without the host.
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("joining as a team clears any host role/token on the tab and persists the team to localStorage", async () => {
    sessionStorage.setItem(ROLE_KEY, JSON.stringify("host"));
    sessionStorage.setItem(HOST_TOKEN_KEY, JSON.stringify("secret"));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ teamId: "t_x", sessionId: "ABCD", avatar: "corn.png" }),
      }),
    );

    const { result } = renderHook(() => useGame());
    await act(async () => {
      await result.current.join("Brisket Bandits");
    });

    expect(sessionStorage.getItem(ROLE_KEY)).toBeNull();
    expect(sessionStorage.getItem(HOST_TOKEN_KEY)).toBeNull();
    const savedTeam = JSON.parse(localStorage.getItem(TEAM_KEY)!);
    expect(savedTeam.id).toBe("t_x");
    expect(savedTeam.sessionId).toBe("ABCD");
    expect(result.current.isHost).toBe(false);
  });

  it("join sends the avatar chosen on the join screen in the request body", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ teamId: "t_x", sessionId: "ABCD", avatar: "broccoli.png" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useGame());
    await act(async () => {
      await result.current.join("Veg Heads", "broccoli.png");
    });

    const joinCall = fetchMock.mock.calls.find(([url]) => url === "/api/join");
    expect(joinCall).toBeTruthy();
    expect(JSON.parse(joinCall![1].body as string)).toMatchObject({
      name: "Veg Heads",
      avatar: "broccoli.png",
    });
    // me reflects the server-confirmed avatar (the authoritative value, not the input).
    expect(result.current.me?.avatar).toBe("broccoli.png");
  });

  it("unlockHost does NOT delete the browser's team (host and team are decoupled)", async () => {
    // Decoupled model: a browser keeps its team identity even when a tab becomes
    // host, so the team survives for other tabs / reconnect. unlockHost should
    // make exactly ONE request (verify) — no 'unclaim' that wipes the team.
    localStorage.setItem(
      TEAM_KEY,
      JSON.stringify({ id: "t_keep", name: "Keepers", sessionId: "ABCD", avatar: "corn.png" }),
    );
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useGame());
    await act(async () => {
      await result.current.unlockHost("passphrase");
    });

    expect(result.current.isHost).toBe(true);
    expect(result.current.me).toBeNull(); // host view is never a contestant
    // No 'unclaim' request was made — that's what used to wipe the team.
    const unclaimed = fetchMock.mock.calls.some(
      ([, init]) => typeof init?.body === "string" && init.body.includes("unclaim"),
    );
    expect(unclaimed).toBe(false);
    const stillThere = JSON.parse(localStorage.getItem(TEAM_KEY)!);
    expect(stillThere.id).toBe("t_keep"); // team preserved
  });

  it("exitHost drops back into the browser's team (reconnect), not the join screen", () => {
    localStorage.setItem(
      TEAM_KEY,
      JSON.stringify({ id: "t_keep", name: "Keepers", sessionId: "ABCD", avatar: "corn.png" }),
    );
    sessionStorage.setItem(ROLE_KEY, JSON.stringify("host"));
    sessionStorage.setItem(HOST_TOKEN_KEY, JSON.stringify("secret"));

    const { result } = renderHook(() => useGame());
    expect(result.current.isHost).toBe(true);
    expect(result.current.me).toBeNull();

    act(() => {
      result.current.exitHost();
    });

    expect(result.current.isHost).toBe(false);
    expect(result.current.me?.id).toBe("t_keep"); // reconnected to the team
    expect(result.current.me?.name).toBe("Keepers");
    expect(localStorage.getItem(TEAM_KEY)).not.toBeNull(); // team still persisted
    // The own-team subscription must actually re-fire against the team's session
    // (sessionCode + me.id) so real scores reconcile — not just local state.
    const subscribedPaths = vi.mocked(subscribeKey).mock.calls.map((c) => c[0]);
    expect(subscribedPaths).toContain("sessions/ABCD/teams/t_keep");
  });
});
