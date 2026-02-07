import React from "react";
import { Posts } from "@/components/blocks/blog/posts";
import { Section } from "@/components/ui";

export const Blog = () => {
  return (
    <Section
      variant="transparent"
      subtitle="Blog"
      title="Useful articles on design, analytics, and development."
    >
      <Posts />
    </Section>
  )
}
