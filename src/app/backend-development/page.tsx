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
  title: "Backend Development Services",
  description:
    "Robust, scalable APIs, database architecture, auth, and integrations. Expert backend development services from Krasty Soft.",
  path: "/backend-development",
});

export default function BackendDevelopmentPage() {
  const tech = getTechBySlug("backend-development");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Backend Development", path: "/backend-development" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Backend Development Services",
    description:
      "Robust, scalable APIs, database architecture, auth, and integrations. Expert backend development services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
