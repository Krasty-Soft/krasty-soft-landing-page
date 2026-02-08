'use client'

import { motion } from 'framer-motion'
import { Wrench, Zap, Database, Layout, Workflow, Shield, Clock, RefreshCw } from 'lucide-react'
import { Section, TypingText } from '@/components/ui'
import { Technologies, Cases, UseCases } from '@/components/blocks'
import { useState } from 'react'

const benefits = [
  {
    icon: Zap,
    title: 'Rapid Development',
    description: 'Build internal tools 10x faster with Retool\'s drag-and-drop interface and pre-built components.',
  },
  {
    icon: Database,
    title: 'Any Data Source',
    description: 'Connect to databases, APIs, and services instantly - PostgreSQL, MongoDB, REST APIs, and more.',
  },
  {
    icon: Layout,
    title: 'Custom UI Components',
    description: 'Design beautiful interfaces with tables, charts, forms, and custom React components.',
  },
  {
    icon: Workflow,
    title: 'Automation & Workflows',
    description: 'Automate business processes with scheduled jobs, webhooks, and event-driven workflows.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built-in authentication, SSO, RBAC, and audit logs for enterprise-grade security.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Maintenance',
    description: 'Update tools quickly without deployments - changes go live instantly.',
  },
]

const useCases = [
  'Admin Panels & Dashboards',
  'Customer Support Tools',
  'Data Management Interfaces',
  'Internal CRM Systems',
  'Approval Workflows',
  'Reporting & Analytics Tools',
]

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[number], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = benefit.icon

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
            {benefit.title}
          </motion.h3>

          <p style={{
            fontSize: '0.9375rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
          }}>
            {benefit.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface RetoolDevelopmentClientProps {
  cases: any[]
}

export default function RetoolDevelopmentClient({ cases }: RetoolDevelopmentClientProps) {

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
                <Wrench size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
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
                text="Retool Development Services"
                speed={50}
                delay={300}
                highlightWords={['Retool', 'Services']}
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
              Build <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>powerful internal tools</span> in hours,
              not months. We help teams leverage Retool to create{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>admin panels, dashboards, and workflows</span>{' '}
              that connect to any data source and automate business processes.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Benefits Section */}
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
              text="Why choose Retool?"
              speed={50}
              delay={300}
              highlightWords={['Retool']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </Section>

      {/* Use Cases Section */}
      <Section variant="primary" animate={false}>
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
              text="What can you build?"
              speed={50}
              delay={300}
              highlightWords={['build']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--surface-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              <Clock size={24} color="var(--brand-red)" style={{ margin: '0 auto 0.75rem', display: 'block' }} />
              {useCase}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Use Cases Block (if available) */}
      <UseCases />

      {/* Technologies Section */}
      <Technologies />

      {/* Case Studies */}
      {cases.length > 0 && <Cases cases={cases} />}

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: 'var(--brand-red)',
            borderRadius: 'var(--radius-xl)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Zap size={48} color="white" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              Ready to build internal tools faster?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
              Let&apos;s discuss how Retool can accelerate your internal tool development.
            </p>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
