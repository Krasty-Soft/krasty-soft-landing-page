#!/usr/bin/env python3
"""
E2E verification of all SEO audit fixes.
Checks live HTML output against audit requirements.
"""

import json
import re
import subprocess
import sys
from urllib.parse import urljoin

BASE = "http://localhost:3000"
PASS = "\033[92m✓ PASS\033[0m"
FAIL = "\033[91m✗ FAIL\033[0m"
WARN = "\033[93m⚠ WARN\033[0m"

results = {"pass": 0, "fail": 0, "warn": 0}


def curl(path):
    try:
        r = subprocess.run(
            ["curl", "-s", f"{BASE}{path}"], capture_output=True, text=True, timeout=15
        )
        return r.stdout
    except Exception as e:
        return ""


def curl_status(path):
    try:
        r = subprocess.run(
            [
                "curl",
                "-s",
                "-o",
                "/dev/null",
                "-w",
                "%{http_code}|%{content_type}|%{size_download}",
                f"{BASE}{path}",
            ],
            capture_output=True,
            text=True,
            timeout=15,
        )
        return r.stdout.strip()
    except Exception:
        return "000||0"


def check(name, condition, detail=""):
    if condition:
        print(f"  {PASS} {name}" + (f" — {detail}" if detail else ""))
        results["pass"] += 1
    else:
        print(f"  {FAIL} {name}" + (f" — {detail}" if detail else ""))
        results["fail"] += 1


def warn(name, detail=""):
    print(f"  {WARN} {name}" + (f" — {detail}" if detail else ""))
    results["warn"] += 1


def extract_jsonld(html):
    """Extract all JSON-LD blocks and return list of parsed objects"""
    blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL
    )
    all_objs = []
    for block in blocks:
        try:
            data = json.loads(block)
            if isinstance(data, list):
                all_objs.extend(data)
            else:
                all_objs.append(data)
        except json.JSONDecodeError:
            pass
    return all_objs


def _collect_types(obj, types):
    """Recursively collect all @type values from nested objects."""
    if isinstance(obj, dict):
        t = obj.get("@type", "")
        if isinstance(t, list):
            types.update(t)
        elif t:
            types.add(t)
        for v in obj.values():
            _collect_types(v, types)
    elif isinstance(obj, list):
        for item in obj:
            _collect_types(item, types)


def get_schema_types(html):
    objs = extract_jsonld(html)
    types = set()
    for obj in objs:
        _collect_types(obj, types)
    return types


def get_meta(html, prop):
    m = re.search(rf'<meta property="{prop}" content="([^"]*)"', html)
    return m.group(1) if m else None


def get_meta_name(html, name):
    m = re.search(rf'<meta name="{name}" content="([^"]*)"', html)
    return m.group(1) if m else None


def get_canonical(html):
    m = re.search(r'<link rel="canonical" href="([^"]*)"', html)
    return m.group(1) if m else None


def get_heading_tags(html):
    """Return dict of tag -> count for h1-h6"""
    counts = {}
    for level in range(1, 7):
        counts[f"h{level}"] = len(re.findall(rf"<h{level}[ >]", html))
    return counts


def detect_host():
    """Detect the canonical host the build is emitting, by reading the homepage
    canonical tag. Makes the suite host-agnostic so it works whether the build
    uses apex or www (driven by NEXT_PUBLIC_SITE_URL)."""
    html = curl("/")
    canonical = get_canonical(html)
    if canonical:
        m = re.match(r"(https?://[^/]+)", canonical)
        if m:
            return m.group(1)
    # Fall back to og:url if canonical is missing for some reason.
    og_url = get_meta(html, "og:url")
    if og_url:
        m = re.match(r"(https?://[^/]+)", og_url)
        if m:
            return m.group(1)
    raise RuntimeError("Could not detect canonical host from live server")


print("=" * 70)
print("  SEO AUDIT E2E VERIFICATION")
print("=" * 70)

HOST = detect_host()
print(f"  Detected canonical host: {HOST}")
print("=" * 70)

# ============================================================
print("\n■ ITEM 1: robots.txt")
# ============================================================
robots = curl("/robots.txt")
check("robots.txt exists", "User-Agent" in robots)
check("robots.txt allows all", "Allow: /" in robots)
check("robots.txt disallows /api/", "Disallow: /api/" in robots)
check("robots.txt disallows /*utm_", "Disallow: /*utm_" in robots)
check("robots.txt disallows /*fbclid=", "Disallow: /*fbclid=" in robots)
check("robots.txt disallows /*gclid=", "Disallow: /*gclid=" in robots)
check("robots.txt disallows /search", "Disallow: /search" in robots)
check("robots.txt disallows /og-preview", "Disallow: /og-preview" in robots)
check(
    "robots.txt references sitemap",
    f"Sitemap: {HOST}/sitemap.xml" in robots,
)

# ============================================================
print("\n■ ITEM 3: Sitemap")
# ============================================================
sitemap_xml = curl("/sitemap.xml")
sitemap_urls = re.findall(r"<loc>(.*?)</loc>", sitemap_xml)
sitemap_lastmods = re.findall(r"<lastmod>(.*?)</lastmod>", sitemap_xml)

check("sitemap.xml exists", len(sitemap_xml) > 0)
check("sitemap has URLs", len(sitemap_urls) > 0, f"{len(sitemap_urls)} URLs")
check("sitemap URLs are HTTPS", all(u.startswith("https://") for u in sitemap_urls))
check(
    "sitemap does NOT include /og-preview",
    not any("/og-preview" in u for u in sitemap_urls),
)
check("sitemap does NOT include /api/", not any("/api/" in u for u in sitemap_urls))

# Check lastmod dates are not all "today" (i.e., not all the same as build time)
check("sitemap has lastmod dates", len(sitemap_lastmods) > 0)
# Static pages should have fixed date, dynamic should have real dates
# 11 static pages currently (home, about, careers, case-studies, fintech,
# healthcare, custom-software-development, react, python, node, blog)
static_lastmods = sitemap_lastmods[:11]
dynamic_lastmods = sitemap_lastmods[11:]
check(
    "static pages have fixed lastmod",
    len(set(static_lastmods)) <= 2,
    "not all build-time",
)

# Verify key pages are in sitemap
expected_pages = [
    "/about",
    "/case-studies",
    "/blog",
    "/fintech",
    "/healthcare",
    "/custom-software-development",
    "/react",
    "/python",
    "/node",
]
for page in expected_pages:
    check(f"sitemap includes {page}", any(page in u for u in sitemap_urls))

# Verify removed pages are NOT in sitemap (sheet 3)
removed_from_sitemap = [
    "/retool",
    "/retool-development",
    "/retool-consulting",
    "/insurance",
    "/maritime-transportation",
    "/careers/senior-rabbit-hugger",
    "/case-studies/aims-international-ai-driven-recruitment-platform",
    "/case-studies/crypto-arbitrage-automation-tool",
    "/case-studies/warehouse-logistics-efficiency-dashboard",
    "/case-studies/procurement-inventory-planning-tool",
    "/case-studies/ai-powered-activity-management-platform",
    "/case-studies/admin-panel-for-wine-collectors-software",
    "/case-studies/customer-support-dashboard-for-e-com",
    "/case-studies/unified-orders-inventory-management-system",
    "/case-studies/ai-powered-investments-platform",
]
for page in removed_from_sitemap:
    full_url = f"{HOST}{page}"
    check(
        f"sitemap excludes removed {page}",
        full_url not in sitemap_urls,
    )

# ============================================================
print("\n■ ITEM 2: 301 redirects (SEO team ODS — sheets 1 & 3)")
# ============================================================
# Sheet 1: legacy URLs that should 301 to their new homes
sheet1_redirects = [
    ("/loyalty-app-case-study", "/case-studies"),
    ("/payment-project-case-study", "/case-studies"),
    ("/crypto-trading-bot-case-study", "/case-studies"),
    ("/retail-project-case-study", "/case-studies"),
    ("/booking-app-case-study", "/case-studies"),
    ("/request-a-demo", "/"),
    ("/old-home-2", "/"),
    ("/blog/medlearn-pro-transforming-healthcare-training-with-ai", "/blog"),
    ("/blog/krasty-soft-boosts-order-processing-by-60", "/blog"),
    ("/blog/costcare-pro-revolutionizing-healthcare-training-on-a-budget", "/blog"),
]
for source, dest in sheet1_redirects:
    r = curl_status(source)
    code = r.split("|")[0]
    check(f"sheet1 {source} 301s", code == "301", f"got {code}")
    if code == "301":
        full = subprocess.run(
            [
                "curl",
                "-s",
                "-o",
                "/dev/null",
                "-w",
                "%{redirect_url}",
                f"{BASE}{source}",
            ],
            capture_output=True,
            text=True,
            timeout=15,
        ).stdout.strip()
        check(f"sheet1 {source} -> {dest}", full.endswith(dest), f"got {full}")

# Sheet 3: removed-from-sitemap URLs that should 301
sheet3_redirects = [
    ("/retool", "/"),
    ("/retool-development", "/"),
    ("/retool-consulting", "/"),
    ("/insurance", "/"),
    ("/maritime-transportation", "/"),
    ("/careers/senior-rabbit-hugger", "/careers"),
    (
        "/case-studies/aims-international-ai-driven-recruitment-platform",
        "/case-studies",
    ),
    ("/case-studies/crypto-arbitrage-automation-tool", "/case-studies"),
    ("/case-studies/warehouse-logistics-efficiency-dashboard", "/case-studies"),
    ("/case-studies/procurement-inventory-planning-tool", "/case-studies"),
    ("/case-studies/ai-powered-activity-management-platform", "/case-studies"),
    ("/case-studies/admin-panel-for-wine-collectors-software", "/case-studies"),
    ("/case-studies/customer-support-dashboard-for-e-com", "/case-studies"),
    ("/case-studies/unified-orders-inventory-management-system", "/case-studies"),
    ("/case-studies/ai-powered-investments-platform", "/case-studies"),
]
for source, dest in sheet3_redirects:
    r = curl_status(source)
    code = r.split("|")[0]
    check(f"sheet3 {source} 301s", code == "301", f"got {code}")

# ============================================================
print("\n■ NEW PAGES: placeholder pages must be noindex + correct canonical")
# ============================================================
new_pages = ["/ai-automation", "/ai-development", "/e-commerce", "/saas"]
for page in new_pages:
    html = curl(page)
    robots = get_meta_name(html, "robots")
    check(f"{page} is noindex", robots and "noindex" in robots, f"robots={robots}")
    canonical = get_canonical(html)
    check(
        f"{page} canonical is own URL",
        canonical == f"{HOST}{page}",
        f"got {canonical}",
    )
    # noindex pages should NOT be in the sitemap
    check(
        f"{page} not in sitemap",
        f"{HOST}{page}" not in sitemap_urls,
    )

# ============================================================
print("\n■ ITEM 4: Test blog posts hidden")
# ============================================================
test_slugs = [
    "transforming-healthcare-software-development-with-retool",
    "cost-care-pro-revolutionizing-healthcare-training-on-a-budget",
    "end-inventory-headache-with-krasty-soft",
    "med-learn-pro-transforming-healthcare",
    "dark-mode-vs-light-mode-which-one-improves-user-experience",
    "the-importance-of-multi-factor-authentication-in-cybersecurity",
]
for slug in test_slugs:
    html = curl(f"/blog/{slug}")
    status = curl_status(f"/blog/{slug}")
    # Should 404 (data removed) OR have noindex
    is_404 = "404" in html or status.startswith("404")
    has_noindex = "noindex" in html
    check(
        f"/blog/{slug} hidden",
        is_404 or has_noindex,
        f"404={is_404}, noindex={has_noindex}",
    )

# Verify test slugs are NOT in sitemap
for slug in test_slugs:
    in_sitemap = any(slug in u for u in sitemap_urls)
    check(f"/blog/{slug} NOT in sitemap", not in_sitemap)

# ============================================================
print("\n■ ITEM 5: No H2/H3 in navigation menu")
# ============================================================
# The mobile menu is rendered in the HTML (always in DOM for SEO)
# Check that the specific nav labels are not in heading tags
# We check the homepage HTML for the mobile menu
homepage = curl("/")
# The mobile menu "Menu", "Services", "Industries" labels should not be in h2/h3
# Since they're now <div>, we verify by checking the menu structure
# A simpler check: ensure the mobile menu section doesn't have h2/h3 that match nav labels

# Check that the header/mobile-menu doesn't output h2 for "Menu"
# The mobile menu is always in DOM. Let's check for h2/h3 near menu items
# Actually, let's check specific component output by looking for the menu pattern
h2_count = homepage.count("<h2")
h3_count = homepage.count("<h3")
warn("Homepage h2 count", f"{h2_count} h2 tags (verify none are nav labels)")
warn("Homepage h3 count", f"{h3_count} h3 tags (verify none are nav labels)")

# More specific: check that "Menu" is not inside an h2
# The mobile menu renders "Menu" as a div now
menu_in_h2 = bool(re.search(r"<h2[^>]*>[^<]*Menu", homepage))
check('"Menu" not in <h2>', not menu_in_h2)

# ============================================================
print("\n■ ITEM 6: Heading structure (H1 → H2 hierarchy)")
# ============================================================
pages_to_check_headings = [
    "/",
    "/about",
    "/custom-software-development",
    "/fintech",
    "/healthcare",
    "/react",
    "/python",
    "/node",
    "/case-studies",
    "/blog",
]
for page in pages_to_check_headings:
    html = curl(page)
    headings = get_heading_tags(html)
    h1 = headings["h1"]
    # Every page should have exactly 1 H1
    check(f"{page} has exactly 1 H1", h1 == 1, f"found {h1}")

# Check service pages don't have excessive H3 from UI components
csd_html = curl("/custom-software-development")
csd_headings = get_heading_tags(csd_html)
check(
    "/custom-software-development H3 count reasonable",
    csd_headings["h3"] <= 3,
    f"h3={csd_headings['h3']} (was much higher before fix)",
)

# ============================================================
print("\n■ ITEM 7: Schema.org structured data")
# ============================================================

# About page: AboutPage + Person + BreadcrumbList
about_html = curl("/about")
about_types = get_schema_types(about_html)
check("/about has AboutPage", "AboutPage" in about_types)
check("/about has Person", "Person" in about_types)
check("/about has BreadcrumbList", "BreadcrumbList" in about_types)
# Verify Person entries have team member data
about_objs = extract_jsonld(about_html)
person_count = sum(
    1
    for obj in about_objs
    if obj.get("@type") == "AboutPage"
    for emp in obj.get("mainEntity", {}).get("employee", [])
    if emp.get("@type") == "Person"
)
check("/about has 4 Person entries", person_count == 4, f"found {person_count}")

# Service pages: Service + BreadcrumbList
service_pages = ["/custom-software-development"]
for page in service_pages:
    html = curl(page)
    types = get_schema_types(html)
    check(f"{page} has Service", "Service" in types)
    check(f"{page} has BreadcrumbList", "BreadcrumbList" in types)

# Industry pages: Service + BreadcrumbList
industry_pages = ["/fintech", "/healthcare"]
for page in industry_pages:
    html = curl(page)
    types = get_schema_types(html)
    check(f"{page} has Service", "Service" in types)
    check(f"{page} has BreadcrumbList", "BreadcrumbList" in types)

# Technology pages: Service + BreadcrumbList
tech_pages = ["/react", "/python", "/node"]
for page in tech_pages:
    html = curl(page)
    types = get_schema_types(html)
    check(f"{page} has Service", "Service" in types)
    check(f"{page} has BreadcrumbList", "BreadcrumbList" in types)

# Case study detail: Article + SoftwareApplication + BreadcrumbList
case_html = curl("/case-studies/crm-system-with-unified-communications")
case_types = get_schema_types(case_html)
check("/case-studies/[slug] has Article", "Article" in case_types)
check(
    "/case-studies/[slug] has SoftwareApplication", "SoftwareApplication" in case_types
)
check("/case-studies/[slug] has BreadcrumbList", "BreadcrumbList" in case_types)

# Blog post: check if any exist (Contentful may be empty)
# Blog listing: BreadcrumbList
blog_html = curl("/blog")
blog_types = get_schema_types(blog_html)
check("/blog has BreadcrumbList", "BreadcrumbList" in blog_types)

# Case studies listing: BreadcrumbList
cs_html = curl("/case-studies")
cs_types = get_schema_types(cs_html)
check("/case-studies has BreadcrumbList", "BreadcrumbList" in cs_types)

# Homepage: Organization + AggregateRating
home_html = curl("/")
home_types = get_schema_types(home_html)
check("/ has Organization", "Organization" in home_types)
check(
    "/ has AggregateRating",
    any("AggregateRating" in str(obj) for obj in extract_jsonld(home_html)),
)

# Verify all inner pages have BreadcrumbList
all_inner = [
    "/about",
    "/case-studies",
    "/blog",
    "/fintech",
    "/healthcare",
    "/custom-software-development",
    "/react",
    "/python",
    "/node",
]
missing_breadcrumb = []
for page in all_inner:
    html = curl(page)
    types = get_schema_types(html)
    if "BreadcrumbList" not in types:
        missing_breadcrumb.append(page)
check(
    "All inner pages have BreadcrumbList",
    len(missing_breadcrumb) == 0,
    f"missing: {missing_breadcrumb}" if missing_breadcrumb else "",
)

# ============================================================
print("\n■ ITEM 8: OG image")
# ============================================================
og_status = curl_status("/og-image.png")
check("/og-image.png returns 200", og_status.startswith("200"))
check("/og-image.png is image/png", "image/png" in og_status)
check(
    "/og-image.png has content",
    int(og_status.split("|")[2]) > 1000 if og_status.split("|")[2].isdigit() else False,
)

# Check OG meta tags on all key pages
og_pages = [
    "/",
    "/about",
    "/fintech",
    "/custom-software-development",
    "/blog",
    "/case-studies",
    "/healthcare",
    "/react",
    "/python",
    "/node",
]
for page in og_pages:
    html = curl(page)
    og_image = get_meta(html, "og:image")
    check(f"{page} has og:image", og_image is not None)
    if og_image:
        check(
            f"{page} og:image points to /og-image.png",
            "/og-image.png" in og_image,
            og_image,
        )
    # Also check twitter:image
    tw_image = get_meta_name(html, "twitter:image")
    check(f"{page} has twitter:image", tw_image is not None)

# Verify old /opengraph-image route is gone
old_og_status = curl_status("/opengraph-image")
check(
    "/opengraph-image route removed",
    old_og_status.startswith("404"),
    f"status={old_og_status}",
)

# ============================================================
print("\n■ ADDITIONAL: Canonical tags on all pages")
# ============================================================
canonical_pages = [
    "/",
    "/about",
    "/case-studies",
    "/blog",
    "/fintech",
    "/healthcare",
    "/custom-software-development",
    "/react",
    "/python",
    "/node",
]
for page in canonical_pages:
    html = curl(page)
    canonical = get_canonical(html)
    check(f"{page} has canonical", canonical is not None)
    if canonical:
        expected = f"{HOST}{page}" if page != "/" else f"{HOST}/"
        check(f"{page} canonical correct", canonical == expected, f"got {canonical}")

# ============================================================
print("\n■ ADDITIONAL: og-preview noindex")
# ============================================================
og_preview_html = curl("/og-preview")
og_preview_robots = get_meta_name(og_preview_html, "robots")
check(
    "/og-preview has noindex",
    og_preview_robots and "noindex" in og_preview_robots,
    f"robots={og_preview_robots}",
)

# ============================================================
# SUMMARY
# ============================================================
print("\n" + "=" * 70)
print(
    f"  RESULTS: {results['pass']} passed, {results['fail']} failed, {results['warn']} warnings"
)
print("=" * 70)

sys.exit(0 if results["fail"] == 0 else 1)
