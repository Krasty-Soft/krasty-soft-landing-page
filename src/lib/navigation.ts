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
      slug: "maritime-transportation",
      label: "Maritime Transportation",
      description:
        "Ship tracking, fleet optimization, cargo management, and port logistics solutions.",
    },
    {
      slug: "healthcare",
      label: "Healthcare",
      description:
        "Telemedicine platforms, patient management systems, EHR solutions, and medical data security.",
    },
    {
      slug: "fintech",
      label: "FinTech",
      description:
        "Crypto solutions, payment gateways, investments app, SaaS etc. Bring your fintech idea into life!",
    },
    {
      slug: "insurance",
      label: "Insurance",
      description:
        "Claims automation, risk assessment tools, policy management systems, and fraud detection solutions.",
    },
  ],
  services: [
    {
      slug: "retool-development",
      label: "Retool Development",
      description:
        "Optimize your business processes with powerful, no-code Retool solutions tailored to your needs.",
    },
    {
      slug: "custom-software-development",
      label: "Custom Software Development",
      description:
        "Design, develop, and deploy custom software solutions tailored to your specific business needs.",
    },
    {
      slug: "retool-consulting",
      label: "Retool Consulting",
      description:
        "Get expert guidance to develop a Retool strategy that aligns with your business goals.",
    },
  ],
  technologies: [
    {
      slug: "retool",
      label: "Retool",
      description:
        "Retool is a platform for building internal tools and workflows without the need for coding.",
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
