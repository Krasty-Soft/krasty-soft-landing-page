'use client'

import React from "react";
import { useBreakpoint } from "@/lib/hooks";
import { Slider } from "@/components/ui";
import { Slide } from "./slide";
import { posts } from "@/lib/posts";
import { PostCard } from "@/components";


export const Posts = () => {
  const isTablet = useBreakpoint(768);

  return (
    <>
      {
        isTablet ? (
          <div className="grid grid-cols-2 grid-rows-2 gap-5 lg:gap-8 xl:gap-11">
            {
              posts.map((post, i) => (
                <PostCard key={i} data={post} />
              ))
            }
          </div>
        ) : (
          <Slider>
            {posts.map((post, i) => (
              <Slide slide={post} key={i} />
            ))}
          </Slider>
        )
      }
    </>
  )
}
