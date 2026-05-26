#!/usr/bin/env node
/**
 * Optimise the Baby Mo mascot PNG for web.
 *
 * Usage:
 *   1. Save your source PNG to `public/mascot-source.png`
 *   2. Run `npm run mascot:build`
 *   3. Commit the resulting `public/mascot.png` (and *.webp)
 *
 * What this does:
 *   - Trims any solid background (white/cream) into proper transparency
 *   - Trims excess whitespace around the figure
 *   - Resizes the longest side to 1024px (plenty for web)
 *   - Writes an optimised PNG + a WebP (smaller, modern browsers)
 *
 * Safe to re-run — overwrites the outputs only.
 */
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = resolve(new URL("..", import.meta.url).pathname);
const SRC = join(PROJECT_ROOT, "public", "mascot-source.png");
const OUT_PNG = join(PROJECT_ROOT, "public", "mascot.png");
const OUT_WEBP = join(PROJECT_ROOT, "public", "mascot.webp");

if (!existsSync(SRC)) {
  console.error(
    `\n✗ Source file not found: ${SRC}\n  Save your mascot PNG there first.\n`,
  );
  process.exit(1);
}

const srcKB = (statSync(SRC).size / 1024).toFixed(0);
console.log(`→ source: ${SRC} (${srcKB} KB)`);

// `trim` removes a solid background; we apply a generous threshold so light
// cream backgrounds get caught too. Then resize to a sensible max dimension.
const pipeline = sharp(SRC)
  .ensureAlpha()
  .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: 18 })
  .resize({
    width: 1024,
    height: 1024,
    fit: "inside",
    withoutEnlargement: true,
  });

await pipeline
  .clone()
  .png({ quality: 90, compressionLevel: 9, palette: true })
  .toFile(OUT_PNG);

await pipeline
  .clone()
  .webp({ quality: 88, effort: 6 })
  .toFile(OUT_WEBP);

const pngKB = (statSync(OUT_PNG).size / 1024).toFixed(0);
const webpKB = (statSync(OUT_WEBP).size / 1024).toFixed(0);

console.log(`✓ ${OUT_PNG} (${pngKB} KB)`);
console.log(`✓ ${OUT_WEBP} (${webpKB} KB)`);
console.log(
  `\nDone. Commit the two output files; the <Mascot> component picks them up automatically.\n`,
);
