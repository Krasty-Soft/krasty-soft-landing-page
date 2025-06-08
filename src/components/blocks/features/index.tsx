import { Section } from "@/components/ui";
import Check from '@/assets/done-mark.svg';
import DarkCheck from '@/assets/done-mark-dark.svg';


const features = [
  {
    id: '1',
    title: 'Flexibility in deployment',
    description: 'Supports cloud, on-premises, and hybrid deployment options.',
  },
  {
    id: '2',
    title: 'Security and compliance',
    description: 'Focuses on enterprise-grade security features, including granular permissions and robust audit logs.',
  },
  {
    id: '3',
    title: 'Component reusability',
    description: "Retool's library of pre-built components can be easily customized and reused.",
  },
  {
    id: '4',
    title: 'Customization with code',
    description: 'Allows extensive customization with JavaScript, SQL, and other programming languages.',
  },
  {
    id: '5',
    title: 'Extensive Integrations',
    description: 'Offers various integrations with databases, APIs, and third-party services.',
  },
  {
    id: '6',
    title: 'Real-time Collaboration',
    description: 'Empowers teams to build and iterate on apps together in real time, improving development speed.',
  },
];


export const Features = () => {
  return (
    <Section
      variant={'paper'}
      subtitle={'Why choose us'}
      title={'Why choose Retool over other low-code platforms?'}
    >
      <ul className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {
          features.map((item, i) => {
            return (
              <li
                key={i}
                className="flex flex-col h-48 p-4 border border-light-grey rounded-xl bg-red text-white nth-[3]:bg-white nth-[3]:text-black nth-[4]:bg-white nth-[4]:text-black"
              >
                {
                  (i === 2 || i === 3) ? <DarkCheck /> : <Check />
                }
                <div className="font-semibold text-sm mt-6 md:text-base xl:text-xl">
                  {item.title}
                </div>
                <div className="mt-auto text-sm xl:text-lg">
                  {item.description}
                </div>
              </li>
            )
          })
        }
      </ul>
    </Section>  )
}
