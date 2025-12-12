import { Cases, ContactForm, Placeholder } from '@/components/blocks'
import { getAllCases } from '@/lib/cases'

export default async function InsurancePage() {
  const cases = await getAllCases()

  return (
    <div>
      <Placeholder variant={'paper'} size={'medium'}>
          Insurance banner
      </Placeholder>
      <ContactForm isDark />
      <Cases cases={cases} />
    </div>
  )
}
