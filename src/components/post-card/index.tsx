'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { GeometricPattern, Pill } from "@/components/ui"
import { Post } from "@/lib/posts"

export const PostCard = ({ data }: { data: Post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={false}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/blog/${data.slug}`} style={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--surface-primary)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            isolation: 'isolate',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          {/* Static border */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Geometric Pattern Container */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9',
            overflow: 'hidden',
          }}>
            {/* Geometric pattern background - uses post slug as seed for unique pattern */}
            <GeometricPattern seed={data.slug} isHovered={isHovered} />

            {/* Gradient overlay for text readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ 
            padding: '1.5rem',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {data?.tags?.slice(0, 2).map((tag, i) => (
                <Pill key={i} title={tag} variant={'bordered'} />
              ))}
            </div>

            {/* Title */}
            <motion.h3
              animate={{
                color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: '1.4',
                marginBottom: '0.75rem',
                flex: 1,
              }}
            >
              {data.title}
            </motion.h3>

            {/* Meta info (optional - can add date/read time) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Calendar size={14} />
                <span>Dec 2024</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Clock size={14} />
                <span>5 min read</span>
              </div>
            </div>

            {/* Read More Link */}
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
                fontWeight: 600,
              }}
            >
              <span>Read Article</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          </div>

          {/* Red border glow on hover */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, var(--brand-red), transparent)',
              pointerEvents: 'none',
              zIndex: 11,
              opacity: 0,
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
