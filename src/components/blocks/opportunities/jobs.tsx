'use client';

import Arrow from "@/assets/arrow-right-up.svg";
import React from "react";
import { useBreakpoint } from "@/lib/hooks";

export const Jobs = ({ jobs } : { jobs: any[] }) => {
  const isTablet = useBreakpoint(768);
  const isDesktop = useBreakpoint(1200);

  return (
    <>
      {
        !isTablet && !isDesktop ? (
          <div>
            {
              jobs.map((job, index) => (
                <a key={index} href={`${job.link}/${job.slug}`} className="flex py-6 border-b border-b-light-grey first:border-t first:border-t-light-grey">
                  <div className="flex-grow">
                    <div className="font-semibold text-lg mb-6">{job.title}</div>
                    <div className="text-dark-grey mb-2">{job.description}</div>
                    <div className="text-dark-grey">{job.tags}</div>
                  </div>
                  <div>
                    <div className="center h-7 w-7 bg-white rounded-sm">
                      <Arrow />
                    </div>
                  </div>
                </a>
              ))
            }
          </div>
        ) : (
          <>
            {
              (isTablet && !isDesktop) && (
                <div>
                  {
                    jobs.map((job, index) => (
                      <a key={index} href={`${job.link}/${job.slug}`} className="flex py-6 border-b border-b-light-grey first:border-t first:border-t-light-grey">
                        <div className="font-semibold mb-6 w-[48%]">{job.title}</div>
                        <div className="w-[48%]">
                          <div className="text-dark-grey mb-2">{job.description}</div>
                          <div className="text-dark-grey">{job.tags}</div>
                        </div>
                        <div className="w-[4%]">
                          <div className="center h-7 w-7 bg-white rounded-sm">
                            <Arrow />
                          </div>
                        </div>
                      </a>
                    ))
                  }
                </div>
              )
            }
            {
              (isTablet && isDesktop) && (
                <div>
                  {
                    jobs.map((job, index) => (
                      <a key={index} href={`${job.link}/${job.slug}`} className="flex py-6 xl:py-c-50 border-b border-b-light-grey first:border-t first:border-t-light-grey">
                        <div className="font-semibold text-lg xl:text-3xl xl:text-lg w-[41%]">{job.title}</div>
                        <div className="text-dark-grey w-[27%]">{job.description}</div>
                        <div className="text-dark-grey w-[27%]">{job.tags}</div>
                        <div className="w-[5%]">
                          <div className="center h-7 w-7 bg-white rounded-sm">
                            <Arrow />
                          </div>
                        </div>
                      </a>
                    ))
                  }
                </div>
              )
            }
          </>
        )
      }
    </>

  )
}
