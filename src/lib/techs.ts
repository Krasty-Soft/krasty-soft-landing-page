export interface TechDetail {
  slug: string;
  title: string;
  subtitle: string;
  brandColor: string;
  /** Optional override for the closing CTA heading (defaults to "Ready to build with <title>?"). */
  ctaHeading?: string;
  /** Optional override for the FAQ heading (defaults to "<title> — FAQ"). */
  faqTitle?: string;
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
    /** Optional lead paragraph rendered under the industries heading. */
    intro?: string;
    list: string[];
  };
}

export const TECH_DETAILS: TechDetail[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    subtitle: "Custom AI Development Services",
    brandColor: "#8B5CF6",
    introParagraphs: [
      "<strong>AI development services</strong> turn large language models, agents, and machine learning into working products — chat assistants, copilots, document and data pipelines, and automations that plug into your existing systems. We build features that read, reason over, and act on your data, not demos that stop at a prompt.",
      "As a <strong>generative AI development company</strong>, Krasty Soft ships production AI that teams actually rely on. We wire models to your databases, APIs, and workflows with guardrails, evaluation, and human-in-the-loop where it matters. In practice, <strong>AI development</strong> removes manual steps and surfaces answers and actions in one place."
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
      title: "Industries That Benefit from End-to-End AI Solutions",
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
    subtitle: "React JS Development Services",
    brandColor: "#61DAFB",
    introParagraphs: [
      "<strong>React.js development services</strong> cover building modern frontends for products that need speed and predictable UX. They are suited for interfaces that must remain responsive as usage and complexity increase. We provide <strong>React.js development services</strong> to deliver interfaces for platforms, dashboards, and internal tools where performance and component reuse matter. Our focus is clean component architecture and stable UI behavior under real usage.",
      "For teams that need flexible UI logic, a focused <strong>react js development company</strong> keeps the product easy to extend without redesigning the whole frontend."
    ],
    whatWeBuild: {
      title: "Custom React Projects We Build",
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
      title: "How React Development Services Benefit Your Business",
      paragraphs: [
        "React helps teams ship consistent interfaces and iterate quickly as requirements evolve. It supports a predictable UI layer even when backend logic and data sources change. With <strong>custom React development</strong>, UI changes don't turn into full rewrites. Reusable components and clear state patterns reduce regression risk.",
        "Our <strong>reactjs development services</strong> also cover <strong>react js web development services</strong> for frontends that need to scale with product complexity and user load."
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
      "<strong>Python web development services</strong> are a strong fit for backend logic, data-heavy workflows, and API-first platforms. We use Python to build reliable services that connect business rules with databases, integrations, and analytics — and, increasingly, with AI and machine-learning components that need the same data close at hand.",
      "As a <strong>python development company</strong>, Krasty Soft focuses on maintainable architecture and clear interfaces between services. Our <strong>python software development services</strong> cover REST and GraphQL APIs, data pipelines, automation, and <strong>custom</strong> back-office <strong>software</strong> built around how your business actually operates. We favour explicit modules, typed interfaces, and thorough tests, so backend logic stays readable for your team and predictable in production as requirements change."
    ],
    whatWeBuild: {
      title: "Custom Python Development Solutions We Deliver",
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
      title: "How Python Development Services Benefit Your Business",
      paragraphs: [
        "Python is efficient for building systems that handle structured data and automation with predictable behavior. It's a practical choice when reliability matters more than flashy frameworks. With <strong>Python web development services</strong>, teams get a backend that stays readable and easy to extend. Clear modules and clean APIs reduce the cost of change as requirements shift. Our <strong>Python web development services</strong> approach prioritizes stability, observability, and long-term support.",
        "As a <strong>python software development agency</strong>, Krasty Soft focuses on predictable delivery and production-grade quality: code review, automated tests, monitoring, and clear release process. This makes ongoing iteration safer for internal teams — you can add features and integrations without the fear that a change in one service quietly breaks another."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      intro:
        "Our <strong>python development team</strong> works where data and business logic meet. Fintech clients use Python for transaction processing, risk scoring, and reporting; healthcare for records integration and clinical data pipelines; e-commerce and marketing for analytics, pricing, and campaign automation. It is also the natural choice when a product needs AI features — recommendations, document processing, or forecasting — served from the same backend that already owns the data.",
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
      "<strong>Node.js development services</strong> help teams build fast, integration-heavy backends and real-time features. Node.js is a strong fit when your product depends on many external services, high concurrency, and constant data exchange — chat and notifications, live dashboards, payment and CRM integrations, or APIs serving both web and mobile clients.",
      "As a <strong>node.js development company</strong>, Krasty Soft designs services around clear contracts and predictable behaviour under load. We use event-driven architecture where it earns its place — webhooks, queues, and background jobs — so integrations stay responsive instead of blocking each other. Our <strong>node.js development solutions</strong> cover the full backend: API design, database access, authentication, third-party integrations, observability, and deployment. The result is a codebase your team can extend without rewriting the core as traffic and feature scope grow."
    ],
    whatWeBuild: {
      title: "Custom Node.js Development Solutions We Deliver",
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
      title: "How Node js Development Services Benefit Your Business",
      paragraphs: [
        "Node.js is a practical choice when your product needs quick I/O or many integrations. It works especially well for API-first platforms and event-driven workflows. Our <strong>Node.js development</strong> approach keeps services consistent and easy to maintain. We standardize patterns for routing, validation, logging, and error handling. For complex products, <strong>custom Node.js application development</strong> helps avoid fragile script sprawl and supports clean scaling.",
        "Krasty Soft builds backends with a clear separation between business logic and integrations. You get services that are easier to evolve as the product grows."
      ]
    },
    industries: {
      title: "Industries & Use Cases",
      intro:
        "Working with a specialised <strong>node js development agency</strong> pays off wherever systems must talk to each other in real time. In e-commerce we build order, inventory, and payment integrations; in fintech, secure transaction APIs and reporting services; in logistics, tracking and dispatch backends that handle constant status updates. Healthcare and SaaS teams use Node.js for patient or customer portals, notifications, and the API layer that keeps web and mobile clients in sync — all built to stay stable as request volume grows.",
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
    ctaHeading: "Ready to Improve Your Business with AI Automation?",
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
      "As a <strong>backend development company</strong>, Krasty Soft delivers <strong>backend solutions</strong> that scale without surprises. We model your data carefully, keep business rules explicit, and instrument everything so issues surface early rather than during an incident. That covers API design, database architecture, authentication and authorisation, background processing, caching, and the integrations your product depends on. In practice it means fewer outages, predictable performance under load, and a system your team can extend safely."
    ],
    whatWeBuild: {
      title: "Backend Development Solutions We Provide",
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
      title: "Business Benefits of Custom Backend Development",
      paragraphs: [
        "<strong>Backend development</strong> is where most reliability and cost problems are won or lost. We prioritize clear data models, explicit boundaries, and good observability, so the system stays maintainable as features and traffic grow. That keeps release velocity high and on-call quiet.",
        "Our <strong>back end development services</strong> favour proven technology and strong tests over cleverness. As an engineering <strong>agency</strong> we build APIs your frontend and partners can rely on — versioned, documented, and covered by automated tests — and support the system end-to-end, from schema design to monitoring in production."
      ]
    },
    faqTitle: "Custom Backend Solutions — FAQ",
    ctaHeading: "Ready to Start Your Backend Development Project?",
    industries: {
      title: "Industries & Use Cases",
      intro:
        "A well-built <strong>backend app</strong> looks different in every sector, but the demands rhyme: fintech needs auditable transactions and strict access control; healthcare needs secure records handling and reliable integrations with clinical systems; e-commerce and logistics need accurate stock, order, and tracking data flowing between services in near real time. We design the data model and service boundaries around those realities first, then build the APIs on top.",
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
      "As a <strong>frontend development company</strong>, Krasty Soft ships polished UIs backed by clean, maintainable code. Our <strong>frontend services</strong> cover design implementation, component libraries and design systems, state and data handling, accessibility, and performance work against Core Web Vitals. We build with React and Next.js in TypeScript, so screens stay consistent and quick to add. In practice that means higher conversion, lower bounce, and a product that feels professional on every device."
    ],
    whatWeBuild: {
      title: "Front-End Development Services We Provide",
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
      title: "Business Benefits of Custom Frontend Development",
      paragraphs: [
        "<strong>Frontend development</strong> is what your customers actually experience. A fast, clear interface builds trust and drives conversion; a slow or clumsy one costs you users no matter how good the backend is. We treat performance and accessibility as features, not afterthoughts.",
        "Our <strong>front end web development solutions</strong> keep UIs maintainable through a shared component system, so new screens stay consistent and quick to build instead of drifting apart over time. We implement designs faithfully, test on real devices, and optimise until the experience is genuinely fast — not just fast on a developer's laptop."
      ]
    },
    faqTitle: "Front-end services — FAQ",
    ctaHeading: "Ready to Start Your Frontend Development Project?",
    industries: {
      title: "Industries & Use Cases",
      intro:
        "Teams hire a <strong>front end developer agency</strong> when the interface becomes the bottleneck — a SaaS dashboard that slows down as data grows, an e-commerce storefront losing conversions to slow pages, a fintech or healthcare portal that must be accessible and reliable under scrutiny. We work across those contexts, matching the interface to the data behind it and keeping the codebase easy for your own developers to pick up.",
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
    subtitle: "Ecommerce Software Development Services",
    brandColor: "#F97316",
    introParagraphs: [
      "<strong>Ecommerce software development services</strong> build storefronts and commerce systems that convert and scale — fast product pages, smooth checkout, reliable inventory, and the integrations that keep orders, payments, and fulfilment in sync. We build for revenue, not just for launch.",
      "As an ecommerce development <strong>company</strong>, Krasty Soft delivers <strong>customized ecommerce solutions</strong> shaped around how you actually sell — B2C storefronts, B2B portals with account pricing, marketplaces, or headless frontends on top of an existing platform. We connect the storefront to payments, ERP, and analytics so stock levels, orders, and revenue reporting stay accurate without manual work. The result is a buying experience that stays fast on every device and an operation that doesn't break when volume spikes."
    ],
    whatWeBuild: {
      title: "Custom Ecommerce Solutions We Deliver",
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
      title: "Why Choose Us for Custom Ecommerce Development",
      paragraphs: [
        "<strong>E-commerce development</strong> lives or dies on speed and reliability — a slow page or a broken checkout costs sales immediately. We build storefronts that stay fast under traffic and keep the order-to-fulfillment pipeline accurate, so operations don't break as you grow.",
        "Our approach connects the whole stack — storefront, payments, inventory, and analytics — into one reliable system. When an off-the-shelf theme starts limiting merchandising or margins, a <strong>bespoke ecommerce platform</strong> or a custom <strong>application</strong> layer gives you control over pricing rules, catalogue logic, and checkout. We integrate with the platforms and marketplaces you already use, and support the system end-to-end after launch."
      ]
    },
    faqTitle: "E-commerce development services — FAQ",
    industries: {
      title: "What We Build & Integrate for E-commerce",
      intro:
        "As an ecommerce <strong>agency</strong>, we deliver <strong>ecommerce solutions services</strong> across the whole commerce stack rather than a single storefront. That means headless and custom storefronts, payment and subscription billing, inventory and ERP synchronisation, marketplace and multi-vendor logic, and the analytics that show which channels actually earn. Each integration is built to be observable and recoverable, so a failed payment webhook or a delayed stock update surfaces immediately instead of quietly corrupting orders.",
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
      "As a SaaS development <strong>company</strong>, Krasty Soft ships <strong>software</strong> that is reliable, secure, and ready to grow. <strong>SaaS application development</strong> has a long tail of unglamorous requirements — authentication and roles, per-tenant data isolation, plans and proration, usage metering, audit logs — and getting them right early is what keeps the product cheap to run later. We build those foundations first, then layer product features on top, so onboarding a new customer is a configuration change rather than an engineering project."
    ],
    whatWeBuild: {
      title: "SaaS Development Solutions We Deliver",
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
      title: "Why Choose Us for Custom SaaS Development",
      paragraphs: [
        "<strong>SaaS development</strong> has a long tail of hard requirements — tenancy, billing, permissions, and reliability — that make or break the product later. We get these foundations right early, so adding features and customers doesn't mean rewriting the core.",
        "Our approach balances speed to market with an architecture that scales. We ship an MVP that is genuinely usable, then grow it with metering, integrations, and analytics. Where a generic template would limit your pricing model or workflow, a <strong>bespoke saas application</strong> gives you control — and our <strong>solutions</strong> are supported in production the whole way, not handed over at launch."
      ]
    },
    faqTitle: "SaaS product development services — FAQ",
    industries: {
      title: "What We Build & Integrate for SaaS",
      intro:
        "Our <strong>saas platform development</strong> work covers the full product surface: the <strong>web</strong> application and customer dashboards, the admin and back-office tooling your team runs the business from, and the <strong>app</strong> integrations that connect billing, CRM, analytics, and support. As a product <strong>agency</strong> we also handle the parts founders often postpone — subscription and proration logic, usage metering, SSO and role management, and per-tenant reporting — so the platform is ready for enterprise customers when they arrive.",
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
