import {
  generateSEO,
  generateBreadcrumbSchema,
  generateAboutPageSchema,
  StructuredData,
} from "@/lib/seo";
import { TEAM_MEMBERS } from "@/lib/team";
import { Metadata } from "next";
import AboutClient from "./client";

export const metadata: Metadata = generateSEO({
  title: "About Us - Our Story & Team",
  description:
    "Learn about Krasty Soft - a software development company based in Ukraine. Meet our expert team, discover our values, and see why clients trust us for their software projects.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  const aboutPageSchema = generateAboutPageSchema({
    teamMembers: TEAM_MEMBERS.map((member) => ({
      name: member.name,
      position: member.position,
      email: member.email,
      linkedin: member.linkedin,
    })),
  });

  return (
    <>
      <StructuredData data={[breadcrumbSchema, aboutPageSchema]} />
      <AboutClient />
    </>
  );
}
