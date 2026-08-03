"use client";
import { useState, type KeyboardEvent } from "react";
import { randomTeamName } from "@/lib/team-names";
import { randomAvatar } from "@/lib/avatars";
import { AvatarChooser } from "./AvatarChooser";

interface JoinProps {
  onJoin: (name: string, avatar: string) => Promise<void>;
  live?: boolean; // joining an already-running round (late join)
}

export function Join({ onJoin, live = false }: JoinProps) {
  const [name, setName] = useState("");
  // Start on a random avatar (so every team gets one) — changeable here and in
  // the lobby until the host starts the clock.
  const [avatar, setAvatar] = useState(() => randomAvatar());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reserved, setReserved] = useState(false);

  async function handleJoin() {
    const trimmed = name.trim();
    if (trimmed.toLowerCase() === "host") {
      setReserved(true);
      return;
    }
    setReserved(false);
    // Blank is fine — give them a random BBQ name so nobody's blocked on naming.
    const finalName = trimmed || randomTeamName();
    setLoading(true);
    setError(false);
    try {
      await onJoin(finalName, avatar);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleJoin();
  }

  return (
    <section>
      <div className="eyebrow">Team Game · Live</div>
      <h1 className="page-heading">
        Spot the <span className="text-acid italic">Bot</span>
      </h1>
      <p className="text-muted mt-2 text-sm leading-[1.4]">
        Put your heads together. For each text sample, decide: <b className="text-human">human</b>{" "}
        or <b className="text-bot">AI</b>? Most correct calls before the clock runs out takes the
        trophy.
      </p>
      {live && (
        <p className="text-acid mt-2 font-mono text-[12px] leading-[1.4]">
          A round&apos;s already running — jump in with the time that&apos;s left.
        </p>
      )}
      <div className="card">
        <div className="mb-4 flex items-center gap-3">
          <AvatarChooser current={avatar} onSelect={setAvatar} />
          <div className="text-muted font-mono text-[12px] leading-[1.4]">
            Tap to pick your team avatar.
            <br />
            Change it anytime before the start.
          </div>
        </div>
        <label
          className="text-muted mb-2 block font-mono text-[11px] tracking-[2px] uppercase"
          htmlFor="name-input"
        >
          Team name
        </label>
        <div className="flex gap-2">
          <input
            id="name-input"
            type="text"
            autoFocus
            maxLength={40}
            placeholder="Team name (or leave blank)"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-acid/20 text-ink focus:border-acid min-w-0 flex-1 rounded-xl border bg-[#0a0805] px-4 py-3.5 font-mono text-lg transition-shadow outline-none focus:shadow-[0_0_0_3px_rgba(255,106,26,0.12)]"
          />
          <button
            type="button"
            onClick={() => {
              setReserved(false);
              setName(randomTeamName());
            }}
            aria-label="Generate a random team name"
            title="Random BBQ name"
            className="border-acid/20 text-acid hover:border-acid shrink-0 rounded-xl border bg-[#0a0805] px-4 text-2xl transition-colors"
          >
            🎲
          </button>
        </div>
        <button className="btn btn-primary" onClick={handleJoin} disabled={loading}>
          {loading ? "Joining…" : "Enter as a team →"}
        </button>
        {error && (
          <p className="error-hint" role="alert">
            Couldn&apos;t join — check your connection and try again.
          </p>
        )}
        {reserved && (
          <p className="error-hint" role="alert">
            &quot;host&quot; is reserved — pick a different team name.
          </p>
        )}
        <p className="text-muted mt-4 text-center font-mono text-[11px] leading-[1.5]">
          One device per team — pass it around and argue it out.
        </p>
      </div>
    </section>
  );
}
