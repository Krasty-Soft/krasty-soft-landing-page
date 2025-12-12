'use client'
import { ArrowLink, Image, Pill } from '@/components/ui'
import { Case } from '@/lib/cases'
import { useBreakpoint } from '@/lib/hooks'

const mockSrc = 'https://placehold.co/600x400.png'

export const CaseCard = ({ data }: { data: Case }) => {
    const isDesktop = useBreakpoint(1200)
    const isTablet = useBreakpoint(768)

    const mediaData = {
        mobile: data.media.find((media) => media.title?.includes('mobile')),
        img1: data.media.find((media) => media.title?.includes('img1')),
        img2: data.media.find((media) => media.title?.includes('img2')),
    }

    return (
        <div className="grid grid-col-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 lg:gap-8 xl:gap-11 bg-white p-4 rounded-20">
            {isDesktop ? (
                <>
                    <div className="flex justify-between aspect-video overflow-hidden">
                        <div className="w-20 h-5 items-start">
                            <Image
                                src={mediaData.mobile?.url || mockSrc}
                                alt={mediaData.mobile?.description || 'Mobile'}
                                wrapperClasses={'bg-light-grey'}
                            />
                        </div>
                        <Image
                            src={mediaData.mobile?.url || mockSrc}
                            alt={mediaData.mobile?.description || 'Mobile'}
                            wrapperClasses="bg-light-grey rounded-20 items-stretch overflow-hidden w-40"
                        />
                    </div>

                    <Image
                        src={mediaData.img1?.url || mockSrc}
                        alt={mediaData.img1?.description || 'Image 1'}
                        wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden"
                    />
                    <Image
                        src={mediaData.img2?.url || mockSrc}
                        alt={mediaData.img2?.description || 'Image 2'}
                        wrapperClasses="bg-light-grey rounded-20 aspect-video overflow-hidden"
                    />
                </>
            ) : (
                <div className="flex gap-4">
                    <Image
                        src={mediaData.img1?.url || mockSrc}
                        alt={mediaData.img1?.description || 'Image 1'}
                        wrapperClasses="bg-light-grey rounded-20 flex-grow aspect-video overflow-hidden"
                    />
                    {isTablet && (
                        <>
                            <Image
                                src={mediaData.img2?.url || mockSrc}
                                alt={mediaData.img2?.description || 'Image 2'}
                                wrapperClasses="bg-light-grey rounded-20 flex-grow overflow-hidden"
                            />
                            <Image
                                src={mediaData.mobile?.url || mockSrc}
                                alt={mediaData.mobile?.description || 'Mobile'}
                                wrapperClasses={
                                    'bg-light-grey rounded-20 overflow-hidden w-16 flex-fixed'
                                }
                            />
                        </>
                    )}
                </div>
            )}
            {!isDesktop && (
                <Image
                    src={mediaData.mobile?.url || mockSrc}
                    alt={mediaData.mobile?.description || 'Mobile'}
                    wrapperClasses={'bg-light-grey w-20 h-5'}
                />
            )}

            <div className="lg:aspect-video">
                <div className="flex gap-2 mb-5">
                    {data?.tags?.length
                        ? data?.tags?.map((tag, i) => (
                              <Pill key={i} title={tag} variant={'bordered'} />
                          ))
                        : null}
                </div>
                <p className="mb-7">{data.cardDescription}</p>
                <ArrowLink to={`/case-studies/${data.slug}`} />
            </div>
        </div>
    )
}
