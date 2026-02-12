"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu,
  Target,
  Globe,
  Award,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const icons = {
  Tech: Cpu,
  Strategic: Target,
  Global: Globe,
  Perfection: Award,
  Innovation: Lightbulb,
  Quality: ShieldCheck,
};

const features = [
  {
    title: "Tech",
    description: "Cutting-edge tools.",
    detail:
      "We use the latest frameworks and technologies to build scalable, performant solutions.",
  },
  {
    title: "Strategic",
    description: "Solutions that convert.",
    detail:
      "Every decision is backed by data and aligned with your business objectives.",
  },
  {
    title: "Global",
    description: "Delivering top-tier services worldwide.",
    detail:
      "From Ukraine to the world - we serve clients across multiple continents.",
  },
  {
    title: "Perfection",
    description: "Unforgettable digital presence.",
    detail:
      "Pixel-perfect design meets flawless functionality in every project.",
  },
  {
    title: "Innovation",
    description: "Your vision, powered by technology.",
    detail:
      "We transform ambitious ideas into reality with creative problem-solving.",
  },
  {
    title: "Quality",
    description: "No compromises. Just excellence.",
    detail:
      "Rigorous testing, clean code, and attention to detail in everything we build.",
  },
] as const;

const DifferenceCard = ({
  item,
  index,
}: {
  item: (typeof features)[number];
  index: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showContent, setShowContent] = useState(false);
  const hasPlayedRef = useRef(false);
  const Icon = icons[item.title];

  // When card appears on screen, play skeleton then reveal text (once)
  useEffect(() => {
    if (!isInView || hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        position: "relative",
        listStyle: "none",
      }}
    >
      <div
        style={{
          border: "1px solid var(--border-default)",
          borderRadius: "9999px",
          padding: "1rem 1.5rem",
          backgroundColor: "transparent",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="flex gap-4 items-center">
            {/* Icon */}
            <div
              style={{
                backgroundColor: "var(--brand-red)",
                borderRadius: "50%",
                width: "5rem",
                height: "5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={40} color="white" />
            </div>

            {/* Text content - always visible */}
            <div
              className="flex-1 min-w-0"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "2rem",
              }}
            >
              {/* Title + Description - always shown */}
              <div>
                <div
                  className="text-lg md:text-2xl font-bold"
                  style={{
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </div>
                <p
                  className="text-base"
                  style={{
                    color: "var(--text-secondary)",
                    marginTop: "0.25rem",
                    marginLeft: "0rem",
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Detail section - always present, skeleton plays when in view */}
              <div
                style={{
                  flex: 1,
                  //marginTop: "0.5rem",
                  //marginBottom: "0.75rem",
                  position: "relative",
                  //minHeight: "3rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {/* Skeleton layer - only visible and animating when in view, before content reveal */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isInView && !showContent ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      overflow: "hidden",
                      pointerEvents: showContent ? "none" : "auto",
                    }}
                  >
                    <motion.div
                      animate={
                        isInView && !showContent
                          ? { x: ["-100%", "100%"] }
                          : { x: "-100%" }
                      }
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.5) 50%, transparent 100%)",
                        width: "200%",
                      }}
                    />
                  </motion.div>

                  {/* Text layer - always in DOM, visible after skeleton */}
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: showContent ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xs md:text-sm leading-relaxed"
                    style={{
                      color: "var(--text-tertiary)",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem 0.5rem 0.75rem 0rem",
                    }}
                  >
                    {item.detail}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export const Difference = ({ isDark = true }: { isDark?: boolean }) => {
  return (
    <Section variant={isDark ? "primary" : "secondary"} animate={false}>
      {/* Custom Title with Typing Effect */}
      <SectionWrapper>
        <div
          className="mb-12 md:mb-16 w-full"
          style={{ maxWidth: "var(--max-width)" }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.4",
            }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Development that sets you apart."
              speed={50}
              delay={300}
              highlightWords={["Development", "apart"]}
            />
          </h2>
        </div>

        <ul
          className="flex flex-col gap-4 md:gap-5 lg:gap-6"
          style={{ width: "100%", maxWidth: "var(--max-width)" }}
        >
          {features.map((item, index) => (
            <DifferenceCard key={index} item={item} index={index} />
          ))}
        </ul>
      </SectionWrapper>
    </Section>
  );
};
