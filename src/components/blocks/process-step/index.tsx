'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export interface ProcessStepItem {
  number: string
  title: string
  description: string
}

interface ProcessStepProps {
  step: ProcessStepItem
  index: number
}

export function ProcessStep({ step, index }: ProcessStepProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'flex', gap: '1.5rem' }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          backgroundColor: isHovered ? 'var(--brand-red)' : 'rgba(220, 38, 38, 0.1)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '2px solid rgba(220, 38, 38, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <motion.span
          animate={{ color: isHovered ? 'white' : 'var(--brand-red)' }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '1.25rem', fontWeight: 700 }}
        >
          {step.number}
        </motion.span>
      </motion.div>

      <div style={{ paddingTop: '0.5rem' }}>
        <motion.h3
          animate={{ color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)' }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}
        >
          {step.title}
        </motion.h3>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}
