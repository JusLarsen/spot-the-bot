// Generates the team-avatar icon set: ~100 pixel-art BBQ foods + veggies via the
// PixelLab pixflux endpoint, written as transparent PNGs to public/avatars/.
//
// Reproducible + resumable: already-present files are skipped, so a re-run only
// fills gaps. After generating, regenerate the manifest test fixture by running
// the avatar tests. Requires PIXELLAB_API_KEY (read from .env.local or env).
//
//   npm run gen:avatars            # fill any missing icons
//   npm run gen:avatars -- --force # regenerate everything
//
// Style is tuned to match the existing voting sprites: bold black outline,
// basic shading, single centered object on a transparent background.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/avatars");
const ENDPOINT = "https://api.pixellab.ai/v1/generate-image-pixflux";
const SIZE = 64;
const CONCURRENCY = 2; // PixelLab caps concurrent jobs per account
const MAX_RETRIES = 6;
const FORCE = process.argv.includes("--force");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Curated BBQ-cookout subjects: veggies, smoked/grilled meats, classic sides,
// a few cookout fruits, and the condiment squeeze bottles. Each becomes one
// icon file `<slug>.png`. Keep slugs kebab-case and unique.
const SUBJECTS = [
  // --- veggies ---
  "corn on the cob",
  "ripe red tomato",
  "cherry tomatoes",
  "red bell pepper",
  "green bell pepper",
  "jalapeno pepper",
  "red chili pepper",
  "orange carrot",
  "broccoli",
  "cauliflower",
  "cucumber",
  "green pickle",
  "purple eggplant",
  "green zucchini",
  "yellow onion",
  "red onion",
  "green onion scallion",
  "garlic bulb",
  "brown potato",
  "sweet potato",
  "button mushroom",
  "head of lettuce",
  "green cabbage",
  "asparagus spears",
  "green beans",
  "peas in a pod",
  "red radish",
  "purple beet",
  "turnip",
  "orange pumpkin",
  "butternut squash",
  "celery stalk",
  "spinach leaf",
  "kale leaf",
  "green artichoke",
  "avocado",
  "okra",
  "leek",
  "brussels sprout",
  "habanero pepper",
  // --- smoked & grilled meats ---
  "smoked beef brisket slice",
  "rack of bbq ribs",
  "baby back ribs",
  "pulled pork sandwich",
  "grilled hot dog in a bun",
  "grilled hamburger",
  "cheeseburger",
  "grilled sausage link",
  "bratwurst sausage",
  "smoked turkey leg",
  "whole roast chicken",
  "chicken drumstick",
  "bbq chicken wing",
  "grilled pork chop",
  "grilled steak",
  "t-bone steak",
  "ribeye steak",
  "beef rib",
  "shish kabob skewer",
  "grilled shrimp skewer",
  "smoked salmon fillet",
  "grilled fish",
  "meatball",
  "strips of bacon",
  "pork belly",
  "tri-tip roast",
  "bbq burnt ends",
  "corn dog",
  "slider mini burger",
  "grilled bbq drumstick",
  // --- sides ---
  "bowl of baked beans",
  "coleslaw",
  "mac and cheese",
  "cornbread",
  "potato salad",
  "french fries",
  "onion rings",
  "hush puppies",
  "buttermilk biscuit",
  "dinner roll",
  "jalapeno poppers",
  "deviled eggs",
  "baked potato",
  "garlic bread",
  "pickle spear",
  "potato wedges",
  "nachos with cheese",
  "mashed potatoes",
  "grilled cheese sandwich",
  "soft pretzel",
  // --- cookout fruit ---
  "watermelon slice",
  "grilled pineapple ring",
  "yellow lemon",
  "green lime",
  // --- condiments & extras ---
  "bbq sauce bottle",
  "ketchup bottle",
  "yellow mustard bottle",
  "hot sauce bottle",
  "salt shaker",
  "pepper shaker",
  "jar of pickles",
  "stick of butter",
  "ear of grilled corn",
  "skewer of grilled vegetables",
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadApiKey() {
  if (process.env.PIXELLAB_API_KEY) return process.env.PIXELLAB_API_KEY;
  const envPath = resolve(ROOT, ".env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*PIXELLAB_API_KEY\s*=\s*"?([^"\n]+)"?\s*$/);
      if (m) return m[1];
    }
  }
  throw new Error("PIXELLAB_API_KEY not found in env or .env.local");
}

async function generate(subject, slug, seed, apiKey) {
  const body = {
    description: `${subject}, cute pixel art food icon, single centered object, bold black outline, vibrant colors`,
    image_size: { width: SIZE, height: SIZE },
    no_background: true,
    outline: "single color black outline",
    shading: "basic shading",
    detail: "low detail",
    view: "side",
    text_guidance_scale: 9,
    seed,
  };
  let res;
  for (let attempt = 0; ; attempt++) {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    // 429 = concurrent-job cap (transient) or 5xx — back off and retry.
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      await sleep(1500 * (attempt + 1) + Math.floor(Math.random() * 500));
      continue;
    }
    break;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for "${subject}": ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const b64 = data?.image?.base64 ?? data?.image;
  if (typeof b64 !== "string") throw new Error(`no image in response for "${subject}"`);
  const raw = b64.replace(/^data:image\/png;base64,/, "");
  writeFileSync(resolve(OUT_DIR, `${slug}.png`), Buffer.from(raw, "base64"));
}

async function main() {
  const apiKey = loadApiKey();
  mkdirSync(OUT_DIR, { recursive: true });

  // Dedupe slugs defensively so a copy/paste collision can't silently overwrite.
  const seen = new Set();
  const jobs = [];
  SUBJECTS.forEach((subject, i) => {
    const slug = slugify(subject);
    if (seen.has(slug)) throw new Error(`duplicate slug: ${slug}`);
    seen.add(slug);
    const exists = existsSync(resolve(OUT_DIR, `${slug}.png`));
    if (exists && !FORCE) return;
    jobs.push({ subject, slug, seed: i + 1 });
  });

  console.log(
    `${SUBJECTS.length} subjects, ${jobs.length} to generate` +
      (FORCE ? " (force)" : " (skipping existing)"),
  );

  let done = 0;
  const failures = [];
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      try {
        await generate(job.subject, job.slug, job.seed, apiKey);
        done++;
        console.log(`  [${done}/${jobs.length}] ${job.slug}`);
      } catch (err) {
        failures.push({ slug: job.slug, error: String(err.message || err) });
        console.error(`  ✗ ${job.slug}: ${err.message || err}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const files = readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".png"))
    .sort();
  writeManifest(files);
  console.log(
    `\nDone. Generated ${done}, ${failures.length} failed. ${files.length} icons on disk.`,
  );
  console.log(`Wrote lib/avatars.ts manifest (${files.length} entries).`);
  if (failures.length) {
    console.log("Failures (re-run to retry):", failures.map((f) => f.slug).join(", "));
    process.exitCode = 1;
  }
}

// Emit the client-safe manifest consumed by the app + the /api/avatar validator.
function writeManifest(files) {
  const list = files.map((f) => `  "${f}",`).join("\n");
  const out = `// AUTO-GENERATED by scripts/gen-avatars.mjs — do not edit by hand.
// Team-avatar icon set: pixel-art BBQ foods + veggies in public/avatars/.
// Client-safe (no server-only imports) so the browser, the join/avatar API
// routes, and the archive page can all share one source of truth.
import { hashStr } from "./game";

export const AVATARS: string[] = [
${list}
];

const AVATAR_SET: ReadonlySet<string> = new Set(AVATARS);

/** Public path for an avatar file name (e.g. "corn.png" -> "/avatars/corn.png"). */
export function avatarSrc(name: string): string {
  return \`/avatars/\${name}\`;
}

/** True only for a file name that exists in the manifest — validate before storing. */
export function isValidAvatar(name: unknown): name is string {
  return typeof name === "string" && AVATAR_SET.has(name);
}

/** A random avatar (server picks one at join time). */
export function randomAvatar(): string {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

/** Deterministic fallback for a team id — a stable placeholder when no avatar
 * is stored yet (legacy records, or before the RTDB subscription lands). */
export function avatarForTeam(id: string): string {
  return AVATARS[hashStr(id) % AVATARS.length];
}
`;
  writeFileSync(resolve(ROOT, "lib/avatars.ts"), out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
