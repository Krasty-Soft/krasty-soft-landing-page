import { BASE_URL } from "@/lib/site-url";
import { TECH_DETAILS } from "@/lib/techs";
import { COMPANY_FAQ, SERVICE_FAQ } from "@/lib/faq";
import { getAllCases } from "@/lib/cases";

// Regenerate at most hourly so new case studies flow in automatically.
export const revalidate = 3600;

const strip = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export async function GET() {
  const cases = await getAllCases().catch(() => []);
  const out: string[] = [];

  out.push("# Krasty Soft — full site content for LLMs");
  out.push("");
  out.push(
    `> Krasty Soft is a B2B software development company that builds custom software, AI products, and web and backend systems for fintech, healthcare, e-commerce, and SaaS businesses. This file concatenates the core content of the site so language models can ingest it in one request. Canonical site: ${BASE_URL}`,
  );
  out.push("");

  out.push("## Frequently asked questions");
  out.push("");
  for (const f of COMPANY_FAQ) {
    out.push(`### ${f.question}`);
    out.push(f.answer);
    out.push("");
  }

  out.push("## Services & technologies");
  out.push("");
  for (const t of TECH_DETAILS) {
    out.push(`### ${t.title}`);
    out.push(`URL: ${BASE_URL}/${t.slug}`);
    out.push("");
    for (const p of t.introParagraphs) out.push(strip(p));
    out.push("");
    out.push(`${t.whatWeBuild.title}:`);
    for (const item of t.whatWeBuild.items) out.push(`- ${strip(item)}`);
    out.push("");
    out.push(`${t.whyChoose.title}:`);
    for (const p of t.whyChoose.paragraphs) out.push(strip(p));
    out.push("");
    out.push(`${t.industries.title}: ${t.industries.list.join(", ")}`);
    out.push("");
    const faqs = SERVICE_FAQ[t.slug];
    if (faqs?.length) {
      out.push("FAQ:");
      for (const f of faqs) {
        out.push(`- Q: ${f.question}`);
        out.push(`  A: ${f.answer}`);
      }
      out.push("");
    }
  }

  if (cases.length) {
    out.push("## Case studies");
    out.push("");
    for (const c of cases) {
      out.push(`### ${c.title}`);
      out.push(`URL: ${BASE_URL}/case-studies/${c.slug}`);
      if (c.cardDescription) out.push(strip(c.cardDescription));
      out.push("");
    }
  }

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
