'use client'

import { motion } from 'framer-motion'
import { DollarSign, Shield, Zap, TrendingUp, Lock, CreditCard, Users, BarChart } from 'lucide-react'
import { Section, TypingText, CTABanner } from '@/components/ui'
import { Cases, Technologies } from '@/components/blocks'
import { Case } from '@/lib/cases'
import { useState } from 'react'

const features = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Bank-grade encryption and compliance with financial regulations (PCI DSS, SOC 2, GDPR).',
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Lightning-fast transaction processing and instant payment confirmations.',
  },
  {
    icon: Lock,
    title: 'Fraud Prevention',
    description: 'Advanced fraud detection systems with AI-powered risk assessment.',
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Seamless integration with payment gateways, wallets, and banking systems.',
  },
  {
    icon: BarChart,
    title: 'Analytics & Reporting',
    description: 'Comprehensive financial dashboards with real-time insights and reporting.',
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Intuitive interfaces designed for seamless financial interactions.',
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

export default function FintechClient({ cases }: { cases: Case[] }) {
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
                <DollarSign size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
              </motion.div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-18"
              style={{
                color: 'var(--text-primary)',
                lineHeight: '1.2',
              }}
            >
              <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
              <TypingText
                text="Fintech Software Development Services"
                speed={50}
                delay={300}
                highlightWords={['Fintech', 'Development']}
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
              We deliver <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>fintech software development</span> for
              products where security, accuracy, and uptime are non-negotiable — from{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>payment systems</span> and{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>digital banking</span> to lending
              platforms, digital wallets, and trading and reporting tools. Each{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>custom</span> build is designed around
              auditable transactions, strict access control, and clean integration with the payment providers,
              core banking systems, and data sources you already depend on.
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
              text="Why Choose Us for Financial Software Development"
              speed={50}
              delay={300}
              highlightWords={['Financial', 'Development']}
            />
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mt-6"
            style={{ color: 'var(--text-secondary)', maxWidth: '60rem' }}
          >
            In finance the hard part is rarely the interface — it is money movement that must reconcile
            exactly, permissions that must hold up to audit, and integrations that cannot silently fail.
            Our <strong>fintech application development</strong> work starts from those requirements:
            explicit transaction logic, complete audit trails, and monitoring that surfaces problems before
            customers notice. As an engineering <strong>agency</strong> we build the whole product — the{' '}
            <strong>app</strong> your customers use and the services behind it — and support it in production.
          </p>
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
      <Technologies title="Technologies Behind Software Development for Fintech" />

      {/* Case Studies */}
      <Cases
        cases={cases}
        industry="fintech"
        title="Custom Fintech Software Solutions: Client Success Stories"
        intro="Our end to end fintech development services span trading and arbitrage tooling, payment and rewards platforms, and Web3 and DeFi products. These projects show how we handle the parts that matter in finance: precise transaction handling, secure access control, and integrations that stay reliable under real transaction volume."
      />

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <TrendingUp size={48} color="white" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'white' }}
          >
            Ready to revolutionize your fintech product?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
            Let&apos;s discuss how we can build secure, scalable financial solutions for your business.
          </p>
          <motion.button
            type="button"
            onClick={() => {
              const container = document.getElementById('app-scroll')
              const section = document.getElementById('contacts')
              if (container && section) {
                const containerRect = container.getBoundingClientRect()
                const sectionRect = section.getBoundingClientRect()
                container.scrollTo({ top: sectionRect.top - containerRect.top + container.scrollTop, behavior: 'smooth' })
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 1.75rem', fontSize: '1rem', fontWeight: 600, color: '#7f1d1d',
              backgroundColor: 'white', border: 'none', borderRadius: 'var(--radius-lg)',
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
            }}
          >
            Get in touch
          </motion.button>
        </CTABanner>
      </Section>
    </>
  )
}
