import { getTechBySlug } from "@/lib/techs";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Node.js Development Services | Krasty Soft",
  description:
    "Fast, integration-heavy backends and real-time features. Expert Node.js development services.",
};

export default function NodePage() {
  const tech = getTechBySlug("node");
  if (!tech) return notFound();

  return <TechTemplate tech={tech} />;
}
