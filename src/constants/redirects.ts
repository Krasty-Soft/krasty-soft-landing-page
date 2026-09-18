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
  // --- Sep 2026: case studies rebuilt in the one-page "brief" format. Cases
  // the new pack replaces point straight at their successor (single hop);
  // cases not yet rewritten are hidden until they are.
  {
    source: `${CASE_STUDIES_PREFIX}ai-desktop-helper-for-a-healthcare-platform`,
    destination: `${CASE_STUDIES_PREFIX}hipaa-compliant-ai-assistant-for-healthcare`,
  },
  {
    source: `${CASE_STUDIES_PREFIX}veterinary-purchasing-ai-assistant`,
    destination: `${CASE_STUDIES_PREFIX}predictive-ordering-for-veterinary-clinics`,
  },
  {
    source: `${CASE_STUDIES_PREFIX}e-commerce-marketing-analytics-dashboard-development`,
    destination: `${CASE_STUDIES_PREFIX}multi-channel-marketing-analytics-dashboard`,
  },
  {
    source: `${CASE_STUDIES_PREFIX}ai-bureaucracy-navigator-for-eu`,
    destination: `${CASE_STUDIES_PREFIX}ai-regulatory-intelligence-platform`,
  },
  // Pulled at the CTO's request shortly after publishing (2026-09-18).
  {
    source: `${CASE_STUDIES_PREFIX}ai-outbound-sales-automation-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}oolu-ai-powered-hiring-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}retool-platform-for-finance-task-automation`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}amazon-ads-analytics-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}courses-management-platform-for-healthcare-businesses`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}crm-system-with-unified-communications`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}marines-supply-coordination-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}rewards-management-platform`,
    destination: "/case-studies",
  },
  {
    source: `${CASE_STUDIES_PREFIX}web-three-defi-platform-decentralized-liquidity-protocol-development`,
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
  // --- Sheet 2: retired test/filler blog posts ---
  {
    source: "/blog/end-inventory-headache-with-krasty-soft",
    destination: "/blog",
  },
  {
    source: "/blog/med-learn-pro-transforming-healthcare",
    destination: "/blog",
  },
  {
    source:
      "/blog/the-importance-of-multi-factor-authentication-in-cybersecurity",
    destination: "/blog",
  },
  {
    source: "/blog/transforming-healthcare-software-development-with-retool",
    destination: "/blog",
  },
  {
    source:
      "/blog/cost-care-pro-revolutionizing-healthcare-training-on-a-budget",
    destination: "/blog",
  },
  {
    source: "/blog/dark-mode-vs-light-mode-which-one-improves-user-experience",
    destination: "/blog",
  },
  // --- Sheet 3: removed top-level pages ---
  { source: "/retool-development", destination: "/ai-development" },
  { source: "/retool-consulting", destination: "/ai-development" },
  { source: "/insurance", destination: "/" },
  { source: "/maritime-transportation", destination: "/" },
  { source: "/retool", destination: "/ai-development" },
  // --- Sheet 3: removed career slug ---
  { source: `${CAREERS_PREFIX}senior-rabbit-hugger`, destination: "/careers" },
  // --- Tech audit p.10: legacy URLs that returned 404. Nothing on the site
  // links to them, so these exist purely to preserve any external backlinks.
  { source: "/team", destination: "/about" },
  { source: "/blog/order-management-software", destination: "/blog" },
  // --- Tech audit p.12.1: legacy URLs still in Google's index from an older
  // version of the site. They 404 today, so they're redirected to the nearest
  // live equivalent to preserve their accumulated ranking signals.
  { source: "/ecommerce-case-study", destination: "/case-studies" },
  { source: "/contact", destination: "/about" },
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
