import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import RetoolDevelopmentClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Retool Development Services - Build Internal Tools Fast",
  description:
    "Expert Retool development services. Build custom internal tools 10x faster with professional Retool developers. Connect to any data source, create custom UIs, and automate workflows.",
  path: "/retool-development",
});

export default async function RetoolDevelopmentPage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Retool Development Services",
    description:
      "Expert Retool development services. Build custom internal tools 10x faster with professional Retool developers. Connect to any data source, create custom UIs, and automate workflows.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Retool Development", path: "/retool-development" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <RetoolDevelopmentClient cases={cases} />
    </>
  );
}
