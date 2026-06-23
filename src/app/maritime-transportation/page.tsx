import { getAllCases } from "@/lib/cases";
import {
  generateSEO,
  generateServiceSchema,
  generateBreadcrumbSchema,
  StructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import MaritimeTransportationClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "Maritime & Transportation Software Development",
  description:
    "Specialized maritime and transportation software development. Fleet management, logistics optimization, and shipping industry solutions.",
  path: "/maritime-transportation",
});

export default async function MaritimeTransportationPage() {
  const cases = await getAllCases();

  const serviceSchema = generateServiceSchema({
    name: "Maritime & Transportation Software Development",
    description:
      "Specialized maritime and transportation software development. Fleet management, logistics optimization, and shipping industry solutions.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Maritime & Transportation", path: "/maritime-transportation" },
  ]);

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <MaritimeTransportationClient cases={cases} />
    </>
  );
}
