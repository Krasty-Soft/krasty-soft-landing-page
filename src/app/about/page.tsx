import {
  Difference,
  Opportunities,
  Technologies,
  ReviewsBlock,
} from "@/components/blocks";
import { Breadcrumbs } from "@/components";
import React from "react";
import OurExpertise from "@/components/blocks/our-expertise";
import Team from "@/components/blocks/team";

export default function Page() {
  return (
    <>
      <div className="container px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>
        <h1 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
          About Krasty Soft
        </h1>
        <div className="flex flex-col items-center justify-center">
          <p className="leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
            We are a young, ambitious Ukrainian company driven by innovation and
            a profound commitment to excellence in software development. Beyond
            just code, we pride ourselves on cultivating a vibrant, supportive
            work environment where lightness, openness, and transparent
            communication are at the heart of everything we do.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          world map + team
        </div>
        <h2 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
          Approach
        </h2>
        <div className="flex flex-col items-center justify-center">
          <p className="leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
            Our team comprises highly skilled and experienced{" "}
            <b>professionals</b> dedicated to solving complex technical
            challenges. We don&#39;t just execute instructions; we act as
            strategic partners. Our commitment means we approach every client
            project <b>as if it were our own</b>, ensuring unparalleled quality,
            proactive problem-solving, and solutions that are truly built for
            long-term success.{" "}
          </p>
        </div>
        <h2 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
          Our expertise:
        </h2>
        <OurExpertise />
        <h2 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
          Team
        </h2>
        <div className="flex flex-col items-center justify-center">
          <p className="leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
            Our leadership team is always ready to connect, understand your
            vision, and discuss how Krasty Soft can become your essential
            development partner.
          </p>
          <Team />
          <p className="leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
            Ready to discuss your next project with us? We&#39;re available for
            a call, a virtual coffee, or a detailed technical consultation.
          </p>
        </div>
      </div>
      <h1 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
        Let&#39;s build something great together.
      </h1>

      <Difference isDark={false} />
      <ReviewsBlock />
      <Technologies />
      <Opportunities />
    </>
  );
}
