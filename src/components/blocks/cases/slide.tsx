import React from "react";
import { CaseCard } from "@/components/case-card";

// Mobile: one card plus a peek of the next, so it reads as swipeable.
// Tablet: two cards. Desktop: three cards in view.
export const Slide = ({ slide }: { slide: any }) => {
  return (
    <div className="flex min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]">
      <div className="w-full">
        <CaseCard data={slide} />
      </div>
    </div>
  );
};
