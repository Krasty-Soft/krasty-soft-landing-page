import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import InsuranceClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Insurance Software Development Services",
  description:
    "Custom insurance software development for policy management, claims processing, and underwriting. Scalable InsurTech solutions for modern insurance companies.",
  path: "/insurance",
});

export default async function InsurancePage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Insurance Software Development",
    description:
      "Custom insurance software development for policy management, claims processing, and underwriting. Scalable InsurTech solutions for modern insurance companies.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Insurance", path: "/insurance" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <InsuranceClient cases={cases} />
    </>
  );
}
