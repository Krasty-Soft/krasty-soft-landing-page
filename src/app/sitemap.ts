import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-url";
import { getAllSlugs as getAllCaseSlugs } from "@/lib/cases";
import { getAllSlugs as getAllJobSlugs } from "@/lib/jobs";
import { getAllSlugs as getAllPostSlugs } from "@/lib/posts";

// Last known content update date for static pages.
// Update this when static page content changes meaningfully.
const STATIC_LASTMOD = new Date("2026-06-25");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — lastModified reflects the last content update, not the build time
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Industry pages
    {
      url: `${BASE_URL}/fintech`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/healthcare`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/e-commerce`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/saas`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Service pages
    {
      url: `${BASE_URL}/ai-development`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ai-automation`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/custom-software-development`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/backend-development`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/frontend-development`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Technology pages
    {
      url: `${BASE_URL}/react`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/python`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/node`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Blog listing
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic case study pages — use actual Contentful updatedAt
  let caseStudyPages: MetadataRoute.Sitemap = [];
  try {
    const caseSlugs = await getAllCaseSlugs();
    caseStudyPages = caseSlugs.map(
      (item: { slug: string; updatedAt?: Date }) => ({
        url: `${BASE_URL}/case-studies/${item.slug}`,
        lastModified: item.updatedAt || STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }),
    );
  } catch (error) {
    console.error("Error fetching case study slugs for sitemap:", error);
  }

  // Dynamic career pages — use actual Contentful updatedAt
  let careerPages: MetadataRoute.Sitemap = [];
  try {
    const jobSlugs = await getAllJobSlugs();
    careerPages = jobSlugs.map((item: { slug: string; updatedAt?: Date }) => ({
      url: `${BASE_URL}/careers/${item.slug}`,
      lastModified: item.updatedAt || STATIC_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching job slugs for sitemap:", error);
  }

  // Dynamic blog post pages — use actual Contentful updatedAt
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const postSlugs = await getAllPostSlugs();
    blogPages = postSlugs.map((item: { slug: string; updatedAt?: Date }) => ({
      url: `${BASE_URL}/blog/${item.slug}`,
      lastModified: item.updatedAt || STATIC_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching post slugs for sitemap:", error);
  }

  return [...staticPages, ...caseStudyPages, ...careerPages, ...blogPages];
}
