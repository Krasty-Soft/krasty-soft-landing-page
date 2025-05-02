import React from "react";
import Icon1 from '@/assets/benefit-tech.svg';
import Icon2 from '@/assets/benefit-time.svg';
import Icon3 from '@/assets/benefit-world.svg';
import Icon4 from '@/assets/benefit-quality.svg';
import Icon5 from '@/assets/benefit-innovation.svg';
import Icon6 from '@/assets/benefit-perfection.svg';

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

export const Difference = () => {
  return (
    <section className="bg-black text-white">
      <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 xl:px-c-200 xl:py-c-100">
        <p
          className="section-label text-dark-grey"
        >
          the difference
        </p>
        <h2
          className="section-header mb-6 md:mb-8 lg:mb-9 xl:mb-c-60 lg:max-w-2xl xl:max-w-3xl"
        >
          Development that sets you apart.
        </h2>

        <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4 lg:gap-6 xl:gap-8">
          {
            features.map((item, index) => {
              const Icon = icons[item.title]
              return (
                <li
                  key={index}
                  className="border border-white rounded-full py-2 px-6 lg:py-3 lg:px-7 xl:px-7 xl:py-8"
                >
                  <div className="flex gap-3 items-center lg:gap-5 xl:gap-6">
                    <div className="center bg-white rounded-full h-10 w-10 xl:h-c-60 xl:w-c-60 flex-fixed">
                      <Icon />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm lg:text-base xl:text-xl">{item.title}</div>
                      <div className="text-xs lg:text-sm xl:text-base">{item.description}</div>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}
