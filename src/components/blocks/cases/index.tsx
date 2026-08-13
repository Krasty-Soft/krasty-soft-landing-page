"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Slider, TypingText } from "@/components/ui";
import { Case, Industry } from "@/lib/cases";
import { Slide } from "./slide";
import { SectionWrapper } from "@/components/ui/section-wrapper";

interface CasesProps {
  cases: Case[];
  industry?: Industry;
  /** Optional heading override (industry pages use a tailored H2). */
  title?: string;
  /** Optional lead paragraph override under the heading. */
  intro?: string;
}

export const Cases = ({ cases, industry, title, intro }: CasesProps) => {
  // Filter cases by industry if provided
  const filteredCases = industry
    ? cases.filter((c) => c.industries?.includes(industry))
    : cases;
  return (
    <Section variant="secondary" animate={false}>
      {/* Custom Title with Typing Effect */}
      <SectionWrapper>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.4",
              maxWidth: "var(--max-width)",
            }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text={title ?? "Featured Client Products and Success Stories."}
              speed={50}
              delay={300}
              highlightWords={["Client", "Success"]}
            />
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mt-6"
            style={{ color: "var(--text-secondary)", maxWidth: "60rem" }}
          >
            {intro ??
              "As a custom application development company, we help startups and growing businesses turn ideas into scalable digital products that solve real business challenges."}
          </p>
        </div>

        <div className="w-full" style={{ maxWidth: "var(--max-width)" }}>
          {filteredCases.length > 0 ? (
            <Slider>
              {filteredCases.map((item, i) => (
                <Slide slide={item} key={i} />
              ))}
            </Slider>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                padding: "2rem",
                fontSize: "1rem",
              }}
            >
              No case studies available for this industry yet.
            </p>
          )}
        </div>

        {/* A carousel hides most of the portfolio from users who never swipe,
            so the full list gets an explicit entry point. */}
        {filteredCases.length > 0 && (
          <div
            className="w-full flex justify-center mt-10"
            style={{ maxWidth: "var(--max-width)" }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 font-semibold transition-colors duration-200"
              style={{
                padding: "0.875rem 1.75rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                color: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              View all case studies
              <ArrowUpRight size={18} style={{ color: "var(--brand-red)" }} />
            </Link>
          </div>
        )}
      </SectionWrapper>
    </Section>
  );
};
