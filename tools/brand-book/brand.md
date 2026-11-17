Krasty Soft is a B2B software development company: custom software, AI products, web and backend systems, and code and security audits for fintech, healthcare, e-commerce and SaaS. The identity is a dark studio: near-black grounds, one hard red, and a single geometric typeface. Red is the signal, used sparingly; everything else is greyscale.

Everything below matches the live krastysoft.com code. When this book and the site disagree, the site's `globals.css` wins, so update the book.

## Brand at a glance

- **Ground:** `bg-primary` (#0a0a0a). Every page, deck and social card starts dark.
- **Signal:** `brand-red` (#e50606). One red element per view should carry the eye: a word in the headline, the main button, a focus ring.
- **Voice:** an engineer explaining a decision to a founder. Concrete, numeric, no hype.
- **Type:** Sora, one family, weights 400 to 700.
- **Shape:** pills for controls (`radius-full`), soft 12 to 16px corners for surfaces.

## Voice and copy

Write like a senior engineer who has done this before and can prove it.

- **Lead with the specific.** Name the stack, the industry, the number. The home H1 reads "Software Company Focused on AI and Software Engineering", and the proof line under it carries the Clutch rating and the review count in plain text.
- **Back claims with figures we can show:** "3+ Years of expertise", "50+ Delivered projects", "Average rating on Clutch". Never invent a statistic. If there's no number, describe what we did.
- **Say "we" for Krasty Soft and "you" for the reader.** "We review the code your team ships and rank every finding by risk."
- **Use title case for H1 to H3 and sentence case for buttons and labels.** Buttons are short verbs: "Get started today", "Learn more".
- **Casing of terms is fixed:** AI, API, LLM, SaaS, FinTech, iOS, Next.js, Node.js, React.js, Supabase. Never lowercase "ai" or "api".
- **No emoji, no exclamation marks, no "cutting-edge", "revolutionary" or "seamless".**
- **Security write-ups describe real findings from reviewed code,** with a short real snippet from the commit. Never write a hypothetical exploit as if it happened.

### SEO writing rules (agreed with the SEO team)

- One H1 per page, then H2 for sections and H3 for subsections. No skipped levels.
- Never stack headings. A heading is followed by a connecting paragraph before the next subheading.
- Never bold a keyword. Bold is for meaning, not for search.
- Keywords go in naturally: articles and prepositions may sit between the key's words, and grammar wins over the raw key.
- A short summary comes before any FAQ block.
- Every article image has ALT text that says what the image shows, using one relevant key naturally.
- Every blog post links to a relevant service page (AI posts to /ai-development, API posts to /api-security-audit).

## Logo

The wordmark is KRASTY over `<SOFT>`. The triangle inside the A and the angle brackets are `logo-red`. The brackets say "we write code", so never redraw, recolour or space them.

- Use **krastysoft-black.svg** (light ink, made for black grounds) on `bg-primary` or darker. This is the default: the site header uses it.
- Use **krastysoft-white.svg** (dark ink) only where a white ground is unavoidable: printed documents, partner sites, invoices.
- Use **logo.svg**, the A mark alone, when the space is under 120px wide or square: avatars, favicons, loading states.
- Use **app-icon.svg** for the browser tab and app tiles: the K mark on a `brand-black` tile with a 6px corner.
- Don't put the logo on `brand-red`, on photos, or on a gradient. Don't add a glow or shadow to it.
- The logo's own colours are `logo-red` (#f30000) and `logo-white` (#f0f0f0). They live only inside the logo files. UI elements use `brand-red` and `text-primary`.

## Colour

Build every surface from the greys and add red as a signal.

| Role | Tokens |
| --- | --- |
| Grounds, darkest to lightest | `bg-primary` → `bg-muted` → `bg-secondary` → `bg-tertiary` → `bg-elevated` |
| Text | `text-primary` headings, `text-secondary` body, `text-muted` supporting, `text-disabled` inactive only |
| Lines | `border-subtle` decorative, `border-default` controls and cards, `border-strong` hover |
| Brand | `brand-red`, with `brand-red-light` for hover, `brand-red-dark` for pressed, `brand-red-glow` for halos |
| Call to action | `cta-red-900` → `cta-red-800` → `cta-red-700`, a 135° gradient used only in the CTA banner |
| Status | `status-success`, `status-warning`, `status-info`, `status-error` |

Rules:

- Put body copy in `text-secondary` on `bg-primary` or `bg-secondary`. Put headings in `text-primary`.
- Give red to one thing per view. Two red buttons side by side is wrong; make the second one `outline`.
- Colour one word of a hero headline red at most ("**AI** and Software Engineering").
- Red glows (`shadow-red-*`) appear on hover, never at rest, except one `shadow-red-lg` hero element per page.
- `brand-red` text needs 24px+ or bold 19px+ to pass contrast on dark grounds (4.11:1). For small red text, such as links in body copy, underline it so the colour isn't the only signal.
- Never put a page or a section on white. The brand has no light theme.

## Typography

Sora is the only typeface. It is a geometric sans, self-hosted as one variable file (`Sora-VariableFont_wght.ttf`, weight axis 100 to 800, SIL Open Font License). Code uses the system monospace stack.

- **Hero:** `hero-display`, 72px/1.04, weight 700, tracking −0.02em, balanced wrap. Pair it with a `hero-kicker` line above in `text-muted` inside the same H1.
- **Articles:** `prose-h2` 30px/700, `prose-h3` 24px/600, `prose-body` 17px/1.75 in `text-secondary`, at most 65 characters wide.
- **Interface:** `lead` 20px for intros, `body` 16px, `button` 16px/500, `small` 14px for labels.
- **Labels:** `section-label` and `table-label` are uppercase. `table-label` tracks at 0.05em.
- Use weights 400, 500, 600 and 700 only. No italics except in blockquotes.
- Headlines step down at each breakpoint: the hero runs 36px on phones, 48px from 768px, 60px from 1024px and 72px from 1280px.

## Layout and spacing

- Center content in `max-width` (1400px) with a 16px gutter (`tw-4`) on phones.
- Separate sections with `spacing-c-60` on tablet and `spacing-c-100` on desktop. Separate blocks inside a section with `spacing-c-50`.
- Pad cards with `tw-6` by default (`tw-4` for dense grids, `tw-8` to `tw-10` for feature panels).
- Lay out at `breakpoint-md` (768px), `breakpoint-lg` (1200px) and `breakpoint-xl` (1920px). Test at `breakpoint-xs` (375px). The page body never scrolls sideways.
- Page scrolling happens inside the `#app-scroll` container, not the window. Scroll-to-section buttons must scroll that element.

## Shape, borders and elevation

- Controls are pills: every Button, Pill and StatusBadge uses `radius-full`.
- Surfaces are soft rectangles: Cards and Inputs use 12px (`radius-lg`), the CTA banner `radius-xl`, large feature panels `radius-2xl`.
- Separate surfaces with a 1px border first (`border-subtle` or `border-default`). Shadows add depth only to the elevated Card (`shadow-card`, `shadow-elevated` on hover) and floating layers (`shadow-md` to `shadow-xl`).
- Hover states lift: Cards move up 4px and scale to 1.02, Buttons scale to 1.02 and press to 0.98, and borders turn `brand-red`.

## Motion

- Use one easing curve for entrances: cubic-bezier(0.32, 0.72, 0, 1), 500ms, sliding up 20px.
- Hovers and colour changes take 150 to 300ms on cubic-bezier(0.4, 0, 0.2, 1), the same curve the `--transition-fast/base/slow` variables use.
- Animate only transform and opacity.
- Content must be readable before JavaScript runs. Never ship text that waits at opacity 0 for an animation.
- Respect `prefers-reduced-motion`: the site cuts every animation to 0.01ms.
- Ambient loops (the CTA banner's slow glow, the StatusBadge pulse) run at 1.5 to 3s and stay under 35% opacity.

## Iconography

- Interface icons come from **Lucide** (`lucide-react` 0.563): 24px, 2px stroke, `currentColor`. Use them for stats, feature lists and controls, for example CalendarDays, Rocket and Star on the trust stats.
- The **Icons** group holds the site's own navigation glyphs (arrows, close, check, menu, social). They are filled single-ink SVGs; each file's ink is listed with the icons below.
- The **Illustrations** group holds the white line illustrations used on service and industry cards. Show them on `bg-secondary` or darker; they are white and vanish on light grounds.
- Third-party logos (React, Python, Node.js, Retool, Clutch) appear only to name a technology or an award, at their owners' colours, and are not part of this book.

## Imagery

- The social preview (og-image.png, 1200×630) is a dark radial vignette with "Krasty Soft" and "Software Development Company" between two short `brand-red` rules. Generated preview cards follow the same structure.
- Diagrams and infographics in articles are drawn on `bg-primary` with `text-secondary` labels and one red highlight. They always get ALT text (see Voice and copy).
- Team photos are real people. No stock photography of handshakes or code on screens.
- No illustrations with characters, no 3D blobs, no purple-blue gradients.

## Components

The six UI primitives in `src/components/ui` are documented in the Components section, each with a rendition styled from these tokens:

- **Button:** pill-shaped, five variants. `accent` (red) for the one main action, `primary` and `outline` for the rest.
- **Pill:** case-study and blog tags.
- **StatusBadge:** a live-status chip with a pulsing dot.
- **Card:** the base surface in four variants.
- **CTABanner:** the red gradient panel that ends a page and scrolls to the contact form.
- **Input:** a text field with label, helper, error and success states.

## Accessibility

- The focus ring is a 2px solid `brand-red` outline at 2px offset on every focusable element. Buttons add a 2px ring offset against `bg-primary`.
- Measured pairs: `text-primary` on `bg-primary` 19.8:1, `text-secondary` 15.7:1, `text-muted` 5.73:1 (4.77:1 on `bg-elevated`), white on `brand-red` 4.82:1, white on `cta-red-700` 6.47:1.
- Known misses, kept exact from the site and flagged for a fix: `brand-red` small text on dark grounds (4.11:1), white on `brand-red-light` at button hover (4.0:1), `brand-red` on `pill-red-fill` in tags (3.16:1), `status-info` text on `bg-secondary` (3.88:1).
- Status colour never stands alone: a StatusBadge always has its word, and Input errors always have a message.

## Not synced from the code

- **Legacy colour aliases:** `--color-background`, `--color-black`, `--color-white`, `--color-red`, `--color-dark-grey` and `--color-light-grey` duplicate tokens above. They are being phased out and are not listed.
- **Not tokenised:**
  - the transition variables, which are written up under Motion;
  - the four `--text-*` legacy size utilities (22, 32, 46 and 52px), which are covered by the type styles.
- **Not tokenised, and off-palette:**
  - the GeometricPattern block's purple, blue and pink palette;
  - the autofill fill #141416.
- **Components:** these are static HTML renditions written from the source files. The live React components (with framer-motion) are not bundled. Blocks such as the header, footer, FAQ and audit-page template are not included.
