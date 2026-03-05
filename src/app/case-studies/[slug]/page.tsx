import { getAllSlugs, getCaseBySlug } from "@/lib/cases";

export const revalidate = 3600;
export const dynamicParams = true;
import { generateSEO, generateArticleSchema, StructuredData } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseTemplateRenderer } from "../templates";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseData = await getCaseBySlug(slug);

  if (!caseData) {
    return generateSEO({
      title: "Case Study",
      description: "Software development case study by Krasty Soft.",
      path: `/case-studies/${slug}`,
    });
  }

  // Prefer explicit SEO fields, fall back to display fields
  const title = caseData.seoTitle || caseData.title
  const description = caseData.seoDescription || caseData.cardDescription || ""
  // Use case study's own first image as OG image, fall back to default
  const ogImage = caseData.media?.[0]?.url || undefined

  return generateSEO({
    title,
    description,
    path: `/case-studies/${slug}`,
    image: ogImage,
    type: "article",
    tags: caseData.tags,
    authors: ["Krasty Soft Team"],
  });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = await getCaseBySlug(slug);

  if (!caseData) return notFound();

  const template = caseData.template || "default";

  // Generate Article structured data for case study
  const articleSchema = generateArticleSchema({
    title: caseData.title || "Case Study",
    description: caseData.seoDescription || caseData.cardDescription || "",
    slug: `/case-studies/${slug}`,
    image: caseData.media?.[0]?.url,
    publishedTime: new Date().toISOString(),
    authors: ["Krasty Soft Team"],
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <CaseTemplateRenderer caseData={caseData} template={template} />
    </>
  );
}
