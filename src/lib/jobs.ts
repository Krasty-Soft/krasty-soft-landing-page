import { safeGetEntries } from "@/lib/cms";
import type { EntrySkeletonType } from "contentful";

export type Job = {
  slug: string;
  title: string;
  description: string;
  tags: string;
  link: string;
  location: string;
  type: string;
  datePosted: string;
  validThrough?: string;
};

type JobFields = {
  slug: string;
  title: string;
  description?: string | any;
  tags?: string | any;
  link?: string;
  location?: string | any;
  type?: string | any;
  datePosted?: string;
  validThrough?: string;
};

// Helper to extract text from Contentful rich text or return string
function extractText(field: any): string {
  if (typeof field === 'string') return field;
  if (!field) return '';
  // If it's a Contentful Document object, extract text from paragraphs
  if (field.nodeType && field.content) {
    return field.content
      .map((node: any) => {
        if (node.nodeType === 'paragraph' && node.content) {
          return node.content
            .map((textNode: any) => textNode.value || '')
            .join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }
  return String(field);
}

export const jobs: Job[] = [
  {
    slug: "senior-frontend-dev-552161726681",
    title: "Senior Software Engineer",
    description: "3-4 years of experience",
    tags: "Remote, full-time",
    link: "/careers",
    location: "Remote",
    type: "Full-time",
    datePosted: "2026-01-01T00:00:00Z",
  },
  {
    slug: "fullstack-dev-887837762378",
    title: "Full-Stack Developer",
    description: "1-4 years of experience",
    tags: "Remote, full-time",
    link: "/careers",
    location: "Remote",
    type: "Full-time",
    datePosted: "2026-01-01T00:00:00Z",
  },
  {
    slug: "frontend-dev-689831162555",
    title: "Front-end Developer",
    description: "2-4 years of experience",
    tags: "Remote, full-time",
    link: "/careers",
    location: "Remote",
    type: "Full-time",
    datePosted: "2026-01-01T00:00:00Z",
  },
];

interface JobSkeleton extends EntrySkeletonType {
  contentTypeId: string;
  fields: JobFields;
}

const CONTENT_TYPE_JOB = process.env.CONTENTFUL_JOB_TYPE_ID || "job";

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const res = await safeGetEntries<JobSkeleton>({
    content_type: CONTENT_TYPE_JOB,
    "fields.slug": slug,
    limit: 1,
  });
  if (res && res.items.length > 0) {
    const f = res.items[0].fields;
    return {
      slug: extractText(f.slug),
      title: extractText(f.title),
      description: extractText(f.description) || "",
      tags: extractText(f.tags) || "",
      link: extractText(f.link) || "/careers",
      location: extractText(f.location) || "Remote",
      type: extractText(f.type) || "Full-time",
      datePosted: extractText(f.datePosted) || new Date().toISOString(),
      validThrough: extractText(f.validThrough),
    };
  }
  return jobs.find((job) => job.slug === slug) || null;
}

export async function getAllSlugs() {
  const res = await safeGetEntries<JobSkeleton>({
    content_type: CONTENT_TYPE_JOB,
    select: ["fields.slug"],
    limit: 1000,
  });
  if (res) {
    return (res.items as Array<{ fields: JobFields }>)
      .map((i: { fields: JobFields }) => i.fields.slug)
      .filter((s: string | undefined): s is string => Boolean(s))
      .map((slug: string) => ({ slug }));
  }
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function getAllJobs(): Promise<Job[]> {
  const res = await safeGetEntries<JobSkeleton>({
    content_type: CONTENT_TYPE_JOB,
    limit: 1000,
  });
  if (res && res.items.length > 0) {
    return res.items.map((item: JobSkeleton) => {
      const f = item.fields;
      return {
        slug: extractText(f.slug) || "",
        title: extractText(f.title) || "",
        description: extractText(f.description) || "",
        tags: extractText(f.tags) || "",
        link: extractText(f.link) || "/careers",
        location: extractText(f.location) || "Remote",
        type: extractText(f.type) || "Full-time",
        datePosted: extractText(f.datePosted) || new Date().toISOString(),
        validThrough: extractText(f.validThrough),
      };
    });
  }
  // Return empty array if no jobs in Contentful (don't fallback to hardcoded)
  return [];
}
