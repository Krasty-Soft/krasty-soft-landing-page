// Template for the audit service pages. Server-rendered, so every word of the
// SEO-approved copy (including FAQ answers) is in the HTML. The page is built
// from content.json section by section: each H2 starts a section, and a few
// section shapes get their own visual treatment (process steps, benefits,
// sub-service cards, CTA banner, FAQ).
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  FileSearch,
  Gauge,
  ListChecks,
  Lock,
  ShieldCheck,
  TrendingDown,
  Users,
} from "lucide-react";
import { Section, TypingText, CTABanner } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import {
  AUDIT_PAGES,
  type AuditBlock,
  type AuditPage,
} from "@/lib/audit-pages";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
  StructuredData,
} from "@/lib/seo";
import { ScrollToContactsButton } from "./scroll-to-contacts";

type TextBlock = Extract<AuditBlock, { text: string }>;
type ListBlock = Extract<AuditBlock, { items: string[] }>;
type Group = { heading: string; blocks: AuditBlock[] };

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

const plainText = (s: string) => s.replace(LINK_RE, "$1");

/** Renders inline [text](url) links; site links use next/link. */
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const cls =
      "underline underline-offset-4 decoration-1 transition-opacity hover:opacity-80";
    const style = { color: "var(--brand-red)" };
    out.push(
      href.startsWith("/") ? (
        <Link key={at} href={href} className={cls} style={style}>
          {label}
        </Link>
      ) : (
        <a
          key={at}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          style={style}
        >
          {label}
        </a>
      ),
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** "Scope. We agree on…" → ["Scope", "We agree on…"]; long first sentences stay whole. */
function splitLead(item: string): [string | null, string] {
  const m = item.match(/^([^.:[\]]{1,40})\. (.+)$/);
  return m ? [m[1], m[2]] : [null, item];
}

const isNote = (b: AuditBlock, needle: string) =>
  b.type === "note" && (b as TextBlock).text.includes(needle);

function groupSections(blocks: AuditBlock[]) {
  const intro: AuditBlock[] = [];
  const groups: Group[] = [];
  for (const b of blocks) {
    if (b.type === "h1") continue;
    if (b.type === "h2") groups.push({ heading: b.text, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(b);
    else intro.push(b);
  }
  return { intro, groups };
}

/* ---------- shared typography ---------- */

const bodyText = {
  fontSize: "1.0625rem",
  lineHeight: 1.8,
  color: "var(--text-secondary)",
} as const;

function SectionHeading({ text }: { text: string }) {
  return (
    <h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-12"
      style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
    >
      <span style={{ color: "var(--brand-red)" }}>&gt; </span>
      <TypingText text={text} speed={40} delay={300} />
    </h2>
  );
}

function H3({ text }: { text: string }) {
  return (
    <h3
      className="text-xl md:text-2xl font-semibold mt-10 mb-4 first:mt-0"
      style={{ color: "var(--text-primary)", lineHeight: 1.35 }}
    >
      {text}
    </h3>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="mb-5 last:mb-0" style={bodyText}>
      <Inline text={text} />
    </p>
  );
}

function List({ block }: { block: ListBlock }) {
  const Tag = block.type;
  return (
    <Tag
      className={`mb-6 last:mb-0 pl-6 space-y-2 ${
        Tag === "ol" ? "list-decimal" : "list-disc"
      } marker:text-[var(--brand-red)]`}
      style={bodyText}
    >
      {block.items.map((item, i) => (
        <li key={i} className="pl-1">
          <Inline text={item} />
        </li>
      ))}
    </Tag>
  );
}

/* ---------- infographics ---------- */

function ProcessSteps({ items }: { items: string[] }) {
  return (
    <ol
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8 list-none p-0"
      aria-label="Audit process"
    >
      {items.map((item, i) => {
        const [lead, rest] = splitLead(item);
        return (
          <li
            key={i}
            className="relative p-6"
            style={{
              backgroundColor: "var(--surface-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: "var(--brand-red)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {lead && (
                <span
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {lead}
                </span>
              )}
            </div>
            <p style={{ ...bodyText, fontSize: "0.9875rem", lineHeight: 1.7 }}>
              <Inline text={rest} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

const BENEFIT_ICONS = [
  ShieldCheck,
  Lock,
  TrendingDown,
  Gauge,
  BadgeCheck,
  ListChecks,
  Users,
  FileSearch,
];

function Benefits({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8 list-none p-0">
      {items.map((item, i) => {
        const [lead, rest] = splitLead(item);
        const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
        return (
          <li
            key={i}
            className="p-6"
            style={{
              backgroundColor: "var(--surface-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <Icon
              size={28}
              className="mb-4"
              style={{ color: "var(--brand-red)" }}
              aria-hidden
            />
            {lead && (
              <div
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {lead}
              </div>
            )}
            <p style={{ ...bodyText, fontSize: "0.9875rem", lineHeight: 1.7 }}>
              <Inline text={rest} />
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- section renderers ---------- */

function ProseBlocks({
  blocks,
  infographicLists,
}: {
  blocks: AuditBlock[];
  infographicLists?: "steps" | "benefits";
}) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "note") return null;
        if (b.type === "h3") return <H3 key={i} text={b.text} />;
        if (b.type === "p") return <Paragraph key={i} text={b.text} />;
        if (b.type === "ol" && infographicLists === "steps")
          return <ProcessSteps key={i} items={b.items} />;
        if (b.type === "ul" && infographicLists === "benefits")
          return <Benefits key={i} items={b.items} />;
        if (b.type === "ul" || b.type === "ol") return <List key={i} block={b} />;
        return null;
      })}
    </>
  );
}

/** Splits a section into H3 subsections. */
function subsections(blocks: AuditBlock[]) {
  const subs: { title: string; blocks: AuditBlock[] }[] = [];
  for (const b of blocks) {
    if (b.type === "h3") subs.push({ title: b.text, blocks: [] });
    else if (subs.length) subs[subs.length - 1].blocks.push(b);
  }
  return subs;
}

/** Two cards leading to the sub-service pages (asked for by the SEO team). */
function SubServiceCards({
  blocks,
  subPages,
}: {
  blocks: AuditBlock[];
  subPages: AuditPage[];
}) {
  const lead = blocks.slice(
    0,
    blocks.findIndex((b) => b.type === "h3"),
  );
  return (
    <>
      <ProseBlocks blocks={lead} />
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {subsections(blocks).map((sub, i) => {
          const child = subPages.find((c) =>
            sub.blocks.some(
              (b) => "text" in b && b.text.includes(`](${c.path})`),
            ),
          );
          return (
            <div
              key={i}
              className="flex flex-col p-6 md:p-8"
              style={{
                backgroundColor: "var(--surface-primary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-4"
                style={{ color: "var(--text-primary)", lineHeight: 1.35 }}
              >
                {sub.title}
              </h3>
              <div className="flex-1">
                <ProseBlocks blocks={sub.blocks} />
              </div>
              {child && (
                <Link
                  href={child.path}
                  className="mt-6 inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
                  style={{ color: "var(--brand-red)" }}
                  aria-label={`Learn more: ${child.label}`}
                >
                  Learn more <ArrowRight size={18} aria-hidden />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function FaqList({ blocks }: { blocks: AuditBlock[] }) {
  const lead = blocks.slice(
    0,
    blocks.findIndex((b) => b.type === "h3"),
  );
  return (
    <>
      <ProseBlocks blocks={lead} />
      <div className="mt-6">
        {subsections(blocks).map((q, i) => (
          // <details> keeps every answer in the HTML (search engines and the
          // SEO team's character count see it) while still collapsing.
          <details
            key={i}
            open={i === 0}
            className="group"
            style={{ borderBottom: "1px solid var(--border-default)" }}
          >
            <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3
                className="text-lg md:text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {q.title}
              </h3>
              <span
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 transition-transform group-open:rotate-180"
                style={{
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--surface-elevated)",
                }}
                aria-hidden
              >
                <ChevronDown size={18} style={{ color: "var(--brand-red)" }} />
              </span>
            </summary>
            <div className="pb-6 md:pr-12">
              <ProseBlocks blocks={q.blocks} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

function CtaSection({ group }: { group: Group }) {
  const note = group.blocks.find((b) => isNote(b, "Button")) as TextBlock;
  const label = note.text.match(/\[Button: ([^\]]+)\]/)?.[1] ?? "Get in Touch";
  return (
    <CTABanner>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        style={{ color: "white" }}
      >
        {group.heading}
      </h2>
      {group.blocks
        .filter((b): b is TextBlock => b.type === "p")
        .map((b, i) => (
          <p
            key={i}
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "var(--max-width)",
              margin: "0 auto 2rem",
            }}
          >
            {plainText(b.text)}
          </p>
        ))}
      <ScrollToContactsButton label={label} />
    </CTABanner>
  );
}

/* ---------- page ---------- */

export function AuditPageTemplate({ page }: { page: AuditPage }) {
  const { intro, groups } = groupSections(page.blocks);
  const h1 = (page.blocks.find((b) => b.type === "h1") as TextBlock).text;
  const parent = page.parent
    ? AUDIT_PAGES.find((p) => p.path === page.parent)
    : undefined;
  const children = AUDIT_PAGES.filter((p) => p.parent === page.path);

  const faqGroup = groups.find((g) => g.heading.startsWith("FAQ"));
  const faqs = faqGroup
    ? subsections(faqGroup.blocks).map((q) => ({
        question: q.title,
        answer: q.blocks
          .filter((b): b is TextBlock => b.type === "p")
          .map((b) => plainText(b.text))
          .join(" "),
      }))
    : [];

  const crumbs = [
    { name: "Home", path: "/" },
    ...(parent ? [{ name: parent.label, path: parent.path }] : []),
    { name: page.label, path: page.path },
  ];

  let variantIndex = 0;
  const nextVariant = () =>
    variantIndex++ % 2 === 0 ? ("secondary" as const) : ("primary" as const);

  return (
    <>
      <StructuredData
        data={[
          generateBreadcrumbSchema(crumbs),
          generateServiceSchema({
            name: page.serviceName,
            description: page.description,
          }),
          ...(faqs.length ? [generateFAQSchema(faqs)] : []),
        ]}
      />

      {/* Hero: H1 and the intro paragraphs */}
      <Section variant="primary" animate={false}>
        <SectionWrapper>
          <div style={{ width: "100%", maxWidth: "var(--max-width)" }}>
            {parent && (
              <nav
                aria-label="Breadcrumb"
                className="mb-6 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Link
                  href={parent.path}
                  className="transition-opacity hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {parent.label}
                </Link>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <span aria-current="page">{page.label}</span>
              </nav>
            )}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 md:mb-16"
              style={{ color: "var(--text-primary)", lineHeight: 1.2 }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText text={h1} speed={50} delay={300} />
            </h1>
            <div style={{ fontSize: "1.125rem" }}>
              <ProseBlocks blocks={intro} />
            </div>
          </div>
        </SectionWrapper>
      </Section>

      {groups.map((group, i) => {
        // The contact form section is the site footer (#contacts), which
        // already carries the "Get in touch for expert support" heading.
        if (group.blocks.some((b) => isNote(b, "Форма"))) return null;

        if (group.blocks.some((b) => isNote(b, "Button"))) {
          return (
            <Section key={i} variant="primary" animate={false}>
              <CtaSection group={group} />
            </Section>
          );
        }

        const isFaq = group === faqGroup;
        const hasCards =
          children.length > 0 &&
          children.every((c) =>
            group.blocks.some(
              (b) => "text" in b && b.text.includes(`](${c.path})`),
            ),
          ) &&
          group.blocks.some((b) => b.type === "h3");
        const infographic = group.blocks.some((b) => isNote(b, "етап"))
          ? "steps"
          : /^(Benefits|What You Get)/.test(group.heading)
            ? "benefits"
            : undefined;

        return (
          <Section key={i} variant={nextVariant()} animate={false}>
            <SectionWrapper>
              <div style={{ width: "100%", maxWidth: "var(--max-width)" }}>
                <SectionHeading text={group.heading} />
                {isFaq ? (
                  <FaqList blocks={group.blocks} />
                ) : hasCards ? (
                  <SubServiceCards blocks={group.blocks} subPages={children} />
                ) : (
                  <ProseBlocks
                    blocks={group.blocks}
                    infographicLists={infographic}
                  />
                )}
              </div>
            </SectionWrapper>
          </Section>
        );
      })}
    </>
  );
}
