'use client'

import ArrowDown from '@/assets/arrow-down.svg'
import ArrowLeft from '@/assets/arrow-left.svg'
import ArrowRight from '@/assets/arrow-right.svg'
import ArrowTop from '@/assets/arrow-up.svg'
import Close from '@/assets/close-grey.svg'
import MenuIcon from '@/assets/menu-tab-mob.svg'
import { Button } from '@/components/ui'
import { useBreakpoint } from '@/lib/hooks'
import PAGES from '@/lib/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type MenuLevel = 'root' | 'services' | 'industries'

const menuItemMobileClass =
    'flex items-center justify-between py-3 md:py-4 md:text-xl'
const menuItemDesktopClass =
    'flex items-center justify-between gap-3 text-sm hover:font-medium'
const menuBackClass =
    'flex items-center font-semibold pt-3 pb-7 md:py-4 md:text-xl'

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentMenu, setCurrentMenu] = useState<MenuLevel>('root')
    const isDesktop = useBreakpoint(1200)
    const isTablet = useBreakpoint(768)

    const handleDesktopMenu = (level: MenuLevel) => {
        if (!isOpen) {
            setCurrentMenu(level)
            setIsOpen(true)
        }
        if (isOpen && currentMenu !== level) {
            setCurrentMenu(level)
        }
        if (isOpen && currentMenu === level) {
            setIsOpen(false)
        }
    }

    const goToContact = () => {
        const container = document.getElementById('app-scroll')
        const section = document.getElementById('contacts')
        if (container && section) {
            const containerRect = container.getBoundingClientRect()
            const sectionRect = section.getBoundingClientRect()
            const offsetTop =
                sectionRect.top - containerRect.top + container.scrollTop
            container.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(false)
            setCurrentMenu('root')
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <nav className="flex items-center lg:flex-row-reverse">
            {
                // show contact button only on desktop or tablet when dropdown closed
                ((isTablet && !isOpen) || isDesktop) && (
                    <Button
                        onClick={goToContact}
                        title="Let's talk"
                        variant="accent"
                        classes="px-6 py-2 text-sm mr-6 lg:mr-0 lg:ml-11 xl:px-10 xl:py-3"
                    />
                )
            }
            {!isDesktop ? (
                // mobile button
                <button
                    className="border border-light-grey rounded-lg p-2.5 flex justify-center items-center"
                    onClick={() => {
                        if (!isOpen) {
                            setCurrentMenu('root')
                        }
                        setIsOpen(!isOpen)
                    }}
                >
                    {isOpen ? (
                        <Close className="h-5 w-5" />
                    ) : (
                        <MenuIcon className="h-5 w-5" />
                    )}
                </button>
            ) : (
                // desktop nav; dublicates for preventing text shift on hover
                <ul className="flex gap-8">
                    <li
                        className={`relative ${menuItemDesktopClass} ${
                            isOpen && currentMenu === 'services'
                                ? 'text-red'
                                : ''
                        }`}
                        onClick={() => handleDesktopMenu('services')}
                    >
                        <div className="font-medium opacity-0">Services</div>
                        <div className="absolute top-0 left-0">Services</div>
                        {isOpen && currentMenu === 'services' ? (
                            <ArrowTop
                                stroke={`${
                                    isOpen && currentMenu === 'services'
                                        ? '#E50606'
                                        : '#121514'
                                }`}
                            />
                        ) : (
                            <ArrowDown />
                        )}
                    </li>
                    <li
                        className={`relative ${menuItemDesktopClass} ${
                            isOpen && currentMenu === 'industries'
                                ? 'text-red'
                                : ''
                        }`}
                        onClick={() => handleDesktopMenu('industries')}
                    >
                        <div className="font-medium opacity-0">Industries</div>
                        <div className="absolute top-0 left-0">Industries</div>
                        {isOpen && currentMenu === 'industries' ? (
                            <ArrowTop
                                stroke={`${
                                    isOpen && currentMenu === 'industries'
                                        ? '#E50606'
                                        : '#121514'
                                }`}
                            />
                        ) : (
                            <ArrowDown />
                        )}
                    </li>
                    <li className={menuItemDesktopClass}>
                        <Link
                            className="relative text-black"
                            href="/case-studies"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="font-medium opacity-0">
                                Case Studies
                            </div>
                            <div className="absolute top-0 left-0">
                                Case Studies
                            </div>
                        </Link>
                    </li>
                    <li className={menuItemDesktopClass}>
                        <Link
                            className="relative text-black"
                            href="/blog"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="font-medium opacity-0">Blog</div>
                            <div className="absolute top-0 left-0">Blog</div>
                        </Link>
                    </li>
                    <li className={menuItemDesktopClass}>
                        <Link
                            className="relative text-black"
                            href="/about"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="font-medium opacity-0">
                                About us
                            </div>
                            <div className="absolute top-0 left-0">
                                About us
                            </div>
                        </Link>
                    </li>
                    <li className={menuItemDesktopClass}>
                        <Link
                            className="relative text-black"
                            href="/careers"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="font-medium opacity-0">Careers</div>
                            <div className="absolute top-0 left-0">Careers</div>
                        </Link>
                    </li>
                </ul>
            )}
            {!isDesktop && isOpen && (
                // mobile dropdown
                <div
                    className={
                        'fixed top-[74px] left-0 bottom-0 w-full bg-background z-50 py-c-50 px-4 md:py-c-100 md:px-32'
                    }
                >
                    {currentMenu === 'root' && (
                        <div className={'flex flex-col justify-between h-full'}>
                            <ul>
                                <li
                                    className={menuItemMobileClass}
                                    onClick={() => setCurrentMenu('services')}
                                >
                                    Services
                                    <ArrowRight />
                                </li>
                                <li
                                    className={menuItemMobileClass}
                                    onClick={() => setCurrentMenu('industries')}
                                >
                                    Industries
                                    <ArrowRight />
                                </li>
                                <li className={menuItemMobileClass}>
                                    <Link
                                        href="/case-studies"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Case Studies
                                    </Link>
                                </li>
                                <li className={menuItemMobileClass}>
                                    <Link
                                        href="/blog"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className={menuItemMobileClass}>
                                    <Link
                                        href="/about"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li className={menuItemMobileClass}>
                                    <Link
                                        href="/careers"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>

                            {(!isTablet || (isTablet && isOpen)) && (
                                <Button
                                    onClick={goToContact}
                                    title="Let's talk"
                                    fullSize
                                    variant="accent"
                                    classes="py-3 px-8 md:py-5 md:px-10 text-sm md:text-base xl:text-lg"
                                />
                            )}
                        </div>
                    )}

                    {currentMenu === 'services' && (
                        <ul>
                            <li
                                className={menuBackClass}
                                onClick={() => setCurrentMenu('root')}
                            >
                                <ArrowLeft className="mr-3" />
                                Services
                            </li>
                            {PAGES.services.map((item, index) => (
                                <li key={index} className={menuItemMobileClass}>
                                    <Link
                                        href={`/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {currentMenu === 'industries' && (
                        <ul>
                            <li
                                className={menuBackClass}
                                onClick={() => setCurrentMenu('root')}
                            >
                                <ArrowLeft className="mr-3" />
                                Industries
                            </li>
                            {PAGES.industries.map((item, index) => (
                                <li key={index} className={menuItemMobileClass}>
                                    <Link
                                        href={`/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {isDesktop && isOpen && (
                // desktop dropdown
                <div className="fixed top-[74px] lg:top-20 xl:top-[90px] left-0 w-full bg-background z-50 px-c-50 py-10 xl:px-c-200 xl:py-12 rounded-b-xl border-t border-t-light-grey">
                    {currentMenu === 'services' && (
                        <div className="grid grid-cols-3">
                            <ul className="flex flex-col gap-5">
                                {PAGES.services.map((item, index) => (
                                    <li
                                        key={index}
                                        className={menuItemDesktopClass}
                                    >
                                        <Link
                                            href={`/${item.slug}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {currentMenu === 'industries' && (
                        <div className="grid grid-cols-3">
                            <ul className="flex flex-col gap-5">
                                {PAGES.industries.map((item, index) => (
                                    <li
                                        key={index}
                                        className={menuItemDesktopClass}
                                    >
                                        <Link
                                            href={`/${item.slug}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
