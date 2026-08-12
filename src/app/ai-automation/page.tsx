import { getTechBySlug } from "@/lib/techs";
import {
  generateSEO,
  generateBreadcrumbSchema,
  generateServiceSchema,
  StructuredData,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "AI Automation Services for Intelligent Business Workflows",
  description:
    "Custom AI automation services to streamline business processes, optimize workflows, and implement intelligent AI agents tailored to your operational needs.",
  path: "/ai-automation",
});

export default function AiAutomationPage() {
  const tech = getTechBySlug("ai-automation");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "AI Automation", path: "/ai-automation" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "AI Automation Services",
    description:
      "Automate support, document processing, and multi-step workflows with AI agents wired into your systems. Expert AI automation services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
