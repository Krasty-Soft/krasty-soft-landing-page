import { Breadcrumbs } from '@/components'
import {
    Cases,
    ContactForm,
    Industries,
    Placeholder,
} from '@/components/blocks'
import { getAllSlugs, getCaseBySlug } from '@/lib/cases'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function CasePage({
    params,
}: {
    params: { slug: string }
}) {
    const post = await getCaseBySlug(params.slug)

    if (!post) return notFound()
    return (
        <div>
            <div className="container bg-background px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
                <div className="pt-6 pb-8">
                    <Breadcrumbs />
                </div>
                <h1 className="text-1xl mb-8">
                    Useful articles on design, analytics, and development.
                </h1>

                <div className="">
                    <div className="flex flex-col gap-6 mb-c-50">
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                brand
                            </span>
                            <span className="font-medium">Swyft</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Location
                            </span>
                            <span className="font-medium">
                                California, United States
                            </span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Clutch Review
                            </span>
                            <span className="font-medium">5.0</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Client
                            </span>
                            <span className="font-medium">Swyft Inc.</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Budget
                            </span>
                            <span className="font-medium">
                                $10,000 to $49,999
                            </span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Industry
                            </span>
                            <span className="font-medium">Booking</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Environment
                            </span>
                            <span className="font-medium">Retool</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Release
                            </span>
                            <span className="font-medium">2022</span>
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="uppercase text-dark-grey">
                                Live
                            </span>
                            <span className="font-medium">Check live</span>
                        </div>
                    </div>
                    <div>
                        <section>
                            <h3>story behind</h3>
                            <p>
                                Our client, a dynamic travel agency, sought a
                                solution that transcended conventional flight
                                booking platforms. They envisioned a software
                                that not only facilitated ticket purchases but
                                also provided users with a comprehensive
                                overview of all possible flight routes between
                                two destinations.
                            </p>
                        </section>
                        <section>
                            <h3>result</h3>
                            <p>
                                Krasty Soft team designed a user-friendly
                                interface that allowed travelers to input their
                                desired journey details seamlessly. The software
                                then presented the calculated routes in an
                                easy-to-read format, with clear information on
                                layovers, flight durations, and ticket prices.
                                Users could effortlessly navigate through
                                options, making informed decisions tailored to
                                their preferences.
                            </p>
                            <p>
                                Integration with secure payment gateways ensured
                                a seamless ticket purchasing process directly
                                through the website.
                            </p>
                            <p>
                                The Flight Booking Software project exemplifies
                                our commitment to transforming travel
                                experiences. By combining cutting-edge
                                technology with a user-centric design, we have
                                created a platform that not only facilitates
                                ticket purchases but elevates the entire
                                journey.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <ContactForm isDark />
            <Cases />
            <Industries />
            <Placeholder size={'medium'}>Awards</Placeholder>
            {/*<Awards />*/}
        </div>
    )
}
