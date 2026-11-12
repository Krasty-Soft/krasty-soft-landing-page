// Audit service pages (Nov 2026). The copy in content.json is the SEO team's
// approved text, converted 1:1 from the review document; edit it there, not
// in components, so it stays in sync with what the SEO team signed off.
import content from "./content.json";

export type AuditBlock =
  | { type: "h1" | "h2" | "h3" | "p" | "note"; text: string }
  | { type: "ul" | "ol"; items: string[] };

type AuditContent = {
  name: string;
  path: string;
  title: string;
  description: string;
  blocks: AuditBlock[];
};

export type AuditPage = AuditContent & {
  /** Short label for menus and breadcrumbs */
  label: string;
  /** Path of the parent service page, for child pages */
  parent?: string;
  /** Name for the Service structured data */
  serviceName: string;
};

const META: Record<string, { label: string; parent?: string; serviceName: string }> = {
  "/code-audit": { label: "Code Audit", serviceName: "Code Audit Services" },
  "/application-security-audit": {
    label: "Application Security Audit",
    serviceName: "Application Security Audit",
  },
  "/application-security-audit/web-app": {
    label: "Web Application Security Audit",
    parent: "/application-security-audit",
    serviceName: "Web Application Security Audit",
  },
  "/application-security-audit/mobile-app": {
    label: "Mobile Application Security Audit",
    parent: "/application-security-audit",
    serviceName: "Mobile Application Security Audit",
  },
  "/api-security-audit": { label: "API Security Audit", serviceName: "API Security Audit" },
  "/ai-agent-security-audit": {
    label: "AI Agent Security Audit",
    serviceName: "AI Agent Security Audit",
  },
};

export const AUDIT_PAGES: AuditPage[] = (content as AuditContent[]).map((page) => {
  const meta = META[page.path];
  if (!meta) throw new Error(`No META entry for audit page ${page.path}`);
  return { ...page, ...meta };
});

export function getAuditPage(path: string): AuditPage {
  const page = AUDIT_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`Unknown audit page ${path}`);
  return page;
}
