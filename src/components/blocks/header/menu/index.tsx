"use client";

import ArrowDown from "@/assets/arrow-down.svg";
import ArrowLeft from "@/assets/arrow-left.svg";
import ArrowRight from "@/assets/arrow-right.svg";
import ArrowTop from "@/assets/arrow-up.svg";
import Close from "@/assets/close-grey.svg";
import MenuIcon from "@/assets/menu-tab-mob.svg";
import { Button } from "@/components/ui";
import { useBreakpoint } from "@/lib/hooks";
import PAGES from "@/lib/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NavigationConfig = typeof PAGES;
type DropdownKey = {
  [K in keyof NavigationConfig]: NavigationConfig[K] extends readonly unknown[]
    ? K
    : never;
}[keyof NavigationConfig];
type LinkKey = {
  [K in keyof NavigationConfig]: NavigationConfig[K] extends readonly unknown[]
    ? never
    : K;
}[keyof NavigationConfig];

type MenuLevel = "root" | DropdownKey;

type NavigationEntry = {
  slug: string;
  label: string;
  description: string;
};

type DropdownItem = {
  key: DropdownKey;
  label: string;
  items: readonly NavigationEntry[];
};

type LinkItem = NavigationEntry & {
  key: LinkKey;
};

const menuItemMobileClass =
  "flex items-center justify-between py-3 md:py-4 md:text-xl";
const menuItemDesktopClass =
  "flex items-center justify-between gap-3 text-sm hover:font-medium";
const menuBackClass =
  "flex items-center font-semibold pt-3 pb-7 md:py-4 md:text-xl";

const formatKeyLabel = (key: string) =>
  key.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuLevel>("root");
  const isDesktop = useBreakpoint(1200);
  const isTablet = useBreakpoint(768);

  const { dropdownItems, linkItems } = useMemo(() => {
    const entries = Object.entries(PAGES) as Array<
      [keyof NavigationConfig, NavigationConfig[keyof NavigationConfig]]
    >;

    const dropdown: DropdownItem[] = entries
      .filter(([, value]) => Array.isArray(value))
      .map(([key, value]) => ({
        key: key as DropdownKey,
        label: formatKeyLabel(String(key)),
        items: value as DropdownItem["items"],
      }));

    const links: LinkItem[] = entries
      .filter(([, value]) => !Array.isArray(value))
      .map(([key, value]) => ({
        key: key as LinkKey,
        ...(value as NavigationEntry),
      }));

    return {
      dropdownItems: dropdown,
      linkItems: links,
    };
  }, []);

  const handleDesktopMenu = (level: DropdownKey) => {
    if (!isOpen) {
      setCurrentMenu(level);
      setIsOpen(true);
      return;
    }

    if (isOpen && currentMenu !== level) {
      setCurrentMenu(level);
      return;
    }

    if (isOpen && currentMenu === level) {
      setIsOpen(false);
    }
  };

  const goToContact = () => {
    const container = document.getElementById("app-scroll");
    const section = document.getElementById("contacts");
    if (container && section) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const offsetTop =
        sectionRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsOpen(false);
    setCurrentMenu("root");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
      setCurrentMenu("root");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              setCurrentMenu("root");
            }
            setIsOpen((prev) => !prev);
          }}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <Close className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      ) : (
        // desktop nav; duplicates for preventing text shift on hover
        <ul className="flex gap-8">
          {dropdownItems.map((item) => {
            const isActive = isOpen && currentMenu === item.key;
            return (
              <li
                key={item.key}
                className={`relative ${menuItemDesktopClass} ${
                  isActive ? "text-red" : ""
                }`}
                onClick={() => handleDesktopMenu(item.key)}
              >
                <div className="font-medium opacity-0">{item.label}</div>
                <div className="absolute top-[50%] -translate-y-1/2 left-0">{item.label}</div>
                {isActive ? (
                  <ArrowTop stroke={isActive ? "#E50606" : "#121514"} />
                ) : (
                  <ArrowDown />
                )}
              </li>
            );
          })}
          {linkItems.map((item) => (
            <li key={item.key} className={menuItemDesktopClass}>
              <Link
                className="relative text-black"
                href={`/${item.slug}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium opacity-0">{item.label}</div>
                <div className="absolute top-[50%] -translate-y-1/2 left-0">{item.label}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isDesktop && isOpen && (
        // mobile dropdown
        <div
          className={
            "fixed top-[74px] left-0 bottom-0 w-full bg-background z-50 py-c-50 px-4 md:py-c-100 md:px-32"
          }
        >
          {currentMenu === "root" && (
            <div className={"flex flex-col justify-between h-full"}>
              <ul>
                {dropdownItems.map((item) => (
                  <li
                    key={item.key}
                    className={menuItemMobileClass}
                    onClick={() => setCurrentMenu(item.key)}
                  >
                    {item.label}
                    <ArrowRight />
                  </li>
                ))}
                {linkItems.map((item) => (
                  <li key={item.key} className={menuItemMobileClass}>
                    <Link
                      href={`/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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

          {dropdownItems.map(
            (item) =>
              currentMenu === item.key && (
                <ul key={item.key}>
                  <li
                    className={menuBackClass}
                    onClick={() => setCurrentMenu("root")}
                  >
                    <ArrowLeft className="mr-3" />
                    {item.label}
                  </li>
                  {item.items.map((entry) => (
                    <li key={entry.slug} className={menuItemMobileClass}>
                      <Link
                        href={`/${entry.slug}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
          )}
        </div>
      )}
      {isDesktop && isOpen && (
        // desktop dropdown
        <div className="fixed top-[74px] lg:top-20 xl:top-[90px] left-0 w-full bg-background z-50 px-c-50 py-10 xl:px-c-200 xl:py-12 rounded-b-xl border-t border-t-light-grey">
          {dropdownItems.map(
            (item) =>
              currentMenu === item.key && (
                <div key={item.key} className="grid grid-cols-3">
                  <ul className="flex flex-col gap-5">
                    {item.items.map((entry) => (
                      <li key={entry.slug} className={menuItemDesktopClass}>
                        <Link
                          href={`/${entry.slug}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {entry.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      )}
    </nav>
  );
};
