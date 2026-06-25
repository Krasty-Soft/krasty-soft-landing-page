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
  title: "Python Development Services",
  description:
    "Backend logic, data-heavy workflows, and API-first platforms. Expert Python web development services.",
  path: "/python",
});

export default function PythonPage() {
  const tech = getTechBySlug("python");
  if (!tech) return notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Python", path: "/python" },
  ]);

  const serviceSchema = generateServiceSchema({
    name: "Python Development Services",
    description:
      "Backend logic, data-heavy workflows, and API-first platforms. Expert Python web development services.",
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, serviceSchema]} />
      <TechTemplate tech={tech} />
    </>
  );
}
