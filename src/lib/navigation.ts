type NavigationItem = {
  slug: string;
  label: string;
  description: string;
};

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
      description: "",
    },
    {
      slug: "healthcare",
      label: "Healthcare",
      description: "",
    },
    {
      slug: "e-commerce",
      label: "E-commerce",
      description: "",
    },
    {
      slug: "saas",
      label: "SaaS",
      description: "",
    },
  ],
  services: [
    {
      slug: "ai-development",
      label: "AI Development",
      description: "",
    },
    {
      slug: "ai-automation",
      label: "AI Automation",
      description: "",
    },
    {
      slug: "custom-software-development",
      label: "Custom Software Development",
      description: "",
    },
    {
      slug: "backend-development",
      label: "Backend Development",
      description: "",
    },
    {
      slug: "frontend-development",
      label: "Frontend Development",
      description: "",
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
