import React from "react";
import { Slide } from "./slide";
import { Section, Slider } from "@/components/ui";
import { cases } from "@/lib/cases";

export const Cases = () => {
  return (
    <Section variant={'paper'} title={'Real-world insights and success stories.'} subtitle={'CASE STUDIES'}>
      <Slider>
        {cases.map((item, i) => (
          <Slide slide={item} key={i} />
        ))}
      </Slider>
    </Section>
  )
}
