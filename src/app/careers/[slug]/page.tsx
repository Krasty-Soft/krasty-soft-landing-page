import Arrow from '@/assets/arrow-right-up.svg'
import { Breadcrumbs } from '@/components'
import { Opportunities } from '@/components/blocks'
import { getAllSlugs, getJobBySlug } from '@/lib/jobs'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function VacancyPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const job = await getJobBySlug(slug)

    if (!job) return notFound()

    return (
        <>
            <div className="container px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
                <div className="pt-6 pb-8">
                    <Breadcrumbs />
                </div>
                <div className="text-content">
                    <p>
                        Our client, a dynamic travel agency, sought a solution
                        that transcended conventional flight booking platforms.
                        They envisioned a software that not only facilitated
                        ticket purchases but also provided users with a
                        comprehensive overview of all possible flight routes
                        between two destinations. The challenge was to create a
                        system that could calculate and present diverse routes
                        based on relevance, time, and price. The most important
                        aspect of the software lay in its ability to calculate
                        and present all possible flight routes between a given
                        start point and destination. The algorithm took into
                        account various factors such as layovers, travel time,
                        and ticket prices, providing users with a curated list
                        of routes sorted by relevance, ensuring a diverse
                        selection to suit individual preferences. Krasty Soft
                        team was happy to help!
                    </p>

                    <p>
                        Our client, a dynamic travel agency, sought a solution
                        that transcended conventional flight booking platforms.
                        They envisioned a software that not only facilitated
                        ticket purchases but also provided users with a
                        comprehensive overview of all possible flight routes
                        between two destinations. The challenge was to create a
                        system that could calculate and present diverse routes
                        based on relevance, time, and price. The most important
                        aspect of the software lay in its ability to calculate
                        and present all possible flight routes between a given
                        start point and destination. The algorithm took into
                        account various factors such as layovers, travel time,
                        and ticket prices, providing users with a curated list
                        of routes sorted by relevance, ensuring a diverse
                        selection to suit individual preferences. Krasty Soft
                        team was happy to help!
                    </p>

                    <p>
                        Our client, a dynamic travel agency, sought a solution
                        that transcended conventional flight booking platforms.
                        They envisioned a software that not only facilitated
                        ticket purchases but also provided users with a
                        comprehensive overview of all possible flight routes
                        between two destinations. The challenge was to create a
                        system that could calculate and present diverse routes
                        based on relevance, time, and price. The most important
                        aspect of the software lay in its ability to calculate
                        and present all possible flight routes between a given
                        start point and destination. The algorithm took into
                        account various factors such as layovers, travel time,
                        and ticket prices, providing users with a curated list
                        of routes sorted by relevance, ensuring a diverse
                        selection to suit individual preferences. Krasty Soft
                        team was happy to help!
                    </p>

                    <p>
                        Our client, a dynamic travel agency, sought a solution
                        that transcended conventional flight booking platforms.
                        They envisioned a software that not only facilitated
                        ticket purchases but also provided users with a
                        comprehensive overview of all possible flight routes
                        between two destinations. The challenge was to create a
                        system that could calculate and present diverse routes
                        based on relevance, time, and price. The most important
                        aspect of the software lay in its ability to calculate
                        and present all possible flight routes between a given
                        start point and destination. The algorithm took into
                        account various factors such as layovers, travel time,
                        and ticket prices, providing users with a curated list
                        of routes sorted by relevance, ensuring a diverse
                        selection to suit individual preferences. Krasty Soft
                        team was happy to help!
                    </p>
                </div>
            </div>
            <div className="bg-black text-white font-semibold flex flex-col items-center px-4 py-10">
                <p>Interested in the position?</p>
                <p className="flex items-center gap-2">
                    <span>Apply via the link </span>
                    <Arrow />
                </p>
            </div>
            <Opportunities />
        </>
    )
}
