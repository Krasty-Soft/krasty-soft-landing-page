import React from "react";
import technologies from "@/constants/technologies";
import Icon1 from "@/assets/retool.svg";
import Icon2 from "@/assets/react.svg";
import Icon3 from "@/assets/python.svg";
import Icon4 from "@/assets/node.svg";
import { Section } from "@/components/ui";

const icons = {
  Retool: Icon1,
  React: Icon2,
  Python: Icon3,
  Node: Icon4,
}


export const Technologies = () => {
  return (
    <Section variant={'black'} subtitle={'TECHNOLOGIES'} title={'Innovative technologies and premium solutions.'}>
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-8 xl:gap-5">
        {
          technologies.map((tech, index) => {
            const Icon = icons[tech.key]
            return (
              <li
                key={index}
                className="py-3 text-center border border-white rounded-20 lg:py-4 xl:py-8"
              >
                <div className="center mb-2 lg:mb-4 lg:h-8 xl:h-10">
                  <Icon className="lg:scale-120 xl:scale-200" />
                </div>
                <span className="text-sm font-semibold lg:text-base xl:text-1xl">
                  {tech.title}
                </span>
              </li>
            )
          })
        }
      </ul>
    </Section>
  )
}
