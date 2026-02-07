'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, Users, Laptop, Heart, Globe, TrendingUp } from 'lucide-react'
import { Section, TypingText } from '@/components/ui'
import { Opportunities } from '@/components/blocks'

const perks = [
  {
    icon: MapPin,
    title: 'Remote-First',
    description: 'Work from anywhere in the world. We trust you to do your best work wherever you are.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Freedom of time - organize your schedule to match your peak productivity hours.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Clear career paths, mentorship programs, and continuous learning opportunities.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'We value your personal time. Unlimited PTO and real work-life balance.',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Join a talented, supportive team that values collaboration and innovation.',
  },
  {
    icon: Laptop,
    title: 'Modern Stack',
    description: 'Work with cutting-edge technologies and tools on exciting projects.',
  },
]

const PerkCard = ({ perk, index }: { perk: typeof perks[number], index: number }) => {
  const Icon = perk.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
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
      <div style={{
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
      }}>
        <Icon size={24} color="var(--brand-red)" />
      </div>

      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
        color: 'var(--text-primary)',
      }}>
        {perk.title}
      </h3>

      <p style={{
        fontSize: '0.9375rem',
        lineHeight: '1.7',
        color: 'var(--text-secondary)',
      }}>
        {perk.description}
      </p>
    </motion.div>
  )
}

export default function CareersClient() {
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
                <Briefcase size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
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
                text="Join Our Team"
                speed={50}
                delay={300}
                highlightWords={['Team']}
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
              You&apos;re <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>free</span>: Freedom of{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>time</span>,{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>location</span>, and to{' '}
              <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>balance work and life</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--brand-red)',
                }}>
                  100%
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Remote</div>
              </div>
              <div style={{ width: '1px', height: '3rem', backgroundColor: 'var(--border-default)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--brand-red)',
                }}>
                  <Globe size={32} style={{ display: 'inline' }} />
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Global Team</div>
              </div>
              <div style={{ width: '1px', height: '3rem', backgroundColor: 'var(--border-default)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--brand-red)',
                }}>
                  ∞
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>Growth</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Perks Section */}
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
              text="Why work with us?"
              speed={50}
              delay={300}
              highlightWords={['work']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {perks.map((perk, index) => (
            <PerkCard key={index} perk={perk} index={index} />
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Opportunities isEmpty={true} />
    </>
  )
}
