import AiIcon from "@/assets/ai.svg";
import ReactIcon from "@/assets/react.svg";
import PythonIcon from "@/assets/python.svg";
import NodeJsIcon from "@/assets/node.svg";
import ConsultancyIcon from "@/assets/consultancy.svg";

export type ExpertiseItem = {
  title: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link?: string;
};

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: "AI Development",
    description:
      "We ship production AI — agents, LLM integrations, RAG systems, and copilots wired into your data and workflows with guardrails and evaluation. We build for measurable outcomes, not demos.",
    icon: AiIcon,
    link: "/ai-development",
  },
  {
    title: "React",
    description:
      "We build highly interactive, modern, and scalable Front-End applications. Our expertise ensures fast performance and exceptional user experiences for your public-facing or corporate web products.",
    icon: ReactIcon,
    link: "/react",
  },
  {
    title: "Python",
    description:
      "We architect powerful and reliable backends, specializing in high-performance data processing, custom APIs, and efficient Elasticsearch implementation for robust search capabilities.",
    icon: PythonIcon,
    link: "/python",
  },
  {
    title: "Node.js",
    description:
      "We build fast, integration-heavy backends and real-time features. It's a strong fit when your product relies on many external services and data exchanges.",
    icon: NodeJsIcon,
    link: "/node",
  },
  {
    title: "Consultancy",
    description:
      "We provide expert Technical Consultation and architecture strategy, ensuring your project is built on solid, future-proof decisions that align directly with your business goals.",
    icon: ConsultancyIcon,
    link: "/#contacts",
  },
] as const;
