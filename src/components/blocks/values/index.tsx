import { Section } from "@/components/ui";

const mock = [
  'Humans are at the heart of everything we do. Simply put: we`re people, working with people and for people.',
  'We prioritize results, ensuring products are both aesthetic and efficient. Creativity must drive profitability.',
  'We evolve through user feedback and fresh ideas, embracing continuous improvement.',
]

export const Values = ({ isDark = true } : { isDark?: boolean }) => {
  return (
    <Section
      variant={isDark ? 'secondary' : 'transparent'}
      subtitle="values"
      title="Our approach is formed by several values, which are simple yet crucial for effective workflow."
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 xl:gap-10">
        {
          mock.map((item, index) => {
            return (
              <li key={index} className="p-4 border border-light-grey rounded-20 lg:p-5 xl:p-7">
                <div
                  className="h-10 w-10 center bg-black text-white rounded-full mb-6 text-xs md:mb-7"
                >
                  {`0${index+1}`}
                </div>
                <p className="text-sm tracking-wider leading-loose font-medium md:tracking-normal lg:tracking-wider xl:text-lg">
                  {item}
                </p>
              </li>
            )
          })
        }
      </ul>
    </Section>
  )
}
