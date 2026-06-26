import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

// Placeholder page — noindex until full content is published.
// Correct canonical (own URL, not the homepage default) prevents duplicate-content harm.
export const metadata: Metadata = generateSEO({
  title: "SaaS Development",
  description:
    "SaaS development services from Krasty Soft. Content coming soon.",
  path: "/saas",
  noIndex: true,
});

export default function SaasPage() {
  return <h1>SaaS</h1>;
}
