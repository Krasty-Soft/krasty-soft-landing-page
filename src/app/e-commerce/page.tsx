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
  title: "E-commerce Development Services",
  description:
    "Custom and headless storefronts, checkout, inventory, and integrations that convert and scale. Expert e-commerce development services from Krasty Soft.",
  path: "/e-commerce",
});

export default function ECommercePage() {
  const tech = getTechBySlug("e-commerce");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "E-commerce", path: "/e-commerce" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "E-commerce Development Services",
    description:
      "Custom and headless storefronts, checkout, inventory, and integrations that convert and scale. Expert e-commerce development services from Krasty Soft.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
