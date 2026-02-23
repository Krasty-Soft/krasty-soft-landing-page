"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle } from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import {
  Technologies,
  Cases,
  ProblemSolutionTable,
  ProcessStep,
} from "@/components/blocks";
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
  {
    number: "01",
    title: "Discovery Call",
    description: "Short discovery call and access setup.",
  },
  {
    number: "02",
    title: "Audit & Findings",
    description: "Audit + findings mapped to business impact.",
  },
  {
    number: "03",
    title: "Action Plan",
    description: "Action plan with scope and priorities.",
  },
  {
    number: "04",
    title: "Implementation",
    description: "Implementation support or clean handoff.",
  },
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

const bodyTextStyle = {
  fontSize: "1.0625rem",
  lineHeight: "1.8",
  color: "var(--text-secondary)",
  marginBottom: "1rem",
  textIndent: "1rem",
};

interface RetoolConsultingClientProps {
  cases: any[];
}

export default function RetoolConsultingClient({
  cases,
}: RetoolConsultingClientProps) {
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
                <Lightbulb
                  size={32}
                  color="var(--brand-red)"
                  style={{ display: "inline" }}
                />
              </motion.div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-18"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text="When Retool Consulting Is the Right Choice"
                speed={35}
                delay={300}
                highlightWords={["Retool"]}
              />
            </h2>
          </div>
          <p style={bodyTextStyle}>
            A focused <strong>Retool consultancy</strong> helps when:
          </p>
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
            style={{
              ...bodyTextStyle,
              textIndent: 0,
              paddingLeft: "3rem",
              listStyleType: "disc",
            }}
          >
            {whenIsRightChoice.map((item, i) => (
              <li
                key={i}
                style={{ marginBottom: "0.5rem", paddingLeft: "0.5rem" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>

      {/* What Problems We Solve */}
      <Section variant="primary" animate={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text="What Problems We Solve"
                speed={50}
                delay={300}
                highlightWords={["Problems"]}
              />
            </h2>
          </div>
          <ProblemSolutionTable items={problemsWesolve} />
        </motion.div>
      </Section>

      {/* What Our Retool Consultancy Covers */}
      <Section variant="secondary" animate={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text="What Our Retool Consultancy Covers"
                speed={35}
                delay={300}
                highlightWords={["Retool"]}
              />
            </h2>
          </div>
          <p style={bodyTextStyle}>
            Our <strong>Retool consulting</strong> typically covers:
          </p>
          <ol
            style={{
              ...bodyTextStyle,
              textIndent: 0,
              paddingLeft: "3rem",
              listStyleType: "decimal",
            }}
          >
            {whatWeCovers.map((item, i) => (
              <li
                key={i}
                style={{ marginBottom: "0.75rem", paddingLeft: "0.5rem" }}
              >
                {item}
              </li>
            ))}
          </ol>
          <p style={bodyTextStyle}>
            If needed, we can stay involved through targeted{" "}
            <strong>Retool development services</strong> after the consulting
            phase.
          </p>
        </motion.div>
      </Section>

      {/* How We Work */}
      <Section variant="primary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="How We Work"
              speed={50}
              delay={300}
              highlightWords={["Work"]}
            />
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {howWeWork.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </Section>

      {/* Why Krasty Soft */}
      <Section variant="secondary" animate={false}>
        <SectionWrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 md:mb-16">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
              >
                <span style={{ color: "var(--brand-red)" }}>&gt; </span>
                <TypingText
                  text="Why Krasty Soft"
                  speed={50}
                  delay={300}
                  highlightWords={["Krasty"]}
                />
              </h2>
            </div>

            <div style={{ maxWidth: "900px" }}>
              <p style={bodyTextStyle}>
                Our strengths in <strong>Retool consultancy</strong> include:
              </p>
              <ul
                style={{
                  ...bodyTextStyle,
                  textIndent: 0,
                  paddingLeft: "3rem",
                  listStyleType: "disc",
                }}
              >
                {whyKrasty.map((item, i) => (
                  <li
                    key={i}
                    style={{ marginBottom: "0.75rem", paddingLeft: "0.5rem" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ ...bodyTextStyle, marginTop: "1.5rem" }}>
                We translate operational goals into changes teams can trust.
              </p>
              <p style={bodyTextStyle}>
                Let&apos;s review your Retool setup now: our team is ready to
                help you.
              </p>
            </div>
          </motion.div>
        </SectionWrapper>
      </Section>

      {/* Technologies Section */}
      <Technologies />

      {/* Case Studies */}
      {cases.length > 0 && <Cases cases={cases} />}

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <CheckCircle
            size={48}
            color="white"
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            Ready to unlock Retool&apos;s full potential?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Let&apos;s schedule a consultation to discuss your Retool strategy.
          </p>
        </CTABanner>
      </Section>
    </>
  );
}
