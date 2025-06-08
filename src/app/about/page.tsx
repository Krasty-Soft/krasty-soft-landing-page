import { Difference, Opportunities, Technologies, ReviewsBlock, Placeholder } from "@/components/blocks";
import { Breadcrumbs } from "@/components";
import React from "react";

export default function Page () {
  return (
    <>
      <div className="container px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>
        <Placeholder size={'medium'}>
          Banner
        </Placeholder>
      </div>

      <Difference isDark={false} />
      <Placeholder size={'medium'}>
        Gallery
      </Placeholder>
      <ReviewsBlock />
      <Technologies />
      <Opportunities />
    </>
  )
}
