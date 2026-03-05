import { getTechBySlug } from "@/lib/techs";
import { generateSEO } from "@/lib/seo";
import { notFound } from "next/navigation";
import TechTemplate from "../technologies/tech-template";

export const metadata = generateSEO({
    title: "Python Development Services",
    description:
        "Backend logic, data-heavy workflows, and API-first platforms. Expert Python web development services.",
    path: "/python",
});

export default function PythonPage() {
    const tech = getTechBySlug("python");
    if (!tech) return notFound();

    return <TechTemplate tech={tech} />;
}
