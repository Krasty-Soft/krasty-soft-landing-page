import { getTechBySlug } from "@/lib/techs";
import { generateSEO } from "@/lib/seo";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";

export const metadata = generateSEO({
    title: "Retool Platform - Build Internal Tools Fast",
    description:
        "Low-code platform for building internal apps fast: dashboards, admin panels, and workflow tools. Expert Retool development company.",
    path: "/retool",
    tags: ["retool", "low-code", "internal tools", "retool platform", "admin panels", "dashboards"],
});

export default function RetoolPage() {
    const tech = getTechBySlug("retool");
    if (!tech) return notFound();

    return <TechTemplate tech={tech} />;
}
