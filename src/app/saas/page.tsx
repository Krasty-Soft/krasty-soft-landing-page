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
  title: "SaaS Development Services",
  description:
    "Multi-tenant SaaS products with billing, auth, dashboards, and integrations — from MVP to scale. Expert SaaS development services from Krasty Soft.",
  path: "/saas",
});

export default function SaasPage() {
  const tech = getTechBySlug("saas");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "SaaS", path: "/saas" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "SaaS Development Services",
    description:
      "Multi-tenant SaaS products with billing, auth, dashboards, and integrations — from MVP to scale. Expert SaaS development services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
