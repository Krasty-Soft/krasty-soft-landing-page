import { Section, Slider } from '@/components/ui'
import { Case } from '@/lib/cases'
import { Slide } from './slide'

interface CasesProps {
    cases: Case[]
}

export const Cases = ({ cases }: CasesProps) => {
    return (
        <Section
            variant={'paper'}
            title={'Real-world insights and success stories.'}
            subtitle={'CASE STUDIES'}
        >
            <Slider>
                {cases?.map((item, i) => (
                    <Slide slide={item} key={i} />
                ))}
            </Slider>
        </Section>
    )
}
