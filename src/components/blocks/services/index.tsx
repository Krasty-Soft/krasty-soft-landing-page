"use client";

import React from "react";
import { Section } from "@/components/ui";
import { TypingText } from "@/components/ui";
import { CodeEditor } from "./code-editor";
import { ServiceType } from "@/types";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const mock: ServiceType[] = [
  {
    title: "Retool Development",
    description:
      "Optimize your business processes with powerful, no-code Retool solutions tailored to your needs.",
    link: "/retool-development",
    content: [
      "Custom Retool Apps",
      "Retool Dashboard Development",
      "Database & API Integrations",
      "Retool UI/UX Customization",
    ],
  },
  {
    title: "Retool Consultancy",
    description:
      "Get expert guidance to develop a Retool strategy that aligns with your business goals.",
    link: "/retool-development",
    content: [
      "Retool Strategy Planning",
      "App Architecture Review",
      "Retool Best Practices Training",
      "Migration to Retool",
    ],
  },
  {
    title: "Custom Software Development",
    description:
      "Design, develop, and deploy custom software solutions tailored to your specific business needs.",
    link: "/custom-software-development",
    content: [
      "End-to-End Software Solutions",
      "MVP Development",
      "Legacy System Modernization",
      "Software Maintenance & Support",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Build robust and scalable APIs to power your applications and streamline data exchange.",
    link: "/backend-development",
    content: [
      "API Development",
      "Database Architecture Design",
      "Serverless Backend Solutions",
      "Authentication & Security",
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Create responsive, high-performance web applications with seamless user experiences.",
    link: "/case-studies",
    content: [
      "Custom Web Application Development",
      "UI/UX Design Implementation",
      "Performance Optimization",
      "Cross-Platform Development",
    ],
  },
];

export const Services = () => {
  return (
    <Section variant={"primary"} animate={false}>
      <SectionWrapper>
        <div
          className="mb-12 md:mb-16"
          style={{ width: "100%", maxWidth: "var(--max-width)" }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.4",
            }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Digital products and five-star services."
              speed={50}
              delay={500}
              highlightWords={["products", "services"]}
            />
          </h2>
        </div>
        <CodeEditor services={mock} />
      </SectionWrapper>
    </Section>
  );
};
