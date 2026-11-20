#!/usr/bin/env node
// Renders the site infographics in tools/infographics/cards/ to public/images/infographics/.
//
// Each card is rendered twice from the same HTML: a desktop version laid out at 1200 CSS px
// (shown at about that width, rendered at 2x) and a phone version laid out at 400 CSS px
// (rendered at 3x). The page picks one with <picture>.
//
// Rendering uses bearing's publish-visuals renderer (waits for window.__ready, fails on a broken
// image or page error). Set BEARING_RENDER to its path if it is not in .bearing/, and
// PLAYWRIGHT_MODULE to a folder that has playwright installed.
//
//   node tools/infographics/build.mjs            # all cards
//   node tools/infographics/build.mjs case-results

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const cardsDir = path.join(here, "cards");
const outDir = path.join(repo, "public/images/infographics");
const renderer =
  process.env.BEARING_RENDER ||
  path.join(repo, ".bearing/skills/bearing-publish-visuals/render.mjs");
const playwrightDir =
  process.env.PLAYWRIGHT_MODULE || path.join(os.homedir(), ".cache/bearing-playwright");

if (!fs.existsSync(renderer)) {
  console.error(`✗ renderer not found: ${renderer}\n  Install bearing's publish module or set BEARING_RENDER.`);
  process.exit(1);
}

// The renderer serves only the card's own folder, so stage the card with its assets.
const ASSETS = [
  path.join(cardsDir, "shared.css"),
  path.join(repo, "src/fonts/Sora-VariableFont_wght.ttf"),
  path.join(repo, "src/assets/krastysoft-black.svg"),
];

const VARIANTS = [
  { suffix: "desktop", width: 1200, scale: 2 },
  { suffix: "mobile", width: 400, scale: 3 },
];

const only = process.argv[2];
const cards = fs
  .readdirSync(cardsDir)
  .filter((f) => f.endsWith(".html"))
  .map((f) => f.replace(/\.html$/, ""))
  .filter((name) => !only || name === only);

const stage = fs.mkdtempSync(path.join(os.tmpdir(), "ks-infographics-"));
for (const asset of ASSETS) fs.copyFileSync(asset, path.join(stage, path.basename(asset)));
fs.mkdirSync(outDir, { recursive: true });

let failed = false;
for (const name of cards) {
  fs.copyFileSync(path.join(cardsDir, `${name}.html`), path.join(stage, `${name}.html`));
  for (const v of VARIANTS) {
    const out = path.join(outDir, `${name}-${v.suffix}.jpg`);
    const r = spawnSync(
      process.execPath,
      [renderer, path.join(stage, `${name}.html`), out, String(v.width), "auto", "88", "--scale", String(v.scale)],
      { stdio: "inherit", env: { ...process.env, PLAYWRIGHT_MODULE: playwrightDir } },
    );
    if (r.status !== 0) failed = true;
  }
}
fs.rmSync(stage, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
