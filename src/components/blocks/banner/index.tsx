"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui";
import { ClutchBadges } from "@/components/clutch-badges";

// Above-the-fold hero entrance. The heading renders visible immediately (no
// opacity gate) so it's not held back for LCP; supporting elements fade up.
const EASE = [0.32, 0.72, 0, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const goToContact = () => {
  const container = document.getElementById("app-scroll");
  const section = document.getElementById("contacts");
  if (!container || !section) return;

  const containerRect = container.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();
  const offsetTop = sectionRect.top - containerRect.top + container.scrollTop;

  container.scrollTo({ top: offsetTop, behavior: "smooth" });
};

export const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Background gradient effect */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(229, 6, 6, 0.12), transparent 60%), radial-gradient(circle at 20% 80%, rgba(229, 6, 6, 0.06), transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Status badge */}
        <motion.div {...fadeUp(0.05)} className="mb-8">
          <StatusBadge
            status="Open for work"
            subtitle="Building the future"
            variant="default"
            animated
          />
        </motion.div>

        {/* Main heading — LCP element: visible immediately (slide only, no fade) */}
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 tracking-tight"
          style={{
            color: "var(--text-primary)",
            lineHeight: "1.1",
          }}
        >
          Software Company Focused on{" "}
          <br className="hidden md:block" />
          AI and Software Engineering
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.15)}
          className="text-lg md:text-xl lg:text-2xl text-center mb-12 max-w-3xl"
          style={{
            color: "var(--text-muted)",
            lineHeight: "1.6",
          }}
        >
          Krasty Soft is a B2B software development company — we build custom
          software, AI products, and web and backend systems for fintech,
          healthcare, e-commerce, and SaaS.
        </motion.p>

        {/* Proof line — keeps the Clutch rating, review count, and award in
            readable text (not only inside the Clutch iframe) so LLMs and
            crawlers can extract and cite it. */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-sm md:text-base text-center mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Rated 4.9 on Clutch from 11 verified client reviews · Top REST API
          Company, Ukraine 2026.
        </motion.p>

        {/* CTA Button */}
        <motion.div {...fadeUp(0.25)} className="mb-16 relative">
          {/* Pulsing glow - CSS animation instead of framer-motion */}
          <div
            className="absolute inset-0 rounded-full blur-3xl -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(229, 6, 6, 0.6), rgba(229, 6, 6, 0.3) 50%, transparent 70%)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />

          <motion.button
            onClick={goToContact}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group px-12 py-5 text-lg font-bold rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #E50606 0%, #FF2020 50%, #E50606 100%)",
              color: "var(--text-primary)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
            initial={false}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Text with arrow */}
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Get started today</span>
              <span
                className="inline-block"
                style={{ animation: "bounce-arrow 1.2s ease-in-out infinite" }}
              >
                →
              </span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div {...fadeUp(0.35)} className="w-full max-w-5xl">
          <ClutchBadges />
        </motion.div>
      </div>

      {/* Scroll indicator - CSS animations instead of framer-motion */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: "bounce-y 2s ease-in-out infinite" }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "var(--brand-red)",
              animation: "scroll-dot 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

    </section>
  );
};
