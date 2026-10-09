"use client";

import { useEffect } from "react";

/**
 * Removes the `pre-hydration` class from <html> once React has hydrated.
 *
 * Animated blocks are server-rendered in their framer-motion start state
 * (opacity 0), so until JS runs they are in the HTML but invisible. While the
 * class is present, globals.css keeps them visible; removing it hands control
 * back to the animations. If JS never runs, the class stays and the page
 * remains fully readable.
 */
export function HydrationFlag() {
  useEffect(() => {
    document.documentElement.classList.remove("pre-hydration");
  }, []);
  return null;
}
