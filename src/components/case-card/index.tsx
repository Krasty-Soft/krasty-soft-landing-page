'use client'
import { ArrowLink, Pill, Image } from "@/components/ui";
import React from "react";
import { useBreakpoint } from "@/lib/hooks";
import { Case } from "@/lib/cases";

const mockSrc = 'https://placehold.co/600x400.png';

export const CaseCard = ({ data } : {data: Case}) => {
  const isDesktop = useBreakpoint(1200);
  const isTablet = useBreakpoint(768);

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 lg:gap-8 xl:gap-11 bg-white p-4 rounded-20">
      {
        isDesktop ? (
          <>
            <div className="flex justify-between aspect-video overflow-hidden">
              <div className="w-20 h-5 items-start">
                <Image src={mockSrc} alt="LOGO" wrapperClasses={'bg-light-grey'}  />
              </div>
              <Image src={mockSrc} alt="MOBILE" wrapperClasses="bg-light-grey rounded-20 items-stretch overflow-hidden" />
            </div>

            <Image src={mockSrc} alt="PICTURE 1" wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden" />
            <Image src={mockSrc} alt="PICTURE 2" wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden" />
          </>
        ): (
          <div className="flex gap-4">
            <Image src={mockSrc} alt="PICTURE 1" wrapperClasses="bg-light-grey rounded-20 flex-grow aspect-video overflow-hidden" />
            {
              isTablet && (
                <>
                  <Image src={mockSrc} alt="PICTURE 2" wrapperClasses="bg-light-grey rounded-20 flex-grow overflow-hidden" />
                  <Image src={mockSrc} alt="MOBILE" wrapperClasses={'bg-light-grey rounded-20 overflow-hidden w-16 flex-fixed'} />
                </>
              )
            }
          </div>
        )
      }
      {
        !isDesktop && <Image src={mockSrc} alt="LOGO" wrapperClasses={'bg-light-grey w-20 h-5'} />
      }

      <div className="lg:aspect-video">
        <div className="flex gap-2 mb-5">
          {
            data?.tags?.length ? (
              data?.tags?.map((tag, i) => <Pill key={i} title={tag} variant={"bordered"} />)
            ) : null
          }
        </div>
        <p className="mb-7">
          {data.content}
        </p>
        <ArrowLink to={`/case-studies/${data.slug}`} />
      </div>
    </div>
  )
}
