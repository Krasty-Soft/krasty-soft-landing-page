'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Code, Monitor, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

// Map job titles to icons
const getJobIcon = (title: string) => {
  const lower = title.toLowerCase()
  if (lower.includes('full-stack') || lower.includes('fullstack')) return Briefcase
  if (lower.includes('senior')) return Code
  if (lower.includes('front')) return Monitor
  return Briefcase
}

interface JobCardProps {
  job: {
    slug: string
    title: string
    description: string
    tags: string
    link: string
  }
  index: number
}

const JobCard = ({ job, index }: JobCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = getJobIcon(job.title)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ listStyle: 'none' }}
    >
      <Link href={`${job.link}/${job.slug}`} style={{ textDecoration: 'none' }}>
        <motion.div
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'relative',
            padding: '2rem',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {/* Background glow on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.1 : 0,
              scale: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at center, var(--brand-red), transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '1.5rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            {/* Icon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={24} color="var(--brand-red)" />
            </motion.div>

            {/* Content */}
            <div style={{ minWidth: 0 }}>
              {/* Title */}
              <motion.h3
                animate={{
                  color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  lineHeight: '1.3',
                }}
              >
                {job.title}
              </motion.h3>

              {/* Meta info */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  <span>{job.description}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} />
                  <span>{job.tags}</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isHovered ? 'var(--brand-red)' : 'transparent',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <motion.div
                animate={{
                  color: isHovered ? 'white' : 'var(--brand-red)',
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.div>
          </div>

          {/* Border glow on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--brand-red), transparent)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export const Jobs = ({ jobs }: { jobs: any[] }) => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} index={index} />
      ))}
    </div>
  )
}
