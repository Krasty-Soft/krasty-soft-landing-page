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
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    subtitle: "AI Automation Services",
    brandColor: "#8B5CF6",
    introParagraphs: [
      "<strong>AI automation services</strong> put language models and agents to work on the repetitive tasks that slow teams down — triaging tickets, extracting data from documents, drafting replies, and running multi-step workflows end to end. We connect these agents to your real systems, so they don't just suggest — they act.",
      "As an <strong>AI automation company</strong>, Krasty Soft builds automations that are reliable in production, not brittle demos. We add guardrails, human review where it matters, and clear logging so you can trust the output. In practice, <strong>AI automation</strong> removes hours of manual work each week and keeps data flowing between tools without copy-paste."
    ],
    whatWeBuild: {
      title: "What We Automate with AI",
      items: [
        "Support ticket triage, tagging, and drafted replies.",
        "Document extraction, classification, and enrichment.",
        "Lead qualification and CRM data hygiene.",
        "Multi-step agent workflows across your tools.",
        "Report generation and scheduled data digests.",
        "Email, Slack, and back-office task automation."
      ]
    },
    whyChoose: {
      title: "Why AI Automation for Your Business",
      paragraphs: [
        "<strong>AI automation</strong> pays off fastest where work is high-volume, rule-heavy, or spread across systems. We start from a concrete task, measure the baseline, and ship an automation that moves the number — deflected tickets, faster turnaround, fewer errors. Every workflow ships with evaluation so quality holds as inputs change.",
        "Our <strong>AI automation company</strong> approach keeps automations maintainable and safe. We standardize prompts, tools, and error handling so new workflows build on the same foundation, and add human-in-the-loop checkpoints wherever a mistake would be costly."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "Customer Support",
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Logistics",
        "Recruitment & HR",
        "SaaS",
        "Marketing & Advertising"
      ]
    }
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    subtitle: "Backend Development Services",
    brandColor: "#16A34A",
    introParagraphs: [
      "<strong>Backend development services</strong> build the reliable core your product runs on — APIs, databases, authentication, and integrations that stay fast and secure under load. We design systems that are simple to reason about and safe to change as your product grows.",
      "As a <strong>backend development company</strong>, Krasty Soft delivers backends that scale without surprises. We model your data carefully, keep business rules explicit, and instrument everything so issues are caught early. In practice, solid <strong>backend development</strong> means fewer outages, predictable performance, and clean integrations with the services you depend on."
    ],
    whatWeBuild: {
      title: "What We Build on the Backend",
      items: [
        "REST and GraphQL APIs for web and mobile.",
        "Database architecture and query optimization.",
        "Authentication, authorization, and security.",
        "Serverless and event-driven services.",
        "Real-time features with WebSockets and queues.",
        "Third-party and payment integrations."
      ]
    },
    whyChoose: {
      title: "Why Invest in Solid Backend Development",
      paragraphs: [
        "<strong>Backend development</strong> is where most reliability and cost problems are won or lost. We prioritize clear data models, explicit boundaries, and good observability, so the system stays maintainable as features and traffic grow. That keeps release velocity high and on-call quiet.",
        "Our <strong>backend development company</strong> approach favors proven technology and strong tests over cleverness. We build APIs your frontend and partners can rely on, and support the system end-to-end — from schema design to monitoring in production."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "FinTech",
        "Healthcare",
        "E-commerce",
        "SaaS",
        "Logistics",
        "Marketing & Advertising",
        "Maritime Transportation",
        "Crypto & Web3"
      ]
    }
  },
  {
    slug: "frontend-development",
    title: "Frontend Development",
    subtitle: "Frontend Development Services",
    brandColor: "#0EA5E9",
    introParagraphs: [
      "<strong>Frontend development services</strong> turn designs into fast, accessible, responsive web applications your users enjoy. We build interfaces that load quickly, work on every screen, and stay consistent as the product grows — from marketing sites to complex dashboards.",
      "As a <strong>frontend development company</strong>, Krasty Soft ships polished UIs backed by clean, maintainable code. We care about performance (Core Web Vitals), accessibility, and a component system that scales. In practice, good <strong>frontend development</strong> means higher conversion, lower bounce, and a product that feels professional."
    ],
    whatWeBuild: {
      title: "What We Build on the Frontend",
      items: [
        "Custom web applications and SaaS interfaces.",
        "Pixel-accurate UI/UX design implementation.",
        "Reusable design systems and component libraries.",
        "Data-heavy dashboards and admin panels.",
        "Performance and Core Web Vitals optimization.",
        "Responsive, accessible, cross-browser builds."
      ]
    },
    whyChoose: {
      title: "Why Frontend Development Matters",
      paragraphs: [
        "<strong>Frontend development</strong> is what your customers actually experience. A fast, clear interface builds trust and drives conversion; a slow or clumsy one costs you users no matter how good the backend is. We treat performance and accessibility as features, not afterthoughts.",
        "Our <strong>frontend development company</strong> approach keeps UIs maintainable with a shared component system, so new screens stay consistent and quick to build. We implement designs faithfully and optimize until the experience is genuinely fast."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "SaaS",
        "E-commerce",
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "Recruitment & HR",
        "Media"
      ]
    }
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    subtitle: "E-commerce Development Services",
    brandColor: "#F97316",
    introParagraphs: [
      "<strong>E-commerce development services</strong> build storefronts and commerce systems that convert and scale — fast product pages, smooth checkout, reliable inventory, and the integrations that keep orders, payments, and fulfillment in sync. We build for revenue, not just for launch.",
      "As an <strong>e-commerce development company</strong>, Krasty Soft delivers custom and headless commerce tailored to how you actually sell. We connect storefronts to payment, ERP, and analytics, and keep the buying experience fast on every device. In practice, better <strong>e-commerce development</strong> means higher conversion and fewer operational headaches."
    ],
    whatWeBuild: {
      title: "What We Build for E-commerce",
      items: [
        "Custom and headless storefronts.",
        "Checkout, payments, and subscription flows.",
        "Inventory, orders, and fulfillment systems.",
        "Marketplace and multi-vendor platforms.",
        "Product data pipelines and integrations.",
        "Analytics and marketing-attribution dashboards."
      ]
    },
    whyChoose: {
      title: "Why Choose Us for E-commerce",
      paragraphs: [
        "<strong>E-commerce development</strong> lives or dies on speed and reliability — a slow page or a broken checkout costs sales immediately. We build storefronts that stay fast under traffic and keep the order-to-fulfillment pipeline accurate, so operations don't break as you grow.",
        "Our <strong>e-commerce development company</strong> approach connects the whole stack — storefront, payments, inventory, and analytics — into one reliable system. We integrate with the platforms and marketplaces you already use, and support it end-to-end."
      ]
    },
    industries: {
      title: "What We Build & Integrate",
      list: [
        "Shopify & Headless Commerce",
        "Custom Storefronts",
        "Payment Gateways",
        "Inventory & ERP Sync",
        "Marketplaces",
        "Subscription Billing",
        "Marketing Analytics",
        "Order Management"
      ]
    }
  },
  {
    slug: "saas",
    title: "SaaS",
    subtitle: "SaaS Development Services",
    brandColor: "#2563EB",
    introParagraphs: [
      "<strong>SaaS development services</strong> build multi-tenant products end to end — secure tenant isolation, subscription billing, admin and customer dashboards, and the integrations your users expect. We help you go from idea or MVP to a product that scales with your customer base.",
      "As a <strong>SaaS development company</strong>, Krasty Soft ships SaaS that's reliable, secure, and ready to grow. We handle the hard parts — auth, roles, billing, usage metering — so you can focus on the product. In practice, solid <strong>SaaS development</strong> means faster onboarding, predictable revenue, and fewer support fires."
    ],
    whatWeBuild: {
      title: "What We Build for SaaS",
      items: [
        "Multi-tenant architecture and tenant isolation.",
        "Subscription billing and usage metering (Stripe).",
        "Authentication, roles, and permissions.",
        "Customer and admin dashboards.",
        "Onboarding, notifications, and integrations.",
        "Usage analytics and reporting."
      ]
    },
    whyChoose: {
      title: "Why Choose Us for SaaS",
      paragraphs: [
        "<strong>SaaS development</strong> has a long tail of hard requirements — tenancy, billing, permissions, and reliability — that make or break the product later. We get these foundations right early, so adding features and customers doesn't mean rewriting the core.",
        "Our <strong>SaaS development company</strong> approach balances speed to market with an architecture that scales. We ship an MVP that's real, then grow it with metering, integrations, and analytics — supporting the system in production the whole way."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      list: [
        "FinTech",
        "Healthcare",
        "Marketing & Advertising",
        "Logistics",
        "E-commerce",
        "Recruitment & HR",
        "Data & Analytics",
        "Developer Tools"
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
