'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin, Users, Code, Target } from 'lucide-react'
import Link from 'next/link'
import { Section, TypingText } from '@/components/ui'
import { TEAM_MEMBERS } from "@/lib/team"
import { EXPERTISE_ITEMS } from "@/lib/expertise"
import WorldMapImage from "@/assets/world-map-ukraine.jpg"
import Image from "next/image"

// Expertise Card Component
const ExpertiseCard = ({ item, index }: { item: typeof EXPERTISE_ITEMS[number], index: number }) => {
    const [isHovered, setIsHovered] = useState(false)
    const IconComponent = item.icon

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
                {/* Background glow */}
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
                    {/* Icon */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                            border: '1px solid rgba(220, 38, 38, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {IconComponent && <IconComponent className="scale-150" />}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        animate={{ color: isHovered ? 'var(--brand-red)' : 'var(--text-primary)' }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                        }}
                    >
                        {item.title}
                    </motion.h3>

                    {/* Description */}
                    <p style={{
                        fontSize: '0.9375rem',
                        lineHeight: '1.7',
                        color: 'var(--text-secondary)',
                    }}>
                        {item.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Team Member Card Component
const TeamMemberCard = ({ member, index }: { member: typeof TEAM_MEMBERS[number], index: number }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Background glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.1 : 0,
                        scale: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, var(--brand-red), transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />

                <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        {/* Photo */}
                        <motion.div
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                width: '8rem',
                                height: '8rem',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                margin: '0 auto 1.5rem',
                                border: '2px solid rgba(220, 38, 38, 0.3)',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            {member.picture && (
                                <Image
                                    src={member.picture}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            )}
                        </motion.div>

                        {/* Name */}
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem',
                        }}>
                            {member.name}
                        </h3>

                        {/* Position */}
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--brand-red)',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            minHeight: '2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            lineHeight: '1.4',
                        }}>
                            {member.position}
                        </p>
                    </div>

                    {/* Contact Links */}
                    <div>
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            justifyContent: 'center',
                        }}>
                        {member.email && (
                            <motion.a
                                href={`mailto:${member.email}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                    border: '1px solid rgba(220, 38, 38, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Mail size={16} color="var(--brand-red)" />
                            </motion.a>
                        )}
                        {member.linkedin && (
                            <motion.a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(10, 102, 194, 0.1)',
                                    border: '1px solid rgba(10, 102, 194, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Linkedin size={16} color="#0A66C2" />
                            </motion.a>
                        )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Page() {
  const worldMapSrc = WorldMapImage.src;
  
  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" animate={false}>
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8"
              style={{
                color: 'var(--text-primary)',
                lineHeight: '1.2',
              }}
            >
              <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
              <TypingText
                text="About Krasty Soft"
                speed={50}
                delay={300}
                highlightWords={['Krasty', 'Soft']}
              />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto 3rem',
            }}
          >
            We are a young, ambitious <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>Ukrainian company</span> driven by innovation and
            a profound commitment to excellence in software development. Beyond
            just code, we pride ourselves on cultivating a vibrant, supportive
            work environment where lightness, openness, and transparent
            communication are at the heart of everything we do.
          </motion.p>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(220, 38, 38, 0.05)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--brand-red)', marginBottom: '0.5rem' }}>
                <MapPin style={{ display: 'inline', marginBottom: '0.5rem' }} />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Based in Ukraine
              </div>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(220, 38, 38, 0.05)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--brand-red)', marginBottom: '0.5rem' }}>
                <Users style={{ display: 'inline', marginBottom: '0.5rem' }} />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Expert Team
              </div>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(220, 38, 38, 0.05)',
              border: '1px solid rgba(220, 38, 38, 0.2)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--brand-red)', marginBottom: '0.5rem' }}>
                <Target style={{ display: 'inline', marginBottom: '0.5rem' }} />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Client-Focused
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Approach Section */}
      <Section variant="secondary" animate={false}>
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              color: 'var(--text-primary)',
              lineHeight: '1.4',
            }}
          >
            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
            <TypingText
              text="Our approach to partnership."
              speed={50}
              delay={300}
              highlightWords={['approach', 'partnership']}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            Our team comprises highly skilled and experienced{" "}
            <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>professionals</span> dedicated to solving complex technical
            challenges. We don't just execute instructions; we act as
            strategic partners. Our commitment means we approach every client
            project <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>as if it were our own</span>, ensuring unparalleled quality,
            proactive problem-solving, and solutions that are truly built for
            long-term success.
          </motion.p>
        </div>
      </Section>

      {/* Expertise Section */}
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
              text="Our expertise and capabilities."
              speed={50}
              delay={300}
              highlightWords={['expertise', 'capabilities']}
            />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {EXPERTISE_ITEMS.map((item, index) => (
            <ExpertiseCard key={index} item={item} index={index} />
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16 text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              color: 'var(--text-primary)',
              lineHeight: '1.4',
            }}
          >
            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
            <TypingText
              text="Meet our leadership team."
              speed={50}
              delay={300}
              highlightWords={['leadership', 'team']}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Our leadership team is always ready to connect, understand your
            vision, and discuss how Krasty Soft can become your essential
            development partner.
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          Ready to discuss your next project with us? We're available for
          a call, a virtual coffee, or a detailed technical consultation.
        </motion.p>
      </Section>

      {/* CTA Banner */}
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
          
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              color: 'white',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Let's build something great together.
          </h2>
        </motion.div>
      </Section>
    </>
  );
}
