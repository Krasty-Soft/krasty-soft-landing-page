import React from "react";
import { Slider } from "@/components";

const slides = [1, 2, 3, 4]

export const Cases = () => {


  return (
    <section className="bg-background">
      <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 xl:px-c-200 xl:py-c-100">
        <p
          className="section-label text-dark-grey"
        >
          CASE STUDIES
        </p>
        <h2
          className="section-header mb-6 md:mb-8 lg:mb-9 xl:mb-c-60 lg:max-w-2xl xl:max-w-3xl"
        >
          Real-world insights and success stories.
        </h2>

        <Slider slides={slides} />
      </div>
    </section>
  )
}
