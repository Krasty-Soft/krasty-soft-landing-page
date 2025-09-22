'use client'

import Star from '@/assets/Star.svg'
import { Button } from '@/components/ui'
import Script from 'next/script'

const goToContact = () => {
    const container = document.getElementById('app-scroll')
    const section = document.getElementById('contacts')
    if (!container || !section) return

    const containerRect = container.getBoundingClientRect()
    const sectionRect = section.getBoundingClientRect()
    const offsetTop = sectionRect.top - containerRect.top + container.scrollTop

    container.scrollTo({ top: offsetTop, behavior: 'smooth' })
}

export const Banner = () => {
    return (
        <section className="rounded-b-2xl px-4 py-11 flex flex-col items-center md:py-14 lg:py-16 xl:py-c-100">
            <div className="flex items-center gap-2 px-c-22 py-2 border border-light-grey rounded-[28px] md:text-xs lg:text-sm xl:text-lg">
                <Star />
                Available for new projects
            </div>
            <h1 className="text-1xl leading-9 font-bold text-center mt-9 mb-4 tracking-wider lg:text-3xl-plus md:mt-c-22 md:mb-3 lg:mt-8 lg:mb-4 xl:text-5xl-plus xl:mt-16 xl:mb-6">
                Software company you can trust
            </h1>
            <p className="text-sm leading-6 text-center tracking-wider md:text-xs md:max-w-[530px] lg:max-w-[1300px] xl:text-1xl xl:max-w-[1100px]">
                At Krasty Soft we build software products which solve your
                business problems and challenges.
            </p>
            <Button
                title={'Get started today'}
                onClick={goToContact}
                classes="px-8 py-3 text-sm mt-8 mb-8 md:mt-6 md:mb-10 max-md:w-full lg:mt-11 lg:mb-12 xl:mt-9 xl:mb-15"
            />
            <div>
                <Script
                    src="https://widget.clutch.co/static/js/widget.js"
                    strategy="afterInteractive"
                />
                <div
                    className="clutch-widget flex gap-4"
                    data-url="https://widget.clutch.co"
                    data-widget-type="2"
                    data-height="45"
                    data-nofollow="false"
                    data-expandifr="true"
                    data-scale="100"
                    data-clutchcompany-id="2343082"
                >
                    <iframe
                        width="100"
                        height="100"
                        src="https://clutch.co/share/badges/2343082/81323?utm_source=clutch_top_company_badge&utm_medium=image_embed"
                        title="Top Clutch Api Development Company Ukraine 2025"
                    ></iframe>
                    <iframe
                        width="100"
                        height="100"
                        src="https://clutch.co/share/badges/2343082/77869?utm_source=clutch_top_company_badge&utm_medium=image_embed"
                        title="Top Clutch Rest Api Company Ukraine 2025"
                    ></iframe>
                </div>
            </div>
        </section>
    )
}
