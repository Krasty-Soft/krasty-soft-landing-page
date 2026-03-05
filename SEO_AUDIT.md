# SEO Technical Audit
**Krasty Soft Website**
**Date:** February 9, 2026
**Auditor:** Development Team

---

## Summary

| # | Area | Status | Severity |
|---|------|--------|----------|
| 1 | Duplicate URLs / Canonicalization | ⚠️ Partial Issues | Medium |
| 2 | Keyword Cannibalization | 🔴 Issue Found | High |
| 3 | Internal Linking | 🔴 Issues Found | High |
| 4 | Meta Tags | ⚠️ Partial Issues | Medium |
| 5 | Heading Structure | ⚠️ Partial Issues | Medium |
| 6 | Indexability | ⚠️ One Issue | Low |
| 7 | Structured Data | ✅ Good | — |
| 8 | URL Structure | ⚠️ Partial Issues | Medium |

---

## 1. Duplicate URLs / Canonicalization

### ✅ What's Working

- Canonical tags are implemented globally via `generateSEO()` in `src/lib/seo.tsx`
- Canonical always points to the preferred URL (`${BASE_URL}${path}`)
- No canonical loops detected
- No trailing slash inconsistency — Next.js 15 normalizes trailing slashes by default

### ⚠️ Issues Found

#### Issue 1.1 — 5 pages missing canonical tags (Medium)

These pages use raw `metadata = { title, description }` without `generateSEO()`, so they have **no canonical tag**:

| Page | URL | Fix |
|------|-----|-----|
| `/retool` | `src/app/retool/page.tsx` | Use `generateSEO()` |
| `/node` | `src/app/node/page.tsx` | Use `generateSEO()` |
| `/python` | `src/app/python/page.tsx` | Use `generateSEO()` |
| `/react` | `src/app/react/page.tsx` | Use `generateSEO()` |
| `/blog` | `src/app/blog/layout.tsx` | Use `generateSEO()` |

**Risk:** Without canonical, Google may choose its own preferred URL version (e.g. `/retool` vs `/retool/` vs `/retool?ref=...`). These pages can also be crawled with tracking parameters without a canonical to normalize them.

#### Issue 1.2 — No `trailingSlash` config in next.config.ts (Low)

`next.config.ts` has no explicit `trailingSlash` directive. While Next.js handles this internally, it's best practice to define it explicitly to guarantee consistent URL behavior across all environments and proxies.

**Fix:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  trailingSlash: false,  // Add this
  // ...
}
```

#### Issue 1.3 — og-preview page is publicly accessible and indexable (Low)

`/og-preview` is an internal tool page with no `noindex` directive and no metadata export. It will be indexed by Google as a real page.

**Fix:** Add `export const metadata = { robots: 'noindex, nofollow' }` to `src/app/og-preview/page.tsx`.

---

## 2. Keyword Cannibalization

### 🔴 Critical Issue — `/retool` vs `/retool-development` (High)

Both pages target the **exact same primary keyword**: `"Retool Development Services"`.

| Page | Title |
|------|-------|
| `/retool` | `"Retool Development Services \| Krasty Soft"` |
| `/retool-development` | `"Retool Development Services - Build Internal Tools Fast"` |

These two pages are directly **competing against each other** in Google search results for the same query. Google will pick one to rank and suppress the other, or both will rank lower because the signal is split.

**Recommended Fix:**

Differentiate them clearly:

| Page | Recommended Title | Angle |
|------|-------------------|-------|
| `/retool` | `"Retool Platform - What We Build & How"` | Technology overview / educational |
| `/retool-development` | `"Retool Development Services - Custom Internal Tools"` | Commercial / hire us page |

Or consolidate: make `/retool` redirect to `/retool-development` with a 301 if the content is essentially the same.

### ⚠️ Moderate Risk — Service pages vs Technology pages overlap

`/custom-software-development`, `/retool-development`, and `/retool` all contain overlapping semantic signals around "custom development" and "internal tools". This is lower severity since they're on different URLs with different contexts, but worth tracking as content grows.

### ✅ No Cannibalization on Industry Pages

`/fintech`, `/healthcare`, `/insurance`, `/maritime-transportation` — all clearly differentiated. No issues.

---

## 3. Internal Linking

### 🔴 Critical Issue — Most pages are orphaned (High)

The **header navigation** links to only these pages:
- `/case-studies`
- `/blog`
- `/about`
- `/careers`
- Industry pages (via dropdown)
- Service pages (via dropdown)
- Technology pages (via dropdown)

**Pages with ZERO internal links pointing to them from any content:**
- `/retool` — only reachable via dropdown, no contextual links
- `/node` — only reachable via dropdown, no contextual links
- `/python` — only reachable via dropdown, no contextual links
- `/react` — only reachable via dropdown, no contextual links
- `/blog/[slug]` — individual posts not linked from homepage or any section
- `/case-studies/[slug]` — case study detail pages not linked contextually
- `/careers/[slug]` — job detail pages not linked contextually

**Click depth from homepage:**
- Homepage → dropdown → `/retool` = 2 clicks ✅ OK, but **only via dropdown menu**
- Homepage → `/blog` → article = 2 clicks ✅ OK
- No contextual content links exist (e.g. a case study mentioned in a blog post linking to `/case-studies/slug`)

### ⚠️ No contextual internal links anywhere in page body content

All internal links are **exclusively in the nav menu and footer**. There are no in-content links (e.g. "see our Retool development services" inside the fintech page body). This weakens PageRank flow to service pages.

**Recommended Fixes:**

1. **Cross-link industry → service pages** inside body content:  
   e.g. on `/fintech` — add a link to `/retool-development` or `/custom-software-development`

2. **Cross-link service → technology pages**:  
   e.g. on `/retool-development` — add a link to `/retool`

3. **Homepage → featured blog posts / case studies** (not just section headers):  
   The blog section on homepage should link to specific posts, not just `/blog`

4. **Footer should include all important pages**:  
   Currently footer has minimal links. Add service, industry, and tech pages.

---

## 4. Meta Tags

### ✅ What's Working

- All major pages have `<title>` tags
- All major pages have `<meta description>`
- `generateSEO()` enforces consistent pattern: `"Page Title | Krasty Soft"`
- `meta keywords` is correctly NOT used (obsolete, correctly omitted in `generateSEO()`)
- Open Graph and Twitter Card tags on all SEO-enabled pages

### ⚠️ Issues Found

#### Issue 4.1 — 5 pages missing canonical + partial metadata (see Section 1)

`/retool`, `/node`, `/python`, `/react`, `/blog` use raw `metadata` object without `generateSEO()`:
- Missing canonical URL
- Missing Open Graph tags (OG image, OG locale, OG site name)
- Missing Twitter Card tags
- Missing keywords/robots directives

**Fix:** Replace raw `metadata` with `generateSEO()` on all 5 pages.

#### Issue 4.2 — Title length check

| Page | Title | Length | Status |
|------|-------|--------|--------|
| `/retool` | `Retool Development Services \| Krasty Soft` | 43 chars | ✅ |
| `/retool-development` | `Retool Development Services - Build Internal Tools Fast \| Krasty Soft` | 70 chars | ⚠️ Borderline (>60) |
| `/about` | `About Us - Our Story & Team \| Krasty Soft` | 43 chars | ✅ |
| `/fintech` | `FinTech Software Development Services \| Krasty Soft` | 53 chars | ✅ |

`/retool-development` title is borderline long (70 chars). Google typically truncates at 60. Consider shortening to `"Retool Development Services | Krasty Soft"`.

---

## 5. Heading Structure

### ✅ What's Working

- All main page types have exactly **one H1** per page
- H1s are meaningful and keyword-relevant
- H2/H3 hierarchy is used for section headers

### ⚠️ Issues Found

#### Issue 5.1 — Technology pages (retool, node, python, react) have H1 in template but it's dynamic

The H1 in `src/app/technologies/tech-template.tsx` comes from `tech.subtitle` — this is a dynamic field from the data layer. If `subtitle` is not set for a tech, the H1 could be empty.

**Recommended:** Verify all tech entries have a non-empty, keyword-rich subtitle defined in `src/lib/techs.ts`.

#### Issue 5.2 — About page has multiple large headings at same level

`src/app/about/client.tsx` has:
- Line 312: `<h1>` — ✅ correct
- Line 452: Large heading using same font size class — verify it's an `<h2>`, not another `<h1>`
- Line 500, 544: Same — verify these are `<h2>` or `<h3>`, not `<h1>`

**Action:** Confirm the large-sized headings after the H1 in `about/client.tsx` are properly tagged as `<h2>` — based on code they appear to be, but worth verifying in browser DevTools.

---

## 6. Indexability

### ✅ What's Working

- `robots.txt` correctly blocks `/api/` routes
- All crawlers allowed on all content pages
- `noindex` flag available in `generateSEO()` but not accidentally applied anywhere
- Sitemap covers all major static pages + dynamic case studies and careers

### ⚠️ Issues Found

#### Issue 6.1 — `/og-preview` is indexable (Low)

Page `src/app/og-preview/page.tsx` is a developer tool with no `noindex`. Google will crawl and potentially index it.

**Fix:**
```typescript
// src/app/og-preview/page.tsx
export const metadata = {
    robots: 'noindex, nofollow',
}
```

#### Issue 6.2 — Sitemap missing new pages (Medium)

These pages exist but are **NOT in `src/app/sitemap.ts`**:
- `/retool` 
- `/node`
- `/python`
- `/react`
- `/blog` (listing page)
- `/blog/[slug]` (individual posts)

**Fix:** Add all missing pages to `src/app/sitemap.ts`. Blog posts should be fetched dynamically from Contentful, same as case studies and careers.

---

## 7. Structured Data

### ✅ All Good

| Schema Type | Page | Status |
|-------------|------|--------|
| Organization | All pages (root layout) | ✅ |
| JobPosting | `/careers/[slug]` | ✅ |
| Article | `/case-studies/[slug]` | ✅ |
| BlogPosting | `/blog/[slug]` | ✅ |
| AggregateRating | Homepage | ✅ |

**Ready-to-deploy (functions exist, not yet wired up):**
- `generateFAQSchema()` — add to pages with FAQ content
- `generateServiceSchema()` — add to `/retool-development`, `/custom-software-development`
- `generateBreadcrumbSchema()` — add when breadcrumb UI is built

**No issues found in structured data implementation.**

---

## 8. URL Structure

### ✅ What's Working

- All URLs are lowercase ✅
- Hyphens used as word separators ✅
- No unnecessary query parameters ✅
- No deep nesting (max 2 levels: `/case-studies/[slug]`) ✅
- Human-readable URLs ✅

### ⚠️ Issues Found

#### Issue 8.1 — Technology page URLs lack context (Medium)

| Current URL | Better URL |
|-------------|------------|
| `/retool` | `/technologies/retool` or keep as-is |
| `/node` | `/technologies/node` or `/node-js-development` |
| `/python` | `/technologies/python` or `/python-development` |
| `/react` | `/technologies/react` or `/react-development` |

**Current issue:** `/node`, `/python`, `/react` give no URL context about what the page is about. A URL like `/node` says nothing to Google.

**Recommended:**
- Either prefix as `/technologies/retool` etc. (requires sitemap + nav update)
- Or rename to keyword-rich slugs: `/node-js-development`, `/python-development`, `/react-development`

The second option is better for SEO as the keyword appears in the URL.

**Note:** This is a breaking change — implement with proper 301 redirects if changed.

#### Issue 8.2 — Service page URL pattern inconsistency (Low)

| Page | URL |
|------|-----|
| Retool Development | `/retool-development` ✅ keyword-rich |
| Retool Consulting | `/retool-consulting` ✅ keyword-rich |
| Custom Software Dev | `/custom-software-development` ✅ keyword-rich |
| Retool (tech page) | `/retool` ⚠️ ambiguous, overlaps with `/retool-development` |

No breaking issue, but `/retool` vs `/retool-development` URL ambiguity reinforces the cannibalization problem from Section 2.

---

## Priority Action Plan

### 🔴 Critical (Fix Now)

1. **Resolve `/retool` vs `/retool-development` cannibalization**
   - Either differentiate titles/content clearly, or 301 redirect `/retool` → `/retool-development`
   - This is splitting your ranking signal for your most important keyword

2. **Add internal contextual links to service & tech pages from body content**
   - Industry pages should link to relevant service pages
   - Homepage sections should link to specific case studies and blog posts
   - This is the biggest gap in the current linking structure

### ⚠️ Medium Priority (Fix Before Launch)

3. **Replace raw `metadata` with `generateSEO()` on 5 pages**
   - `/retool`, `/node`, `/python`, `/react`, `/blog`
   - Adds canonical, OG tags, Twitter cards, robots

4. **Add missing pages to sitemap**
   - `/retool`, `/node`, `/python`, `/react`, `/blog` and all blog post slugs

5. **Add `noindex` to `/og-preview`**
   - One-liner fix, prevents internal tool from being indexed

6. **Rename tech page URLs to be keyword-rich**
   - `/node` → `/node-js-development`
   - `/python` → `/python-development`
   - `/react` → `/react-js-development`
   - With 301 redirects from old URLs

### 🟢 Low Priority (Nice to Have)

7. **Add `trailingSlash: false` to `next.config.ts`**
8. **Shorten `/retool-development` title** from 70 to ≤60 chars
9. **Add contextual links in footer** to service and tech pages
10. **Wire up `generateServiceSchema()`** on service pages (function already built)

---

## Fixes We Can Implement Now

From the list above, the following are purely code changes with no content decisions needed:

- [ ] Add `noindex` to `/og-preview`
- [ ] Replace raw `metadata` with `generateSEO()` on 5 pages  
- [ ] Add missing pages to sitemap
- [ ] Add `trailingSlash: false` to next.config.ts

**Say the word and I'll implement all of them.**

---

*Audit performed against: actual codebase (static analysis)*
*Tools: code inspection, file traversal, link mapping*
*Next audit recommended: after implementing fixes above*
