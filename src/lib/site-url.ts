/**
 * Canonical site URL — the single source of truth for every absolute URL the
 * app emits: og:image, canonical, og:url, sitemap <loc>, the robots.txt
 * "Sitemap:" line, and Schema.org @id / url / logo.
 *
 * PRODUCTION MUST set NEXT_PUBLIC_SITE_URL to the host that actually serves the
 * deployment (e.g. "https://krastysoft.com" or "https://www.krastysoft.com").
 * The fallback below is only for local dev. A missing env var in a production
 * build logs a warning (see next.config.ts) because the baked-in absolute URLs
 * — notably og:image, which social crawlers fetch directly — would point at a
 * host that may not serve the deployment.
 *
 * IMPORTANT: this must be the host that SERVES the deployment, not a host that
 * 301-redirects to another host. og:image is an absolute URL baked at build
 * time, and social crawlers (Facebook, LinkedIn, Twitter) do not reliably
 * follow redirects to fetch images. Pick exactly one canonical host and point
 * only that one at the deployment; 301-redirect the other to it.
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.krastysoft.com";
