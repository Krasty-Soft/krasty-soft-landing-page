import Logo from '@/assets/Logo.svg'
import { Menu } from '@/components/blocks/header/menu'
import Link from 'next/link'

const paddings = 'px-4 py-4 md:px-8 lg:px-c-50 xl:px-c-200'

export const Header = () => {
    return (
        <header className="flex-fixed h-[74px] lg:h-20 xl:h-[90px] rounded-b-[10px] shadow-block">
            <div
                className={`container flex items-center justify-between h-full ${paddings}`}
            >
                <Link href={'/'}>
                    <Logo />
                </Link>
                <Menu />
            </div>
        </header>
    )
}
