// Generates the event QR poster: a paint-splatter blob in Traeger orange with a
// white card holding the QR code for the live site. Outputs both SVG and a
// 2200px PNG to public/, so the finished asset is also servable from the app
// (e.g. https://spot-the-bot-psi.vercel.app/event-qr.png on a venue machine).
//
//   npm run gen:qr
//
// Colors come from the app palette in app/globals.css: modules in rust
// (#d9521e — matches Traeger's official "hot cinnamon") for scanner contrast,
// splatter in acid (#ff6a1a). Error correction H so styling never threatens
// the scan. The splatter is seeded, so output is reproducible.

import QRCode from "qrcode";
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const URL_TO_ENCODE = "https://spot-the-bot-psi.vercel.app";

const ACID = "#ff6a1a"; // splatter
const RUST = "#d9521e"; // QR modules + caption
const CARD = "#fffdf8"; // warm white card

// Seeded PRNG so the splatter is identical on every run.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260802);

const SIZE = 2200;
const C = SIZE / 2;

// ---- splatter blob: smooth closed curve with jittered radius, spiky every few points ----
function blobPath(points, rMin, rMax, spikeEvery, spikeBoost) {
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    let r = rMin + rand() * (rMax - rMin);
    if (i % spikeEvery === 0) r += spikeBoost * (0.6 + rand() * 0.8);
    pts.push([C + Math.cos(angle) * r, C + Math.sin(angle) * r]);
  }
  // Catmull-Rom -> cubic bezier for a smooth organic outline
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
}

// ---- droplets flung around the blob ----
function droplets(count, dMin, dMax, rMin, rMax) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = dMin + rand() * (dMax - dMin);
    const r = rMin + rand() * (rMax - rMin);
    const x = C + Math.cos(angle) * dist;
    const y = C + Math.sin(angle) * dist;
    // stretch some droplets along their fling direction for a real splatter feel
    if (rand() > 0.5) {
      const deg = (angle * 180) / Math.PI;
      out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * 1.7).toFixed(1)}" ry="${r.toFixed(1)}" fill="${ACID}" transform="rotate(${deg.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    } else {
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${ACID}"/>`;
    }
  }
  return out;
}

// ---- QR modules ----
const qr = QRCode.create(URL_TO_ENCODE, { errorCorrectionLevel: "H" });
const n = qr.modules.size; // 37 for this URL at ECC H
const MODULE = 24;
const QUIET = 4 * MODULE;
const qrSide = n * MODULE;

const CARD_W = qrSide + QUIET * 2;
const CAPTION_H = 96;
const CARD_H = CARD_W + CAPTION_H;
const cardX = C - CARD_W / 2;
const cardY = C - CARD_H / 2;
const qrX = cardX + QUIET;
const qrY = cardY + QUIET;

let modules = "";
for (let row = 0; row < n; row++) {
  for (let col = 0; col < n; col++) {
    if (!qr.modules.get(row, col)) continue;
    modules += `<rect x="${qrX + col * MODULE}" y="${qrY + row * MODULE}" width="${MODULE}" height="${MODULE}" rx="5" fill="${RUST}"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <path d="${blobPath(26, 880, 960, 5, 110)}" fill="${ACID}"/>
  ${droplets(22, 990, 1070, 8, 34)}
  <rect x="${cardX}" y="${cardY}" width="${CARD_W}" height="${CARD_H}" rx="44" fill="${CARD}"/>
  ${modules}
  <text x="${C}" y="${cardY + CARD_W + CAPTION_H * 0.42}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="58" fill="${RUST}">spot-the-bot-psi.vercel.app</text>
</svg>`;

writeFileSync(resolve(ROOT, "public/event-qr.svg"), svg);
await sharp(Buffer.from(svg)).png().toFile(resolve(ROOT, "public/event-qr.png"));
console.log(
  `event QR written: public/event-qr.svg + public/event-qr.png (${SIZE}px, QR v${qr.version}, ECC H)`,
);
