export interface TechDetail {
  slug: string;
  title: string;
  subtitle: string;
  brandColor: string;
  introParagraphs: string[];
  whatWeBuild: {
    title: string;
    items: string[];
  };
  whyChoose: {
    title: string;
    paragraphs: string[];
  };
  industries: {
    title: string;
    list: string[];
  };
}

export const TECH_DETAILS: TechDetail[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    subtitle: "AI Development Services",
    brandColor: "#8B5CF6",
    introParagraphs: [
      "<strong>AI development services</strong> turn large language models, agents, and machine learning into working products — chat assistants, copilots, document and data pipelines, and automations that plug into your existing systems. We build features that read, reason over, and act on your data, not demos that stop at a prompt.",
      "As an <strong>AI development company</strong>, Krasty Soft ships production AI that teams actually rely on. We wire models to your databases, APIs, and workflows with guardrails, evaluation, and human-in-the-loop where it matters. In practice, <strong>AI development</strong> removes manual steps and surfaces answers and actions in one place."
    ],
    whatWeBuild: {
      title: "What We Build with AI",
      items: [
        "AI chat assistants and customer-support copilots.",
        "RAG systems over your docs, tickets, and databases.",
        "Autonomous agents that run multi-step workflows.",
        "Document extraction, classification, and enrichment.",
        "AI-powered analytics, search, and recommendations.",
        "LLM integrations (OpenAI, Claude) into existing apps."
      ]
    },
    whyChoose: {
      title: "Why AI Development for Your Business",
      paragraphs: [
        "<strong>AI development</strong> is the right fit when repetitive knowledge work slows your team down, or when your data holds answers no one has time to find. We focus on measurable outcomes — deflected tickets, faster processing, fewer manual steps — not novelty. Every build ships with evaluation and guardrails so results stay reliable as inputs change.",
        "Our <strong>AI development company</strong> approach keeps systems maintainable and safe as models and workflows evolve. We standardize prompts, retrieval, and tooling so new capabilities don't turn into one-off hacks. If you need an <strong>AI development agency</strong> for full delivery, we implement, evaluate, and support the system end-to-end."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "Customer Support",
        "SaaS",
        "Recruitment & HR"
      ]
    }
  },
  {
    slug: "react",
    title: "React.js",
    subtitle: "React.js Development Services",
    brandColor: "#61DAFB",
    introParagraphs: [
      "<strong>React.js development services</strong> cover building modern frontends for products that need speed and predictable UX. They are suited for interfaces that must remain responsive as usage and complexity increase. We provide <strong>React.js development services</strong> to deliver interfaces for platforms, dashboards, and internal tools where performance and component reuse matter. Our focus is clean component architecture and stable UI behavior under real usage.",
      "For teams that need flexible UI logic, <strong>custom React development</strong> keeps the product easy to extend without redesigning the whole frontend."
    ],
    whatWeBuild: {
      title: "What We Build with React.js",
      items: [
        "Web app frontends for SaaS platforms.",
        "Dashboards with filters, tables, and real-time views.",
        "Customer portals and onboarding flows.",
        "Admin UIs for operations and support teams.",
        "Design systems and reusable component libraries.",
        "Performance-focused UI refactors."
      ]
    },
    whyChoose: {
      title: "Why React.js for Your Business",
      paragraphs: [
        "React helps teams ship consistent interfaces and iterate quickly as requirements evolve. It supports a predictable UI layer even when backend logic and data sources change. With <strong>custom React development</strong>, UI changes don't turn into full rewrites. Reusable components and clear state patterns reduce regression risk.",
        "We also provide <strong>React web application development</strong> when the frontend needs to scale with product complexity and user load."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "Crypto",
        "Web3",
        "Maritime Transportation"
      ]
    }
  },
  {
    slug: "python",
    title: "Python",
    subtitle: "Python Web Development Services",
    brandColor: "#3776AB",
    introParagraphs: [
      "<strong>Python web development services</strong> are a strong fit for backend logic, data-heavy workflows, and API-first platforms. We use Python to build reliable services connecting business rules with databases, integrations, and analytics. This makes complex workflows easier to automate and extend over time.",
      "As a <strong>Python development company</strong>, Krasty Soft focuses on maintainable architecture and clear interfaces between services. The result is backend logic that stays readable for your team and stable in production."
    ],
    whatWeBuild: {
      title: "What We Build with Python",
      items: [
        "Backend APIs for web and internal systems.",
        "Data processing and automation pipelines.",
        "Integrations with third-party services and CRMs.",
        "Analytics layers and reporting logic.",
        "Async workers and event-driven processing.",
        "Internal tooling backends for dashboards."
      ]
    },
    whyChoose: {
      title: "Why Python for Your Business",
      paragraphs: [
        "Python is efficient for building systems that handle structured data and automation with predictable behavior. It's a practical choice when reliability matters more than flashy frameworks. With <strong>Python web development services</strong>, teams get a backend that stays readable and easy to extend. Clear modules and clean APIs reduce the cost of change as requirements shift. Our <strong>Python web development services</strong> approach prioritizes stability, observability, and long-term support.",
        "As a <strong>Python development company</strong>, Krasty Soft focuses on predictable delivery and production-grade quality. This approach makes ongoing iteration safer for internal teams."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "Crypto",
        "Web3",
        "Maritime Transportation"
      ]
    }
  },
  {
    slug: "node",
    title: "Node.js",
    subtitle: "Node.js Development Services",
    brandColor: "#339933",
    introParagraphs: [
      "<strong>Node.js development services</strong> help teams build fast, integration-heavy backends and real-time features. It's a strong fit when your product relies on many external services and data exchanges.",
      "We use <strong>Node.js development</strong> for APIs, workflow automation, and systems that benefit from event-driven architecture. This approach keeps integrations responsive. It simplifies handling of webhooks, queues, and background jobs. When platform needs grow, <strong>custom Node.js application development</strong> keeps the logic easy to scale."
    ],
    whatWeBuild: {
      title: "What We Build with Node.js",
      items: [
        "API backends for web platforms and internal tools.",
        "Real-time updates, notifications, and messaging.",
        "Integration layers for third-party services.",
        "Automation workers and scheduled jobs.",
        "Admin services for operational tooling.",
        "Event-driven pipelines and webhooks."
      ]
    },
    whyChoose: {
      title: "Why Node.js for Your Business",
      paragraphs: [
        "Node.js is a practical choice when your product needs quick I/O or many integrations. It works especially well for API-first platforms and event-driven workflows. Our <strong>Node.js development</strong> approach keeps services consistent and easy to maintain. We standardize patterns for routing, validation, logging, and error handling. For complex products, <strong>custom Node.js application development</strong> helps avoid fragile script sprawl and supports clean scaling.",
        "Krasty Soft builds backends with a clear separation between business logic and integrations. You get services that are easier to evolve as the product grows."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "Crypto",
        "Web3",
        "Maritime Transportation"
      ]
    }
  }
];

export function getTechBySlug(slug: string): TechDetail | undefined {
  return TECH_DETAILS.find(tech => tech.slug === slug);
}

export function getAllTechSlugs(): string[] {
  return TECH_DETAILS.map(tech => tech.slug);
}
