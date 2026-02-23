'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface PlatformCardItem {
  icon: LucideIcon
  heading: string
  description: string
}

interface PlatformCardProps {
  item: PlatformCardItem
  index: number
}

export function PlatformCard({ item, index }: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          padding: '2rem',
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <motion.div
          animate={{ opacity: isHovered ? 0.1 : 0, scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at top, var(--brand-red), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <Icon size={28} color="var(--brand-red)" />
          </motion.div>
          <motion.h3
            animate={{ color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)' }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}
          >
            {item.heading}
          </motion.h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
