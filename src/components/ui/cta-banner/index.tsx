"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CTABannerProps {
  children: ReactNode;
}

export const CTABanner = ({ children }: CTABannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="md:w-4/5 md:mx-auto"
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b91c1c 100%)",
        borderRadius: "var(--radius-xl)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
};
