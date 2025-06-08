import React from "react";
import { Posts } from "@/components/blocks/blog/posts";
import { Section } from "@/components/ui";

export const Blog = () => {
  return (
    <Section
      variant={'white'}
      subtitle={'Blog'}
      title={'Useful articles on design, analytics, and development.'}
    >
      <Posts />
    </Section>
  )
}
