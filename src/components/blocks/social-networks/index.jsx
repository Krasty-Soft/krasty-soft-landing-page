'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Music, Youtube, Heart } from 'lucide-react'

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://instagram.com/krasty.soft',
        icon: Instagram,
        color: '#E4405F',
        gradient: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/krastysoft/',
        icon: Linkedin,
        color: '#0A66C2',
        gradient: 'linear-gradient(135deg, #0A66C2, #0e76d1)',
    },
    {
        name: 'TikTok',
        url: 'https://tiktok.com/@krasty.soft',
        icon: Music,
        color: '#000000',
        gradient: 'linear-gradient(135deg, #00f2ea, #ff0050)',
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/channel/UC07BoU_dSVMKd10UH8yglxg',
        icon: Youtube,
        color: '#FF0000',
        gradient: 'linear-gradient(135deg, #FF0000, #cc0000)',
    },
]

const SocialIcon = ({ social, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = social.icon

    return (
        <motion.li
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            style={{ listStyle: 'none' }}
        >
            <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textDecoration: 'none',
                }}
            >
                {/* Background gradient glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.2 : 0,
                        scale: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: social.gradient,
                        pointerEvents: 'none',
                    }}
                />

                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        rotate: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon size={20} color={isHovered ? social.color : 'rgba(255, 255, 255, 0.7)'} />
                </motion.div>

                {/* Border glow on hover */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: 'var(--radius-md)',
                        background: social.gradient,
                        pointerEvents: 'none',
                        zIndex: -1,
                    }}
                />
            </motion.a>
        </motion.li>
    )
}

export const SocialNetworks = () => {
    return (
        <div 
            className="py-10 px-4 md:px-8 lg:px-12 xl:px-24"
            style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
        }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                alignItems: 'center',
            }}
            className="md:flex-row md:justify-between">
                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                    className="md:flex-row md:items-center md:gap-2"
                >
                    <p style={{
                        fontSize: '0.9375rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'center',
                    }}
                    className="md:text-left">
                        © 2025 <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>Krasty Soft</span>
                    </p>
                    <span style={{ 
                        color: 'rgba(255, 255, 255, 0.3)',
                        display: 'none',
                    }}
                    className="md:inline">
                        •
                    </span>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        justifyContent: 'center',
                    }}>
                        Made with <Heart size={14} color="var(--brand-red)" fill="var(--brand-red)" /> by our team
                    </p>
                </motion.div>

                {/* Social Icons */}
                <ul style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                }}>
                    {socialLinks.map((social, index) => (
                        <SocialIcon key={social.name} social={social} index={index} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
