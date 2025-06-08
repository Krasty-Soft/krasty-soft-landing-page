import React from "react";
import { Jobs } from "./jobs";
import { Section } from "@/components/ui";
import { jobs } from "@/lib/jobs";

export const Opportunities = () => {
  return (
    <Section
      variant={'paper'}
      subtitle={'CAREERS'}
      title={'Exciting opportunities and a supportive environment.'}
    >
      <Jobs jobs={jobs} />
    </Section>
  )
}
