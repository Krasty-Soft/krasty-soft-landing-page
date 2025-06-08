import React from "react";
import { Slide } from "./slide";
import { Section, Slider } from "@/components/ui";

const slides = [1, 2, 3, 4]

export const Cases = () => {
  return (
    <Section variant={'paper'} title={'Real-world insights and success stories.'} subtitle={'CASE STUDIES'}>
      <Slider>
        {slides.map((slide, index) => (
          <Slide slide={slide} key={index} />
        ))}
      </Slider>
    </Section>
  )
}
