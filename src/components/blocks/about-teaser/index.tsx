"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Layers,
  LifeBuoy,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { IconCard, Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";

// The reasons a buyer can rely on us (SEO brief, Nov 2026).
const STRENGTHS = [
  {
    icon: Briefcase,
    title: "Business-Oriented Development",
    text: "We start from your business goals, operational processes and the people who will use the software, then choose the technology.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    text: "Systems are designed for more users, more data and new features from day one, so growth does not force a rewrite.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Data Protection",
    text: "Access control, data protection and secure development practices are built in and tested, not added after launch.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    text: "Regular reports, working demos at every stage and clear control over scope, priorities and timelines.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible Engagement Models",
    text: "Fixed scope, a dedicated team or ongoing development, matched to your project size, budget and needs.",
  },
  {
    icon: LifeBuoy,
    title: "Post-Launch Support",
    text: "SLA-backed maintenance, bug fixes, updates and continued improvement of your software after release.",
  },
];

// "About Us" teaser required by the SEO brief: an H2 linking to /about, a short
// intro paragraph, the six strengths, and a "Discover Our Story" CTA.
export const AboutTeaser = () => {
  return (
    <Section variant="secondary" animate={false}>
      <SectionWrapper>
        <div style={{ width: "100%", maxWidth: "var(--max-width)" }}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="About Us: Krasty Soft in a Nutshell"
              speed={45}
              delay={300}
              highlightWords={["Krasty Soft"]}
            />
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", maxWidth: "60rem" }}
          >
            We&apos;re a software company passionate about building innovative
            digital products that help businesses solve complex challenges.
            Learn more about our team, values, and the approach behind every
            solution we deliver.
          </p>

          <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {STRENGTHS.map(({ icon, title, text }, i) => (
              <IconCard
                key={title}
                icon={icon}
                title={title}
                description={text}
                index={i}
                showIndex
                surface="sunken"
              />
            ))}
          </ul>

          <motion.div whileHover={{ x: 3 }} style={{ display: "inline-block" }}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-semibold"
              style={{
                color: "var(--text-primary)",
                padding: "0.875rem 1.75rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                textDecoration: "none",
              }}
            >
              Discover Our Story
              <ArrowUpRight size={18} style={{ color: "var(--brand-red)" }} />
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </Section>
  );
};
