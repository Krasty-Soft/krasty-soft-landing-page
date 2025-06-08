'use client'

import { useState } from "react";
import { ServiceType } from "@/types";

import Plus from '@/assets/close-plus.svg';
import Minus from '@/assets/open-minus.svg';
import { ArrowLink } from "@/components/ui";

export const Accordion = ({ data, index, initState = false } : { data: ServiceType, index: number, initState?: boolean}) => {
  const [isOpen, setIsOpen] = useState(initState);

  return (
    <div className="py-5 md:py-8 lg:py-9 xl:py-c-50 border-b border-b-light-grey first:border-t first:border-t-light-grey">
      <div className="flex flex-col gap-1 md:flex-row md:gap-2 lg:gap-6 xl:gap-8">
        <div className="text-dark-grey font-medium text-sm xl:text-lg">
          {index < 10 ? `0${index}` : index}
        </div>
        <div className="flex justify-between items-center md:flex-grow">
          <div
            className="text-lg tracking-wider font-semibold xl:text-3xl-plus"
          >{data.title}</div>
          <button
            className="h-8 w-8 center bg-white rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>
      {
        isOpen && (
          <div className="pt-6 font-medium md:grid md:grid-cols-2 md:gap-10 md:px-8 lg:pt-8 lg:px-11 xl:pt-10 xl:px-15">
            <ul className="list-inside max-md:mb-8 text-sm xl:text-lg">
              {
               data.content.map((item, index) => {
                  return (
                    <li
                      className="list-disc py-2"
                      key={index}
                    >
                      {item}
                    </li>
                  )
                })
              }
            </ul>
            <div>
              <p
                className="mb-6 text-sm md:mb-9 lg:mb-12 xl:text-lg"
              >
                {data.description}
              </p>
              <ArrowLink to={data.link} />
            </div>
          </div>
        )
      }
    </div>
  )
}
