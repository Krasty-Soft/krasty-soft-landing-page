import { safeGetEntries } from "@/lib/cms";
import { REMOVED_CASE_SLUGS } from "@/constants/redirects";
import type { EntrySkeletonType } from "contentful";

export type CaseTemplate = "default" | "srm" | "brief";

export type Industry =
  | "fintech"
  | "healthcare"
  | "maritime"
  | "insurance"
  | "other";

export interface Media {
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface Case {
  slug: string;
  title: string;
  tags: string[];
  /** Category labels shown as the card's uppercase meta line (e.g. "Ad Analytics" • "Marketing Reporting"). Optional. */
  categories?: string[];
  cardDescription: string;
  preview: string;
  media: Media[];
  template?: CaseTemplate;
  seoTitle?: string;
  seoDescription?: string;
  content?: any;
  overview?: any;
  industries?: Industry[];
  brief?: CaseBrief;
}

/** Structured one-page case format (template "brief"). */
export interface CaseBrief {
  sector: string;
  client: string;
  headline: string;
  summary: string;
  bestFor: string;
  proofLead: string;
  proofEmphasis: string;
  proofPoints: string[];
  whatWeDid: string[];
  result: string;
  hardPart: string;
  stack: string[];
  focus: string[];
}

export interface ContentfulCaseFields {
  slug: string;
  title: string;
  tags: string; // Contentful stores it as comma-separated string
  categories?: string; // comma-separated category labels for the card meta line
  cardDescription: string;
  preview: { fields: { file: { url: string } } }; // Contentful asset
  media: Array<{ fields: { file: { url: string } } }>; // Contentful assets array
  template?: string;
  seoTitle?: string;
  seoDescription?: string;
  content: any;
  overview: any;
  industry?: string; // Single industry (dropdown)
  sector?: string;
  client?: string;
  headline?: string;
  summary?: string;
  bestFor?: string;
  proofLead?: string;
  proofEmphasis?: string;
  proofPoints?: string[];
  whatWeDid?: string[];
  result?: string;
  hardPart?: string;
  stack?: string[];
  focus?: string[];
}

interface CaseSkeleton extends EntrySkeletonType {
  contentTypeId: string;
  fields: ContentfulCaseFields;
}

const CONTENT_TYPE_CASE = process.env.CONTENTFUL_CASE_TYPE_ID || "case";

export const cases: Case[] = [
  {
    slug: "oolu-fractional-hiring-platform",
    title: "OOLU - Fractional Hiring Platform",
    tags: ["SaaS", "HR Tech", "Web App"],
    cardDescription:
      "A comprehensive platform for fractional hiring and employment management, connecting companies with top talent through an intuitive dashboard and authentication system.",
    preview: "/oolu.png",
    media: [
      {
        url: "/oolu.png",
        title: "img1",
        description: "OOLU platform dashboard",
      },
    ],
    template: "default",
    content: "",
    overview: "",
    seoTitle: "OOLU - Fractional Hiring Platform Case Study",
    seoDescription: "How we built a modern fractional hiring platform for OOLU",
  },
  {
    slug: "crm-system-with-unified-communications",
    title: "CRM System with Unified Communications",
    tags: ["CRM", "Enterprise", "Communication"],
    cardDescription:
      "Enterprise-grade CRM solution with integrated communication tools, enabling seamless customer relationship management and team collaboration.",
    preview: "https://placehold.co/1200x800/1a1a1a/dc2626?text=CRM+System",
    media: [
      {
        url: "https://placehold.co/1200x800/1a1a1a/dc2626?text=CRM+System",
        title: "img1",
        description: "CRM Dashboard",
      },
    ],
    template: "default",
    content: "",
    overview: "",
  },
];

function splitList(value: unknown): string[] {
  if (typeof value !== "string" || !value.trim()) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function withProtocol(url: string): string {
  return url.startsWith("http") ? url : `https:${url}`;
}

function mapCase(item: CaseSkeleton): Case {
  const fields = item.fields;

  // Contentful stores media as linked assets; skip any that failed to resolve.
  const media: Media[] = Array.isArray((fields as any).media)
    ? (fields as any).media
        .filter((asset: any) => asset?.fields?.file?.url)
        .map((asset: any) => ({
          url: withProtocol(asset.fields.file.url),
          title: asset.fields.title || "",
          description: asset.fields.description || "",
          width: asset.fields.file.details?.image?.width,
          height: asset.fields.file.details?.image?.height,
        }))
    : [];

  // `preview` is a plain text field in the current model, but older entries
  // may still hold a linked asset.
  const rawPreview: unknown = (fields as any).preview;
  const previewUrl =
    typeof rawPreview === "string"
      ? rawPreview
      : (rawPreview as any)?.fields?.file?.url || "";

  const template = (fields.template || "default") as CaseTemplate;

  return {
    slug: fields.slug,
    title: fields.title,
    tags: splitList(fields.tags),
    categories: splitList(fields.categories),
    cardDescription: fields.cardDescription || "",
    preview: previewUrl ? withProtocol(previewUrl) : "",
    media,
    template,
    seoTitle: fields.seoTitle || "",
    seoDescription: fields.seoDescription || "",
    content: fields.content,
    overview: fields.overview,
    industries: fields.industry ? [fields.industry as Industry] : [],
    brief:
      template === "brief"
        ? {
            sector: fields.sector || "",
            client: fields.client || "",
            headline: fields.headline || fields.title,
            summary: fields.summary || "",
            bestFor: fields.bestFor || "",
            proofLead: fields.proofLead || "",
            proofEmphasis: fields.proofEmphasis || "",
            proofPoints: fields.proofPoints || [],
            whatWeDid: fields.whatWeDid || [],
            result: fields.result || "",
            hardPart: fields.hardPart || "",
            stack: fields.stack || [],
            focus: fields.focus || [],
          }
        : undefined,
  };
}

export async function getAllCases() {
  const res = await safeGetEntries<CaseSkeleton>({
    content_type: CONTENT_TYPE_CASE,
    limit: 1000,
  });

  if (res && res.items.length > 0) {
    return res.items
      .filter((item: CaseSkeleton) => !REMOVED_CASE_SLUGS.has(item.fields.slug))
      .map(mapCase);
  }
  // Fallback to hardcoded data
  return cases.filter((item) => !REMOVED_CASE_SLUGS.has(item.slug));
}

export async function getCaseBySlug(slug: string) {
  const res = await safeGetEntries<CaseSkeleton>({
    content_type: CONTENT_TYPE_CASE,
    "fields.slug": slug,
    limit: 1,
    include: 1,
  });

  if (res && res.items.length > 0) {
    return mapCase(res.items[0]);
  }

  return cases.find((item) => item.slug === slug) || null;
}

export async function getAllSlugs() {
  const res = await safeGetEntries<CaseSkeleton>({
    content_type: CONTENT_TYPE_CASE,
    select: ["fields.slug"],
    limit: 1000,
  });
  if (res) {
    return res.items
      .filter((i: any) => i.fields?.slug)
      .filter((i: any) => !REMOVED_CASE_SLUGS.has(i.fields.slug))
      .map((i: any) => ({
        slug: i.fields.slug as string,
        updatedAt: i.sys?.updatedAt ? new Date(i.sys.updatedAt) : new Date(),
      }));
  }
  return cases
    .filter((item) => !REMOVED_CASE_SLUGS.has(item.slug))
    .map((item) => ({ slug: item.slug, updatedAt: new Date() }));
}
