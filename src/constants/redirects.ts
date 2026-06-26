// Imported by next.config.ts, so keep this dependency-free (no @/ aliases).
export interface Redirect {
  source: string;
  destination: string;
}

const CASE_STUDIES_PREFIX = "/case-studies/";

export const REDIRECTS: Redirect[] = [
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
  { source: "/retool-development", destination: "/" },
  { source: "/retool-consulting", destination: "/" },
  { source: "/insurance", destination: "/" },
  { source: "/maritime-transportation", destination: "/" },
  { source: "/retool", destination: "/" },
  { source: "/careers/senior-rabbit-hugger", destination: "/careers" },
];

// Derived from REDIRECTS so the two can't drift.
export const REMOVED_CASE_SLUGS = new Set<string>(
  REDIRECTS.map((r) => r.source)
    .filter((source) => source.startsWith(CASE_STUDIES_PREFIX))
    .map((source) => source.slice(CASE_STUDIES_PREFIX.length)),
);
