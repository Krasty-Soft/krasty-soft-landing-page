'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components";
import { useBreakpoint } from "@/lib/hooks";
import { services, industries } from "@/constants/menu";
import Close from "@/assets/close-grey.svg"
import MenuIcon from "@/assets/menu-tab-mob.svg"
import ArrowLeft from "@/assets/arrow-left.svg";
import ArrowRight from "@/assets/arrow-right.svg";
import ArrowTop from "@/assets/arrow-up.svg";
import ArrowDown from "@/assets/arrow-down.svg";
import Link from "next/link";

type MenuLevel = 'root' | 'services' | 'industries';

const menuItemMobileClass = 'flex items-center justify-between py-3 md:py-4 md:text-xl';
const menuItemDesktopClass = 'flex items-center justify-between gap-3 text-sm hover:font-medium';
const menuBackClass = 'flex items-center font-semibold pt-3 pb-7 md:py-4 md:text-xl';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuLevel>('root')
  const isDesktop = useBreakpoint(1200);
  const isTablet = useBreakpoint(768);

  const handleDesktopMenu = (level: MenuLevel) => {
    if (!isOpen) {
      setCurrentMenu(level)
      setIsOpen(true);
    }
    if (isOpen && currentMenu !== level) {
      setCurrentMenu(level)
    }
    if (isOpen && currentMenu === level) {
      setIsOpen(false);
    }
  }

  const goToContact = () => {
    const section = document.getElementById('contacts')
    section?.scrollIntoView()
    setIsOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
      setCurrentMenu('root');
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
      {
        !isDesktop ? (
          // mobile button
          <button
            className="border border-light-grey rounded-lg p-2.5 flex justify-center items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {
              isOpen ? <Close className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />
            }
          </button>
        ) : (
          // desktop nav
          <ul className="flex gap-8">
            <li
              className={`${menuItemDesktopClass} ${isOpen && currentMenu === 'services' ? 'text-red' : ''}`}
              onClick={() => handleDesktopMenu("services")}
            >
              Services
              { isOpen && currentMenu === 'services' ? <ArrowTop stroke={`${isOpen && currentMenu === 'services' ? '#E50606' : '#121514'}`} /> : <ArrowDown /> }
            </li>
            <li
              className={`${menuItemDesktopClass} ${isOpen && currentMenu === 'industries' ? 'text-red' : ''}`}
              onClick={() => handleDesktopMenu("industries")}
            >
              Industries
              { isOpen && currentMenu === 'industries' ? <ArrowTop stroke={`${isOpen && currentMenu === 'industries' ? '#E50606' : '#121514'}`} /> : <ArrowDown /> }
            </li>
            <li
              className={menuItemDesktopClass}
            >
              <Link href="/cases">Case Studies</Link>
            </li>
            <li
              className={menuItemDesktopClass}
            >
              <Link href="/blog">Blog</Link>
            </li>
            <li
              className={menuItemDesktopClass}
            >
              <Link href="/about">About us</Link>
            </li>
            <li
              className={menuItemDesktopClass}
            >
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        )
      }
      {
        !isDesktop && isOpen && (
          // mobile dropdown
          <div className={"fixed top-[74px] left-0 bottom-0 w-full bg-background z-50 py-c-50 px-4 md:py-c-100 md:px-32"}>
            {currentMenu === 'root' && (
              <div className={"flex flex-col justify-between h-full"}>
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
                  <li
                    className={menuItemMobileClass}
                  >
                    Case Studies
                  </li>
                  <li
                    className={menuItemMobileClass}
                  >
                    Blog
                  </li>
                  <li
                    className={menuItemMobileClass}
                  >
                    About us
                  </li>
                  <li
                    className={menuItemMobileClass}
                  >
                    Careers
                  </li>
                </ul>

                {
                  (!isTablet || isTablet && isOpen) && (
                    <Button
                      onClick={goToContact}
                      title="Let's talk"
                      fullSize
                      variant="accent"
                      classes="py-3 px-8 md:py-5 md:px-10 text-sm md:text-base xl:text-lg"
                    />
                  )
                }
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
                {
                  services.map((item, index) => (
                    <li
                      key={index}
                      className={menuItemMobileClass}
                    >
                      {item}
                    </li>
                  ))
                }
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
                {
                  industries.map((item, index) => (
                    <li
                      key={index}
                      className={menuItemMobileClass}
                    >
                      {item.title}
                    </li>
                  ))
                }
              </ul>
            )}
          </div>
        )
      }
      {
        isDesktop && isOpen && (
          // desktop dropdown
          <div className="fixed top-[74px] lg:top-20 xl:top-[90px] left-0 w-full bg-background z-50 px-c-50 py-10 xl:px-c-200 xl:py-12 rounded-b-xl border-t border-t-light-grey">
            {
              currentMenu === 'services' && (
                <div className="grid grid-cols-3">
                  <ul className="flex flex-col gap-5">
                    {
                      services.map((item, index) => (
                        <li
                          key={index}
                          className={menuItemDesktopClass}
                        >
                          {item}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
            {
              currentMenu === 'industries' && (
                <div className="grid grid-cols-3">
                  <ul className="flex flex-col gap-5">
                    {
                      industries.map((item, index) => (
                        <li
                          key={index}
                          className={menuItemDesktopClass}
                        >
                          {item.title}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </div>
        )
      }
    </nav>
  )
}
