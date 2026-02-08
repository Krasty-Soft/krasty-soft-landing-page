'use client'

/**
 * Web Vitals Reporter
 * 
 * Dev mode: Console logs metrics
 * Production: Sends to Google Analytics 4
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint)
 * - CLS (Cumulative Layout Shift)
 * - INP (Interaction to Next Paint)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals'

export function WebVitalsReporter() {
  useEffect(() => {
    onCLS(reportMetric)
    onFCP(reportMetric)
    onLCP(reportMetric)
    onINP(reportMetric)
    onTTFB(reportMetric)
  }, [])

  return null
}

function reportMetric(metric: any) {
  const isDev = process.env.NODE_ENV === 'development'
  
  // Dev mode: console.log
  if (isDev) {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    })
    return
  }
  
  // Production: send to Google Analytics (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
