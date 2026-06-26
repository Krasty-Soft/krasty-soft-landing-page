import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

// Placeholder page — noindex until full content is published.
// Correct canonical (own URL, not the homepage default) prevents duplicate-content harm.
export const metadata: Metadata = generateSEO({
  title: "AI Automation",
  description: "AI automation services from Krasty Soft. Content coming soon.",
  path: "/ai-automation",
  noIndex: true,
});

export default function AiAutomationPage() {
  return <h1>AI Automation</h1>;
}
