import { Difference } from "@/components/blocks";
import { Breadcrumbs } from "@/components";
import React from "react";
import OurExpertise from "@/components/blocks/our-expertise";
import Team from "@/components/blocks/team";
import WorldMapImage from "@/assets/world-map-ukraine.jpg";
import { Image } from "@/components/ui";

export default function Page() {
  const mockSrc = "https://placehold.co/600x400.png";
  const worldMapSrc = WorldMapImage.src;
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
          <p className="text-sm md:text-base text-center tracking-wider md:max-w-[530px] lg:max-w-[1300px] xl:max-w-[1100px] leading-relaxed">
            We are a young, ambitious Ukrainian company driven by innovation and
            a profound commitment to excellence in software development. Beyond
            just code, we pride ourselves on cultivating a vibrant, supportive
            work environment where lightness, openness, and transparent
            communication are at the heart of everything we do.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16">
          <div className="w-full md:w-1/2">
            <Image
              src={worldMapSrc}
              alt="World Map"
              wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src={mockSrc}
              alt="PICTURE 1"
              wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden"
            />
          </div>
        </div>
        <h2 className="text-1xl leading-9 font-bold text-center mt-12 md:mt-16 lg:mt-20 mb-4 tracking-wider lg:text-3xl-plus md:mb-3 lg:mb-4 xl:text-5xl-plus xl:mb-6">
          Approach
        </h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm md:text-base text-center tracking-wider md:max-w-[530px] lg:max-w-[1300px] xl:max-w-[1100px] leading-relaxed">
            Our team comprises highly skilled and experienced{" "}
            <b>professionals</b> dedicated to solving complex technical
            challenges. We don&#39;t just execute instructions; we act as
            strategic partners. Our commitment means we approach every client
            project <b>as if it were our own</b>, ensuring unparalleled quality,
            proactive problem-solving, and solutions that are truly built for
            long-term success.{" "}
          </p>
        </div>
        <h2 className="text-1xl leading-9 font-bold text-center mt-12 md:mt-16 lg:mt-20 mb-4 tracking-wider lg:text-3xl-plus md:mb-3 lg:mb-4 xl:text-5xl-plus xl:mb-6">
          Our expertise:
        </h2>
        <OurExpertise />
        <h2 className="text-1xl leading-9 font-bold text-center mt-12 md:mt-16 lg:mt-20 mb-4 tracking-wider lg:text-3xl-plus md:mb-3 lg:mb-4 xl:text-5xl-plus xl:mb-6">
          Team
        </h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm md:text-base text-center tracking-wider md:max-w-[530px] lg:max-w-[1300px] xl:max-w-[1100px] leading-relaxed">
            Our leadership team is always ready to connect, understand your
            vision, and discuss how Krasty Soft can become your essential
            development partner.
          </p>
          <div className="mt-6 md:mt-8">
            <Team />
          </div>
          <p className="text-sm md:text-base text-center tracking-wider md:max-w-[530px] lg:max-w-[1300px] xl:max-w-[1100px] leading-relaxed mt-6 md:mt-8">
            Ready to discuss your next project with us? We&#39;re available for
            a call, a virtual coffee, or a detailed technical consultation.
          </p>
        </div>
      </div>
      <div className="w-full bg-red">
        <div className="container px-4 md:px-8 lg:px-c-50 xl:px-c-200">
          <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
            <h1 className="text-1xl leading-9 font-bold text-center tracking-wider lg:text-3xl-plus xl:text-5xl-plus text-white">
              Let&#39;s build something great together.
            </h1>
          </div>
        </div>
      </div>

      <Difference isDark={false} />
      {/* <ReviewsBlock />
      <Technologies />
      <Opportunities /> */}
    </>
  );
}
