export type NavigationItem = {
  slug: string;
  label: string;
  description: string;
  /** Column heading in the desktop Services dropdown */
  group?: string;
  /** Sub-services shown directly under their parent in every menu */
  children?: NavigationItem[];
};

/** Items with their children inlined after them, for flat lists (sitemap, llms.txt) */
export const flattenNav = (items: unknown): NavigationItem[] =>
  (Array.isArray(items) ? (items as NavigationItem[]) : []).flatMap((item) => [
    item,
    ...(item.children ?? []),
  ]);

type NavigationConfig = {
  [key: string]: NavigationItem | NavigationItem[];
};

const PAGES: NavigationConfig = {
  "case-studies": {
    slug: "case-studies",
    label: "Case Studies",
    description: "Case Studies",
  },
  blog: {
    slug: "blog",
    label: "Blog",
    description: "Insights and articles",
  },
  about: {
    slug: "about",
    label: "About us",
    description: "About us",
  },
  careers: {
    slug: "careers",
    label: "Careers",
    description: "Careers",
  },
  industries: [
    {
      slug: "fintech",
      label: "FinTech",
      description: "Secure payment platforms, digital wallets, lending and trading systems built for auditability and uptime.",
    },
    {
      slug: "healthcare",
      label: "Healthcare",
      description: "Patient portals, clinical tools, and telemedicine platforms designed around real care workflows and compliance.",
    },
    {
      slug: "e-commerce",
      label: "E-commerce",
      description: "Custom storefronts, checkout and subscription flows, and the ERP and analytics integrations behind them.",
    },
    {
      slug: "saas",
      label: "SaaS",
      description: "Multi-tenant platforms with subscription billing, role management, and dashboards ready to scale with your customers.",
    },
  ],
  services: [
    {
      slug: "ai-development",
      label: "AI Development",
      description: "Production AI — agents, LLM integrations, RAG, and copilots wired into your products.",
      group: "Development",
    },
    {
      slug: "ai-automation",
      label: "AI Automation",
      description: "Automate document processing, support triage, and multi-step workflows with AI agents.",
      group: "Development",
    },
    {
      slug: "custom-software-development",
      label: "Custom Software Development",
      description: "End-to-end custom software, MVPs, and legacy modernization built around your business.",
      group: "Development",
    },
    {
      slug: "backend-development",
      label: "Backend Development",
      description: "Scalable APIs, database architecture, authentication, and cloud infrastructure.",
      group: "Development",
    },
    {
      slug: "frontend-development",
      label: "Frontend Development",
      description: "Fast, accessible React and Next.js interfaces with strong Core Web Vitals.",
      group: "Development",
    },
    {
      slug: "code-audit",
      label: "Code Audit",
      description: "Manual review of architecture, quality, security and performance, with a ranked fix list.",
      group: "Audit & Security",
    },
    {
      slug: "application-security-audit",
      label: "Application Security Audit",
      description: "Source code review, authentication and access control testing for your app.",
      group: "Audit & Security",
      children: [
        {
          slug: "application-security-audit/web-app",
          label: "Web Application Security Audit",
          description: "Frontend, server and APIs of browser-based products.",
        },
        {
          slug: "application-security-audit/mobile-app",
          label: "Mobile Application Security Audit",
          description: "iOS and Android apps and the backend they talk to.",
        },
      ],
    },
    {
      slug: "api-security-audit",
      label: "API Security Audit",
      description: "Authentication, access control and data exposure across REST and GraphQL APIs.",
      group: "Audit & Security",
    },
    {
      slug: "ai-agent-security-audit",
      label: "AI Agent Security Audit",
      description: "Prompt injection, tool permissions, memory and data leakage in LLM agents.",
      group: "Audit & Security",
    },
  ],
  technologies: [
    {
      slug: "ai-development",
      label: "AI Development",
      description:
        "AI agents, LLM integrations, and RAG systems built into your products.",
    },
    {
      slug: "react",
      label: "React.js",
      description:
        "React is a JavaScript library for building user interfaces.",
    },
    {
      slug: "python",
      label: "Python",
      description:
        "Python is a programming language that lets you work quickly and integrate systems more effectively.",
    },
    {
      slug: "node",
      label: "Node.js",
      description:
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
  ],
} as const;

export default PAGES;
