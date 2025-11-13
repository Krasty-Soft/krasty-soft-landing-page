import RetoolIcon from "@/assets/retool.svg";
import ReactIcon from "@/assets/react.svg";
import PythonIcon from "@/assets/python.svg";
import CooperationIcon from "@/assets/cooperation.svg";

export type ExpertiseItem = {
  title: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: "Retool",
    description:
      "We are Certified Retool Partner. We deliver complex internal applications, admin panels, and dashboards in days, not months, maximizing your operational efficiency with validated best practices.",
    icon: RetoolIcon,
  },
  {
    title: "React",
    description:
      "We build highly interactive, modern, and scalable Front-End applications. Our expertise ensures fast performance and exceptional user experiences for your public-facing or corporate web products.",
    icon: ReactIcon,
  },
  {
    title: "Python",
    description:
      "We architect powerful and reliable backends, specializing in high-performance data processing, custom APIs, and efficient Elasticsearch implementation for robust search capabilities.",
    icon: PythonIcon,
  },
  {
    title: "Consultancy",
    description:
      "We provide expert Technical Consultation and architecture strategy, ensuring your project is built on solid, future-proof decisions that align directly with your business goals.",
    icon: CooperationIcon,
  },
] as const;
