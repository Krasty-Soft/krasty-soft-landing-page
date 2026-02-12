"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const SmoothScroll = () => {
  const pathname = usePathname();

  // Scroll to top when navigating to a new page (instant, no smooth scroll)
  useEffect(() => {
    const container = document.getElementById("app-scroll");
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      // Prevent default anchor behavior
      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      const scrollContainer = document.getElementById("app-scroll");

      if (targetElement && scrollContainer) {
        // Get the target element's position relative to the scroll container
        const containerRect = scrollContainer.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        // Calculate the scroll position
        const scrollTop = scrollContainer.scrollTop;
        const targetPosition = targetRect.top - containerRect.top + scrollTop;
        const headerOffset = 80; // Account for fixed header

        scrollContainer.scrollTo({
          top: targetPosition - headerOffset,
          behavior: "smooth",
        });
      }
    };

    // Use capture phase to catch the event before other handlers
    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
    };
  }, []);

  return null;
};
