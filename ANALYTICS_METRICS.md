# Analytics & Metrics Tracking
**Krasty Soft Website - Performance Monitoring**

**Last Updated:** February 8, 2026  
**Status:** ⚠️ Vercel Analytics (Dev Only) - Production Solution Needed

---

## ⚠️ Important Note

**Current Setup:** Vercel Analytics is integrated for development/testing purposes only.

**Production Environment:** Since the production website will NOT be hosted on Vercel, Vercel Analytics will not work in production. Alternative solutions are required.

This document outlines current setup and recommended alternatives for production deployment.

---

## Overview

This document outlines all analytics, metrics tracking, and performance monitoring tools integrated into the Krasty Soft website.

---

## 1. Core Web Vitals Tracking

### 1.1 Current Implementation: Vercel Analytics (Dev/Staging Only)

**Package:** `@vercel/analytics` (v1.6.1)  
**Status:** ✅ Works in Development - ⚠️ Will NOT work in production  
**Location:** `src/app/layout.tsx`

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* Works on Vercel deployments only */}
      </body>
    </html>
  )
}
```

**Limitation:**
- ⚠️ **Only works when deployed to Vercel**
- Will not function on other hosting platforms (AWS, DigitalOcean, custom servers, etc.)
- **Action Required:** Implement production-ready alternative (see Section 2)

---

### 1.2 Metrics Tracked by Vercel Analytics

#### Core Web Vitals (Google Standard)

**1. Largest Contentful Paint (LCP)**
- **What it measures:** Loading performance
- **Target:** ≤ 2.5 seconds
- **Importance:** Critical for user experience
- **Tracked:** ✅ Automatic

**2. Cumulative Layout Shift (CLS)**
- **What it measures:** Visual stability
- **Target:** ≤ 0.1
- **Importance:** Prevents unexpected layout shifts
- **Tracked:** ✅ Automatic

**3. Interaction to Next Paint (INP)**
- **What it measures:** Responsiveness (replaced FID)
- **Target:** ≤ 200 milliseconds
- **Importance:** User interaction speed
- **Tracked:** ✅ Automatic

**4. First Contentful Paint (FCP)**
- **What it measures:** First content rendering
- **Target:** ≤ 1.8 seconds
- **Importance:** Perceived load speed
- **Tracked:** ✅ Automatic

#### Additional Performance Metrics

**5. Time to First Byte (TTFB)**
- **What it measures:** Server response time
- **Target:** ≤ 600 milliseconds
- **Importance:** Backend performance
- **Tracked:** ✅ Automatic

**6. Total Blocking Time (TBT)**
- **What it measures:** Main thread blocking
- **Target:** ≤ 200 milliseconds
- **Importance:** Interactivity readiness
- **Tracked:** ✅ Automatic (Lighthouse)

---

### 1.3 How Vercel Analytics Works

**Data Collection:**
1. Lightweight script (< 1KB) loads on all pages
2. Collects real user data from actual devices
3. Sends data to Vercel dashboard
4. Aggregates metrics across users

**Scoring System:**
- Uses Lighthouse 10 scoring criteria
- Real Experience Score (RES) based on actual user data
- Not lab simulations - real world performance

**Privacy:**
- Anonymous data collection
- GDPR compliant
- No personal information tracked
- No cookies required

---

### 1.4 Where to View Metrics

**Vercel Dashboard:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your Krasty Soft project
3. Click "Analytics" tab
4. View "Speed Insights" section

**Available Views:**
- **Overview:** Overall performance score
- **Core Web Vitals:** LCP, CLS, INP, FCP scores
- **By Page:** Performance per URL
- **By Country:** Geographic performance
- **By Device:** Desktop vs Mobile
- **By Browser:** Chrome, Safari, Firefox, etc.
- **Trends:** Historical data over time

---

## 2. Production-Ready Analytics Solutions

### 🚀 Recommended: Google Analytics 4 + Web Vitals

**Best solution for non-Vercel hosting platforms**

---

### 2.1 Solution 1: Google Analytics 4 with Web Vitals (Recommended)

**Status:** 📋 **RECOMMENDED FOR PRODUCTION**  
**Cost:** Free  
**Works on:** Any hosting platform

#### Step 1: Install Packages

```bash
npm install web-vitals
npm install @next/third-parties
```

#### Step 2: Create Web Vitals Reporter

Create `src/components/analytics/web-vitals-reporter.tsx`:

```typescript
'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals'

export function WebVitalsReporter() {
  useEffect(() => {
    // Send Core Web Vitals to Google Analytics
    onCLS(sendToGA)
    onFCP(sendToGA)
    onLCP(sendToGA)
    onINP(sendToGA)
    onTTFB(sendToGA)
  }, [])

  return null
}

function sendToGA(metric: any) {
  // Send to Google Analytics 4
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
```

#### Step 3: Update Layout

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
import { WebVitalsReporter } from '@/components/analytics/web-vitals-reporter'

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body>
        {children}
        {GA_ID && (
          <>
            <GoogleAnalytics gaId={GA_ID} />
            <WebVitalsReporter />
          </>
        )}
      </body>
    </html>
  )
}
```

#### Step 4: Environment Variables

Add to `.env`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Benefits:**
- ✅ Works on any hosting platform
- ✅ Core Web Vitals tracking
- ✅ User behavior analytics
- ✅ Free unlimited tracking
- ✅ Google Search Console integration
- ✅ Custom event tracking
- ✅ Real-time data

**Setup Instructions:**
1. Create Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with G-)
3. Add to environment variables
4. Deploy and verify tracking

---

### 2.2 Solution 2: Custom API Endpoint for Web Vitals

**Status:** 📋 Self-hosted option  
**Cost:** Free (your infrastructure)  
**Works on:** Any hosting platform

#### Implementation:

**Create API endpoint:**
```typescript
// src/app/api/analytics/route.ts
export async function POST(req: Request) {
  try {
    const metric = await req.json()
    
    // Log to your database or analytics service
    console.log('Web Vital:', metric.name, metric.value)
    
    // Store in database (example with PostgreSQL)
    // await db.query('INSERT INTO web_vitals ...')
    
    // Or send to external service
    // await fetch('https://your-analytics-service.com/api/metrics', ...)
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 })
  }
}
```

**Client component:**
```typescript
// src/components/analytics/web-vitals-reporter.tsx
'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals'

export function WebVitalsReporter() {
  useEffect(() => {
    onCLS(sendToAPI)
    onFCP(sendToAPI)
    onLCP(sendToAPI)
    onINP(sendToAPI)
    onTTFB(sendToAPI)
  }, [])

  return null
}

function sendToAPI(metric: any) {
  const body = JSON.stringify(metric)
  const url = '/api/analytics'
  
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}
```

**Benefits:**
- ✅ Full control over data
- ✅ Privacy-focused
- ✅ No third-party dependencies
- ✅ Custom storage/processing

**Drawbacks:**
- ⚠️ Requires building dashboard
- ⚠️ No built-in reporting
- ⚠️ More maintenance

---

### 2.3 Solution 3: Third-Party Services

**Other platform-agnostic options:**

#### A. Plausible Analytics
- **Cost:** $9/month (10k pageviews)
- **Privacy:** GDPR compliant, no cookies
- **Features:** Core Web Vitals, goals, funnels
- **Setup:** Simple script tag
```html
<script defer data-domain="krastysoft.com" src="https://plausible.io/js/script.js"></script>
```

#### B. Fathom Analytics  
- **Cost:** $14/month (100k pageviews)
- **Privacy:** Cookie-free, GDPR compliant
- **Features:** Real-time, uptime monitoring
- **Setup:** Single script tag

#### C. Cloudflare Web Analytics
- **Cost:** Free
- **Privacy:** Privacy-first
- **Features:** Core Web Vitals, traffic
- **Setup:** Cloudflare account required

#### D. Matomo (Self-Hosted)
- **Cost:** Free (self-hosted)
- **Privacy:** Complete data ownership
- **Features:** Full analytics suite
- **Setup:** Requires server setup

---

### 2.4 Recommended Production Setup

**For Most Use Cases:**
```
Google Analytics 4 + web-vitals package
```

**Why:**
- Free and unlimited
- Industry standard
- Rich features
- Works anywhere
- Easy integration
- Google Search Console integration

**Implementation Time:** ~30 minutes

**Alternative for Privacy-Focused:**
```
Plausible or Fathom + web-vitals
```

---

### 2.3 Custom Event Tracking

**Status:** 📋 Can be implemented if needed

**Use cases:**
- Button clicks tracking
- Form submissions
- Download tracking
- Video plays
- Custom user actions

**Implementation with Vercel Analytics:**
```typescript
import { track } from '@vercel/analytics'

// Track custom events
track('contact_form_submit', { 
  form_name: 'Chat Form',
  page: '/contact'
})

track('case_study_view', {
  case_study_slug: 'fintech-project'
})
```

---

## 3. Performance Monitoring Dashboard

### 3.1 Current Monitoring Tools

**✅ Integrated:**
1. **Vercel Analytics** - Core Web Vitals, traffic
2. **Vercel Speed Insights** - Real user performance

**📋 Recommended:**
1. **Google Search Console** - SEO, indexing, search performance
2. **Google Analytics 4** - User behavior, conversions
3. **Sentry** (optional) - Error tracking

---

### 3.2 Vercel Dashboard Features

**Real-Time Monitoring:**
- Current performance scores
- Live traffic data
- Deployment status
- Build logs

**Historical Data:**
- Performance trends over time
- Traffic growth
- Core Web Vitals history
- Deployment history

**Alerts (if configured):**
- Performance degradation alerts
- Build failure notifications
- Error rate warnings

---

## 4. Performance Optimization Status

### 4.1 Current Optimizations

**✅ Implemented:**

**Images:**
- Next.js automatic optimization enabled
- WebP conversion for modern browsers
- Lazy loading by default
- Responsive sizes

**Code:**
- Server-side rendering (15+ pages)
- Component code splitting
- Dynamic imports where appropriate
- Tree shaking enabled

**Fonts:**
- Next.js font optimization
- Font display: swap
- Preloading critical fonts

**Assets:**
- DNS prefetch for Contentful
- Preconnect to external resources
- Minification enabled
- Compression enabled (Brotli/Gzip)

**Rendering:**
- GPU-accelerated animations
- CSS optimization
- JavaScript minification

---

### 4.2 Performance Targets

**Core Web Vitals Goals:**

| Metric | Target | Current Status |
|--------|--------|----------------|
| **LCP** | ≤ 2.5s | ✅ Optimized |
| **CLS** | ≤ 0.1 | ✅ Optimized |
| **INP** | ≤ 200ms | ✅ Optimized |
| **FCP** | ≤ 1.8s | ✅ Optimized |
| **TTFB** | ≤ 600ms | ✅ Server-rendered |

**Lighthouse Scores Goals:**

| Category | Target | Expected |
|----------|--------|----------|
| Performance | 90+ | 95+ |
| Accessibility | 90+ | 95+ |
| Best Practices | 90+ | 100 |
| SEO | 90+ | 95-98 |

---

## 5. Monitoring Best Practices

### 5.1 Daily Monitoring

**Automated (No action needed):**
- Vercel Analytics tracks continuously
- Core Web Vitals collected automatically
- Performance data aggregated

**Manual Checks (if issues arise):**
- Check Vercel dashboard for anomalies
- Review deployment logs
- Check error rates

---

### 5.2 Weekly Monitoring

**Recommended:**
1. Review Core Web Vitals trends
2. Check for performance regressions
3. Analyze traffic patterns
4. Review top-performing pages
5. Identify slow pages

**Access:**
- Vercel Dashboard → Analytics → Speed Insights
- Look for red/orange indicators
- Review "Needs Improvement" metrics

---

### 5.3 Monthly Reporting

**Key Metrics to Track:**

**Performance:**
- Average LCP, CLS, INP, FCP
- Performance score trends
- Pages needing optimization

**Traffic:**
- Total visitors
- Page views
- Top pages
- Bounce rate

**Technical:**
- Build success rate
- Error rates
- API response times

---

## 6. Custom Metrics Implementation

### 6.1 Available Custom Tracking

If you need custom metrics beyond Core Web Vitals:

**Option 1: Vercel Analytics Track Function**
```typescript
import { track } from '@vercel/analytics'

// Track custom events
track('button_click', { button_id: 'cta-main' })
track('form_submit', { form_type: 'contact' })
track('file_download', { file_name: 'case-study.pdf' })
```

**Option 2: Web Vitals Package (Advanced)**
```typescript
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals'

// Custom reporting function
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric)
  const url = '/api/analytics'
  
  // Use sendBeacon if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

// Attach custom reporter
onCLS(sendToAnalytics)
onFCP(sendToAnalytics)
onLCP(sendToAnalytics)
onINP(sendToAnalytics)
onTTFB(sendToAnalytics)
```

---

## 7. Integration Checklist

### ✅ Currently Integrated

- [x] Vercel Analytics package installed
- [x] Analytics component added to layout
- [x] Core Web Vitals tracking active
- [x] Real User Monitoring (RUM) active
- [x] Performance optimization enabled
- [x] Server-side rendering configured
- [x] Image optimization enabled

### 📋 Recommended Future Integrations

- [ ] Google Analytics 4 (for user behavior)
- [ ] Google Search Console (for SEO metrics)
- [ ] Custom event tracking (if needed)
- [ ] Error monitoring (Sentry, optional)
- [ ] A/B testing tools (if needed)

---

## 8. FAQ

### Q: Do we have in-house metrics tracking?
**A:** For development: Yes (Vercel Analytics). For production: **No** - needs implementation. Since production won't be on Vercel, you need to implement an alternative solution. Recommended: Google Analytics 4 + web-vitals package (see Section 2.1).

### Q: Can we see real-time metrics?
**A:** 
- **Development:** Yes, through Vercel Dashboard (while hosted on Vercel)
- **Production:** Will depend on chosen solution:
  - Google Analytics 4: Real-time tab available
  - Custom API: Build your own dashboard
  - Third-party services: Check provider features

### Q: Do we need Google Analytics?
**A:** **YES, for production!** Since you're not hosting on Vercel, you need an alternative analytics solution. Google Analytics 4 is the recommended choice because:
- ✅ Works on any hosting platform
- ✅ Free and unlimited
- ✅ Core Web Vitals tracking (with web-vitals package)
- ✅ User behavior tracking
- ✅ Traffic source analysis
- ✅ Industry standard

### Q: Is the web-vitals package needed?
**A:** **YES, for production!** Since Vercel Analytics won't work on your production hosting, the `web-vitals` package is essential for tracking Core Web Vitals. It sends data to Google Analytics or your custom endpoint.

### Q: How do we track custom events?
**A:** Use Vercel's `track()` function:
```typescript
import { track } from '@vercel/analytics'
track('event_name', { key: 'value' })
```

### Q: Does this affect site performance?
**A:** Minimal impact. Vercel Analytics script is:
- < 1KB in size
- Asynchronously loaded
- Non-blocking
- Optimized for performance

### Q: Is it GDPR compliant?
**A:** Yes, Vercel Analytics is GDPR compliant:
- No cookies required
- Anonymous data collection
- No personal information tracked
- Privacy-friendly

---

## 9. Resources & Documentation

### Official Documentation

**Vercel Analytics:**
- [Analytics Package](https://vercel.com/docs/analytics/package)
- [Speed Insights](https://vercel.com/docs/speed-insights)
- [Web Analytics Guide](https://vercel.com/docs/analytics/using-web-analytics)

**Web Vitals:**
- [web.dev Core Web Vitals](https://web.dev/vitals/)
- [Google Web Vitals Guide](https://developers.google.com/web/vitals)

**Next.js Performance:**
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)

---

## 10. Summary

### Current Status: ⚠️ Action Required for Production

**Development (Current):**
- ✅ Vercel Analytics working in dev/preview
- ✅ Core Web Vitals tracked locally
- ✅ Testing environment ready

**Production (Required):**
- ⚠️ **ACTION NEEDED:** Implement production analytics
- ⚠️ Vercel Analytics will NOT work on non-Vercel hosting
- ⚠️ Choose and implement alternative solution

---

### 🚀 Quick Start for Production

**Recommended: Google Analytics 4 + Web Vitals**

**1. Install packages:**
```bash
npm install web-vitals @next/third-parties
```

**2. Create component:**
Create `src/components/analytics/web-vitals-reporter.tsx` (see Section 2.1 for code)

**3. Update layout:**
Add GA4 and WebVitalsReporter to `src/app/layout.tsx` (see Section 2.1 for code)

**4. Add environment variable:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Get from Google Analytics
```

**5. Deploy and verify**

**Total Setup Time:** ~30 minutes

---

### What You'll Track in Production:

**With GA4 + web-vitals:**
- ✅ LCP, CLS, INP, FCP, TTFB
- ✅ Page performance scores
- ✅ User behavior analytics
- ✅ Traffic sources
- ✅ Geographic data
- ✅ Device/browser metrics
- ✅ Custom events
- ✅ Conversion tracking

**How to Access:**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. View Reports → Engagement → Events (for Web Vitals)
4. View Reports → User → Overview (for traffic)

**Next Steps:**
1. ✅ Choose production analytics solution
2. ✅ Implement before production deployment
3. ✅ Test in staging environment
4. ✅ Verify tracking in production
5. ✅ Set up monitoring dashboards

---

**Document Maintained By:** Development Team  
**Last Updated:** February 8, 2026  
**Next Review:** After 30 days of production data

---

*For technical questions about metrics implementation, refer to Vercel Analytics documentation or contact the development team.*
