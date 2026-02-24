import RetoolIcon from "@/assets/retool.svg";
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
    title: "Retool",
    description:
      "We are Certified Retool Partner. We deliver complex internal applications, admin panels, and dashboards in days, not months, maximizing your operational efficiency with validated best practices.",
    icon: RetoolIcon,
    link: "/retool",
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
    link: undefined,
  },
] as const;
