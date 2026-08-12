"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";

// "About Us" teaser required by the SEO brief: an H2 linking to /about, a short
// intro paragraph, and a "Discover Our Story" CTA.
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
