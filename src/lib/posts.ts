import { safeGetEntries } from "@/lib/cms";
import type { EntrySkeletonType } from "contentful";

export interface Post {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  preview: string;
  richContent?: any;
}

type PostFields = {
  slug: string;
  title: string;
  tags?: string[];
  content?: any;
  preview?: any;
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
      return {
        slug: fields.slug,
        title: fields.title,
        tags: parseTags(fields.tags),
        content: typeof fields.content === "string" ? fields.content : "",
        richContent: typeof fields.content === "object" ? fields.content : null,
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
    return {
      slug: fields.slug,
      title: fields.title,
      tags: parseTags(fields.tags),
      content: typeof fields.content === "string" ? fields.content : "",
      richContent: typeof fields.content === "object" ? fields.content : null,
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
      .map((i: any) => i.fields.slug)
      .filter(Boolean)
      .map((slug: string) => ({ slug }));
  }
  return [];
}
