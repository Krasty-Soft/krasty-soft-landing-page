import {Opportunities, Placeholder, Values} from "@/components/blocks";
import { Breadcrumbs } from "@/components";
import React from "react";

export default function Page () {
  return (
    <div>
      <div className="container bg-background px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>

        <h1 className="text-1xl mb-8">
          You’re free: Freedom of time, location, and to balance work and life.
        </h1>

      </div>
      <Placeholder size={'tall'}>
        Gallery
      </Placeholder>
      <Opportunities />
      <Values isDark={false} />
    </div>
  )
}
