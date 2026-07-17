import { BASE_URL } from "@/lib/site-url";
import PAGES from "@/lib/navigation";
import { getAllCases } from "@/lib/cases";
import { getAllPosts } from "@/lib/posts";

// Regenerate at most hourly (matches the site's ISR cadence) so new case
// studies and posts flow into the file automatically.
export const revalidate = 3600;

type NavItem = { slug: string; label: string; description?: string };

// Concise, LLM-oriented one-liners for the service & industry pages. Kept here
// so the summary stays crisp and stable regardless of on-page marketing copy.
const DESCRIPTIONS: Record<string, string> = {
  "ai-development":
    "Production AI — agents, LLM integrations, RAG, and copilots wired into your products with guardrails and evaluation.",
  "ai-automation":
    "AI-driven automation of repetitive workflows — document processing, data pipelines, and intelligent process automation.",
  "custom-software-development":
    "End-to-end custom software — MVPs, legacy modernization, and bespoke platforms built to your business needs.",
  "backend-development":
    "Robust, scalable APIs and backends — database architecture, serverless, authentication, and security.",
  "frontend-development":
    "Responsive, high-performance web apps — UI/UX implementation, performance optimization, and cross-platform builds.",
  fintech:
    "Secure, compliant software for financial products — payments, trading platforms, and financial data systems.",
  healthcare:
    "Healthcare software with a compliance-first mindset — patient platforms, clinical tools, and care coordination.",
  "e-commerce":
    "Conversion-focused e-commerce — storefronts, analytics dashboards, and back-office automation.",
  saas: "End-to-end SaaS product development — multi-tenant architecture, billing, and admin dashboards.",
};

const stripHtml = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const clip = (s: string, n = 160) =>
  s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;

const toUrl = (path: string) => (path ? `${BASE_URL}/${path}` : BASE_URL);
const link = (path: string, label: string, desc?: string) =>
  desc ? `- [${label}](${toUrl(path)}): ${desc}` : `- [${label}](${toUrl(path)})`;

const asArray = (v: unknown): NavItem[] => (Array.isArray(v) ? (v as NavItem[]) : []);

export async function GET() {
  const [cases, posts] = await Promise.all([
    getAllCases().catch(() => []),
    getAllPosts().catch(() => []),
  ]);

  const out: string[] = [];

  out.push("# Krasty Soft");
  out.push("");
  out.push(
    "> Krasty Soft is a B2B software development company that builds custom software, AI products, and web and backend systems for fintech, healthcare, e-commerce, and SaaS businesses. Core services span AI development, AI automation, custom software development, and backend and frontend engineering. The team works with startups and enterprises worldwide and is rated on Clutch. The links below point to the canonical pages for each service, industry, technology, and case study.",
  );
  out.push("");

  out.push("## Services");
  for (const s of asArray(PAGES.services))
    out.push(link(s.slug, s.label, DESCRIPTIONS[s.slug]));
  out.push("");

  out.push("## Industries");
  for (const i of asArray(PAGES.industries))
    out.push(link(i.slug, i.label, DESCRIPTIONS[i.slug]));
  out.push("");

  out.push("## Technologies");
  for (const t of asArray(PAGES.technologies))
    out.push(link(t.slug, t.label, t.description || DESCRIPTIONS[t.slug]));
  out.push("");

  if (cases.length) {
    out.push("## Case studies");
    for (const c of cases)
      out.push(
        link(
          `case-studies/${c.slug}`,
          c.title,
          c.cardDescription ? clip(stripHtml(c.cardDescription)) : undefined,
        ),
      );
    out.push("");
  }

  if (posts.length) {
    out.push("## Blog");
    for (const p of posts) out.push(link(`blog/${p.slug}`, p.title));
    out.push("");
  }

  out.push("## Company");
  out.push(
    link("about", "About Krasty Soft", "Company overview, team, and engineering approach."),
  );
  out.push(link("case-studies", "Case Studies", "Portfolio of delivered client projects."));
  out.push(link("blog", "Blog", "Engineering articles and insights."));
  out.push(link("careers", "Careers", "Open engineering positions."));
  out.push(`- [Contact](${BASE_URL}/#contacts): Start a project or book a call.`);
  out.push("");

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
