import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  StructuredData,
} from "@/lib/seo";
import { SERVICE_FAQ } from "@/lib/faq";
import { Metadata } from "next";
import CustomSoftwareClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Custom Software Development Services",
  description:
    "Krasty Soft is a custom software development company building bespoke web, backend, and AI-powered software for startups and enterprises worldwide.",
  path: "/custom-software-development",
});

export default async function CustomSoftwarePage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Custom Software Development",
    description:
      "Expert custom software development company building tailored solutions for your business. From web applications to enterprise systems - scalable, secure, and maintainable software.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    {
      name: "Custom Software Development",
      path: "/custom-software-development",
    },
  ]);

  return (
    <>
      <StructuredData
        data={[
          serviceSchema,
          breadcrumbSchema,
          generateFAQSchema(SERVICE_FAQ["custom-software-development"]),
        ]}
      />
      <CustomSoftwareClient cases={cases} />
    </>
  );
}
