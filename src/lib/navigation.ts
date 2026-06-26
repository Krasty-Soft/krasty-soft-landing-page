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
      slug: "healthcare",
      label: "Healthcare",
      description: "",
      // "Telemedicine platforms, patient management systems, EHR solutions, and medical data security.",
    },
    {
      slug: "fintech",
      label: "FinTech",
      description: "",
      // "Crypto solutions, payment gateways, investments app, SaaS etc. Bring your fintech idea into life!",
    },
  ],
  services: [
    {
      slug: "custom-software-development",
      label: "Custom Software Development",
      description: "",
      //  "Design, develop, and deploy custom software solutions tailored to your specific business needs.",
    },
  ],
  technologies: [
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
