export const meta = {
  name: "tiered-review",
  description:
    "Risk-gated tiered code review: isolated Sonnet quorum (report-everything) → Fable adjudication before merge",
  phases: [
    { title: "Scope", detail: "classify change risk from the diff" },
    {
      title: "Quorum",
      detail: "N isolated Sonnet reviewers — report everything, no self-filtering",
      model: "sonnet",
    },
    {
      title: "Adjudicate",
      detail: "Fable dedups, converges, hunts blind spots, gives the merge verdict",
    },
  ],
};

// ---- inputs (all optional) ----
// args: { baseRef?: string, risk?: 'trivial'|'normal'|'high' }
//   baseRef  — when set, review the COMMITTED range baseRef...HEAD and IGNORE the
//              working tree (so an unrelated untracked/dirty file can't hijack scope).
//              when unset, auto-scope: working tree if dirty, else origin/main...HEAD.
//   risk     — override the auto-classification
const explicitBase = (args && args.baseRef) || null;
const fallbackBase = "origin/main";
const riskOverride = (args && args.risk) || null;

const VALID_RISK = ["trivial", "normal", "high"];
if (riskOverride && !VALID_RISK.includes(riskOverride)) {
  throw new Error(
    `Unknown risk override "${riskOverride}"; must be one of: ${VALID_RISK.join(", ")}`,
  );
}

// ---- schemas ----
const SCOPE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    scopedAs: {
      type: "string",
      description: "How the diff was scoped (working-tree, staged, or vs baseRef)",
    },
    changedFiles: { type: "array", items: { type: "string" } },
    summary: { type: "string", description: "One-paragraph plain-English summary of what changed" },
    risk: { type: "string", enum: ["trivial", "normal", "high"] },
    riskRationale: { type: "string" },
    hasChanges: { type: "boolean" },
  },
  required: ["scopedAs", "changedFiles", "summary", "risk", "riskRationale", "hasChanges"],
};

const FINDINGS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          file: { type: "string" },
          line: { type: "string", description: 'line or range, e.g. "42" or "42-50"' },
          category: {
            type: "string",
            enum: [
              "correctness",
              "security",
              "race/concurrency",
              "data-loss",
              "anti-cheat",
              "performance",
              "maintainability",
              "style",
            ],
          },
          severity: { type: "string", enum: ["critical", "high", "medium", "low", "nit"] },
          confidence: { type: "string", enum: ["high", "medium", "low"] },
          detail: { type: "string" },
          suggestion: { type: "string" },
          reviewer: {
            type: "integer",
            description: "set post-hoc to the reviewer index; reviewers omit it",
          },
        },
        required: [
          "title",
          "file",
          "line",
          "category",
          "severity",
          "confidence",
          "detail",
          "suggestion",
        ],
      },
    },
  },
  required: ["findings"],
};

const VERDICT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    decision: {
      type: "string",
      enum: ["approve", "approve-with-nits", "request-changes", "block"],
    },
    confirmed: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          file: { type: "string" },
          line: { type: "string" },
          severity: { type: "string", enum: ["critical", "high", "medium", "low", "nit"] },
          raisedByCount: {
            type: "integer",
            description:
              "how many of the N quorum reviewers independently flagged this (convergence signal)",
          },
          rationale: { type: "string" },
        },
        required: ["title", "file", "line", "severity", "raisedByCount", "rationale"],
      },
    },
    dismissed: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: { title: { type: "string" }, why: { type: "string" } },
        required: ["title", "why"],
      },
    },
    blindSpotPass: {
      type: "string",
      description:
        "What the adjudicator independently checked that the same-tier quorum could have all missed, and what it found",
    },
    summary: { type: "string" },
  },
  required: ["decision", "confirmed", "dismissed", "blindSpotPass", "summary"],
};

const HIGH_RISK_HINT = `For THIS repo (spot-the-bot, a live event game), treat as HIGH risk any change touching:
server-authoritative routes (app/api/**), game/scoring/order logic (lib/game.ts), the client game hook (lib/use-game.ts),
session/firebase plumbing (lib/firebase-admin.ts, lib/firebase-client.ts, lib/session-code.ts), the server question bank /
anti-cheat split (lib/questions.server.ts), RTDB rules (database.rules.json), or anything affecting scoring, sessions,
late-join, or the answers-never-reach-client invariant. Components/pages/content = NORMAL. Docs/copy/comments only = TRIVIAL.`;

// ---- Phase 1: scope + risk ----
const scopeInstruction = explicitBase
  ? `Review the COMMITTED diff between ${explicitBase} and HEAD — IGNORE the working tree entirely (untracked or uncommitted files are NOT in scope). Run \`git diff ${explicitBase}...HEAD --stat\`, inspect the diff, and \`git log ${explicitBase}..HEAD\` for context. Set hasChanges=false only if that committed range is empty.`
  : `Determine what to review:
- If \`git status --short\` is non-empty, review the working tree: \`git diff\` and \`git diff --staged\`. NOTE: for untracked files (\`??\` prefix in \`git status\`) \`git diff\` shows nothing — Read those files directly to review them.
- Otherwise review this branch's commits vs the base: \`git diff ${fallbackBase}...HEAD\` and \`git log ${fallbackBase}..HEAD\`.`;

phase("Scope");
const scope = await agent(
  `You are scoping a code review on the spot-the-bot repo. ${scopeInstruction}
Report how you scoped it, the list of changed files, a one-paragraph summary, and a risk classification.
${HIGH_RISK_HINT}
If there are no changes in scope, set hasChanges=false and risk=trivial.`,
  { label: "scope", phase: "Scope", schema: SCOPE_SCHEMA },
);

const risk = riskOverride || scope.risk;
// Risk → quorum size + final reviewer tier.
const PLAN = {
  trivial: { quorum: 1, finalModel: null },
  normal: { quorum: 3, finalModel: "fable" },
  high: { quorum: 3, finalModel: "fable" },
}[risk];
if (!PLAN) throw new Error(`Unknown risk "${risk}"; expected one of: ${VALID_RISK.join(", ")}`);

if (!scope.hasChanges) {
  log("No changes in scope — nothing to review.");
  return {
    risk,
    reviewed: false,
    reason: "no changes",
    quorum: 0,
    finalModel: PLAN.finalModel,
    findings: [],
    verdict: null,
    scope,
  };
}
log(
  `risk=${risk} → ${PLAN.quorum} Sonnet reviewer(s)${PLAN.finalModel ? ` + ${PLAN.finalModel} adjudication` : " (no final pass)"} | ${scope.changedFiles.length} file(s)`,
);

// ---- Phase 2: isolated Sonnet quorum (report EVERYTHING, no self-filtering) ----
phase("Quorum");
const reviewerPrompt = (i) =>
  `You are reviewer #${i + 1} of ${PLAN.quorum}, reviewing INDEPENDENTLY. Do not assume other reviewers exist; this is your own complete pass.

Scope: ${scope.scopedAs}. Re-derive the actual diff yourself with git (do NOT trust any summary) and read the surrounding code in each changed file for context. NOTE: for any untracked file (\`??\` in \`git status\`) \`git diff\` shows nothing — Read its full content directly to review it. Changed files:
${scope.changedFiles.map((f) => "  - " + f).join("\n")}

Your job at THIS stage is COVERAGE, not filtering. Report EVERY issue you find — including low-confidence and low-severity ones. Do NOT decide what's "important enough" to mention; a separate higher-tier adjudication step does the filtering and ranking. For each finding give file, line, category, severity, confidence, a concrete detail, and a suggested fix. It is better to surface a finding that later gets dismissed than to silently drop a real bug.

Prioritize substance over style: correctness, security, races, data-loss, and (for this game) scoring/session/anti-cheat integrity and the "answers never reach the client before the guess" invariant. Still report style/nits, but tag them as such.`;

const reviews = await parallel(
  Array.from(
    { length: PLAN.quorum },
    (_, i) => () =>
      agent(reviewerPrompt(i), {
        label: `review#${i + 1}`,
        phase: "Quorum",
        model: "sonnet",
        agentType: "code-reviewer",
        schema: FINDINGS_SCHEMA,
      })
        .then((r) => (r ? r.findings.map((f) => ({ ...f, reviewer: i + 1 })) : []))
        .catch((err) => {
          log(`reviewer #${i + 1} failed: ${err && err.message}`);
          return null; // sentinel: distinguishes a crash from a clean empty pass
        }),
  ),
);
const succeeded = reviews.filter((r) => r !== null).length;
const allFindings = reviews.filter(Boolean).flat(); // null (failed) is dropped; [] (clean) flattens away
if (succeeded < PLAN.quorum)
  log(
    `WARNING: only ${succeeded}/${PLAN.quorum} reviewers succeeded — convergence counts are out of that smaller pool`,
  );
log(`quorum raised ${allFindings.length} finding(s) across ${PLAN.quorum} reviewer(s)`);

// Trivial changes get a single reviewer and no higher-tier pass. Return the
// same shape as the adjudicated path (stub verdict) so callers can always read
// result.verdict.decision and result.findings.
if (!PLAN.finalModel) {
  // Decision reflects the single reviewer's worst finding rather than a fixed stub.
  const hasMajor = allFindings.some((f) => f.severity === "critical" || f.severity === "high");
  const decision =
    allFindings.length === 0 ? "approve" : hasMajor ? "request-changes" : "approve-with-nits";
  return {
    risk,
    reviewed: true,
    quorum: PLAN.quorum,
    reviewersSucceeded: succeeded,
    finalModel: null,
    findings: allFindings,
    rawFindings: allFindings,
    verdict: {
      decision,
      confirmed: [],
      dismissed: [],
      blindSpotPass: "N/A — trivial tier, single reviewer, no higher-tier adjudication.",
      summary: `Trivial-tier single-reviewer pass: ${allFindings.length} raw, unadjudicated finding(s)${hasMajor ? " incl. high/critical" : ""}. One reviewer's opinion — no convergence signal.`,
    },
    scope,
  };
}

// ---- Phase 3: higher-tier adjudication (convergence + blind-spot pass + verdict) ----
phase("Adjudicate");
const verdict = await agent(
  `You are the FINAL, highest-tier reviewer. ${succeeded} independent Sonnet reviewers each did a full pass (convergence counts are out of ${succeeded}); their raw findings (tagged with the reviewer number that raised each) are below. You can SEE all of them — you are the adjudicator, not another blind voter.

Do three things:
1) CONVERGE + FILTER: dedup the findings semantically. Count how many distinct reviewers independently raised each (convergence = confidence — a finding raised by 2+ reviewers is stronger than one raised by one). Then do the filtering/ranking the reviewers were told NOT to do: confirm the real ones, dismiss the noise (say why).
2) BLIND-SPOT PASS: a same-tier quorum shares blind spots — they can all miss the same subtle bug and unanimously call it fine. Independently re-derive the diff with git and hunt specifically for the hard class the Sonnet quorum could have all missed: subtle concurrency/races, security, data-loss, and this repo's scoring/session/anti-cheat correctness and the answers-never-leak-before-guess invariant. Record what you checked and what you found in blindSpotPass.
3) DECIDE: give a single merge decision (approve / approve-with-nits / request-changes / block) with a short summary a human can act on.

Scope: ${scope.summary}
Changed files: ${scope.changedFiles.join(", ")}

Quorum findings (JSON):
${JSON.stringify(allFindings, null, 2)}`,
  {
    label: `adjudicate:${PLAN.finalModel}`,
    phase: "Adjudicate",
    model: PLAN.finalModel,
    agentType: "code-reviewer",
    schema: VERDICT_SCHEMA,
  },
);

return {
  risk,
  reviewed: true,
  quorum: PLAN.quorum,
  reviewersSucceeded: succeeded,
  finalModel: PLAN.finalModel,
  verdict,
  findings: allFindings,
  rawFindings: allFindings,
  scope,
};
