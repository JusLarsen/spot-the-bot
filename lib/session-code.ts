// Pure short-code generation for game sessions. A session's code is its
// identity for its whole lifecycle: it names the RTDB node (sessions/<CODE>),
// it will later be the join code, and it's the code used to revisit a saved
// leaderboard at /r/<CODE>. The alphabet drops ambiguous glyphs (no I/O/0/1/L)
// so codes are easy to read aloud and type. Pure + seedable for unit tests.

export const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_LENGTH = 4;

/** Build a session code from a [0,1) RNG. Deterministic for a given `rand`. */
export function makeShortCode(rand: () => number, len: number = CODE_LENGTH): string {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  }
  return out;
}
