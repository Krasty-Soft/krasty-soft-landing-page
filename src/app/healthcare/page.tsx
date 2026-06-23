import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import HealthcareClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Healthcare Software Development Services",
  description:
    "HIPAA-compliant healthcare software development. Custom EHR/EMR systems, telemedicine platforms, and medical practice management solutions.",
  path: "/healthcare",
});

export default async function HealthcarePage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Healthcare Software Development",
    description:
      "HIPAA-compliant healthcare software development. Custom EHR/EMR systems, telemedicine platforms, and medical practice management solutions.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Healthcare", path: "/healthcare" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <HealthcareClient cases={cases} />
    </>
  );
}
