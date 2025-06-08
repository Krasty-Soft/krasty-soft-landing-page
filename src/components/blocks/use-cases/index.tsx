import {ArrowLink, Section} from "@/components/ui";
import Icon1 from "@/assets/test-idea.svg";
import Icon2 from "@/assets/create-custom-tool.svg";
import Icon3 from "@/assets/flexibility-in-deployment.svg";
import Icon4 from "@/assets/optimise-workflows.svg";
import Icon5 from "@/assets/integrate-crm.svg";
import Icon6 from "@/assets/maximize-cloud-resources.svg";
import Icon7 from "@/assets/elevate-marketing.svg";
import Icon8 from "@/assets/automate-reporting-analytics.svg";
import React from "react";
import Arrow from "@/assets/arrow-right-up.svg";
import Link from "next/link";


const icons = {
  Idea: Icon1,
  Tool: Icon2,
  Flexibility: Icon3,
  Optimise: Icon4,
  Crm: Icon5,
  Cloud: Icon6,
  Elevate: Icon7,
  Automatization: Icon8,
}

const useCases = [
  { id: '1', title: 'Test idea with MVP', link: '/', icon: 'Idea' },
  { id: '2', title: 'Create a custom internal tool', link: '/', icon: 'Tool' },
  { id: '3', title: 'Flexibility in deployment', link: '/', icon: 'Flexibility' },
  { id: '4', title: 'Optimise workflows', link: '/', icon: 'Optimise' },
  { id: '5', title: 'Integrate with CRM or ERP', link: '/', icon: 'Crm' },
  { id: '6', title: 'Maximize Cloud resources', link: '/', icon: 'Cloud' },
  { id: '7', title: 'Elevate marketing for success', link: '/', icon: 'Elevate' },
  { id: '8', title: 'Automate reporting and analytics', link: '/', icon: 'Automatization' },
] as const;

export const UseCases = () => {
  return (
    <Section variant={'white'} subtitle={'Retool No-Code'} title={'What do you need today?'}>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-4 xl:gap-10">
        {
          useCases.map((item, i) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={i}
              >
                <Link
                  href={item.link}
                  className="h-28 md:h-[120px] lg:h-[170px] xl:h-[250] p-4 flex flex-col justify-between border border-light-grey rounded-20"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-8 lg:h-10 lg:w-10 xl:h-c-60 xl:w-c-60 bg-black rounded-full center">
                      <Icon />
                    </div>
                    <Arrow />
                  </div>
                  <div className="font-semibold xl:text-xl">
                    {item.title}
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </Section>
  )
}
