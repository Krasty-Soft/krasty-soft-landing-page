import React from "react";
import Icon1 from '@/assets/benefit-tech.svg';
import Icon2 from '@/assets/benefit-time.svg';
import Icon3 from '@/assets/benefit-world.svg';
import Icon4 from '@/assets/benefit-quality.svg';
import Icon5 from '@/assets/benefit-innovation.svg';
import Icon6 from '@/assets/benefit-perfection.svg';
import { Section } from "@/components/ui";

const icons = {
  Tech: Icon1,
  Strategic: Icon2,
  Global: Icon3,
  Perfection: Icon4,
  Innovation: Icon5,
  Quality: Icon6,
}

const features = [
  {
    title: 'Tech',
    description: 'Cutting-edge tools.',
  },
  {
    title: 'Strategic',
    description: 'Solutions that convert.',
  },
  {
    title: 'Global',
    description: 'Delivering top-tier services worldwide.',
  },
  {
    title: 'Perfection',
    description: 'Unforgettable digital presence.',
  },
  {
    title: 'Innovation',
    description: 'Your vision, powered by technology.',
  },
  {
    title: 'Quality',
    description: 'No compromises. Just excellence.',
  },
] as const;

export const Difference = ({ isDark = true } : { isDark?: boolean }) => {
  return (
    <Section
      variant={isDark ? 'black' : 'paper'}
      subtitle={'the difference'}
      title={'Development that sets you apart.'}
    >
      <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4 lg:gap-6 xl:gap-8">
        {
          features.map((item, index) => {
            const Icon = icons[item.title]
            return (
              <li
                key={index}
                className={`border ${isDark ? 'border-white' : 'border-light-grey'} rounded-full py-2 px-6 lg:py-3 lg:px-7 xl:px-7 xl:py-8`}
              >
                <div className="flex gap-3 items-center lg:gap-5 xl:gap-6">
                  <div className={`center ${isDark ? 'bg-white' : 'bg-black'} rounded-full h-10 w-10 xl:h-c-60 xl:w-c-60 flex-fixed`}>
                    <Icon stroke={'white'} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm lg:text-base xl:text-xl">{item.title}</div>
                    <div className={`text-xs lg:text-sm xl:text-base ${isDark ? 'text-white' : 'text-dark-grey'}`}>{item.description}</div>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </Section>
  )
}
