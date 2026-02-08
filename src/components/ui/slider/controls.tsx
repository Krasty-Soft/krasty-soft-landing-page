'use client'

import React from "react";
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Dot = ({ selected, onClick } : {selected: boolean, onClick: () => void}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.95 }}
    style={{
      height: '4px',
      flexGrow: 1,
      borderRadius: '2px',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background */}
    <motion.div
      initial={false}
      animate={{
        opacity: selected ? 0.3 : 0.1,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: selected ? 'var(--brand-red)' : 'var(--text-secondary)',
      }}
    />
    
    {/* Active progress bar */}
    <motion.div
      initial={false}
      animate={{
        scaleX: selected ? 1 : 0,
        opacity: selected ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--brand-red)',
        transformOrigin: 'left',
      }}
    />
  </motion.button>
);

export const Prev = ({ enabled, onClick } : {enabled: boolean, onClick: () => void}) => (
  <motion.button
    onClick={onClick}
    disabled={!enabled}
    whileHover={enabled ? { scale: 1.05, x: -2 } : {}}
    whileTap={enabled ? { scale: 0.95 } : {}}
    style={{
      padding: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      backgroundColor: enabled ? 'var(--surface-primary)' : 'transparent',
      cursor: enabled ? 'pointer' : 'not-allowed',
      opacity: enabled ? 1 : 0.3,
      transition: 'all 0.2s',
    }}
  >
    <ChevronLeft size={20} color={enabled ? 'var(--brand-red)' : 'var(--text-tertiary)'} />
  </motion.button>
);

export const Next = ({ enabled, onClick }: {enabled: boolean, onClick: () => void}) => (
  <motion.button
    onClick={onClick}
    disabled={!enabled}
    whileHover={enabled ? { scale: 1.05, x: 2 } : {}}
    whileTap={enabled ? { scale: 0.95 } : {}}
    style={{
      padding: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      backgroundColor: enabled ? 'var(--surface-primary)' : 'transparent',
      cursor: enabled ? 'pointer' : 'not-allowed',
      opacity: enabled ? 1 : 0.3,
      transition: 'all 0.2s',
    }}
  >
    <ChevronRight size={20} color={enabled ? 'var(--brand-red)' : 'var(--text-tertiary)'} />
  </motion.button>
);
