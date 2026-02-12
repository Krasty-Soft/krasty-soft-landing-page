"use client";

import React from "react";
import { Jobs } from "./jobs";
import { Section, TypingText } from "@/components/ui";
import { jobs } from "@/lib/jobs";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export const Opportunities = ({ isEmpty = false }: { isEmpty?: boolean }) => {
  return (
    <Section variant="primary" animate={false}>
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
              text="Exciting opportunities and a supportive environment."
              speed={50}
              delay={300}
              highlightWords={["Exciting", "supportive"]}
            />
          </h2>
        </div>

        {isEmpty ? (
          <div
            className="flex flex-col items-center justify-center py-16 px-6"
            style={{
              textAlign: "center",
              maxWidth: "36rem",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                color: "var(--text-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                lineHeight: 1.6,
                margin: 0,
                padding: "1.5rem 2rem",
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              No open positions right now. We’ll post new roles here when we’re
              hiring.
            </h2>
          </div>
        ) : (
          <Jobs jobs={jobs} />
        )}
      </SectionWrapper>
    </Section>
  );
};
