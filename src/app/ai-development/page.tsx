import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

// Placeholder page — noindex until full content is published.
// Correct canonical (own URL, not the homepage default) prevents duplicate-content harm.
export const metadata: Metadata = generateSEO({
  title: "AI Development",
  description: "AI development services from Krasty Soft. Content coming soon.",
  path: "/ai-development",
  noIndex: true,
});

export default function AiDevelopmentPage() {
  return <h1>AI Development</h1>;
}
