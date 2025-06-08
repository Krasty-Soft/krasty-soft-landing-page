'use client'

import Star from '@/assets/Star.svg';
import { Button } from "@/components/ui";

export const Banner = () => {
  return (
    <section className="rounded-b-2xl px-4 py-11 flex flex-col items-center md:py-14 lg:py-16 xl:py-c-100">
      <div className="flex items-center gap-2 px-c-22 py-2 border border-light-grey rounded-[28px] md:text-xs lg:text-sm xl:text-lg">
        <Star />
        <div className=""></div>
        Available for new projects
      </div>
      <h1 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
        Software company you can trust
      </h1>
      <p className="text-sm leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
        At Krasty Soft we build software products which solve your business problems and challenges.
      </p>
      <Button
        title={'Get started today'}
        onClick={() => console.log('')}
        classes="px-8 py-3 text-sm mt-8 mb-8 md:mt-6 md:mb-10 max-md:w-full lg:mt-11 lg:mb-12 xl:mt-9 xl:mb-15"
      />
      <div>
        clutch block
      </div>
    </section>
  )
}
