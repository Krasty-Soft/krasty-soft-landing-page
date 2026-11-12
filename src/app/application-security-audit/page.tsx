import type { Metadata } from "next";
import { AuditPageTemplate } from "@/components/blocks/audit-page";
import { getAuditPage } from "@/lib/audit-pages";
import { generateSEO } from "@/lib/seo";

const page = getAuditPage("/application-security-audit");

export const metadata: Metadata = generateSEO({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <AuditPageTemplate page={page} />;
}
