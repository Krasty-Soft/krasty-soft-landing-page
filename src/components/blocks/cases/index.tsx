"use client";

import { Section, Slider, TypingText } from "@/components/ui";
import { Case } from "@/lib/cases";
import { Slide } from "./slide";
import { SectionWrapper } from "@/components/ui/section-wrapper";

interface CasesProps {
  cases: Case[];
}

export const Cases = ({ cases }: CasesProps) => {
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
              text="Real-world insights and success stories."
              speed={50}
              delay={300}
              highlightWords={["Real-world", "success"]}
            />
          </h2>
        </div>

        <div className="w-full" style={{ maxWidth: "var(--max-width)" }}>
          <Slider>
            {cases?.map((item, i) => (
              <Slide slide={item} key={i} />
            ))}
          </Slider>
        </div>
      </SectionWrapper>
    </Section>
  );
};
