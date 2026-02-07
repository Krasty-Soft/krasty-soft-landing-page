'use client'

import React from "react";
import { Jobs } from "./jobs";
import { Section, TypingText } from "@/components/ui";
import { jobs } from "@/lib/jobs";

export const Opportunities = ({ isEmpty = false }: { isEmpty?: boolean }) => {
  return (
    <Section variant={"black"} animate={false}>
      {/* Custom Title with Typing Effect */}
      <div className="mb-12 md:mb-16">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          style={{ 
            color: 'var(--text-primary)',
            lineHeight: '1.4'
          }}
        >
          <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
          <TypingText
            text="Exciting opportunities and a supportive environment."
            speed={50}
            delay={300}
            highlightWords={['Exciting', 'supportive']}
          />
        </h2>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Currently no opportunities available
          </p>
        </div>
      ) : (
        <Jobs jobs={jobs} />
      )}
    </Section>
  );
};
