import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

// Placeholder page — noindex until full content is published.
// Correct canonical (own URL, not the homepage default) prevents duplicate-content harm.
export const metadata: Metadata = generateSEO({
  title: "E-Commerce Development",
  description:
    "E-commerce development services from Krasty Soft. Content coming soon.",
  path: "/e-commerce",
  noIndex: true,
});

export default function ECommercePage() {
  return <h1>eCommerce</h1>;
}
