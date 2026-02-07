'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Target, Globe, Award, Lightbulb, ShieldCheck } from "lucide-react";
import { Section, TypingText } from "@/components/ui";

const icons = {
  Tech: Cpu,
  Strategic: Target,
  Global: Globe,
  Perfection: Award,
  Innovation: Lightbulb,
  Quality: ShieldCheck,
}

const features = [
  {
    title: 'Tech',
    description: 'Cutting-edge tools.',
    detail: 'We use the latest frameworks and technologies to build scalable, performant solutions.',
  },
  {
    title: 'Strategic',
    description: 'Solutions that convert.',
    detail: 'Every decision is backed by data and aligned with your business objectives.',
  },
  {
    title: 'Global',
    description: 'Delivering top-tier services worldwide.',
    detail: 'From Ukraine to the world - we serve clients across multiple continents.',
  },
  {
    title: 'Perfection',
    description: 'Unforgettable digital presence.',
    detail: 'Pixel-perfect design meets flawless functionality in every project.',
  },
  {
    title: 'Innovation',
    description: 'Your vision, powered by technology.',
    detail: 'We transform ambitious ideas into reality with creative problem-solving.',
  },
  {
    title: 'Quality',
    description: 'No compromises. Just excellence.',
    detail: 'Rigorous testing, clean code, and attention to detail in everything we build.',
  },
] as const;

const DifferenceCard = ({ 
  item, 
  index,
  isDark 
}: { 
  item: typeof features[number], 
  index: number,
  isDark: boolean 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const Icon = icons[item.title]

  // Simple timer for content reveal - but make it cancelable
  React.useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setShowContent(true), 400)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isHovered])

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        listStyle: 'none',
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          border: '1px solid var(--border-default)',
          borderRadius: '9999px',
          padding: '1rem 1.5rem',
          backgroundColor: isHovered ? 'var(--surface-elevated)' : 'transparent',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: '-1px',
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.15), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex gap-4 items-center">
            {/* Icon */}
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                backgroundColor: 'var(--brand-red)',
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={20} color="white" />
            </motion.div>

            {/* Text content - fixed height container */}
            <div className="flex-1 min-w-0" style={{ height: '5rem', display: 'flex', flexDirection: 'column' }}>
              {/* Title + Description - shrinks to make room */}
              <motion.div
                initial={false}
                animate={{ 
                  scale: isHovered ? 0.75 : 1,
                }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.32, 0.72, 0, 1]
                }}
                style={{ 
                  transformOrigin: 'left top',
                }}
              >
                <div 
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </div>
                <p 
                  className="text-base"
                  style={{ 
                    color: 'var(--text-secondary)',
                    marginTop: '0.25rem',
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
              
              {/* Detail section - appears in freed space */}
              <div style={{ 
                flex: 1,
                marginTop: '0.5rem',
                position: 'relative',
              }}>
                {isHovered && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ 
                      scaleY: 1,
                      opacity: 1,
                    }}
                    exit={{ 
                      scaleY: 0,
                      opacity: 0,
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    style={{ 
                      height: '100%',
                      transformOrigin: 'top',
                      position: 'relative',
                    }}
                  >
                    {/* Skeleton layer */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        opacity: showContent ? 0 : 1,
                      }}
                      transition={{ 
                        duration: 0.2,
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.5) 50%, transparent 100%)',
                          width: '200%',
                        }}
                      />
                    </motion.div>

                    {/* Text layer */}
                    <motion.p
                      initial={false}
                      animate={{ 
                        opacity: showContent ? 1 : 0,
                      }}
                      transition={{ 
                        duration: 0.2,
                      }}
                      className="text-xs leading-relaxed"
                      style={{ 
                        color: 'var(--text-tertiary)',
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 0.5rem',
                      }}
                    >
                      {item.detail}
                    </motion.p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.li>
  )
}

export const Difference = ({ isDark = true } : { isDark?: boolean }) => {
  return (
    <Section
      variant={isDark ? 'primary' : 'secondary'}
      animate={false}
    >
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
            text="Development that sets you apart."
            speed={50}
            delay={300}
            highlightWords={['Development', 'apart']}
          />
        </h2>
      </div>

      <ul className="flex flex-col gap-4 md:gap-5 lg:gap-6">
        {features.map((item, index) => (
          <DifferenceCard 
            key={index}
            item={item}
            index={index}
            isDark={isDark}
          />
        ))}
      </ul>
    </Section>
  )
}
