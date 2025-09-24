import Insta from '@/assets/footer-instagram.svg'
import LinkedIn from '@/assets/footer-linkedin.svg'
import TikTok from '@/assets/footer-tiktok.svg'
import YouTube from '@/assets/footer-youtube.svg'

export const SocialNetworks = () => {
    return (
        <div className="flex flex-col gap-8 items-center md:flex-row-reverse md:justify-between border-t border-t-dark-green px-4 py-10 md:px-8 md:py-8 lg:px-c-50 xl:px-c-200 xl:py-c-60">
            <ul className="flex justify-center gap-4">
                <li className="h-8 w-8 bg-background rounded-md center">
                    <a href="https://instagram.com/krasty.soft" target="_blank">
                        <Insta />
                    </a>
                </li>
                <li className="h-8 w-8 bg-background rounded-md center">
                    <a
                        href="https://www.linkedin.com/company/krastysoft/"
                        target="_blank"
                    >
                        <LinkedIn />
                    </a>
                </li>
                <li className="h-8 w-8 bg-background rounded-md center">
                    <a href="https://tiktok.com/@krasty.soft" target="_blank">
                        <TikTok />
                    </a>
                </li>
                <li className="h-8 w-8 bg-background rounded-md center">
                    <a
                        href="https://www.youtube.com/channel/UC07BoU_dSVMKd10UH8yglxg"
                        target="_blank"
                    >
                        <YouTube />
                    </a>
                </li>
            </ul>
            <p className="text-sm xl:text-base">Copyright © 2025 Krasty Soft</p>
        </div>
    )
}
