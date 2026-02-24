"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  Puzzle,
  ClipboardList,
  Network,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import {
  Technologies,
  Cases,
  ProblemSolutionTable,
  ProcessStep,
  PlatformCard,
} from "@/components/blocks";
import { CTABanner } from "@/components/ui/cta-banner";

const whenRightChoice = [
  {
    icon: Puzzle,
    heading: "Off-the-shelf software falls short",
    description:
      "Ready-made products cover only part of the workflow and require workarounds to fill the gaps.",
  },
  {
    icon: ClipboardList,
    heading: "Key steps stay manual",
    description:
      "Important processes still happen in spreadsheets or outside any system, creating errors and delays.",
  },
  {
    icon: Network,
    heading: "Fragmented toolset",
    description:
      "Several tools must be connected into one system with no clear integration path.",
  },
  {
    icon: TrendingUp,
    heading: "Growth creates bottlenecks",
    description:
      "Business growth turns existing solutions into performance or capability bottlenecks.",
  },
  {
    icon: Eye,
    heading: "Limited operational visibility",
    description:
      "Real-time visibility into processes, metrics, or responsibilities is missing.",
  },
];

const problemsWeSolve = [
  {
    problem: "Manual work, frequent errors, and lost time.",
    solution: "We automate core processes inside a single system.",
  },
  {
    problem: "Disconnected technical tools that don't communicate.",
    solution:
      "We consolidate workflows into a unified custom software for business environment.",
  },
  {
    problem: "Systems that are hard to modify or extend.",
    solution:
      "We build custom software solutions that evolve with changing needs.",
  },
];

const ourServices = [
  "Business Systems & Workflows",
  "Web Platforms & Internal Tools",
  "Process Automation & Integrations",
  "Dashboards & Operational Analytics",
  "Technical Consulting & Architecture",
  "Ongoing Support & Post-Launch Development",
];

const howWeWork = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding business logic and operational priorities.",
  },
  {
    number: "02",
    title: "Technical Approach",
    description:
      "Defining the most effective technical approach for your needs.",
  },
  {
    number: "03",
    title: "Build & Refine",
    description: "Building, testing, and refining the solution.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Launching the system with ongoing support and iteration.",
  },
];

const whyKrasty = [
  "Experience across Healthcare, FinTech, MedTech, Marketing & Advertising, ECommerce, Crypto, Web3, and Maritime Transportation;",
  "Strong focus on internal systems: portals, CRMs, dashboards, and operational tools;",
  "Balanced use of modern stacks and low-code platforms to reduce delivery time without sacrificing control;",
  "Clear communication, predictable stages, and transparent collaboration;",
  "Solutions designed to adapt as business processes evolve.",
];

const bodyTextStyle = {
  fontSize: "1.0625rem",
  lineHeight: "1.8",
  color: "var(--text-secondary)",
  marginBottom: "1rem",
  textIndent: "1rem",
};

interface CustomSoftwareClientProps {
  cases: any[];
}

export default function CustomSoftwareClient({
  cases,
}: CustomSoftwareClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" animate={false}>
        <div style={{ paddingTop: "4rem" }}>
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
                <Code2
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
                text="Custom Software Development"
                speed={50}
                delay={300}
                highlightWords={["Custom", "Development"]}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                maxWidth: "var(--max-width)",
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              <p style={bodyTextStyle}>
                Krasty Soft delivers{" "}
                <strong>custom software development services</strong> that help
                businesses replace manual routines, fragmented tools, and rigid
                systems. We design and implement end-to-end solutions when
                ready-made products no longer fit operational needs. The goal is
                simple: fewer workarounds, clearer processes, and software that
                supports growth instead of slowing it down.
              </p>
              <p style={bodyTextStyle}>
                Our services focus on building{" "}
                <strong>custom software for business</strong> that removes
                unnecessary complexity and gives teams a system they can rely on
                day to day.
              </p>
              <p style={bodyTextStyle}>
                We work with small and mid-sized businesses, startups, and teams
                that need <strong>custom software development</strong> aligned
                with their real processes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* When Custom Software Development Is the Right Choice */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="When Custom Software Development Is the Right Choice"
              speed={30}
              delay={300}
              highlightWords={["Custom"]}
            />
          </h2>
          <p style={{ ...bodyTextStyle, marginTop: "1rem" }}>
            A <strong>bespoke software development service</strong> makes sense
            when business logic no longer fits into standard tools. Typical
            signals include:
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {whenRightChoice.map((item, index) => (
            <PlatformCard key={index} item={item} index={index} />
          ))}
        </div>
      </Section>

      {/* What Problems We Solve */}
      <Section variant="primary" animate={false}>
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
        <ProblemSolutionTable items={problemsWeSolve} />
      </Section>

      {/* Our Custom Software Development Services */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Our Custom Software Development Services"
              speed={35}
              delay={300}
              highlightWords={["Custom"]}
            />
          </h2>
          <p style={{ ...bodyTextStyle, marginTop: "1rem" }}>
            As a <strong>custom software development agency</strong>, we focus
            on essential services:
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {ourServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: "1.5rem",
                backgroundColor: "var(--surface-primary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              <Clock
                size={24}
                color="var(--brand-red)"
                style={{ margin: "0 auto 0.75rem", display: "block" }}
              />
              {service}
            </motion.div>
          ))}
        </div>
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
          <p style={{ ...bodyTextStyle, marginTop: "1rem" }}>
            We use a simple, transparent approach:
          </p>
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

        <p style={{ ...bodyTextStyle, marginTop: "2rem" }}>
          This approach allows <strong>custom software outsourcing</strong>{" "}
          without losing control over priorities, timelines, or quality.
        </p>
      </Section>

      {/* Why Krasty Soft */}
      <Section variant="secondary" animate={false}>
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

        <div style={{ maxWidth: "var(--max-width)" }}>
          <p style={bodyTextStyle}>
            Krasty Soft approaches projects with business logic as the starting
            point. In our <strong>custom software development services</strong>,
            technology follows the process, enabling us to design systems that
            remain practical long after launch.
          </p>
          <p style={bodyTextStyle}>
            Key advantages clients value in our approach:
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
            Our small, focused team combines technical expertise with a deep
            understanding of operational workflows. This makes Krasty Soft a
            trusted <strong>custom software development agency</strong>.
          </p>
          <p style={bodyTextStyle}>
            If you are looking for{" "}
            <strong>bespoke software development services</strong>, Krasty Soft
            is ready to help.
          </p>
        </div>
      </Section>

      {/* Technologies Section */}
      <Technologies />

      {/* Case Studies */}
      {cases.length > 0 && <Cases cases={cases} />}

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <Rocket
            size={48}
            color="white"
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            Ready to build your custom solution?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Let&apos;s discuss your project and create software that perfectly
            fits your needs.
          </p>
        </CTABanner>
      </Section>
    </>
  );
}
