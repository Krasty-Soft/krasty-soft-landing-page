"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Server,
  Shield,
  Layout,
  Code2,
  Database,
  Users,
  Clock,
} from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import { Technologies, Cases, ProblemSolutionTable, ProcessStep, PlatformCard } from "@/components/blocks";
import { CTABanner } from "@/components/ui/cta-banner";
const problemsWeSolve = [
  {
    problem: "Manual operations, recurring errors, and slow execution.",
    solution:
      "We automate workflows and routine actions with Retool development services.",
  },
  {
    problem: "Disconnected systems that store data in different places.",
    solution:
      "We consolidate information and actions into one operational interface.",
  },
  {
    problem: "Internal tools that are difficult to update or adapt.",
    solution:
      "We build systems that evolve as processes and requirements change.",
  },
];

const platformAdvantages = [
  {
    icon: Server,
    heading: "Flexibility in deployment",
    description:
      "Supports cloud, on-premises, and hybrid deployment options. This allows Retool-based systems to align with infrastructure, security, or compliance requirements.",
  },
  {
    icon: Shield,
    heading: "Security and compliance",
    description:
      "Focuses on enterprise-grade security features, including granular permissions and robust audit logs. These controls make the platform suitable for internal tools that handle sensitive or regulated data.",
  },
  {
    icon: Layout,
    heading: "Component reusability",
    description:
      "Retool's library of pre-built components can be easily customized and reused. This helps teams maintain consistency across multiple tools while reducing development effort.",
  },
  {
    icon: Code2,
    heading: "Customization with code",
    description:
      "Allows extensive customization with JavaScript, SQL, and other programming languages. Retool development services allow teams to implement complex business logic without technical compromises.",
  },
  {
    icon: Database,
    heading: "Extensive integrations",
    description:
      "Offers various integrations with databases, APIs, and third-party services. Internal tools can function as a central operational layer across existing systems.",
  },
  {
    icon: Users,
    heading: "Real-time collaboration",
    description:
      "Empowers teams to build and iterate on apps together in real time, improving development speed. Collaboration becomes more transparent, and feedback cycles shorten significantly.",
  },
];

const ourServices = [
  "Internal Dashboards & Admin Panels",
  "Workflow Automation & Task Management",
  "Reporting & Data Visualization",
  "API, Database & Third-Party Integrations",
  "Architecture Planning & Technical Consulting",
  "Ongoing Enhancement & Scaling",
];

const howWeWork = [
  {
    number: "01",
    title: "Discovery & Goals",
    description:
      "Understanding workflows, data sources, and operational goals.",
  },
  {
    number: "02",
    title: "Structure Design",
    description: "Designing a Retool-based structure aligned with real usage.",
  },
  {
    number: "03",
    title: "Build & Refine",
    description: "Building, testing, and refining the internal tool.",
  },
  {
    number: "04",
    title: "Deploy & Iterate",
    description: "Deploying the system with ongoing support and iteration.",
  },
];

const whyKrasty = [
  <>
    Experience delivering internal systems across Healthcare, FinTech, MedTech,
    Marketing &amp; Advertising, ECommerce, Crypto, Web3, and Maritime
    Transportation.
  </>,
  "Deep understanding of operational tooling beyond interface design.",
  <>
    <strong>
      Ability to balance speed and control through thoughtful{" "}
      <em>low code development</em>.
    </strong>
  </>,
  "Clear planning, realistic timelines, and structured collaboration.",
];

const bodyTextStyle = {
  fontSize: "1.0625rem",
  lineHeight: "1.8",
  color: "var(--text-secondary)",
  marginBottom: "1rem",
  textIndent: "1rem",
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
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-18"
              style={{ color: "var(--text-primary)", lineHeight: "1.2" }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text="Retool Development"
                speed={50}
                delay={300}
                highlightWords={["Retool"]}
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
                Krasty Soft builds internal tools with Retool to help teams
                reduce manual effort, connect scattered systems, and work with
                data in one place. We create operational solutions when
                spreadsheets, scripts, and generic tools stop supporting real
                workflows. Our goals: fewer manual steps, better visibility, and
                tools that scale with the business.
              </p>
              <p style={bodyTextStyle}>
                <strong>Retool development</strong> combines the advantages of
                low-code delivery with the depth of custom engineering.
                Dashboards, admin panels, and workflow tools can be tailored to
                real operational processes.
              </p>
              <p style={bodyTextStyle}>
                We collaborate with product teams, operations teams, and growing
                companies that rely on internal tools for decision-making and
                coordination.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Why Choose Retool Over Other Low-Code Platforms */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Why Choose Retool Over Other Low-Code Platforms?"
              speed={30}
              delay={300}
              highlightWords={["Retool"]}
            />
          </h2>
          <p
            style={{
              ...bodyTextStyle,
              marginTop: "1rem",
              maxWidth: "var(--max-width)",
            }}
          >
            Choosing the right platform directly affects how sustainable
            internal systems will be over time.{" "}
            <strong>Retool development</strong> stands out by offering depth
            where other low-code tools impose limits.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {platformAdvantages.map((item, index) => (
            <PlatformCard key={index} item={item} index={index} />
          ))}
        </div>
      </Section>

      {/* What Problems Retool Development Solves */}
      <Section variant="primary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="What Problems Retool Development Solves"
              speed={40}
              delay={300}
              highlightWords={["Retool"]}
            />
          </h2>
        </div>
        <ProblemSolutionTable items={problemsWeSolve} />
      </Section>

      {/* Our Retool Development Services */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Our Retool Development Services"
              speed={40}
              delay={300}
              highlightWords={["Retool"]}
            />
          </h2>
          <p
            style={{
              ...bodyTextStyle,
              marginTop: "1rem",
              maxWidth: "var(--max-width)",
            }}
          >
            Our team focuses on building internal systems designed for daily
            operational use:
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

        <p style={{ ...bodyTextStyle, marginTop: "1.5rem" }}>
          Each <strong>low code development</strong> solution is structured to
          remain understandable and maintainable over time.
        </p>
      </Section>

      {/* How We Work With Retool */}
      <Section variant="primary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="How We Work With Retool"
              speed={50}
              delay={300}
              highlightWords={["Retool"]}
            />
          </h2>
          <p
            style={{
              ...bodyTextStyle,
              marginTop: "1rem",
              maxWidth: "var(--max-width)",
            }}
          >
            Our process is transparent and predictable from the start.
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
          This approach allows <strong>low code development</strong> without
          sacrificing control over quality or long-term flexibility.
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
            Krasty Soft approaches <strong>Retool development</strong> with
            business logic as the foundation. Technology follows the process,
            which helps systems remain practical long after launch.
          </p>
          <p style={bodyTextStyle}>Our strengths include:</p>
          <ol
            style={{
              ...bodyTextStyle,
              paddingLeft: "3rem",
              listStyleType: "decimal",
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
          </ol>
          <p style={{ ...bodyTextStyle, marginTop: "1.5rem" }}>
            As a focused <strong>Retool development agency</strong>, we work
            closely with clients and stay involved throughout delivery. Our{" "}
            <strong>Retool experts</strong> understand both the platform and the
            operational context behind each system.
          </p>
          <p style={bodyTextStyle}>
            If you are looking for a reliable{" "}
            <strong>Retool development company</strong> to build internal tools
            that support real work, Krasty Soft is ready to collaborate.
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
          <Zap
            size={48}
            color="white"
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            Ready to build internal tools that scale?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "var(--max-width)",
              margin: "0 auto",
            }}
          >
            Let&apos;s discuss how Retool development can support your
            team&apos;s real workflows.
          </p>
        </CTABanner>
      </Section>
    </>
  );
}
