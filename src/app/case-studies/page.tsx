'use client'

import { Breadcrumbs, CaseCard, Filters } from "@/components";
import { ContactForm, Technologies, Awards, Faq, Placeholder } from "@/components/blocks";
import React, { useState } from "react";
import { Case, cases } from "@/lib/cases";
import { generateTagFilters } from "@/lib/util";

type Tag = 'all' | string;

function filterCasesByTag(cases: Case[], activeFilter: string): Case[] {
  if (activeFilter === 'all') return cases;

  return cases.filter(item => item.tags.includes(activeFilter));
}

export default function Page () {
  const [activeFilter, setFilter] = useState<Tag>('all');
  const filters = generateTagFilters(cases, 'All projects');
  const filteredCases = filterCasesByTag(cases, activeFilter)

  return (
    <>
      <div className="container bg-background px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>

        <h1 className="text-1xl mb-8">
          Helping businesses achieve goals. Solving people’s problems.
        </h1>

        <div className="mb-10">
          <Filters filters={filters} onSelect={setFilter} selected={activeFilter} />
        </div>

        <ul className="grid grid-cols-1 gap-7 md:gap-6 lg:gap-8 xl:gap-10">
          {
            filteredCases.map((item, i) => {
              return (
                <CaseCard data={item} key={i} />
              )
            })
          }
        </ul>

      </div>
      <ContactForm isDark />

      <Placeholder size={'medium'}>
        Awards
      </Placeholder>
      {/*<Awards />*/}

      <Technologies />

      <Placeholder size={'tall'}>
        FAQ
      </Placeholder>
      {/*<Faq />*/}
    </>
  );
}
