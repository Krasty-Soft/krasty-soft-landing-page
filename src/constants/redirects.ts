// Imported by next.config.ts, so keep this dependency-free (no @/ aliases).
export interface Redirect {
  source: string;
  destination: string;
}

const CASE_STUDIES_PREFIX = "/case-studies/";
const CAREERS_PREFIX = "/careers/";

export const REDIRECTS: Redirect[] = [
  // --- Sheet 3: removed case studies (current /case-studies/[slug] URLs) ---
  {
    source: `${CASE_STUDIES_PREFIX}aims-international-ai-driven-recruitment-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}crypto-arbitrage-automation-tool`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}warehouse-logistics-efficiency-dashboard`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}procurement-inventory-planning-tool`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}ai-powered-activity-management-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}admin-panel-for-wine-collectors-software`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}customer-support-dashboard-for-e-com`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}unified-orders-inventory-management-system`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}ai-powered-investments-platform`,
    destination: "/case-studies",
  },
  // --- Sheet 1: legacy case-study URLs (old top-level slug pattern) ---
  { source: "/loyalty-app-case-study", destination: "/case-studies" },
  { source: "/payment-project-case-study", destination: "/case-studies" },
  { source: "/crypto-trading-bot-case-study", destination: "/case-studies" },
  { source: "/retail-project-case-study", destination: "/case-studies" },
  { source: "/booking-app-case-study", destination: "/case-studies" },
  // --- Sheet 1: legacy/misc top-level URLs ---
  { source: "/request-a-demo", destination: "/" },
  { source: "/old-home-2", destination: "/" },
  // --- Sheet 1: legacy blog post URLs (old slugs, not the current test posts) ---
  {
    source: "/blog/medlearn-pro-transforming-healthcare-training-with-ai",
    destination: "/blog",
  },
  {
    source: "/blog/krasty-soft-boosts-order-processing-by-60",
    destination: "/blog",
  },
  {
    source:
      "/blog/costcare-pro-revolutionizing-healthcare-training-on-a-budget",
    destination: "/blog",
  },
  // --- Sheet 3: removed top-level pages ---
  { source: "/retool-development", destination: "/" },
  { source: "/retool-consulting", destination: "/" },
  { source: "/insurance", destination: "/" },
  { source: "/maritime-transportation", destination: "/" },
  { source: "/retool", destination: "/" },
  // --- Sheet 3: removed career slug ---
  { source: `${CAREERS_PREFIX}senior-rabbit-hugger`, destination: "/careers" },
];

// Derived from REDIRECTS so the two can't drift.
export const REMOVED_CASE_SLUGS = new Set<string>(
  REDIRECTS.map((r) => r.source)
    .filter((source) => source.startsWith(CASE_STUDIES_PREFIX))
    .map((source) => source.slice(CASE_STUDIES_PREFIX.length)),
);

// Career slugs that have been removed and should not appear in the sitemap or
// job listings even if they still exist in Contentful. Derived from REDIRECTS
// so the redirect list and the sitemap filter can't drift.
export const REMOVED_JOB_SLUGS = new Set<string>(
  REDIRECTS.map((r) => r.source)
    .filter((source) => source.startsWith(CAREERS_PREFIX))
    .map((source) => source.slice(CAREERS_PREFIX.length)),
);
