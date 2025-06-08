import React from "react";
import PAGES from "@/lib/navigation";
import Icon1 from '@/assets/maritime.svg';
import Icon2 from '@/assets/health-care.svg';
import Icon3 from '@/assets/fin-tech.svg';
import Icon4 from '@/assets/protect.svg';
import { ArrowLink, Section } from "@/components/ui";

const icons = {
  ['Maritime Transportation']: Icon1,
  Healthcare: Icon2,
  FinTech: Icon3,
  Insurance: Icon4,
};

export const Industries = () => {
  return (
    <Section variant={'paper'} subtitle={'INDUSTRIES'} title={'Tailored solutions for leading industries.'}>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        {
          PAGES.industries.map((item, index) => {
            const Icon = icons[item.label]
            return (
              <li key={index} className="bg-white p-5 lg:p-6 xl:p-8 rounded-[20px]">
                <div className="h-8 w-8 center bg-black rounded-full mb-7 lg:mb-6 xl:mb-8 lg:h-10 lg:w-10 xl:h-c-50 xl:w-c-50">
                  <Icon className="lg:scale-150" />
                </div>
                <h3 className="font-semibold text-base mb-3 lg:mb-2 tracking-wider lg:text-lg xl:text-1xl">{item.label}</h3>
                <p className="font-medium text-sm leading-loose mb-8 xl:text-base xl:mb-11">{item.description}</p>
                <ArrowLink to={`/${item.slug}`} />
              </li>
            )
          })
        }
      </ul>
    </Section>
  )
}
