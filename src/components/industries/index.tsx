import React from "react";
import { industries } from "@/constants/menu";
import Icon1 from '@/assets/maritime.svg';
import Icon2 from '@/assets/health-care.svg';
import Icon3 from '@/assets/fin-tech.svg';
import Icon4 from '@/assets/protect.svg';
import {ArrowLink} from "@/components";

const icons = {
  ['Maritime Transportation']: Icon1,
  Healthcare: Icon2,
  FinTech: Icon3,
  Insurance: Icon4,
};

export const Industries = () => {
  return (
    <section className="bg-background">
      <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 xl:px-c-200 xl:py-c-100">

        <p
          className="section-label text-dark-grey"
        >
          INDUSTRIES
        </p>
        <h2
          className="section-header mb-6 lg:mb-9 xl:mb-c-60 lg:max-w-2xl xl:max-w-3xl"
        >
          Tailored solutions for leading industries.
        </h2>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
          {
            industries.map((item, index) => {
              const Icon = icons[item.title]
              return (
                <li key={index} className="bg-white p-5 lg:p-6 xl:p-8 rounded-[20px]">
                  <div className="h-8 w-8 center bg-black rounded-full mb-7 lg:mb-6 xl:mb-8 lg:h-10 lg:w-10 xl:h-c-50 xl:w-c-50">
                    <Icon className="lg:scale-150" />
                  </div>
                  <h3 className="font-semibold text-base mb-3 lg:mb-2 tracking-wider lg:text-lg xl:text-1xl">{item.title}</h3>
                  <p className="font-medium text-sm leading-loose mb-8 xl:text-base xl:mb-11">{item.description}</p>
                  <ArrowLink to={item.link} />
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>)
}
