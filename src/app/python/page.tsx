import { getTechBySlug } from "@/lib/techs";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python Web Development Services | Krasty Soft",
  description:
    "Backend logic, data-heavy workflows, and API-first platforms. Expert Python web development services.",
};

export default function PythonPage() {
  const tech = getTechBySlug("python");
  if (!tech) return notFound();

  return <TechTemplate tech={tech} />;
}
