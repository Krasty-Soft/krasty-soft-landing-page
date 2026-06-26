import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*utm_",
          "/*fbclid=",
          "/*gclid=",
          "/search",
          "/og-preview",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
