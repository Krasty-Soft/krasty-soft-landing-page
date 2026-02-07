'use client'

import { motion } from 'framer-motion'
import { Code2, Zap, Layers, Puzzle, Rocket, Users, Settings, Target } from 'lucide-react'
import { Section, TypingText } from '@/components/ui'
import { Technologies, Cases } from '@/components/blocks'
import { getAllCases } from '@/lib/cases'
import { useEffect, useState } from 'react'

const benefits = [
  {
    icon: Target,
    title: 'Tailored Solutions',
    description: 'Custom-built software designed specifically for your business needs and workflows.',
  },
  {
    icon: Zap,
    title: 'Scalable Architecture',
    description: 'Built to grow with your business, handling increased load and complexity effortlessly.',
  },
  {
    icon: Layers,
    title: 'Modern Tech Stack',
    description: 'Using cutting-edge technologies for performance, security, and maintainability.',
  },
  {
    icon: Puzzle,
    title: 'Seamless Integration',
    description: 'Integrate with your existing systems, APIs, and third-party services smoothly.',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed with your users and their workflows in mind.',
  },
  {
    icon: Settings,
    title: 'Full Control',
    description: 'Complete ownership of your software with no vendor lock-in or licensing fees.',
  },
]

const process = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, define scope, and create a detailed roadmap.',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description: 'Designing user interfaces and system architecture that scales.',
  },
  {
    number: '03',
    title: 'Development & Testing',
    description: 'Agile development with continuous testing and quality assurance.',
  },
  {
    number: '04',
    title: 'Deployment & Support',
    description: 'Smooth deployment with ongoing maintenance and feature updates.',
  },
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

const ProcessStep = ({ step, index }: { step: typeof process[number], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        gap: '1.5rem',
      }}
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
          animate={{
            color: isHovered ? 'white' : 'var(--brand-red)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {step.number}
        </motion.span>
      </motion.div>

      <div style={{ paddingTop: '0.5rem' }}>
        <motion.h3
          animate={{ color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)' }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          {step.title}
        </motion.h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.7',
          color: 'var(--text-secondary)',
        }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function CustomSoftwarePage() {
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    getAllCases().then(setCases)
  }, [])

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
                <Code2 size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
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
                text="Custom Software Development"
                speed={50}
                delay={300}
                highlightWords={['Custom', 'Development']}
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
              Building <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>bespoke software solutions</span> that
              perfectly fit your business needs. From web applications to complex enterprise systems,
              we deliver <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>scalable, secure, and maintainable</span> software
              that drives your business forward.
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
              text="Why custom software?"
              speed={50}
              delay={300}
              highlightWords={['custom']}
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

      {/* Process Section */}
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
              text="Our development process."
              speed={50}
              delay={300}
              highlightWords={['process']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
        }}>
          {process.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </Section>

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
            <Rocket size={48} color="white" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              Ready to build your custom solution?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
              Let's discuss your project and create software that perfectly fits your needs.
            </p>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
