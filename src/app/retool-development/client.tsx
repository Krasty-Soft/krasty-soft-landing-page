"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Zap } from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import { Technologies, Cases, UseCases } from "@/components/blocks";
import { CTABanner } from "@/components/ui/cta-banner";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const problemsWesolve = [
  {
    problem: "Unclear app structure and tangled logic.",
    solution: "Refactor priorities, reusable patterns, and safer changes.",
  },
  {
    problem: "Slow performance and unstable queries.",
    solution: "Fix data flows, caching/queries, and UI bottlenecks.",
  },
  {
    problem: "Access control is hard to reason about.",
    solution: "Role-based permissions and predictable review steps.",
  },
];

const whenIsRightChoice = [
  "Your Retool app works, but breaks after small process changes.",
  "Data sources are inconsistent, and teams don't trust the numbers.",
  "Permissions, auditability, or environments became a blocker.",
  'Delivery slowed down due to unclear ownership or "quick fixes."',
  "You need a plan before scaling or handing work to a vendor.",
  "Documentation is missing, so changes are risky and knowledge is siloed.",
];

const whatWeCovers = [
  "Audit of existing Retool apps and architecture.",
  "Recommendations with a delivery roadmap and quick wins.",
  "UX cleanup for operational screens and daily workflows.",
  "Integration review (APIs, databases, data consistency).",
  <>
    Handover package for your team or a{" "}
    <strong>Retool development agency</strong>.
  </>,
  "Performance and reliability review (queries, load, UI bottlenecks).",
];

const howWeWork = [
  "Short discovery call and access setup.",
  "Audit + findings mapped to business impact.",
  "Action plan with scope and priorities.",
  "Implementation support or clean handoff.",
];

const whyKrasty = [
  <>
    <strong>Retool experts</strong> who focus on business workflows.
  </>,
  "Clear, practical recommendations that teams can execute.",
  <>
    A predictable <strong>Retool consultancy</strong> format with measurable
    outputs.
  </>,
  "Experience across FinTech, healthcare, E-commerce, and logistics.",
];

const ContentBlock = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => (
  <div
    style={{}}
  >
    <h2
      className="text-xl md:text-2xl lg:text-3xl font-bold"
      style={{
        color: "var(--text-primary)",
        lineHeight: "1.3",
        textAlign: "center",
        marginBottom: "1.5rem",
      }}
    >
      <span style={{ color: "var(--brand-red)" }}>&gt; </span>
      {heading}
    </h2>
    <div>{children}</div>
  </div>
);

const bodyTextStyle = {
  fontSize: "1.0625rem",
  lineHeight: "1.8",
  color: "var(--text-secondary)",
  marginBottom: "1rem",
};

interface RetoolDevelopmentClientProps {
  cases: any[];
}

export default function RetoolDevelopmentClient({
  cases,
}: RetoolDevelopmentClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" animate={false}>
        <div style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  borderRadius: "var(--radius-full)",
                }}
              >
                <Wrench
                  size={32}
                  color="var(--brand-red)"
                  style={{ display: "inline" }}
                />
              </motion.div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              style={{ color: "var(--text-primary)", lineHeight: "1.2" }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text="Retool Consulting"
                speed={50}
                delay={300}
                highlightWords={["Retool"]}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}
            >
              <p style={bodyTextStyle}>
                Krasty Soft provides <strong>Retool consulting</strong> to help
                teams address fragmented internal workflows, improve data
                visibility, and keep Retool apps stable as requirements change.
                You get practical guidance, clear priorities, and changes that
                can be shipped fast without rebuilding everything from scratch.
              </p>
              <p style={bodyTextStyle}>
                This format fits product teams, ops teams, and SMBs that need
                reliable internal tooling and{" "}
                <strong>low code development</strong>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* When Is the Right Choice */}
      <Section variant="secondary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "900px" }}
          >
            <ContentBlock heading="When Retool Consulting Is the Right Choice">
              <p style={bodyTextStyle}>
                A focused <strong>Retool consultancy</strong> helps when:
              </p>
              <ul
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
                style={{
                  ...bodyTextStyle,
                  paddingLeft: "1.5rem",
                  listStyleType: "disc",
                }}
              >
                {whenIsRightChoice.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </ContentBlock>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* What Problems We Solve */}
      <Section variant="primary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "900px" }}
          >
            <ContentBlock heading="What Problems We Solve">
              {/* Desktop: table with 2 columns. Mobile: stacked cards */}
              <div
                className="hidden md:grid"
                style={{
                  gridTemplateColumns: "1fr 1fr",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "rgba(220, 38, 38, 0.08)",
                    borderBottom: "1px solid var(--border-default)",
                    borderRight: "1px solid var(--border-default)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Problem
                </div>
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "rgba(220, 38, 38, 0.08)",
                    borderBottom: "1px solid var(--border-default)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Solution
                </div>
                {/* Data rows */}
                {problemsWesolve.map((item, i) => (
                  <>
                    <div
                      key={`p-${i}`}
                      style={{
                        padding: "1rem 1.25rem",
                        borderBottom:
                          i < problemsWesolve.length - 1
                            ? "1px solid var(--border-default)"
                            : "none",
                        borderRight: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                        fontSize: "0.9375rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {item.problem}
                    </div>
                    <div
                      key={`s-${i}`}
                      style={{
                        padding: "1rem 1.25rem",
                        borderBottom:
                          i < problemsWesolve.length - 1
                            ? "1px solid var(--border-default)"
                            : "none",
                        color: "var(--text-secondary)",
                        fontSize: "0.9375rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {item.solution}
                    </div>
                  </>
                ))}
              </div>

              {/* Mobile: stacked cards */}
              <div className="flex flex-col gap-3 md:hidden">
                {problemsWesolve.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid var(--border-default)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        backgroundColor: "rgba(220, 38, 38, 0.08)",
                        borderBottom: "1px solid var(--border-default)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--brand-red)",
                        }}
                      >
                        Problem
                      </span>
                      <p
                        style={{
                          ...bodyTextStyle,
                          marginBottom: 0,
                          marginTop: "0.25rem",
                        }}
                      >
                        {item.problem}
                      </p>
                    </div>
                    <div style={{ padding: "0.75rem 1rem" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Solution
                      </span>
                      <p
                        style={{
                          ...bodyTextStyle,
                          marginBottom: 0,
                          marginTop: "0.25rem",
                        }}
                      >
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentBlock>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* What Our Retool Consultancy Covers */}
      <Section variant="secondary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "900px" }}
          >
            <ContentBlock heading="What Our Retool Consultancy Covers">
              <p style={bodyTextStyle}>
                Our <strong>Retool consulting</strong> typically covers:
              </p>
              <ol
                style={{
                  ...bodyTextStyle,
                  paddingLeft: "1.5rem",
                  listStyleType: "decimal",
                }}
              >
                {whatWeCovers.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {item}
                  </li>
                ))}
              </ol>
              <p style={bodyTextStyle}>
                If needed, we can stay involved through targeted{" "}
                <strong>Retool development services</strong> after the
                consulting phase.
              </p>
            </ContentBlock>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* How We Work */}
      <Section variant="primary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContentBlock heading="How We Work">
              {/* Desktop: horizontal step flow */}
              <div className="hidden md:flex items-start gap-0">
                {howWeWork.map((item, i) => (
                  <div key={i} className="flex items-start flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          backgroundColor: "rgba(220, 38, 38, 0.15)",
                          border: "1px solid rgba(220, 38, 38, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "var(--brand-red)",
                          flexShrink: 0,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p
                        style={{
                          ...bodyTextStyle,
                          textAlign: "center",
                          marginBottom: 0,
                          fontSize: "0.9375rem",
                        }}
                      >
                        {item}
                      </p>
                    </div>
                    {i < howWeWork.length - 1 && (
                      <div
                        style={{
                          marginTop: "1.15rem",
                          height: "1px",
                          width: "2rem",
                          flexShrink: 0,
                          backgroundColor: "rgba(220, 38, 38, 0.3)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical steps */}
              <div className="flex flex-col gap-4 md:hidden">
                {howWeWork.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        backgroundColor: "rgba(220, 38, 38, 0.15)",
                        border: "1px solid rgba(220, 38, 38, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        color: "var(--brand-red)",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p style={{ ...bodyTextStyle, marginBottom: 0, paddingTop: "0.25rem" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </ContentBlock>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* Why Krasty Soft */}
      <Section variant="secondary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "900px" }}
          >
            <ContentBlock heading="Why Krasty Soft">
              <p style={{ ...bodyTextStyle, textAlign: "left" }}>
                Our strengths in <strong>Retool consultancy</strong> include:
              </p>
              <ul
                style={{
                  ...bodyTextStyle,
                  paddingLeft: "1.5rem",
                  listStyleType: "disc",
                  textAlign: "left",
                }}
              >
                {whyKrasty.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ ...bodyTextStyle, marginTop: "1.5rem", textAlign: "left" }}>
                We translate operational goals into changes teams can trust.
              </p>
              <p style={{ ...bodyTextStyle, textAlign: "left" }}>
                Let&apos;s review your Retool setup now: our team is ready to
                help you.
              </p>
            </ContentBlock>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* Use Cases Block */}
      <UseCases />

      {/* Technologies Section */}
      <Technologies />

      {/* Case Studies */}
      {cases.length > 0 && <Cases cases={cases} />}

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <Zap
            size={48}
            color="white"
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            Ready to build internal tools faster?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Let&apos;s discuss how Retool can accelerate your internal tool
            development.
          </p>
        </CTABanner>
      </Section>
    </>
  );
}
