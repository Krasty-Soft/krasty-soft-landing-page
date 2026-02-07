'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PAGES from "@/lib/navigation";
import Icon1 from "@/assets/maritime.svg";
import Icon2 from "@/assets/health-care.svg";
import Icon3 from "@/assets/fin-tech.svg";
import Icon4 from "@/assets/protect.svg";
import { Section, TypingText } from "@/components/ui";

const icons = {
  ["Maritime Transportation"]: Icon1,
  Healthcare: Icon2,
  FinTech: Icon3,
  Insurance: Icon4,
};

const IndustryCard = ({ 
  item, 
  index 
}: { 
  item: { slug: string; label: string; description: string },
  index: number 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = icons[item.label as keyof typeof icons]

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/${item.slug}`} style={{ textDecoration: 'none' }}>
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'relative',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            height: '100%',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Background glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.3), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              backgroundColor: 'var(--brand-red)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {Icon && <Icon className="scale-125" />}
          </motion.div>

          {/* Content */}
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <h3
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {item.label}
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.description}
            </p>
          </div>

          {/* Learn More Link */}
          <motion.div
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--brand-red)',
              fontSize: '0.875rem',
              fontWeight: '600',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span>Explore {item.label}</span>
            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.div>

          {/* Border glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.5), transparent 50%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        </motion.div>
      </Link>
    </motion.li>
  )
}

export const Industries = () => {
  return (
    <Section variant={"primary"} animate={false}>
      {/* Custom Title with Typing Effect */}
      <div className="mb-12 md:mb-16">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          style={{ 
            color: 'var(--text-primary)',
            lineHeight: '1.4'
          }}
        >
          <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
          <TypingText
            text="Tailored solutions for leading industries."
            speed={50}
            delay={300}
            highlightWords={['Tailored', 'industries']}
          />
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {Array.isArray(PAGES.industries) &&
          PAGES.industries.map((item, index) => (
            <IndustryCard key={index} item={item} index={index} />
          ))}
      </ul>
    </Section>
  );
};
