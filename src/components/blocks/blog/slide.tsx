import React from "react";
import { PostCard } from "@/components";

export const Slide = ({ slide }: { slide: any }) => {

  return (
    // Slide must have min-w-full flex-[0_0_100%] classes
    <div className="min-w-full flex-[0_0_100%]">
      <PostCard data={slide} />
    </div>
  )
}
