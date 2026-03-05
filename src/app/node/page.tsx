import { getTechBySlug } from "@/lib/techs";
import { generateSEO } from "@/lib/seo";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";

export const metadata = generateSEO({
    title: "Node.js Development Services",
    description:
        "Fast, integration-heavy backends and real-time features. Expert Node.js development services.",
    path: "/node",
    tags: ["node.js development", "nodejs", "backend development", "real-time apps", "API development", "javascript backend"],
});

export default function NodePage() {
    const tech = getTechBySlug("node");
    if (!tech) return notFound();

    return <TechTemplate tech={tech} />;
}
