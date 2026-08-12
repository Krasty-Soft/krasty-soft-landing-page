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
  title: "Custom Generative AI Development Services & End-to-End AI Solutions",
  description:
    "AI development services for startups and growing businesses. We build custom AI applications, intelligent assistants, automation tools, and machine learning solutions.",
  path: "/ai-development",
});

export default function AiDevelopmentPage() {
  const tech = getTechBySlug("ai-development");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "AI Development", path: "/ai-development" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "AI Development Services",
    description:
      "AI agents, LLM integrations, RAG systems, and automation built into your products. Expert AI development services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
