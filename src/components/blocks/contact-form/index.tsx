'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

export const ContactForm = ({ isDark = false }: { isDark?: boolean }) => {
    const goToContact = () => {
        const container = document.getElementById('app-scroll')
        const section = document.getElementById('contacts')
        if (!container || !section) return
        const containerRect = container.getBoundingClientRect()
        const sectionRect = section.getBoundingClientRect()
        const offsetTop =
            sectionRect.top - containerRect.top + container.scrollTop
        container.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
    return (
        <section
            className={`${
                isDark ? 'bg-black text-white' : 'bg-white text-black'
            }`}
        >
            <div className="container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 lg:grid lg:items-center lg:grid-cols-3 xl:grid-cols-4 xl:px-c-200 xl:py-c-100">
                <div>
                    <p className="section-label text-dark-grey">
                        Tell us about it
                    </p>
                    <h2 className="section-header mb-6 md:mb-0 lg:max-w-2xl xl:max-w-3xl">
                        Got a project in mind?
                    </h2>
                </div>
                <div className="lg:col-start-2 lg:col-span-2 xl:col-start-3">
                    <p className="mb-8 lg:mb-10 xl:mb-12">
                        If you are ready for a change or have an idea you
                        believe in, let’s talk about it. Contact us and stand by
                        for a quick reply.
                    </p>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
                        <Button
                            variant={`${!isDark ? 'primary' : 'secondary'}`}
                            title={'Let’s talk'}
                            onClick={goToContact}
                            classes={'py-3 border border-black'}
                        />
                        <Link
                            href={'/case-studies'}
                            className={`py-3 border border-light-grey rounded-[40px] cursor-pointer center ${
                                isDark
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
                            }`}
                        >
                            See our projects
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
