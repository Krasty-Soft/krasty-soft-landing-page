import { safeGetEntries } from "@/lib/cms";
import type { EntrySkeletonType } from "contentful";

export interface Post {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  preview: string;
  richContent?: any;
  seoTitle?: string;
  seoDescription?: string;
  /** ISO date the entry was first published in Contentful. */
  publishedAt?: string;
  /** ISO date of the entry's last update in Contentful. */
  updatedAt?: string;
  /** Estimated reading time in minutes, derived from the body text. */
  readingMinutes?: number;
}

type PostFields = {
  slug: string;
  title: string;
  tags?: string[];
  content?: any;
  preview?: any;
  seoTitle?: string;
  seoDescription?: string;
};

interface PostSkeleton extends EntrySkeletonType {
  contentTypeId: string;
  fields: PostFields;
}

const CONTENT_TYPE_POST = process.env.CONTENTFUL_POST_TYPE_ID || "post";

// Safely parse tags from Contentful — could be array, comma-separated string, or garbage
function parseTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter((t) => typeof t === "string");
  if (typeof tags === "string")
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  return [];
}


// Rich text carries no plain-text copy, but search and the metadata fallback
// both need one, so flatten the document to text.
function richTextToPlain(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.content))
    return node.content.map(richTextToPlain).join(" ");
  return "";
}


const WORDS_PER_MINUTE = 200;

function readingMinutes(text: string): number {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Fallback array is intentionally empty — test/filler posts have been removed.
// When Contentful is unreachable, getAllPosts/getAllSlugs return [] instead of fake data.
export const posts: Post[] = [];

export async function getAllPosts(): Promise<Post[]> {
  const res = await safeGetEntries<PostSkeleton>({
    content_type: CONTENT_TYPE_POST,
    limit: 1000,
  });

  if (res && res.items.length > 0) {
    return res.items.map((item: PostSkeleton) => {
      const fields = item.fields;
      const previewUrl = (fields as any).preview?.fields?.file?.url;
      const plain =
        typeof fields.content === "string"
          ? fields.content
          : richTextToPlain(fields.content).replace(/\s+/g, " ").trim();
      const sys = (item as any).sys || {};
      return {
        slug: fields.slug,
        title: fields.title,
        tags: parseTags(fields.tags),
        content: plain,
        richContent: typeof fields.content === "object" ? fields.content : null,
        seoTitle: fields.seoTitle || "",
        seoDescription: fields.seoDescription || "",
        publishedAt: sys.firstPublishedAt || sys.createdAt || undefined,
        updatedAt: sys.updatedAt || undefined,
        readingMinutes: readingMinutes(plain),
        preview: previewUrl
          ? previewUrl.startsWith("http")
            ? previewUrl
            : `https:${previewUrl}`
          : "",
      } as Post;
    });
  }

  return [];
}

export async function getPostBySlug(slug: string) {
  const res = await safeGetEntries<PostSkeleton>({
    content_type: CONTENT_TYPE_POST,
    "fields.slug": slug,
    limit: 1,
    include: 1,
  });

  if (res && res.items.length > 0) {
    const item = res.items[0];
    const fields = item.fields;

    const previewUrl = (fields as any).preview?.fields?.file?.url;
    const plain =
      typeof fields.content === "string"
        ? fields.content
        : richTextToPlain(fields.content).replace(/\s+/g, " ").trim();
    const sys = (item as any).sys || {};
    return {
      slug: fields.slug,
      title: fields.title,
      tags: parseTags(fields.tags),
      content: plain,
      richContent: typeof fields.content === "object" ? fields.content : null,
      seoTitle: fields.seoTitle || "",
      seoDescription: fields.seoDescription || "",
      publishedAt: sys.firstPublishedAt || sys.createdAt || undefined,
      updatedAt: sys.updatedAt || undefined,
      readingMinutes: readingMinutes(plain),
      preview: previewUrl
        ? previewUrl.startsWith("http")
          ? previewUrl
          : `https:${previewUrl}`
        : "",
    } as Post;
  }

  return null;
}

export async function getAllSlugs() {
  const res = await safeGetEntries<PostSkeleton>({
    content_type: CONTENT_TYPE_POST,
    select: ["fields.slug"],
    limit: 1000,
  });
  if (res) {
    return res.items
      .filter((i: any) => i.fields?.slug)
      .map((i: any) => ({
        slug: i.fields.slug as string,
        updatedAt: i.sys?.updatedAt ? new Date(i.sys.updatedAt) : new Date(),
      }));
  }
  return [];
}
