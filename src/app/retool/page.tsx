import { getTechBySlug } from "@/lib/techs";
import {
  generateSEO,
  generateBreadcrumbSchema,
  generateServiceSchema,
  StructuredData,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";

export const metadata = generateSEO({
  title: "Retool Platform - Build Internal Tools Fast",
  description:
    "Low-code platform for building internal apps fast: dashboards, admin panels, and workflow tools. Expert Retool development company.",
  path: "/retool",
});

export default function RetoolPage() {
  const tech = getTechBySlug("retool");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Retool", path: "/retool" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Retool Development Services",
    description:
      "Low-code platform for building internal apps fast: dashboards, admin panels, and workflow tools. Expert Retool development company.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
