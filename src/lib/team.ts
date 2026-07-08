import type { StaticImageData } from "next/image";
import AleksandrImage from "@/assets/a-tynianov.webp";
import MarinaImage from "@/assets/m-krsnikova.webp";
import VolodymyrImage from "@/assets/v-shvedov.webp";
import VadimImage from "@/assets/v-lysenko.webp";
export type TeamMember = {
  name: string;
  position: string;
  picture?: StaticImageData | string;
  email?: string;
  linkedin?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Aleksandr Tynianov",
    position: "Co-Founder & CTO",
    picture: AleksandrImage,
    linkedin: "https://www.linkedin.com/in/tynianov/",
  },
  {
    name: "Marina Krasnikova",
    position: "Co-Founder & CHRO",
    picture: MarinaImage,
    linkedin: "https://www.linkedin.com/in/marina-krasnikova/",
  },
  {
    name: "Volodymyr Shvedov",
    position: "Business Development Manager",
    picture: VolodymyrImage,
    linkedin: "https://www.linkedin.com/in/shvedr/",
  },
  {
    name: "Vadim Lysenko",
    position: "Lead Software Engineer",
    picture: VadimImage,
    linkedin: "https://www.linkedin.com/in/vadim-lysenko-06b03122a/",
  },
] as const;
