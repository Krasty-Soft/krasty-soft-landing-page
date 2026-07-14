import { NextRequest, NextResponse } from "next/server";
import { REDIRECTS } from "@/constants/redirects";

// Canonical production host. Every other host (apex `krastysoft.com`,
// `krasty.me`, the raw `*.vercel.app` production URL) is folded into this one
// in a SINGLE hop — no intermediate redirects.
const CANONICAL_HOST = "www.krastysoft.com";

// Pathname -> destination lookup for legacy URL redirects. Built once at module
// load. REDIRECTS is intentionally dependency-free, so it is safe to import
// into the edge runtime.
const PATH_REDIRECTS = new Map(REDIRECTS.map((r) => [r.source, r.destination]));

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();

  // Only canonicalize the host on the real production deployment. Preview
  // deployments are also served on *.vercel.app and must keep serving so they
  // can be tested — never bounce them to production.
  const isProduction = process.env.VERCEL_ENV === "production";
  const hostNeedsFix = isProduction && host !== CANONICAL_HOST;

  const pathDest = PATH_REDIRECTS.get(pathname);

  // Nothing to canonicalize — let the request through untouched.
  if (!hostNeedsFix && !pathDest) {
    return NextResponse.next();
  }

  // Compose host + path corrections into ONE destination string so the original
  // URL lands on its final canonical address in exactly one hop. Build it
  // explicitly (rather than mutating NextURL, whose host setter is unreliable
  // when the pathname is also changed) so the redirect is fully deterministic.
  const targetHost = hostNeedsFix || !host ? CANONICAL_HOST : host;
  const targetPath = pathDest ?? pathname;
  // Legacy redirects go to a clean canonical path; only carry the query string
  // through for pure host/protocol canonicalization.
  const qs = pathDest ? "" : search;

  return NextResponse.redirect(`https://${targetHost}${targetPath}${qs}`, 301);
}

export const config = {
  // Run on page routes only. Skip Next internals, API routes, and anything that
  // looks like a static file (a dot in the path), e.g. /sitemap.xml, /robots.txt.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
