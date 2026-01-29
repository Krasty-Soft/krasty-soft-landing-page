import { Breadcrumbs } from '@/components'
import {
    ContactForm,
    Industries,
    Placeholder,
    TableOfContents,
} from '@/components/blocks'
import { Image } from '@/components/ui'
import { Case } from '@/lib/cases'
import { extractHeadingsForTOC, renderRichTextAsHtml } from '@/lib/render'

interface TemplateProps {
    caseData: Case
}

export function TemplateDefault({ caseData }: TemplateProps) {
    // Extract heading-2 values from caseData.content
    const tableOfContents = extractHeadingsForTOC(
        caseData.content?.content || [],
    )
    return (
        <div>
            <div className="container bg-background pb-c-50 md:pb-c-60 lg:pb-20  xl:pb-c-100">
                <div className="px-4 md:px-8 lg:px-c-50 xl:px-c-200 bg-[#CAC0C0] pb-c-50 md:pb-c-60 lg:pb-20  xl:pb-c-100">
                    <div className="pt-6 pb-8">
                        <Breadcrumbs />
                    </div>
                    <div className="grid md:grid-cols-12 ">
                        <h1 className="text-1xl mb-8 md:col-span-4 md:self-center">
                            {caseData.title}
                        </h1>
                        <Image
                            wrapperClasses="md:col-span-7 md:col-start-6 aspect-video overflow-hidden"
                            src={
                                caseData.media.find((media) =>
                                    media.title?.includes('banner'),
                                )?.url || ''
                            }
                            alt={'text'}
                            fillMode="object-fill"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 md:px-8 lg:px-c-50 xl:px-c-200 pt-c-50 md:pt-c-60 lg:pt-20  xl:pt-c-100">
                    <div className="col-span-4 text-sm lg:sticky lg:top-8 lg:self-start">
                        {/* Table of Contents */}
                        <TableOfContents tableOfContents={tableOfContents} />
                    </div>
                    <div className="col-span-8">
                        {renderRichTextAsHtml(caseData.overview?.content || [])}

                        <section className="mb-c-50">
                            <Image
                                src={
                                    caseData.media.find((media) =>
                                        media.title?.includes('img1'),
                                    )?.url || ''
                                }
                                alt={
                                    caseData.media.find((media) =>
                                        media.title?.includes('img1'),
                                    )?.description || ''
                                }
                                wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden mb-6"
                                fillMode="object-fill"
                            />
                        </section>

                        {renderRichTextAsHtml(caseData.content?.content || [])}
                    </div>
                </div>
            </div>

            <ContactForm isDark />
            <Industries />
            <Placeholder size={'medium'}>Awards</Placeholder>
            {/*<Awards />*/}
        </div>
    )
}
