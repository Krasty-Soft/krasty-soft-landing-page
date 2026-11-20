"use client";

import {
  CodeXml,
  Cpu,
  Database,
  PanelsTopLeft,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { IconCard, Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { InlineCta } from "@/components/blocks/inline-cta";
import { GridArt, LayersArt, NodesArt, RadarArt, WindowsArt } from "./illustrations";

// Home "Our Digital Products and Services" block, rebuilt from the design
// mockup (Nov 2026) in the site's own style: the usual typed heading, Sora
// throughout, and a 3 + 2 card grid. Each card has an icon tile, a short
// description, a link row and a faint line drawing.

type Service = {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  icon: LucideIcon;
  Art: () => React.JSX.Element;
};

const SERVICES: Service[] = [
  {
    title: "AI Development",
    description:
      "Build intelligent applications, integrate LLMs, and create custom AI solutions that solve real business challenges.",
    link: "/ai-development",
    linkLabel: "Explore AI Development",
    icon: Cpu,
    Art: RadarArt,
  },
  {
    title: "AI Automation",
    description:
      "Automate workflows and integrate AI-powered tools to streamline operations, reduce manual work, and boost efficiency.",
    link: "/ai-automation",
    linkLabel: "Discover AI Automation",
    icon: Settings,
    Art: NodesArt,
  },
  {
    title: "Custom Software Development",
    description:
      "Turn your ideas into scalable software, from business systems to complex web platforms and internal tools.",
    link: "/custom-software-development",
    // The mockup says "Learn More"; a link that names its page helps search
    // engines and screen-reader users, so it says where it goes.
    linkLabel: "Explore Custom Software",
    icon: CodeXml,
    Art: GridArt,
  },
  {
    title: "Backend Development",
    description:
      "Build robust server-side solutions, APIs, and database integrations to power your applications at scale.",
    link: "/backend-development",
    linkLabel: "Explore Backend Services",
    icon: Database,
    Art: LayersArt,
  },
  {
    title: "Frontend Development",
    description:
      "Create intuitive and responsive interfaces, modern web applications, and engaging digital experiences.",
    link: "/frontend-development",
    linkLabel: "Discover Frontend Services",
    icon: PanelsTopLeft,
    Art: WindowsArt,
  },
];

export const Services = ({
  cta,
}: {
  /** Optional call to action under the grid (used on the home page). */
  cta?: { label: string; text?: string; href?: string };
} = {}) => {
  return (
    <Section variant={"primary"} animate={false}>
      <SectionWrapper>
        <div className="relative isolate w-full" style={{ maxWidth: "var(--max-width)" }}>
          {/* Background: faint grid that fades out, and a red glow top right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -bottom-10 -top-16 -z-10 md:-inset-x-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, #000 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, #000 30%, transparent 80%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-24 -z-10 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(229,6,6,0.22), transparent 65%)" }}
          />

          {/* Header */}
          <div className="relative mb-10 flex items-start justify-between gap-8 md:mb-12">
            <div className="min-w-0">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                style={{ color: "var(--text-primary)", lineHeight: "1.4" }}
              >
                <span style={{ color: "var(--brand-red)" }}>&gt; </span>
                <TypingText
                  text="Our Digital Products and Services."
                  speed={50}
                  delay={500}
                  highlightWords={["Products", "Services"]}
                />
              </h2>
              <p
                className="mt-6 text-base leading-relaxed md:text-lg"
                style={{ color: "var(--text-secondary)", maxWidth: "46rem" }}
              >
                End-to-end software development services to build, scale, and optimize your digital products.
              </p>
            </div>

            {/* Decorative code tag on a guide line (desktop only) */}
            <div aria-hidden="true" className="relative mt-6 hidden min-w-[16rem] flex-1 items-center xl:flex">
              <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18))" }} />
              <span className="mx-3 text-lg leading-none" style={{ color: "var(--brand-red)" }}>+</span>
              <span className="h-px w-32" style={{ background: "linear-gradient(90deg, var(--brand-red), rgba(229,6,6,0.25))" }} />
              <span
                className="flex h-16 w-28 items-center justify-center rounded-lg border"
                style={{ borderColor: "var(--border-default)", backgroundColor: "rgba(18,18,20,0.8)", color: "var(--brand-red)" }}
              >
                <CodeXml size={28} strokeWidth={1.5} />
              </span>
            </div>
          </div>

          {/* Cards: 1 column on phones, 2 up to 1280px (last card full width), 3 + 2 above */}
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6 lg:gap-6">
            {SERVICES.map(({ Art, ...service }, index) => (
              <IconCard
                key={service.link}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                art={<Art />}
                link={{ href: service.link, label: service.linkLabel }}
                // Top row: three cards of two columns each. Bottom row: two of
                // three. Below 1280px the last card spans the full width.
                className={`${index < 3 ? "xl:col-span-2" : "xl:col-span-3"} ${
                  index === SERVICES.length - 1 ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </ul>
        </div>

        {cta && <InlineCta {...cta} />}
      </SectionWrapper>
    </Section>
  );
};
