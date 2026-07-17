export type FAQItem = { question: string; answer: string };

// Company-level FAQ shown on the homepage. Written in plain, factual language so
// it doubles as ground-truth for LLMs (via FAQPage structured data) and as a
// visible section for visitors.
export const COMPANY_FAQ: FAQItem[] = [
  {
    question: "What does Krasty Soft do?",
    answer:
      "Krasty Soft is a B2B software development company. We build custom software, AI products (agents, LLM integrations, RAG systems), and web and backend systems for startups and enterprises — from MVPs to production-grade platforms.",
  },
  {
    question: "What industries does Krasty Soft work with?",
    answer:
      "We focus on fintech, healthcare, e-commerce, and SaaS, and have delivered projects across logistics, recruitment, marketing analytics, and Web3.",
  },
  {
    question: "Where is Krasty Soft based?",
    answer:
      "Krasty Soft is a Ukraine-based software development company working with clients worldwide, primarily across Europe and North America. Communication is in English.",
  },
  {
    question: "What technologies does Krasty Soft use?",
    answer:
      "Our core stack is React and Next.js on the frontend, Node.js and Python on the backend, and modern AI tooling (OpenAI, Anthropic Claude, RAG, and vector search). We choose the stack per project based on scale and requirements.",
  },
  {
    question: "What AI services does Krasty Soft offer?",
    answer:
      "We build production AI: chat assistants and copilots, RAG systems over your data, autonomous agents, document extraction, and LLM integrations into existing apps — shipped with guardrails and evaluation, not just demos.",
  },
  {
    question: "How does a project with Krasty Soft start?",
    answer:
      "Most engagements begin with a short discovery call to scope goals, timeline, and budget. Reach us through the contact form or book a call, and we propose an approach, team, and estimate.",
  },
  {
    question: "How much does a custom software project cost?",
    answer:
      "Cost depends on scope, complexity, and timeline. We work in flexible engagement models — fixed-scope or a dedicated team — and share a transparent estimate after a short discovery.",
  },
  {
    question: "Is Krasty Soft reviewed by clients?",
    answer:
      "Yes. Krasty Soft holds a 5-star rating on Clutch from verified client reviews and is recognized among top B2B software and API development companies.",
  },
];

// Per-service FAQ, keyed by page slug. Rendered on the matching service page
// plus its own FAQPage structured data. Kept here (not in techs.ts) so the
// content is easy to extend without touching the page-content model.
export const SERVICE_FAQ: Record<string, FAQItem[]> = {
  "ai-development": [
    {
      question: "What does an AI development company actually build?",
      answer:
        "Production AI features: chat assistants and copilots, RAG systems over your documents and databases, autonomous agents that run multi-step workflows, document extraction, and LLM integrations (OpenAI, Anthropic Claude) into your existing apps.",
    },
    {
      question: "Which AI models and tools does Krasty Soft work with?",
      answer:
        "We work with leading LLMs including OpenAI's GPT models and Anthropic's Claude, plus retrieval-augmented generation (RAG), vector search, and evaluation frameworks. We select the model per use case for cost, quality, and latency.",
    },
    {
      question: "How do you keep AI features reliable in production?",
      answer:
        "Every build ships with guardrails, evaluation, and human-in-the-loop where it matters, so results stay accurate as inputs and models change. We standardize prompts, retrieval, and tooling to keep the system maintainable.",
    },
  ],
  "ai-automation": [
    {
      question: "What is AI automation?",
      answer:
        "AI automation uses language models and agents to run repetitive knowledge work end-to-end — reading documents, extracting and classifying data, moving it between systems, and taking actions — with far less manual effort than hard-coded scripts.",
    },
    {
      question: "What processes can Krasty Soft automate?",
      answer:
        "Document processing and data entry, ticket triage and support replies, report generation, data pipelines and enrichment, and multi-step back-office workflows across your existing tools and APIs.",
    },
    {
      question: "How is AI automation different from traditional RPA?",
      answer:
        "Traditional RPA follows brittle, rule-based scripts. AI automation understands unstructured inputs like emails and PDFs, adapts to variation, and reasons over context — so it handles cases rigid scripts break on.",
    },
  ],
  "backend-development": [
    {
      question: "What backend development services does Krasty Soft offer?",
      answer:
        "API development (REST and GraphQL), database architecture and design, serverless backends, authentication and authorization, and security hardening — the scalable foundation your product runs on.",
    },
    {
      question: "Which backend technologies do you use?",
      answer:
        "Primarily Node.js and Python, with SQL and NoSQL databases, cloud platforms such as AWS and Vercel, and serverless where it fits. We pick the stack based on scale, team, and integration needs.",
    },
    {
      question: "Can you build APIs that integrate with our existing systems?",
      answer:
        "Yes. We design and build APIs that connect to your databases, third-party services, and internal tools, with clear contracts, documentation, and authentication.",
    },
  ],
  "frontend-development": [
    {
      question: "What frontend development services does Krasty Soft provide?",
      answer:
        "Custom web application development, UI/UX design implementation, performance optimization, and cross-platform builds — responsive, fast interfaces that match your product and brand.",
    },
    {
      question: "Which frontend frameworks do you use?",
      answer:
        "We specialize in React and Next.js, with TypeScript, modern CSS, and accessibility best practices, to build maintainable, high-performance web apps.",
    },
    {
      question: "Can you improve the performance of our existing web app?",
      answer:
        "Yes. We audit and optimize Core Web Vitals, bundle size, rendering, and loading strategy to make existing apps faster and more reliable.",
    },
  ],
  "e-commerce": [
    {
      question: "What e-commerce development services does Krasty Soft offer?",
      answer:
        "Custom storefronts, checkout and payment integrations, analytics dashboards, and back-office automation — conversion-focused e-commerce built around your operations.",
    },
    {
      question: "Do you build custom stores or use platforms?",
      answer:
        "Both. We build custom storefronts when you need flexibility, and integrate or extend platforms when speed matters — chosen around your catalog, scale, and margins.",
    },
    {
      question: "Can you integrate analytics and marketing tools?",
      answer:
        "Yes. We wire in analytics, ad platforms, and marketing tooling — including custom dashboards such as Amazon Ads analytics — so you can measure and grow revenue.",
    },
  ],
  saas: [
    {
      question: "What does Krasty Soft build for SaaS companies?",
      answer:
        "End-to-end SaaS products: multi-tenant architecture, subscription billing, admin and customer dashboards, authentication, and the APIs and integrations your product needs.",
    },
    {
      question: "Can you build a SaaS MVP?",
      answer:
        "Yes. We build MVPs that ship fast without painting you into a corner — a clean architecture you can scale as you add users and features.",
    },
    {
      question: "Do you support existing SaaS products?",
      answer:
        "Yes. We modernize legacy SaaS, add features, improve performance and reliability, and provide ongoing maintenance and support.",
    },
  ],
};
