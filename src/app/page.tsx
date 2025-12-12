import {
    Banner,
    Blog,
    Cases,
    Difference,
    Industries,
    Opportunities,
    Services,
    Technologies,
} from '@/components/blocks'
import { getAllCases } from '@/lib/cases'

export default async function Home() {
    const cases = await getAllCases()

    return (
      <>
        <Banner />
        <Services />
        <Difference />
        <Industries />
        <Technologies />
        <Cases cases={cases} />
        <Blog />
        <Opportunities />
      </>
    )
}
