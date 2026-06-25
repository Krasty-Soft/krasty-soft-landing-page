# SEO Technical Implementation Report

**Krasty Soft Website**  
**Date:** June 25, 2026 (revised)  
**Based on:** Технічний аудит krastysoft.com (SEO Team Audit, 2026)

---

## Summary

All actionable items from the SEO audit have been implemented, including revisions based on SEO team feedback (Schema.org completeness, OG image reliability, and sitemap lastmod dates).

| # | Audit Item | Status |
|---|-----------|--------|
| 1 | Missing robots.txt | ✅ Fixed |
| 2 | 301 Redirects for old pages | ⏳ Delegated (separate track) |
| 3 | Sitemap cleanup + lastmod dates | ✅ Fixed |
| 4 | Test blog posts | ✅ Hidden + noindexed |
| 5 | H2/H3 tags in navigation menu | ✅ Fixed |
| 6 | Heading structure issues | ✅ Fixed |
| 7 | Schema.org structured data | ✅ Complete (revised) |
| 8 | OG image returning 404 | ✅ Fixed (revised) |
| 9 | Page speed / performance | ✅ Optimized |

---

## 1. robots.txt — ✅ Fixed

**Audit finding:** The site had no `robots.txt` file. All pages were open to crawlers with no directives, no parameter blocking, and no sitemap reference.

**What was done:**  
Created `src/app/robots.ts` using the Next.js Metadata API. The file generates a proper `robots.txt` with:

- Allow all crawlers on `/`
- Disallow: `/api/`, `/*utm_`, `/*fbclid=`, `/*gclid=`, `/search`, `/og-preview`
- Sitemap reference: `https://krastysoft.com/sitemap.xml`

**Result:** `https://krastysoft.com/robots.txt` now serves correct directives.

---

## 2. 301 Redirects — ⏳ Delegated

**Audit finding:** Old site pages need 301 redirects to relevant new pages.

**Status:** This item is being handled by a separate team member. Page deletions and redirect configuration are not part of this code change batch.

---

## 3. Sitemap — ✅ Fixed

**Audit finding:** Sitemap may contain pages not in the new site structure, and `lastmod` dates should reflect actual content updates, not build time.

**What was done:**

1. **Verified sitemap content** — All 37 URLs correspond to real, canonical, indexable pages. No `/og-preview`, no `/api/`, no redirects, no 404s. The sitemap is auto-generated from Contentful for case studies, job listings, and blog posts.

2. **Fixed `lastmod` dates** — Previously all pages used `new Date()` (current build time), which told Google every page was "just updated" on every deploy. Now:
   - **Static pages** use a fixed date (`2026-06-25`) representing the last known content update. This date should be updated when static content changes.
   - **Dynamic pages** (case studies, careers, blog posts) use Contentful's actual `sys.updatedAt` timestamp, fetched from the API. This gives Google the real last-modification date for each piece of content.

3. **Updated data fetchers** — `getAllSlugs()` in `cases.tsx`, `jobs.ts`, and `posts.ts` now return `{ slug, updatedAt }` instead of just `{ slug }`, pulling `updatedAt` from Contentful's `sys` field.

**Audit requirements checklist:**
- ✅ Absolute HTTPS URLs only
- ✅ Actual `lastmod` dates (not build time)
- ✅ All URLs match canonical addresses
- ✅ Auto-generated (no manual editing needed)
- ✅ Only canonical, indexable pages included

**Note on removed pages:** The audit references a Google Sheet with pages to remove from the sitemap. This list is tied to the 301 redirect work (Item 2, delegated to a separate team member). Once the redirect mapping is finalized, any redirected URLs will be automatically removed from the sitemap since the sitemap only includes pages that exist in Contentful or are statically defined.

---

## 4. Test Blog Posts — ✅ Hidden

**Audit finding:** 6 blog pages with placeholder content ("Another test post for mock testing") were indexed and present in the sitemap.

**What was done:**

1. **Removed all 6 test posts** from the fallback data in `src/lib/posts.ts`. The `posts` array is now empty. `getAllPosts()`, `getPostBySlug()`, and `getAllSlugs()` return `[]` or `null` when Contentful is unreachable instead of returning fake data.

2. **Added noindex safety net** in `src/app/blog/[slug]/page.tsx`. A `NOINDEX_SLUGS` set containing the 6 test slugs ensures that if any cached or stale URL is accessed, it returns `<meta name="robots" content="noindex, nofollow">`.

**Affected slugs:**
- `transforming-healthcare-software-development-with-retool`
- `cost-care-pro-revolutionizing-healthcare-training-on-a-budget`
- `end-inventory-headache-with-krasty-soft`
- `med-learn-pro-transforming-healthcare`
- `dark-mode-vs-light-mode-which-one-improves-user-experience`
- `the-importance-of-multi-factor-authentication-in-cybersecurity`

**Result:** These pages now return 404 (data removed) or noindex (safety net). They will fall out of Google's index on the next crawl.

---

## 5. Heading Tags in Navigation Menu — ✅ Fixed

**Audit finding:** The mobile navigation menu used `<h2>` and `<h3>` tags for non-content labels ("Menu", "Services", "Industries"), distorting the heading hierarchy.

**What was done:**  
In `src/components/blocks/header/mobile-menu.tsx`:
- `<h2>` → `<div>` for the "Menu" label (line 90)
- `<h3>` → `<div>` for the "Services" section label (line 153)
- `<h3>` → `<div>` for the "Industries" section label (line 184)

All CSS classes and styling remain identical. Only the HTML element changed.

**Result:** Navigation menus no longer contribute heading tags to the document outline. Page heading hierarchies are now clean (H1 → H2 → H3 content-only).

---

## 6. Heading Structure Issues — ✅ Fixed

**Audit finding:** The `/custom-software-development` page had excessive H3 tags used for UI elements (card titles, step labels) rather than content structure. The `/case-studies` and `/blog` pages also had heading structure issues.

**What was done:**  
Replaced non-semantic heading tags with styled `<div>` elements in reusable components:

| Component | Change |
|-----------|--------|
| `src/components/blocks/our-expertise/index.tsx` | `<h3>` for expertise card titles → `<div>` |
| `src/components/blocks/platform-card/index.tsx` | `<motion.h3>` for card headings → `<motion.div>` |
| `src/components/blocks/process-step/index.tsx` | `<motion.h3>` for step titles → `<motion.div>` |
| `src/components/case-card/index.tsx` | `<motion.h3>` for case card titles → `<motion.div>` (was generating 21 stray H3 on `/custom-software-development` and the homepage) |
| `src/components/blocks/footer/index.tsx` | 2× `<h3>` for footer column labels ("Company", "Services") → `<div>` |

All visual styling (font size, weight, color) is preserved via CSS classes and inline styles. Only the semantic element changed.

**Result:** Pages now have a clean H1 → H2 hierarchy. H3 tags are only used for genuine sub-sections (e.g. the four industry names Healthcare / FinTech / Maritime Transportation / Insurance on the homepage), not UI labels.

Verified live: `/custom-software-development` now has **0 H3 tags** (down from 23), homepage has 4 H3 (all real content section titles).

---

## 7. Schema.org Structured Data — ✅ Complete (Revised)

**Audit finding:** The site was missing several Schema.org markup types recommended for B2B service companies.

**Initial implementation** added BreadcrumbList and Service schemas. **After SEO team feedback** about incomplete coverage, the following additional schemas were added:

### Full schema coverage:

| Page | Schema Types |
|------|-------------|
| `/` (homepage) | Organization + AggregateRating |
| `/about` | **AboutPage** + **Person** (4 team members) + BreadcrumbList |
| `/custom-software-development` | Service + BreadcrumbList |
| `/retool-development` | Service + BreadcrumbList |
| `/retool-consulting` | Service + BreadcrumbList |
| `/fintech` | Service + BreadcrumbList |
| `/healthcare` | Service + BreadcrumbList |
| `/insurance` | Service + BreadcrumbList |
| `/maritime-transportation` | Service + BreadcrumbList |
| `/retool` | **Service** + BreadcrumbList |
| `/react` | **Service** + BreadcrumbList |
| `/python` | **Service** + BreadcrumbList |
| `/node` | **Service** + BreadcrumbList |
| `/case-studies` | BreadcrumbList |
| `/blog` | BreadcrumbList |
| `/blog/[slug]` | BlogPosting (Article) + BreadcrumbList |
| `/case-studies/[slug]` | Article + **SoftwareApplication** + BreadcrumbList |
| `/careers/[slug]` | JobPosting + BreadcrumbList |

### What was added in the revision:

1. **`/about` — AboutPage + Person schema**  
   Added `generateAboutPageSchema()` in `src/lib/seo.tsx`. The schema includes all 4 team members as `Person` entries with their name, job title, email, and LinkedIn URL:
   - Aleksandr Tynianov — Co-Founder & CTO
   - Marina Krasnikova — Co-Founder & CHRO
   - Volodymyr Shvedov — Business Development Manager
   - Rami Dawi — Business Development Consultant

2. **Technology pages — Service schema**  
   `/retool`, `/react`, `/python`, `/node` now have `Service` schema (they offer development services, same as the service pages). Previously only BreadcrumbList was present.

3. **Case study detail pages — SoftwareApplication schema**  
   Added `generateSoftwareApplicationSchema()` in `src/lib/seo.tsx`. Each case study now has both `Article` (describes the written content) and `SoftwareApplication` (describes the product that was built) schema. The SoftwareApplication includes the product name, description, application category, screenshot, and author organization.

**Verification (from live HTML output):**
```
/about: AboutPage, BreadcrumbList, Organization, Person (×4)
/retool: Service, BreadcrumbList, Organization
/case-studies/[slug]: Article, SoftwareApplication, BreadcrumbList, Organization
```

**Existing schemas confirmed working:**
- Organization — root layout ✅
- AggregateRating — homepage ✅
- JobPosting — `/careers/[slug]` ✅
- Article — `/case-studies/[slug]` ✅
- BlogPosting — `/blog/[slug]` ✅

---

## 8. OG Image 404 Fix — ✅ Fixed (Revised)

**Audit finding:** `og:image` on multiple pages pointed to `/og-image.png`, which returned 404 because the file didn't exist on the server.

**Initial implementation** created a dynamic `opengraph-image.tsx` route using Next.js ImageResponse API. **After SEO team feedback** that OG images still weren't displaying correctly, the approach was changed to a static file for maximum reliability.

### Why the dynamic route was replaced:

The `opengraph-image.tsx` route used `runtime = 'edge'` with `ImageResponse`. While this worked locally, it can fail in production because:
- Edge runtime may not be enabled in all deployment environments
- Social platform crawlers (Facebook, LinkedIn, Twitter) may not execute dynamic routes reliably
- ImageResponse requires specific runtime support that varies by platform

### What was done (revised):

1. **Generated a branded OG image** (1200×630px, 72KB PNG) with dark background, red accent lines, "Krasty Soft" title, and "Software Development Company" tagline.

2. **Saved as a static file** at `public/og-image.png`. Static files in the `public/` directory are served directly by Next.js/Vercel with no runtime processing — universally reliable.

3. **Removed the dynamic route** `src/app/opengraph-image.tsx` — no longer needed.

4. **Updated `src/lib/seo.tsx`** — all 3 references now point to `/og-image.png` (static file):
   - `generateSEO()` default OG image
   - `generateArticleSchema()` default image
   - `generateBlogSchema()` default image

**Verification (from live HTML output):**
```
GET /og-image.png → 200, image/png, 72712 bytes

Meta tags on all pages:
  / → og:image = https://krastysoft.com/og-image.png
  /about → og:image = https://krastysoft.com/og-image.png
  /fintech → og:image = https://krastysoft.com/og-image.png
  /custom-software-development → og:image = https://krastysoft.com/og-image.png
  /retool → og:image = https://krastysoft.com/og-image.png
  /blog → og:image = https://krastysoft.com/og-image.png
```

**Result:** All pages now serve a valid, static OG image. Social platforms can fetch it reliably without executing any runtime code. After deploying, use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to force a re-scrape of cached URLs.

---

## 9. Page Speed & Performance — ✅ Optimized

**Audit findings:**
- Mobile performance score: 56–74
- LCP: up to 6.5s
- Main thread blocked: 3.7s
- 15–21 non-composited animations
- JS execution time: 1.4s
- Font rendering blocks first paint

### Changes Made

#### 9.1 Font Loading Optimization
**File:** `src/lib/fonts.ts`  
Reduced font weight variants from 8 to 4:

| Before | After |
|--------|-------|
| 100 (Thin) | ❌ Removed |
| 300 (Light) | ❌ Removed |
| 400 (Regular) | ✅ Kept |
| 500 (Medium) | ✅ Kept |
| 600 (DemiBold) | ✅ Kept |
| 700 (Bold) | ✅ Kept |
| 800 (ExtraBold) | ❌ Removed |
| 900 (Black) | ❌ Removed |

**Impact:** ~50% reduction in font file payload. Font-display: swap already in place.

#### 9.2 Animation Performance (Banner)
**File:** `src/components/blocks/banner/index.tsx`  
Replaced 7 infinite framer-motion animations with pure CSS keyframes (GPU-composited `transform`/`opacity` only):

| Element | Before | After |
|---------|--------|-------|
| CTA button glow | `motion.div` with animated `scale`/`opacity` | CSS `pulse-glow` keyframe |
| Gradient background | `motion.div` with animated `backgroundPosition` | ❌ Removed (caused repaints) |
| Shimmer sweep | `motion.div` with animated `backgroundPosition` | ❌ Removed (caused repaints) |
| Arrow bounce | `motion.span` with `animate={{ x: [...] }}` | CSS `bounce-arrow` keyframe |
| Scroll indicator | `motion.div` with `animate={{ y: [...] }}` | CSS `bounce-y` keyframe |
| Scroll dot | `motion.div` with `animate={{ y: [...] }}` | CSS `scroll-dot` keyframe |

**Impact:** Eliminated all `backgroundPosition` animations (major repaint triggers). Converted infinite JS animations to GPU-composited CSS.

#### 9.3 TypingText Cursor (Global)
**File:** `src/components/ui/typing-text/index.tsx`  
Removed `framer-motion` import entirely. The cursor blink animation now uses a CSS keyframe (`blink-cursor`) instead of `motion.span` with `animate`.

**Impact:** Every page using `TypingText` (homepage, all service pages, all technology pages) no longer initializes a framer-motion runtime instance just for a blinking cursor.

#### 9.4 Third-Party Script Deferral
**File:** `src/app/layout.tsx`  
Changed loading strategy for non-critical third-party scripts:

| Script | Before | After |
|--------|--------|-------|
| Clutch widget | `strategy="afterInteractive"` | `strategy="lazyOnload"` |
| Google Analytics (gtag.js) | `strategy="afterInteractive"` | `strategy="lazyOnload"` |
| Google Analytics (inline) | `strategy="afterInteractive"` | `strategy="lazyOnload"` |

**Impact:** These scripts no longer compete for main thread time during page load. They load after the page is fully interactive.

#### 9.5 CSS Performance Hints
**File:** `src/app/globals.css`  
Added:

```css
/* GPU-composited keyframe animations */
@keyframes bounce-y { ... }
@keyframes bounce-arrow { ... }
@keyframes pulse-glow { ... }
@keyframes scroll-dot { ... }
@keyframes pulse-dot { ... }
@keyframes blink-cursor { ... }

.cursor-blink { animation: blink-cursor 0.8s linear infinite; }

/* Off-screen section render deferral */
section {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}

/* Accessibility: respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Impact:** `content-visibility: auto` skips layout/paint for off-screen sections until they near the viewport. The reduced-motion media query provides accessibility compliance.

### Lighthouse Results

**Desktop (Preset: Desktop)**

| Metric | Value |
|--------|-------|
| Performance Score | **97** |
| LCP | **1.3s** |
| FCP | **0.3s** |
| TTI | **1.3s** |
| TBT | **0ms** |
| CLS | **0** |
| Speed Index | **0.6s** |

**Mobile (Throttled 4× CPU — Mid-Range Phone Simulation)**

| Metric | Before (Audit) | After | Change |
|--------|----------------|-------|--------|
| Performance Score | 56–74 | **77** | +3 to +21 |
| LCP | 6.5s | **5.6s** | −0.9s |
| FCP | — | **1.1s** | ✅ |
| TBT | — | **170ms** | ✅ (<200ms) |
| CLS | — | **0** | ✅ Perfect |
| Speed Index | — | **2.4s** | ✅ |

**Main Thread Breakdown (Mobile)**

| Category | Time |
|----------|------|
| Script Evaluation | 1.7s |
| Other | 1.6s |
| Style & Layout | 1.1s |
| Rendering | 0.6s |

**No render-blocking resources** were flagged by Lighthouse.

**Remaining opportunity:** The largest remaining bottleneck is Framer Motion's JS bundle (~2.2s bootup on throttled mobile). This would require code-splitting Framer Motion into dynamic imports per page, which is a deeper architectural change. The current score of 77 on mobile represents a meaningful improvement from the original 56–74 range.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/robots.ts` | **NEW** — robots.txt via Next.js Metadata API |
| `src/app/opengraph-image.tsx` | **REMOVED** — replaced by static `public/og-image.png` |
| `public/og-image.png` | **NEW** — static branded OG image (1200×630px, 72KB) |
| `src/app/globals.css` | Added CSS keyframes, content-visibility, reduced-motion |
| `src/app/layout.tsx` | Deferred Clutch & GA scripts to `lazyOnload` |
| `src/lib/fonts.ts` | Reduced font weights from 8 to 4 |
| `src/lib/seo.tsx` | Changed OG image path to `/og-image.png`; added `generateAboutPageSchema()` and `generateSoftwareApplicationSchema()` |
| `src/lib/posts.ts` | Removed 6 test posts from fallback array; `getAllSlugs()` now returns `updatedAt` |
| `src/lib/cases.tsx` | `getAllSlugs()` now returns `updatedAt` from Contentful `sys` |
| `src/lib/jobs.ts` | `getAllSlugs()` now returns `updatedAt` from Contentful `sys` |
| `src/app/sitemap.ts` | Fixed `lastmod` dates — static pages use fixed date, dynamic pages use Contentful `updatedAt` |
| `src/app/blog/[slug]/page.tsx` | Added noindex for test slugs |
| `src/components/blocks/header/mobile-menu.tsx` | Replaced `<h2>`, `<h3>` with `<div>` |
| `src/components/blocks/our-expertise/index.tsx` | Replaced `<h3>` with `<div>` |
| `src/components/blocks/platform-card/index.tsx` | Replaced `<motion.h3>` with `<motion.div>` |
| `src/components/blocks/process-step/index.tsx` | Replaced `<motion.h3>` with `<motion.div>` |
| `src/components/blocks/banner/index.tsx` | Replaced 7 framer-motion infinite animations with CSS keyframes |
| `src/components/ui/typing-text/index.tsx` | Removed framer-motion dependency, cursor uses CSS animation |
| `src/app/about/page.tsx` | Added AboutPage + Person schema (4 team members) + BreadcrumbList |
| `src/app/custom-software-development/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/retool-development/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/retool-consulting/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/fintech/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/healthcare/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/insurance/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/maritime-transportation/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/retool/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/react/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/python/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/node/page.tsx` | Added Service + BreadcrumbList schema |
| `src/app/case-studies/page.tsx` | Added BreadcrumbList schema |
| `src/app/blog/layout.tsx` | Added BreadcrumbList schema |
| `src/app/blog/[slug]/page.tsx` | Added BreadcrumbList schema |
| `src/app/case-studies/[slug]/page.tsx` | Added SoftwareApplication schema + BreadcrumbList |

**Build status:** ✅ Passed (48 pages generated)  
**Lint status:** ✅ Passed (0 errors, only pre-existing `any` type warnings)  
**Breaking changes:** None

---

## What Remains (Requires SEO Team Input or Separate Track)

| Item | Status | Notes |
|------|--------|-------|
| 301 redirects for old pages | ⏳ Delegated | Awaiting redirect mapping from separate team |
| Sitemap update (remove redirected pages) | ⏳ Blocked | Depends on redirect mapping from item above |
| Internal contextual linking | ⏳ Content decision | Body content on industry/service pages should link to related pages |
| Technology page URL restructuring | ⏳ Content decision | `/node` → `/node-js-development` etc. requires 301 redirects |
| Framer Motion code-splitting | 🟢 Optional | Would push mobile score from 77 → 85+; requires deeper architecture change |
| `generateServiceSchema()` on service pages | ✅ Done | Wired up in this batch |
| `generateFAQSchema()` on pages with FAQ | ⏳ Content decision | Function exists; needs FAQ content from SEO team |

---

## E2E Verification — ✅ All Checks Pass

A full end-to-end test script (`e2e-seo-check.py`) was run against the production build served locally. The script crawls every relevant page and verifies the HTML output against each audit requirement.

**Final result: 170 passed, 0 failed, 2 informational warnings**

The 2 warnings are informational only (homepage H2/H3 counts were flagged for manual review — verified that all 4 H3 tags are real content section titles: Healthcare, FinTech, Maritime Transportation, Insurance; all 8 H2 are real section headings; "Menu" is not inside any heading tag).

### Coverage by audit item:

| Item | Checks | Result |
|------|--------|--------|
| 1. robots.txt | 9 checks (existence, Allow, Disallow rules, sitemap reference) | ✅ all pass |
| 3. Sitemap | 19 checks (37 URLs, HTTPS, no `/og-preview`/`/api/`, fixed lastmod for static pages, all key pages present) | ✅ all pass |
| 4. Test blog posts hidden | 12 checks (6 slugs return 404 + noindex, 6 slugs absent from sitemap) | ✅ all pass |
| 5. No H2/H3 in nav menu | "Menu" not in `<h2>` | ✅ pass |
| 6. Heading structure | 15 pages with exactly 1 H1; `/custom-software-development` H3 count = 0 (was 23) | ✅ all pass |
| 7. Schema.org | AboutPage + 4 Person on `/about`; Service on all 11 service/industry/tech pages; Article + SoftwareApplication on case study detail; BreadcrumbList on all 14 inner pages; Organization + AggregateRating on homepage | ✅ all pass |
| 8. OG image | `/og-image.png` returns 200 + `image/png` + 72 KB; `og:image` + `twitter:image` present and pointing to `/og-image.png` on all 14 key pages; old `/opengraph-image` route returns 404 | ✅ all pass |
| Canonical tags | 15 pages have correct canonical URL (homepage `https://krastysoft.com/`, inner pages without trailing slash) | ✅ all pass |
| `/og-preview` noindex | `robots=noindex,nofollow` | ✅ pass |

**Note for SEO team:** After deploying the OG image fix, please run the social platforms' debuggers to force a re-scrape — Facebook and LinkedIn cache OG images aggressively:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

*Report prepared by: Development Team*  
*Build: next build (48/48 pages)*  
*Lighthouse: mobile 77, desktop 97*  
*E2E verification: 170 passed, 0 failed*