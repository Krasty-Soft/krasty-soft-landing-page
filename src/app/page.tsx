import {
    Banner,
    Cases,
    Difference,
    Industries,
    Opportunities,
    Services,
    Technologies,
} from '@/components/blocks'
import { getAllCases } from '@/lib/cases'
import { generateAggregateRatingSchema, StructuredData } from '@/lib/seo'

export default async function Home() {
    const cases = await getAllCases()

    // Generate aggregate rating schema for reviews/testimonials
    const ratingSchema = generateAggregateRatingSchema({
        ratingValue: 5,
        reviewCount: 11, // Based on "11 Client Reviews" in banner
        bestRating: 5,
        worstRating: 1,
    })

    return (
        <>
            <StructuredData data={ratingSchema} />
            <Banner />
            <Services />
            <Difference />
            <Industries />
            <Technologies />
            <Cases cases={cases} />
            <Opportunities />
        </>
    )
}
