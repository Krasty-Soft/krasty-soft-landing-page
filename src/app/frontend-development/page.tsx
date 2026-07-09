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
  title: "Frontend Development Services",
  description:
    "Fast, responsive, accessible web apps, dashboards, and design systems. Expert frontend development services from Krasty Soft.",
  path: "/frontend-development",
});

export default function FrontendDevelopmentPage() {
  const tech = getTechBySlug("frontend-development");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Frontend Development", path: "/frontend-development" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Frontend Development Services",
    description:
      "Fast, responsive, accessible web apps, dashboards, and design systems. Expert frontend development services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
