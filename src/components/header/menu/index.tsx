'use client'

import { useState } from "react";
import { Button } from "@/components";
import { useDesktop } from "@/lib/hooks";
import Close from "@/assets/close-grey.svg"
import MenuIcon from "@/assets/menu-tab-mob.svg"
import ArrowLeft from "@/assets/arrow-left.svg";
import ArrowRight from "@/assets/arrow-right.svg";


type MenuLevel = 'root' | 'services' | 'industries';

const menuItemClass = 'flex justify-between py-3';
const menuBackClass = 'flex font-semibold pt-3 pb-7';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuLevel>('root')
  const isDesktop = useDesktop(1200);

  const goToContact = () => {
    const section = document.getElementById('footer')
    section?.scrollIntoView()
    setIsOpen(false);
  }

  return (
    <div>
      {
        !isDesktop ? (
          <button
            className="border border-light-grey rounded-lg p-2.5 flex justify-center items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {
              isOpen ? <Close className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />
            }
          </button>
        ) : null
      }
      {
        isOpen && (
          <div className={"fixed top-[74px] py-9 px-4 left-0 bottom-0 w-full bg-background z-50"}>
            {currentMenu === 'root' && (
              <div className={"flex flex-col justify-between h-full"}>
                <ul>
                  <li
                    className={menuItemClass}
                    onClick={() => setCurrentMenu('services')}
                  >
                    Services
                    <ArrowRight />
                  </li>
                  <li
                    className={menuItemClass}
                    onClick={() => setCurrentMenu('industries')}
                  >
                    Industries
                    <ArrowRight />
                  </li>
                  <li
                    className={menuItemClass}
                  >
                    Case Studies
                  </li>
                  <li
                    className={menuItemClass}
                  >
                    Blog
                  </li>
                  <li
                    className={menuItemClass}
                  >
                    About us
                  </li>
                  <li
                    className={menuItemClass}
                  >
                    Careers
                  </li>
                </ul>
                <Button
                  onClick={goToContact}
                  title="Let's talk"
                  fullSize
                  variant="accent"
                />
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
                <li
                  className={menuItemClass}
                >
                  Retool development
                </li>
                <li
                  className={menuItemClass}
                >
                  Custom Software Development
                </li>
                <li
                  className={menuItemClass}
                >
                  Backend Development
                </li>
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
                <li
                  className={menuItemClass}
                >
                  Healthcare
                </li>
                <li
                  className={menuItemClass}
                >
                  Crypto
                </li>
                <li
                  className={menuItemClass}
                >
                  Finance
                </li>
              </ul>
            )}
          </div>
        )
      }
    </div>
  )
}
