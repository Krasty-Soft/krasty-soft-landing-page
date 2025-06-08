import React from "react";
import { CaseCard } from "@/components/case-card";

const mock = [{
  title: 'Arbitrage Bot',
  duration: 'ongoing',
  tags: ['Crypto'],
  description: 'Bot to find and execute profitable crypto arbitrage trades. Worked with such exchanges as Binance, ByBit, Coinbase, WhiteBit and OKX. User can connect their account and earn moneywith arbitrage automation tool.',
  link: 'arbitrage-bot',
}]

export const Slide = ({ slide }: { slide: any }) => {

  return (
    // Slide must have min-w-full flex-[0_0_100%] classes
    <div className="min-w-full flex-[0_0_100%]">
      <CaseCard data={slide} />
    </div>
  )
}
