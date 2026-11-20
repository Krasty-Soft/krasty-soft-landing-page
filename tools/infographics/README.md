# Site infographics

HTML cards rendered to images for the site (SEO brief, Nov 2026).

| Card | Shown on | Claim |
| --- | --- | --- |
| `cards/case-results.html` | Home, under the case carousel | AI software we built moves measurable business numbers. |
| `cards/custom-before-after.html` | /custom-software-development, What Problems We Solve | Custom software takes manual work off a team's week. |

Each card renders twice: a desktop version laid out at 1200 px (2x) and a phone version laid out
at 400 px (3x). `src/components/infographic` serves the right one with `<picture>` and holds the ALT text.

## Regenerate

```bash
node tools/infographics/build.mjs                 # all cards
node tools/infographics/build.mjs case-results    # one card
```

Output goes to `public/images/infographics/`. After rendering, open each image and look at it,
then update the width and height in `src/components/infographic/index.tsx` if they changed.

Rendering uses the renderer from bearing's publish module (`npx bearing install . --features publish`).
Point `BEARING_RENDER` at its `render.mjs` if it lives elsewhere, and `PLAYWRIGHT_MODULE` at a folder
with Playwright installed (default `~/.cache/bearing-playwright`).

## Rules

- An infographic shows something the page text does not already say. The first versions repeated
  the Technologies cards and the project stages, and were replaced.
- Every figure comes from a published case study in Contentful (the `result`, `proofLead` and
  `proofEmphasis` fields) and is labelled as client-reported. Re-check them when a case changes.
- Rates and fixed measurements only. Counts that grow over time (events processed, months live,
  number of clients, reviews) go in page text, not in an image.
