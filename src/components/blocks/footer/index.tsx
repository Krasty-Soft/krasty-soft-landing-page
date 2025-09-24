import MailIcon from '@/assets/footer-mail.svg'
import PhoneIcon from '@/assets/footer-phone.svg'
import { SocialNetworks } from '@/components/blocks'
import { FooterForm } from './form'

export const Footer = () => {
    return (
        <footer className="bg-black text-white font-medium">
            <div className="px-4 pt-c-50 pb-10 md:px-8 md:py-c-60 md:pb-10 lg:px-c-50 lg:pt-20 lg:pb-12 xl:px-c-200 xl:pt-c-100 xl:pb-c-52">
                <p className="section-label">Contact us</p>
                <h2 className="section-header mb-10 md:mb-6 lg:mb-8 xl:mb-c-60 max-w-3xl">
                    Get in touch for expert support.
                </h2>

                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="mb-10 md:flex-grow">
                        <p className="mb-8 lg:mb-7 xl:mb-9 text-sm lg:text-lg xl:text-1xl">
                            For job seekers
                        </p>
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 text-base xl:text-xl lg:grid-cols-1">
                            <a
                                className="flex items-center gap-4"
                                href="mailto:sales@krasty.me"
                            >
                                <div className="h-[34px] w-[34px] bg-red rounded-full center">
                                    <MailIcon />
                                </div>
                                sales@krasty.me
                            </a>
                            <a
                                className="flex items-center gap-4"
                                href="tel:+380992000187"
                            >
                                <div className="h-[34px] w-[34px] bg-red rounded-full center">
                                    <PhoneIcon />
                                </div>
                                +38 (099) 200 01 87
                            </a>
                        </div>
                    </div>

                    <div className="md:flex-grow" id="contacts">
                        <p className="mb-8 lg:mb-7 xl:mb-9 text-sm lg:text-lg xl:text-1xl">
                            Contact us
                        </p>

                        <FooterForm />
                    </div>
                </div>
            </div>

            <SocialNetworks />
        </footer>
    )
}
