import { getTechBySlug } from "@/lib/techs";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React.js Development Services | Krasty Soft",
  description:
    "Building modern frontends for SaaS platforms, dashboards, and internal tools. Expert React.js development services.",
};

export default function ReactPage() {
  const tech = getTechBySlug("react");
  if (!tech) return notFound();

  return <TechTemplate tech={tech} />;
}
