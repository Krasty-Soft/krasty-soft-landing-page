import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import FintechClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "FinTech Software Development Services",
  description:
    "Expert FinTech software development company delivering secure, scalable financial technology solutions. Custom banking apps, payment systems, and trading platforms.",
  path: "/fintech",
});

export default async function FintechPage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "FinTech Software Development",
    description:
      "Expert FinTech software development company delivering secure, scalable financial technology solutions. Custom banking apps, payment systems, and trading platforms.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FinTech", path: "/fintech" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <FintechClient cases={cases} />
    </>
  );
}
