import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import RetoolConsultingClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Retool Consulting Services - Expert Guidance",
  description:
    "Professional Retool consulting services. Strategy development, architecture review, team training, and implementation support from certified Retool experts.",
  path: "/retool-consulting",
});

export default async function RetoolConsultingPage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Retool Consulting Services",
    description:
      "Professional Retool consulting services. Strategy development, architecture review, team training, and implementation support from certified Retool experts.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Retool Consulting", path: "/retool-consulting" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <RetoolConsultingClient cases={cases} />
    </>
  );
}
