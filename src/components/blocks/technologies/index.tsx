"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import technologies from "@/constants/technologies";
import Icon1 from "@/assets/retool.svg";
import Icon2 from "@/assets/react.svg";
import Icon3 from "@/assets/python.svg";
import Icon4 from "@/assets/node.svg";
import { Section, TypingText } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const icons = {
  Retool: Icon1,
  React: Icon2,
  Python: Icon3,
  Node: Icon4,
};

const TechCard = ({
  tech,
  index,
}: {
  tech: (typeof technologies)[number];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icons[tech.key];
  const techSlug = tech.key.toLowerCase();

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ listStyle: "none" }}
    >
      <Link href={`/${techSlug}`} style={{ textDecoration: "none" }}>
        <motion.div
        animate={{
          y: isHovered ? -12 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "relative",
          padding: "2rem 1.5rem",
          textAlign: "center",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-xl)",
          backgroundColor: "var(--surface-primary)",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {/* Background glow that awakens */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${tech.brandColor}, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0, // Start invisible
          }}
        />

        {/* Icon container - awakens with rotation */}
        <motion.div
          initial={false}
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
            rotate: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "4rem",
            marginBottom: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* SVG wrapper with color filter */}
          <motion.div
            initial={false}
            animate={{
              filter: isHovered
                ? "grayscale(0%) brightness(1.2)"
                : "grayscale(100%) brightness(0.7)",
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "grayscale(100%) brightness(0.7)", // Start in sleeping state
            }}
          >
            <Icon className="scale-150" />
          </motion.div>
        </motion.div>

        {/* Tech name - color awakens */}
        <motion.span
          initial={false}
          animate={{
            color: isHovered ? tech.brandColor : "var(--text-secondary)",
          }}
          transition={{ duration: 0.4 }}
          className="text-base md:text-lg font-bold block"
          style={{ color: "var(--text-secondary)" }} // Start in sleeping state
        >
          {tech.title}
        </motion.span>

        {/* Border glow pulse */}
        <motion.div
          animate={{
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "var(--radius-xl)",
            background: `linear-gradient(135deg, ${tech.brandColor}, transparent)`,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      </motion.div>
      </Link>
    </motion.li>
  );
};

export const Technologies = () => {
  return (
    <Section variant={"primary"} animate={false}>
      {/* Custom Title with Typing Effect */}
      <SectionWrapper>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.4",
              maxWidth: "var(--max-width)",
            }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text="Innovative technologies and premium solutions."
              speed={50}
              delay={300}
              highlightWords={["Innovative", "premium"]}
            />
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-5 lg:gap-6 xl:gap-8"
          style={{ width: "100%", maxWidth: "var(--max-width)" }}
        >
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </ul>
      </SectionWrapper>
    </Section>
  );
};
