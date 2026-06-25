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
  title: "React.js Development Services",
  description:
    "Building modern frontends for SaaS platforms, dashboards, and internal tools. Expert React.js development services.",
  path: "/react",
});

export default function ReactPage() {
  const tech = getTechBySlug("react");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "React.js", path: "/react" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "React.js Development Services",
    description:
      "Building modern frontends for SaaS platforms, dashboards, and internal tools. Expert React.js development services.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
