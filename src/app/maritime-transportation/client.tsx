'use client'

import { motion } from 'framer-motion'
import { Ship, MapPin, Gauge, Anchor, Radio, Package, Navigation, Waves } from 'lucide-react'
import { Section, TypingText, CTABanner } from '@/components/ui'
import { Cases, Technologies } from '@/components/blocks'
import { Case } from '@/lib/cases'
import { useState } from 'react'

const features = [
  {
    icon: Navigation,
    title: 'Fleet Management',
    description: 'Real-time tracking and management of vessels with comprehensive operational insights.',
  },
  {
    icon: MapPin,
    title: 'Route Optimization',
    description: 'AI-powered route planning for fuel efficiency and optimal voyage scheduling.',
  },
  {
    icon: Radio,
    title: 'IoT Integration',
    description: 'Connected systems for vessel monitoring, predictive maintenance, and safety alerts.',
  },
  {
    icon: Package,
    title: 'Cargo Management',
    description: 'End-to-end cargo tracking, documentation, and logistics coordination.',
  },
  {
    icon: Gauge,
    title: 'Performance Analytics',
    description: 'Data-driven insights for vessel performance, fuel consumption, and operational efficiency.',
  },
  {
    icon: Anchor,
    title: 'Port Operations',
    description: 'Digital solutions for port scheduling, berth management, and customs clearance.',
  },
]

const FeatureCard = ({ feature, index }: { feature: typeof features[number], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
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
          animate={{
            opacity: isHovered ? 0.1 : 0,
            scale: isHovered ? 1.5 : 1,
          }}
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
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
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
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            {feature.title}
          </motion.h3>

          <p style={{
            fontSize: '0.9375rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
          }}>
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MaritimeTransportationClient({ cases }: { cases: Case[] }) {
  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" animate={false}>
        <div style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <Ship size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
              </motion.div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              style={{
                color: 'var(--text-primary)',
                lineHeight: '1.2',
              }}
            >
              <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
              <TypingText
                text="Maritime & Transportation Software"
                speed={50}
                delay={300}
                highlightWords={['Maritime', 'Transportation']}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              Delivering cutting-edge software for maritime and transportation industries.
              From <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>fleet management</span> to{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>cargo tracking</span>,
              we build solutions that optimize operations and enhance safety at sea.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              color: 'var(--text-primary)',
              lineHeight: '1.4',
            }}
          >
            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
            <TypingText
              text="Why choose us for maritime?"
              speed={50}
              delay={300}
              highlightWords={['maritime']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </Section>

      {/* Technologies Section */}
      <Technologies />

      {/* Case Studies */}
      <Cases cases={cases} industry="maritime" />

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <Waves size={48} color="white" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'white' }}
          >
            Ready to navigate the future of maritime tech?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
            Let&apos;s build innovative solutions that transform maritime operations.
          </p>
        </CTABanner>
      </Section>
    </>
  )
}
