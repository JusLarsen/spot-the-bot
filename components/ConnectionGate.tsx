"use client";
// Shown by every page while the RTDB pointer subscription is still settling.
// If it FAILS (rules rejection, unreachable database, timeout) we say so —
// a permanent "Connecting…" gives the room no idea the game is down.
export function ConnectionGate({ error }: { error: string | null }) {
  return (
    <div className="wrap">
      <div className="eyebrow mt-10 text-center">{error ? "Can't connect" : "Connecting…"}</div>
      {error && (
        <>
          <div className="error-hint">{error}</div>
          <div className="mt-4 text-center">
            <button className="btn btn-ghost" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </>
      )}
    </div>
  );
}
