import { getTechBySlug } from "@/lib/techs";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retool Development Services | Krasty Soft",
  description:
    "Low-code platform for building internal apps fast: dashboards, admin panels, and workflow tools. Expert Retool development company.",
};

export default function RetoolPage() {
  const tech = getTechBySlug("retool");
  if (!tech) return notFound();

  return <TechTemplate tech={tech} />;
}
