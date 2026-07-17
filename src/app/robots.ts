import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-url";

// Paths kept out of every crawler: the API, tracking-parameter URLs, and
// internal utility routes. Shared by the wildcard and AI-bot rules so nothing
// is unintentionally opened up to AI crawlers.
const DISALLOW = [
  "/api/",
  "/*utm_",
  "/*fbclid=",
  "/*gclid=",
  "/search",
  "/og-preview",
];

// AI crawlers Krasty Soft intentionally welcomes, so the company can be
// discovered, summarized, and cited in AI search and chat answers. All are
// allowed today; to opt a specific bot out later, give it its own rule with
// `disallow: "/"`.
const AI_BOTS = [
  // AI search / answer / citation bots — these drive referral traffic and
  // put Krasty Soft into AI-generated answers.
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Meta-ExternalFetcher",
  "DuckAssistBot",
  // Model-training crawlers — allowed for maximum reach. Flip any of these to a
  // dedicated `disallow: "/"` rule if the company decides to opt out of training.
  "GPTBot",
  "CCBot",
  "anthropic-ai",
  "Bytespider",
  "cohere-ai",
  "Google-CloudVertexBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: AI_BOTS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
