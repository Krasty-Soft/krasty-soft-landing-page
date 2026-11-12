"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PAGES, { type NavigationItem } from "@/lib/navigation";

// Split a dropdown into columns by `group`; ungrouped lists stay one column.
const groupItems = (items: NavigationItem[]) => {
  const groups: { title?: string; items: NavigationItem[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.title === item.group) last.items.push(item);
    else groups.push({ title: item.group, items: [item] });
  }
  return groups;
};

export const DesktopMenu = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuItems = [
    { label: "About", href: "/about", hasDropdown: false },
    { label: "Case Studies", href: "/case-studies", hasDropdown: false },
    { label: "Blog", href: "/blog", hasDropdown: false },
    { label: "Services", key: "services", hasDropdown: true },
    { label: "Industries", key: "industries", hasDropdown: true },
    { label: "Technologies", key: "technologies", hasDropdown: true },
  ];

  const getDropdownItems = (key: string): NavigationItem[] => {
    const items = PAGES[key];
    return Array.isArray(items) ? items : [];
  };

  return (
    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
      {menuItems.map((item) => {
        if (!item.hasDropdown) {
          return (
            <Link key={item.label} href={item.href!}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg transition-colors duration-200"
                style={{
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setOpenDropdown(null)}
              >
                <span className="font-medium text-sm xl:text-base">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        }

        const dropdownItems = getDropdownItems(item.key!);

        return (
          <div
            key={item.label}
            style={{ position: "relative" }}
            onMouseEnter={() => setOpenDropdown(item.key!)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1"
              style={{
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              <span className="font-medium text-sm xl:text-base whitespace-nowrap">
                {item.label}
              </span>
              <motion.div
                animate={{
                  rotate: openDropdown === item.key ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {openDropdown === item.key && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: "0.5rem",
                    minWidth: "280px",
                    display: "grid",
                    gridAutoFlow: "column",
                    gridAutoColumns: "minmax(280px, 320px)",
                    backgroundColor: "rgba(15, 15, 15, 0.98)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(42, 42, 42, 0.5)",
                    borderRadius: "0.5rem",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                    overflow: "hidden",
                    zIndex: 1000,
                    pointerEvents: "auto",
                  }}
                >
                  {groupItems(dropdownItems).map((group, groupIndex) => (
                    <div
                      key={group.title ?? groupIndex}
                      style={{
                        borderLeft:
                          groupIndex > 0
                            ? "1px solid rgba(42, 42, 42, 0.5)"
                            : "none",
                      }}
                    >
                      {group.title && (
                        <div
                          className="px-4 pt-3 pb-2 text-xs uppercase tracking-wider font-semibold"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {group.title}
                        </div>
                      )}
                      {group.items.map((dropdownItem, index) => (
                        <div
                          key={dropdownItem.slug}
                          style={{
                            borderBottom:
                              index < group.items.length - 1
                                ? "1px solid rgba(42, 42, 42, 0.5)"
                                : "none",
                          }}
                        >
                          <Link href={`/${dropdownItem.slug}`}>
                            <motion.div
                              whileHover={{
                                backgroundColor: "rgba(220, 38, 38, 0.1)",
                              }}
                              className="px-4 py-3 transition-colors duration-200"
                            >
                              <div
                                className="font-medium mb-1"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {dropdownItem.label}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {dropdownItem.description}
                              </div>
                            </motion.div>
                          </Link>
                          {dropdownItem.children?.map((child) => (
                            <Link key={child.slug} href={`/${child.slug}`}>
                              <motion.div
                                whileHover={{
                                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                                }}
                                className="py-2 pr-4 pl-8 text-sm transition-colors duration-200"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                <span style={{ color: "var(--brand-red)" }}>
                                  ↳{" "}
                                </span>
                                {child.label}
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};
