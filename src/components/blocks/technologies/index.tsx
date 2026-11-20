"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Blocks,
  Brain,
  Cloud,
  Database,
  Monitor,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { InlineCta } from "@/components/blocks/inline-cta";

type Tech = { name: string; href?: string };

type TechGroup = {
  icon: LucideIcon;
  title: string;
  text: string;
  techs: Tech[];
  service?: { label: string; href: string };
  /** A case study where this stack was used in production. */
  caseStudy: { label: string; slug: string };
};

// Grouped by purpose (SEO brief, Nov 2026). Every technology here appears in
// at least one published case study; each group links to one of them.
const GROUPS: TechGroup[] = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    text: "LLM features that do real work: agents that take actions, RAG search over your documents, and extraction pipelines that turn unstructured text into data.",
    techs: [
      { name: "OpenAI" },
      { name: "Claude" },
      { name: "LLM integrations" },
      { name: "RAG" },
      { name: "AI agents" },
    ],
    service: { label: "AI Development", href: "/ai-development" },
    caseStudy: { label: "AI Event Data Extraction Pipeline", slug: "ai-event-data-extraction-pipeline" },
  },
  {
    icon: Monitor,
    title: "Frontend Development",
    text: "Fast, accessible interfaces for web platforms, client portals and dashboards, with server rendering where search visibility matters.",
    techs: [
      { name: "React.js", href: "/react" },
      { name: "Next.js" },
      { name: "TypeScript" },
    ],
    service: { label: "Frontend Development", href: "/frontend-development" },
    caseStudy: {
      label: "AI Shopping Assistant for a Grocery Marketplace",
      slug: "ai-shopping-assistant-for-grocery-marketplace",
    },
  },
  {
    icon: Server,
    title: "Backend Development",
    text: "Server-side logic, REST APIs and integrations with payment, CRM and ERP systems, built to stay stable as traffic and data grow.",
    techs: [
      { name: "Python", href: "/python" },
      { name: "Node.js", href: "/node" },
      { name: "FastAPI" },
      { name: "Java" },
    ],
    service: { label: "Backend Development", href: "/backend-development" },
    caseStudy: {
      label: "AI Voice Agent for After-Hours Lead Booking",
      slug: "ai-voice-agent-for-after-hours-lead-booking",
    },
  },
  {
    icon: Database,
    title: "Database Solutions",
    text: "Data models for transactions, reporting and search: relational storage for business records, document stores for flexible content, caching for speed.",
    techs: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Supabase" },
    ],
    service: { label: "Backend Development", href: "/backend-development" },
    caseStudy: {
      label: "Predictive Ordering Platform for Veterinary Clinics",
      slug: "predictive-ordering-for-veterinary-clinics",
    },
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Cloud infrastructure, containerised deployments and automated releases, so the system scales with load and new versions ship without downtime.",
    techs: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Vercel" },
    ],
    service: { label: "Custom Software Development", href: "/custom-software-development" },
    caseStudy: { label: "Rewards Management Platform", slug: "rewards-management-platform" },
  },
  {
    icon: Blocks,
    title: "Low-Code Development",
    text: "Internal tools, admin panels and operational dashboards on Retool, connected to your databases and APIs and launched in weeks instead of months.",
    techs: [{ name: "Retool" }],
    service: { label: "Custom Software Development", href: "/custom-software-development" },
    caseStudy: {
      label: "Retool Platform for Senior Finance Task Automation",
      slug: "retool-platform-for-finance-task-automation",
    },
  },
];

const chipClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors duration-200";

const TechChip = ({ tech }: { tech: Tech }) =>
  tech.href ? (
    <Link
      href={tech.href}
      className={`${chipClass} border-[var(--border-red)] text-[var(--text-primary)] hover:border-[var(--brand-red)] hover:bg-[var(--state-hover)]`}
    >
      {tech.name}
    </Link>
  ) : (
    <span className={`${chipClass} border-[var(--border-default)] text-[var(--text-secondary)]`}>
      {tech.name}
    </span>
  );

const GroupCard = ({ group, index }: { group: TechGroup; index: number }) => {
  const Icon = group.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col rounded-xl border p-6 transition-colors duration-200 hover:border-[var(--brand-red)]"
      style={{
        listStyle: "none",
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--pill-red-fill)", color: "var(--brand-red)" }}
        >
          <Icon size={20} />
        </span>
        <h3 className="text-lg font-semibold md:text-xl" style={{ color: "var(--text-primary)" }}>
          {group.title}
        </h3>
      </div>
      <p className="mb-5 text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {group.text}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {group.techs.map((tech) => (
          <TechChip key={tech.name} tech={tech} />
        ))}
      </div>
      <div
        className="mt-auto flex flex-col gap-2 border-t pt-4 text-sm"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {group.service && (
          <Link
            href={group.service.href}
            className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)] underline-offset-4 hover:underline"
          >
            {group.service.label}
            <ArrowUpRight size={16} style={{ color: "var(--brand-red)" }} />
          </Link>
        )}
        <Link
          href={`/case-studies/${group.caseStudy.slug}`}
          className="inline-flex items-start gap-1.5 text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text-primary)] hover:underline"
        >
          <span>Case study: {group.caseStudy.label}</span>
        </Link>
      </div>
    </motion.li>
  );
};

export const Technologies = ({
  title,
  cta,
}: {
  title?: string;
  /** Optional call to action under the grid (used on the home page). */
  cta?: { label: string; text?: string; href?: string };
} = {}) => {
  return (
    <Section variant={"primary"} animate={false}>
      <SectionWrapper>
        <div className="mb-12 md:mb-16" style={{ width: "100%", maxWidth: "var(--max-width)" }}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text={title ?? "Technologies and Solutions That Drive Results."}
              speed={50}
              delay={300}
              highlightWords={["Technologies", "Results"]}
            />
          </h2>
          <p
            className="mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-secondary)", maxWidth: "60rem" }}
          >
            We pick the stack for the task, not the other way round. These are
            the technologies we use in production, grouped by what they do for
            your product.
          </p>
        </div>

        <ul
          className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6"
          style={{ maxWidth: "var(--max-width)" }}
        >
          {GROUPS.map((group, index) => (
            <GroupCard key={group.title} group={group} index={index} />
          ))}
        </ul>


        {cta && <InlineCta {...cta} />}
      </SectionWrapper>
    </Section>
  );
};
