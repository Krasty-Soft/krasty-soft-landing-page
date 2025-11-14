import type { StaticImageData } from "next/image";
import AleksandrImage from "@/assets/a-tynianov.webp";
import MarinaImage from "@/assets/m-krsnikova.webp";
import VolodymyrImage from "@/assets/v-shvedov.webp";
import RamiImage from "@/assets/r-dawi.jpeg";
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
    email: "aleks@krasty.me",
    linkedin: "https://www.linkedin.com/in/tynianov/",
  },
  {
    name: "Marina Krasnikova",
    position: "Co-Founder & CHRO",
    picture: MarinaImage,
    email: "marina.krasnikova@krasty.me",
    linkedin: "https://www.linkedin.com/in/marina-krasnikova/",
  },
  {
    name: "Volodymyr Shvedov",
    position: "Business Development Manager",
    picture: VolodymyrImage,
    email: "volodymyr.shvedov@krasty.me",
    linkedin: "https://www.linkedin.com/in/shvedr/",
  },
  {
    name: "Rami Dawi",
    position: "Business Development Consultant",
    picture: RamiImage,
    email: "rami.dawi@krasty.me",
    linkedin: "https://www.linkedin.com/in/ramidawi/",
  },
] as const;
