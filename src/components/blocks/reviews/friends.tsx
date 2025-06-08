'use client';

import { Image } from "@/components/ui";

const classes = 'center px-9 py-4 border-b border-r border-b-light-grey border-r-light-grey';

interface Partners {
  id: string,
  logo: string,
  name: string,
}

const template = Array.from({ length: 12 });

export const Friends = ({ data } : { data: Partners[] }) => {

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border border-light-grey rounded-20">
      {
        template.map((_, i) => {
          return (
            <li
              key={i}
              className={`${classes} 
                nth-last-[-n+2]:border-b-0 
                md:nth-last-[-n+2]:border-b 
                md:nth-last-[-n+4]:border-b-0 
                lg:nth-last-[-n+4]:border-b 
                lg:nth-last-[-n+6]:border-b-0 
                nth-[2n]:border-r-0 
                md:nth-[2n]:border-r 
                md:nth-[4n]:border-r-0 
                lg:nth-[4n]:border-r 
                lg:nth-[6n]:border-r-0
              `}>
              {
                data[i] ? (
                  <div className="h-10 w-24 xl:h-12 xl:w-28">
                    <Image src={data[i].logo} alt={data[i].name} wrapperClasses={'h-full'} />
                  </div>
                ) : ''
              }
            </li>
          )
        })
      }
    </ul>
  )
}
