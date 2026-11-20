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
  Workflow,
  AppWindow,
  Plug,
  BarChart3,
  Compass,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { IconCard, Section, TypingText } from "@/components/ui";
import {
  Technologies,
  Cases,
  ProblemSolutionTable,
  ProcessStep,
  PlatformCard,
  Faq,
} from "@/components/blocks";
import { CTABanner } from "@/components/ui/cta-banner";
import { SERVICE_FAQ } from "@/lib/faq";
import { scrollToSection } from "@/lib/scroll";
import { Infographic } from "@/components/infographic";

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

// Service copy from the SEO brief (Nov 2026).
const ourServices = [
  {
    icon: Workflow,
    title: "Business Systems & Workflows",
    description:
      "Custom CRM, ERP, and inventory management systems tailored to your exact operational rules. We replace rigid spreadsheets and manual approvals with centralized software that scales with your team.",
  },
  {
    icon: AppWindow,
    title: "Web Platforms & Internal Tools",
    description:
      "Client portals, B2B SaaS products, and high-load admin panels built on React, Next.js, and Node.js. We combine modern custom code with low-code tools like Retool to launch internal operations faster.",
  },
  {
    icon: Plug,
    title: "Process Automation & Integrations",
    description:
      "Custom REST and webhook APIs and reliable two-way sync between your payment gateways (Stripe), CRMs, ERPs, and third-party services. We eliminate data silos and manual copy-pasting across your software stack.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Operational Analytics",
    description:
      "Real-time executive dashboards and automated reporting pipelines aggregating data from multiple sources. Give leadership instant visibility into revenue, bottlenecks, and team KPIs.",
  },
  {
    icon: Compass,
    title: "Technical Consulting & Architecture",
    description:
      "System architecture design, legacy modernization, and production readiness audits for MVPs or AI-generated codebases. We help you choose the right tech stack, reduce cloud costs, and eliminate technical debt before scaling.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support & Post-Launch Development",
    description:
      "Dedicated SLA maintenance, performance optimization, security patching, and continuous feature rollout. We ensure high uptime and keep your software aligned with evolving market demands.",
  },
];

// Six stages from the SEO brief (Nov 2026): the work, the result, and the
// artifacts the client receives at each stage.
const howWeWork = [
  {
    number: "01",
    title: "Discovery Phase",
    description:
      "We analyze your business needs, define project goals, gather requirements, and research the people who will use the software. Workshops with your team uncover the real process behind each request.",
    deliverables:
      "a requirements document, a prioritized feature list, and a rough timeline and budget.",
  },
  {
    number: "02",
    title: "Architecture & Planning",
    description:
      "We design the system architecture, select the technology stack, and define the database structure, APIs, and integrations, checking each choice against your expected load and growth.",
    deliverables:
      "an architecture diagram, the chosen stack with reasons, and a release plan split into milestones.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "We map user flows, then build wireframes, clickable prototypes, and final interfaces that follow usability principles and support the product's business goals.",
    deliverables:
      "user flows, a clickable prototype you can test with real users, and production-ready design files.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "We build the software in Agile/Scrum sprints: functionality, integrations, and modules. Every sprint ends with a demo of working software, so you see progress and can adjust priorities early.",
    deliverables:
      "working increments after each sprint, access to the code repository, and regular progress reports.",
  },
  {
    number: "05",
    title: "Quality Assurance (QA)",
    description:
      "We run functional, integration, and regression testing, and check the system's security and performance before every release.",
    deliverables:
      "test reports, a list of fixed issues, and automated tests that keep protecting the code after launch.",
  },
  {
    number: "06",
    title: "Deployment & Maintenance",
    description:
      "We deploy the software, configure environments, and set up monitoring. After launch we provide technical support under an SLA and keep improving the product.",
    deliverables:
      "a live system, technical documentation, monitoring and alerts, and a support plan.",
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
        <div>
          <motion.div
            initial={false}
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
              initial={false}
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
                custom software development services that help
                businesses replace manual routines, fragmented tools, and rigid
                systems. We design and implement end-to-end solutions when
                ready-made products no longer fit operational needs. The goal is
                simple: fewer workarounds, clearer processes, and software that
                supports growth instead of slowing it down.
              </p>
              <p style={bodyTextStyle}>
                Our services focus on building{" "}
                custom software for business that removes
                unnecessary complexity and gives teams a system they can rely on
                day to day.
              </p>
              <p style={bodyTextStyle}>
                We work with small and mid-sized businesses, startups, and teams
                that need custom software development aligned
                with their real processes.
              </p>
            </motion.div>

            {/* Hero CTAs (SEO brief, Nov 2026). The microcopy repeats only
                promises the contact block already makes. */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection("contacts")}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-red)] bg-[var(--brand-red)] px-8 py-4 text-lg font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-[var(--brand-red-light)] hover:shadow-[var(--shadow-red-md)] active:scale-[0.98]"
                >
                  Book a 30-Min Discovery Call
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("cases")}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-[transform,border-color,background-color] duration-200 hover:scale-[1.02] hover:border-[var(--brand-red)] hover:bg-[var(--state-hover)]"
                >
                  Explore Relevant Cases
                </button>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Free 30-minute call • Reply within one business day • NDA ready
              </p>
            </div>
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
              text="When Your Business Needs Custom Software Development Services"
              speed={30}
              delay={300}
              highlightWords={["Custom"]}
            />
          </h2>
          <p style={{ ...bodyTextStyle, marginTop: "1rem" }}>
            A bespoke software development service makes sense
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
        <div style={{ marginTop: "3rem" }}>
          <Infographic name="custom-before-after" />
        </div>
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
          <p style={{ ...bodyTextStyle, marginTop: "1rem", textIndent: 0 }}>
            As a custom software development agency, we focus
            on essential services:
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {ourServices.map(({ icon, title, description }, index) => (
            <IconCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              index={index}
              showIndex
              surface="sunken"
            />
          ))}
        </ul>
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
              text="Stages of Developing Custom Software"
              speed={50}
              delay={300}
              highlightWords={["Custom"]}
            />
          </h2>
          <p style={{ ...bodyTextStyle, marginTop: "1rem" }}>
            We follow a simple, transparent approach to delivering software
            development solutions:
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
          This approach allows custom software outsourcing{" "}
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
            point. In our custom software development services,
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
            Our small, focused team combines strong engineering and architecture
            with a deep understanding of operational workflows. From{" "}
            custom application development to technical
            consultancy, this makes Krasty Soft a trusted{" "}
            custom software development company — one that keeps
            delivery cost and long-term maintainability in view, not just the
            initial build.
          </p>
          <p style={bodyTextStyle}>
            If you are looking for{" "}
            bespoke software development services, Krasty Soft
            is ready to help.
          </p>
        </div>
      </Section>

      {/* FAQ Section (also emits FAQPage structured data from the server page) */}
      <Faq
        items={SERVICE_FAQ["custom-software-development"]}
        title="Custom Software Development — FAQ"
        variant="secondary"
      />

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
          <motion.button
            type="button"
            onClick={() => scrollToSection("contacts")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#7f1d1d",
              backgroundColor: "white",
              border: "none",
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            }}
          >
            Get in touch
          </motion.button>
        </CTABanner>
      </Section>
    </>
  );
}
