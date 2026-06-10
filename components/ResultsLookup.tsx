"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/** Small "view past results" box on the landing screen — jumps to /r/<CODE>. */
export function ResultsLookup() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function go() {
    const c = code.trim().toUpperCase();
    if (c) router.push(`/r/${c}`);
  }

  return (
    <div className="mt-4 text-center">
      <div className="text-muted mb-2 font-mono text-[11px] tracking-[2px] uppercase">
        View past results
      </div>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") go();
          }}
          placeholder="CODE"
          aria-label="Past results code"
          className="border-acid/20 text-ink focus:border-acid w-[120px] rounded-xl border bg-[#0a0805] px-4 py-2.5 text-center font-mono text-lg tracking-[3px] uppercase transition-shadow outline-none focus:shadow-[0_0_0_3px_rgba(255,106,26,0.12)]"
        />
        <button
          type="button"
          onClick={go}
          disabled={!code.trim()}
          className="border-acid/20 text-acid hover:border-acid shrink-0 rounded-xl border bg-[#0a0805] px-4 font-mono text-[12px] tracking-[1px] uppercase transition-colors disabled:opacity-40"
        >
          View
        </button>
      </div>
    </div>
  );
}
