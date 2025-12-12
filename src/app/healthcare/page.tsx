import { Breadcrumbs } from '@/components'
import {
    Cases,
    ContactForm,
    Placeholder,
    ReviewsBlock,
    Technologies,
    Values,
} from '@/components/blocks'
import { getAllCases } from '@/lib/cases'

export default async function HealthcarePage() {
    const cases = await getAllCases()

    return (
        <div>
            <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50  xl:px-c-200 xl:py-c-100 ">
              <Breadcrumbs />
              <Placeholder>Healthcare banner</Placeholder>
            </div>
            <ContactForm />
            <Cases cases={cases} />
            <Technologies />
            <Values />
            <ReviewsBlock />
        </div>
    )
}
