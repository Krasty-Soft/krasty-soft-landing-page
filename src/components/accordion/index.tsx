'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { ServiceType } from "@/types";
import Link from "next/link";

export const Accordion = ({ data, index, initState = false } : { data: ServiceType, index: number, initState?: boolean}) => {
  const [isOpen, setIsOpen] = useState(initState);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-default)',
        paddingTop: 'var(--spacing-6)',
        paddingBottom: 'var(--spacing-6)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-6 md:gap-8 lg:gap-12">
        {/* Number */}
        <motion.div
          className="text-sm md:text-base font-medium"
          style={{
            color: 'var(--text-tertiary)',
            minWidth: '40px',
          }}
        >
          O{index}
        </motion.div>

        {/* Title */}
        <div className="flex-grow">
          <h3
            className="text-xl md:text-2xl lg:text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {data.title}
          </h3>
        </div>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'var(--surface-elevated)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)',
          }}
          className="hover:border-[var(--brand-red)]"
        >
          {isOpen ? (
            <Minus size={20} style={{ color: 'var(--text-primary)' }} />
          ) : (
            <Plus size={20} style={{ color: 'var(--text-primary)' }} />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-6 md:pt-8 pl-6 md:pl-20">
              {/* Left: Bullet List */}
              <motion.ul
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-3"
              >
                {data.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm md:text-base"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span
                      style={{
                        color: 'var(--brand-red)',
                        marginTop: '0.25rem',
                      }}
                    >
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Right: Description & Link */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="space-y-6"
              >
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {data.description}
                </p>

                <Link
                  href={data.link}
                  className="inline-flex items-center gap-2 group"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    className="relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-[var(--brand-red)]"
                  >
                    Learn More
                  </span>
                  <motion.div
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight
                      size={18}
                      style={{ color: 'var(--brand-red)' }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
