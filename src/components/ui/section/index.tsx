"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type SectionVariant = "primary" | "secondary" | "elevated" | "transparent";

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SectionProps {
  variant?: SectionVariant;
  subtitle?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  sectionCls?: string;
  containerCls?: string;
  animate?: boolean;
  centered?: boolean;
  id?: string;
}

const getSectionStyles = (variant: SectionVariant) => {
  switch (variant) {
    case "primary":
      return "bg-bg-primary text-text-primary";
    case "secondary":
      return "bg-bg-secondary text-text-primary";
    case "elevated":
      return "bg-bg-elevated text-text-primary";
    case "transparent":
      return "bg-transparent text-text-primary";
  }
};

export const Section = ({
  title,
  subtitle,
  description,
  children,
  variant = "primary",
  containerCls = "",
  sectionCls = "",
  animate = true,
  centered = false,
  id,
}: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const MotionDiv = animate ? motion.div : "div";
  const animationProps = animate
    ? {
        ref,
        variants: staggerContainer,
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
      }
    : {};

  return (
    <section id={id} className={`${getSectionStyles(variant)} ${sectionCls}`}>
      <MotionDiv
        className={`
                    container px-8 py-12 md:px-16 md:py-16 lg:px-22 lg:py-20 xl:px-36 xl:py-24
                    ${containerCls}
                `}
        {...animationProps}
      >
        {(subtitle || title || description) && (
          <motion.div
            className={`mb-12 md:mb-16 lg:mb-20 ${
              centered ? "text-center mx-auto max-w-3xl" : "max-w-4xl"
            }`}
            variants={animate ? staggerItem : undefined}
          >
            {subtitle && (
              <p
                className="text-xs md:text-sm uppercase tracking-wider font-medium mb-4"
                style={{ color: "var(--brand-red)" }}
              >
                {subtitle}
              </p>
            )}
            {title && (
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className="text-lg md:text-xl"
                style={{ color: "var(--text-muted)" }}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}

        {animate ? (
          <motion.div variants={staggerItem}>{children}</motion.div>
        ) : (
          children
        )}
      </MotionDiv>
    </section>
  );
};

// Simple container without header
export const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`
                container 
                px-4 md:px-8 lg:px-12 xl:px-24 
                mx-auto max-w-7xl
                ${className}
            `}
    >
      {children}
    </div>
  );
};
