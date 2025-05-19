import React from "react";
import Image from "next/image";
import { ArrowLink, Pill } from "@/components";
import { useBreakpoint } from "@/lib/hooks";

const mock = [{
  title: 'Arbitrage Bot',
  duration: 'ongoing',
  tags: ['Crypto'],
  description: 'Bot to find and execute profitable crypto arbitrage trades. Worked with such exchanges as Binance, ByBit, Coinbase, WhiteBit and OKX. User can connect their account and earn moneywith arbitrage automation tool.',
  link: 'arbitrage-bot',
}]

export const Slide = ({slide}: {slide: any}) => {
  const isDesktop = useBreakpoint(1200)
  const isTablet = useBreakpoint(768)

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 lg:gap-8 xl:gap-11 bg-white p-4 rounded-20">
      {
        isDesktop ? (
          <>
            <div className="flex justify-between">
              <div className="bg-light-grey w-20 h-5 items-start">
                <Image src="" alt="LOGO" />
              </div>
              <div className="bg-light-grey rounded-20 items-stretch">
                <Image src="" alt="MOBILE" />
              </div>
            </div>
            <div className="bg-light-grey rounded-20">
              <Image src="" alt="PICTURE 1" />
            </div>
            <div className=" bg-light-grey rounded-20">
              <Image src="" alt="PICTURE 2" />
            </div>
          </>
        ): (
          <div className="flex gap-4">
            <div className="bg-light-grey rounded-20 flex-grow">
              <Image src="" alt="PICTURE 1" />
            </div>
            {
              isTablet && (
                <>
                  <div className="bg-light-grey rounded-20 flex-grow">
                    <Image src="" alt="PICTURE 2" />
                  </div>
                  <div className="bg-light-grey rounded-20 w-16 flex-fixed">
                    <Image src="" alt="MOBILE" />
                  </div>
                </>
              )
            }
          </div>
        )
      }
      {
        !isDesktop && (
          <div className="bg-light-grey w-20 h-5">
            <Image src="" alt="LOGO" />
          </div>
        )
      }

      <div>
        <div className="flex gap-2 mb-5">
          <Pill title="Duration: ongoing" />
          <Pill title="Crypto" />
        </div>
        <p className="mb-7">
          Bot to find and execute profitable crypto arbitrage trades.
          Worked with such exchanges as Binance, ByBit, Coinbase,
          WhiteBit and OKX. User can connect their account and earn money
          with arbitrage automation tool.
        </p>
        <ArrowLink to={'/'} />
      </div>
    </div>
  )
}
