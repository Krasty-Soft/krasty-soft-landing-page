import React from "react";
import technologies from "@/constants/technologies";
import Icon1 from "@/assets/retool.svg";
import Icon2 from "@/assets/react.svg";
import Icon3 from "@/assets/python.svg";
import Icon4 from "@/assets/node.svg";

const icons = {
  Retool: Icon1,
  React: Icon2,
  Python: Icon3,
  Node: Icon4,
}


export const Technologies = () => {
  return (
    <section className="bg-black text-white">
      <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 xl:px-c-200 xl:py-c-100">
        <p
          className="section-label text-dark-grey"
        >
          TECHNOLOGIES
        </p>
        <h2
          className="section-header mb-6 md:mb-6 lg:mb-9 xl:mb-c-60 md:max-w-md lg:max-w-2xl xl:max-w-3xl"
        >
          Innovative technologies and premium solutions.
        </h2>

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
      </div>
    </section>
  )
}
