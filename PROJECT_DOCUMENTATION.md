# Krasty Soft - Project Documentation

> Complete technical documentation for the dark progressive B2B website

**Version:** 2.0.0  
**Last Updated:** February 4, 2026  
**Tech Stack:** Next.js 15 + React 19 + TypeScript 5.x + Tailwind CSS 4.1.4

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [Architecture](#architecture)
5. [Design System](#design-system)
6. [Key Features](#key-features)
7. [Content Management (Contentful)](#content-management-contentful)
8. [API Endpoints](#api-endpoints)
9. [Development Guide](#development-guide)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Krasty Soft** is a modern, dark-themed B2B software company website showcasing services, case studies, team, and career opportunities. The site emphasizes:

- **Dark Progressive Design** - Black/red color scheme with tech/engineering feel
- **Micro-Animations** - Smooth, GPU-accelerated animations using Framer Motion
- **SEO & Performance** - Optimized for Core Web Vitals and search engines
- **Headless CMS** - Content managed via Contentful
- **Responsive** - Mobile-first design approach

### Key Characteristics

- ✅ Server-side rendering with Next.js App Router
- ✅ TypeScript for type safety
- ✅ Framer Motion for animations
- ✅ Contentful CMS integration with fallback data
- ✅ Resend API for contact form emails
- ✅ Fullscreen image lightbox for case studies
- ✅ Smooth scrolling and scroll-triggered animations
- ✅ Custom rich text renderer for Contentful content

---

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15.3.6 | React framework with App Router |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Node.js** | >=18.18.0 | Runtime environment |

### Styling & Animation
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 4.1.4 | Utility-first CSS framework |
| **Framer Motion** | 11.15.0 | Animation library |
| **Lucide React** | Latest | Icon library |

### Content & APIs
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Contentful SDK** | 11.10.0 | Headless CMS client |
| **Resend** | 4.0.3 | Email API |

### UI Components
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Embla Carousel** | 8.6.0 | Carousel functionality |
| **@svgr/webpack** | 8.1.0 | SVG as React components |

### Custom Fonts
- **TT Runs** - Full family (Thin to Black + Variable)

---

## Getting Started

### Prerequisites

```bash
Node.js >= 18.18.0
npm, yarn, pnpm, or bun
```

### Installation

```bash
# Clone and install
git clone <repository-url>
cd krasty-soft-landing-page
npm install
```

### Environment Setup

Create `.env.local` in project root:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_API_TOKEN=your_delivery_token

# Email Service (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_TO=your@email.com

# Optional: Retool Integration (if using Retool)
# RETOOL_CONTACT_URL=your_retool_workflow_url
# RETOOL_API_KEY=your_retool_api_key
```

### Running the Application

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

Application runs at `http://localhost:3000`

---

## Architecture

### Project Structure

```
krasty-soft-landing-page/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── about/                    # About page
│   │   ├── api/                      # API routes
│   │   │   └── contacts/             # Contact form endpoint
│   │   ├── careers/                  # Career listings
│   │   │   └── [slug]/               # Dynamic career pages
│   │   ├── case-studies/             # Case studies
│   │   │   ├── [slug]/               # Dynamic case pages
│   │   │   ├── templates/            # Case study templates
│   │   │   ├── client.tsx            # Client wrapper
│   │   │   └── page.tsx              # Server component
│   │   ├── custom-software-development/  # Service page
│   │   ├── fintech/                  # Industry page
│   │   │   ├── client.tsx            # Client wrapper
│   │   │   └── page.tsx              # Server component
│   │   ├── healthcare/               # Industry page (+ client.tsx)
│   │   ├── insurance/                # Industry page (+ client.tsx)
│   │   ├── maritime-transportation/  # Industry page (+ client.tsx)
│   │   ├── retool-development/       # Service page
│   │   ├── retool-consulting/        # Service page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # 404 page
│   │   └── globals.css               # Global styles + prose styling
│   │
│   ├── components/                   # React components
│   │   ├── blocks/                   # Page sections
│   │   │   ├── awards/               # Awards showcase
│   │   │   ├── banner/               # Hero sections
│   │   │   ├── blog/                 # Blog listings
│   │   │   ├── cases/                # Case study listings
│   │   │   ├── contact-form/         # Contact CTA
│   │   │   ├── difference/           # Differentiators
│   │   │   ├── faq/                  # FAQ accordion
│   │   │   ├── features/             # Features grid
│   │   │   ├── footer/               # Footer with form
│   │   │   │   ├── form.tsx          # Contact form
│   │   │   │   └── index.tsx         # Footer layout
│   │   │   ├── header/               # Header with navigation
│   │   │   │   └── menu/             # Navigation menu
│   │   │   ├── industries/           # Industries showcase
│   │   │   ├── opportunities/        # Job listings
│   │   │   ├── our-expertise/        # Expertise section
│   │   │   ├── reviews/              # Testimonials
│   │   │   ├── services/             # Services grid
│   │   │   ├── social-networks/      # Social links
│   │   │   ├── team/                 # Team members
│   │   │   ├── technologies/         # Tech stack
│   │   │   ├── toc/                  # Table of contents
│   │   │   ├── use-cases/            # Use cases
│   │   │   └── values/               # Company values
│   │   │
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── button/               # Button component
│   │   │   ├── image/                # Image wrapper
│   │   │   ├── image-lightbox/       # Fullscreen image viewer
│   │   │   ├── input/                # Input component
│   │   │   ├── link/                 # Link component
│   │   │   ├── pill/                 # Tag/badge component
│   │   │   ├── scroll-top/           # Scroll to top button
│   │   │   ├── section/              # Section wrapper
│   │   │   ├── slider/               # Carousel component
│   │   │   └── typing-text/          # Typing animation
│   │   │
│   │   ├── accordion/                # Accordion component
│   │   ├── breadcrumbs/              # Breadcrumb navigation
│   │   ├── case-card/                # Case study card
│   │   ├── filters/                  # Filter components
│   │   ├── post-card/                # Blog post card
│   │   ├── smooth-scroll.tsx         # Smooth scroll handler
│   │   └── widget/                   # Generic widget
│   │
│   ├── lib/                          # Utilities & data fetching
│   │   ├── cases.tsx                 # Case studies API
│   │   ├── cms.ts                    # Contentful client
│   │   ├── expertise.ts              # Expertise data
│   │   ├── fonts.ts                  # Font configuration
│   │   ├── hooks.ts                  # Custom hooks
│   │   ├── jobs.ts                   # Career opportunities API
│   │   ├── navigation.ts             # Navigation config
│   │   ├── posts.ts                  # Blog posts API
│   │   ├── render.ts                 # Rich text renderer
│   │   ├── team.ts                   # Team members data
│   │   └── util.ts                   # General utilities
│   │
│   ├── types/                        # TypeScript definitions
│   │   └── index.ts                  # Shared types
│   │
│   ├── constants/                    # App constants
│   │   └── technologies.ts           # Tech stack config
│   │
│   ├── assets/                       # Static assets
│   │   └── *.svg, *.webp, *.jpg      # Images & icons
│   │
│   └── fonts/                        # Custom fonts
│       └── TT Runs Trial *.ttf       # Font files
│
├── public/                           # Public static files
│   └── oolu.png                      # Case study image
│
├── .env.local                        # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
├── eslint.config.mjs                 # ESLint config
├── next.config.ts                    # Next.js config
├── package.json                      # Dependencies
├── postcss.config.mjs                # PostCSS config
├── tsconfig.json                     # TypeScript config
└── PROJECT_DOCUMENTATION.md          # This file
```

### Key Architecture Patterns

#### Server Components + Client Wrappers

Industry pages use a split pattern for data fetching:

```typescript
// page.tsx (Server Component)
import { getAllCases } from '@/lib/cases'
import FintechClient from './client'

export default async function FintechPage() {
  const cases = await getAllCases()
  return <FintechClient cases={cases} />
}

// client.tsx (Client Component)
'use client'
export default function FintechClient({ cases }: { cases: Case[] }) {
  // Interactive UI with animations
}
```

**Benefits:**
- Data fetching on server (better performance, SEO)
- Interactivity on client (animations, state)
- Clear separation of concerns

#### Fallback Data Pattern

All CMS queries gracefully fall back to mock data:

```typescript
export async function getAllCases() {
  const res = await safeGetEntries({ content_type: 'case' })
  
  if (res && res.items.length > 0) {
    return transformCases(res.items) // Use Contentful data
  }
  
  return mockCases // Fallback to local data
}
```

---

## Design System

### Color Palette

**Brand Colors:**
- **Primary Red:** `#DC2626` (var(--brand-red))
- **Black:** `#000000` (var(--color-black))
- **White:** `#FFFFFF` (var(--color-white))

**UI Colors:**
- **Backgrounds:**
  - Primary: `#030712` (var(--surface-primary))
  - Secondary: `#111827` (var(--surface-secondary))
  - Elevated: `#1F2937` (var(--surface-elevated))
- **Text:**
  - Primary: `#F9FAFB` (var(--text-primary))
  - Secondary: `#D1D5DB` (var(--text-secondary))
  - Muted: `#9CA3AF` (var(--text-muted))
- **Borders:**
  - Default: `#374151` (var(--border-default))
  - Focus: `#DC2626` (var(--border-focus))

### Typography

**Font Family:** TT Runs (Custom)
**Weights:** Thin (100) to Black (900)

**Scale:**
- `text-sm`: 0.875rem
- `text-base`: 1rem
- `text-lg`: 1.125rem
- `text-xl`: 1.25rem
- `text-2xl`: 1.5rem
- `text-3xl`: 1.875rem
- `text-4xl`: 2.25rem
- `text-5xl`: 3rem
- `text-6xl`: 3.75rem
- `text-7xl`: 4.5rem

### Spacing

**Scale:** 0 (0px) to 96 (384px)
**Custom:**
- `c-22`: 1.375rem (22px)
- `c-50`: 3.125rem (50px)

### Border Radius

- `radius-sm`: 0.25rem
- `radius-md`: 0.5rem
- `radius-lg`: 0.75rem
- `radius-xl`: 1rem
- `radius-full`: 9999px

### Animation Principles

1. **GPU-Accelerated Only**
   - Only animate `transform` and `opacity`
   - Avoid animating `height`, `width`, `top`, `left`

2. **Interruptible**
   - All animations can be interrupted mid-way
   - Use Framer Motion's default behavior

3. **Smooth Transitions**
   - Consistent easing: `[0.32, 0.72, 0, 1]`
   - Typical duration: 0.3-0.6s

4. **Reduced Motion Support**
   - Respects `prefers-reduced-motion`
   - Fallback to instant transitions

---

## Key Features

### 1. Dynamic Routing

- **Case Studies:** `/case-studies/[slug]`
- **Careers:** `/careers/[slug]`
- **Static Pages:** All routes use file-based routing

### 2. Micro-Animations

**Examples:**
- Hover effects on cards (lift + glow)
- Typing animation for headings
- Scroll-triggered reveals
- Smooth page transitions
- Interactive button states

**Implementation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### 3. Fullscreen Image Lightbox

**Features:**
- Click any case study image to open fullscreen
- Keyboard navigation (←, →, Esc)
- Image counter (e.g., "2 / 5")
- Smooth animations
- Touch-friendly controls

**Usage:**
```tsx
import { ImageLightbox } from '@/components/ui'

<ImageLightbox
  isOpen={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
  imageSrc={currentImage.src}
  imageAlt={currentImage.alt}
  images={allImages}
  currentIndex={currentIndex}
  onNavigate={handleNavigate}
/>
```

### 4. Custom Rich Text Rendering

Contentful rich text is transformed into styled React components:

**Supported Elements:**
- Headings (H1-H6) with auto-generated IDs
- Paragraphs with custom styling
- Lists (unordered)
- Embedded entries (summary, section)
- Table of contents extraction

**Styling:**
- Custom `.prose` and `.prose-invert` classes
- Red-tinted background boxes for summaries
- Consistent typography and spacing

### 5. Contact Form

**Features:**
- Name, email, phone, message fields
- File upload (PDF, MS Office, max 15MB)
- Client-side validation
- Email via Resend API
- Success/error messaging
- Auto-hide success message

**Backend:**
- API route: `/api/contacts`
- Sends email using Resend
- Fallback to console logging

### 6. Smooth Scrolling

**Features:**
- Smooth scroll to sections
- Custom scroll container handling
- Programmatic scroll with offset

**Implementation:**
```tsx
import SmoothScroll from '@/components/smooth-scroll'

// In layout.tsx
<SmoothScroll />
```

### 7. SEO Optimization

- Dynamic meta tags per page
- Open Graph images
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap ready
- Proper heading hierarchy

---

## Content Management (Contentful)

### Setup

1. Create Contentful space
2. Set up content types (see below)
3. Add credentials to `.env.local`
4. Publish content

### Content Types

#### 1. Post (Blog Posts)
**ID:** `post`

**Fields:**
- `slug` (Symbol) - URL identifier
- `title` (Text) - Post title
- `tags` (Array) - Categories
- `content` (Rich Text) - Post body
- `preview` (Asset) - Preview image

#### 2. Job (Career Listings)
**ID:** `job`

**Fields:**
- `slug` (Symbol) - URL identifier
- `title` (Text) - Job title
- `description` (Text) - Job description
- `tags` (Text) - Employment type/location
- `link` (Text) - Application URL

#### 3. Case (Case Studies)
**ID:** `case`

**Fields:**
- `slug` (Symbol) - URL identifier
- `title` (Text) - Case title
- `tags` (Text) - Comma-separated tags
- `cardDescription` (Text) - Short description
- `preview` (Asset) - Card image
- `media` (Array of Assets) - Gallery images (use "banner" in title for hero)
- `template` (Text) - Template type (default, srm)
- `seoTitle` (Text) - SEO meta title
- `seoDescription` (Text) - SEO meta description
- `content` (Rich Text) - Main content
- `overview` (Rich Text) - Overview section

#### 4. Summary (Embedded Content)
**ID:** `summary`

**Fields:**
- `niche` (Text) - Industry
- `problematic` (Rich Text) - Problem description
- `solution` (Rich Text) - Solution description
- `technologies` (Text) - Tech stack

**Usage:** Embed in rich text as `embedded-entry-block`

### API Functions

```typescript
import { safeGetEntries } from '@/lib/cms'

// Get all cases
const cases = await safeGetEntries({ content_type: 'case' })

// Get case by slug
const case = await safeGetEntries({
  content_type: 'case',
  'fields.slug': slug,
  limit: 1,
  include: 1
})
```

### Fallback Strategy

If Contentful is not configured or unavailable:
- App continues to work
- Uses hardcoded mock data
- Console logs indicate fallback mode

---

## API Endpoints

### POST `/api/contacts`

**Purpose:** Handle contact form submissions

**Request:**
```typescript
Content-Type: multipart/form-data

{
  name: string (required, min 2 chars)
  email: string (required, valid email)
  phone: string (optional)
  message: string (required, min 10 chars)
  attach: File (optional, max 15MB, PDF/Office)
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Email sent successfully"
}
```

**Error Responses:**
- `500`: Missing environment variables
- `400`: Invalid input
- `502`: Email service error

**Environment Variables:**
```env
RESEND_API_KEY=re_xxx
CONTACT_EMAIL_TO=your@email.com
```

---

## Development Guide

### Adding a New Page

1. **Create page file:**
   ```bash
   src/app/new-page/page.tsx
   ```

2. **Add to navigation:**
   ```typescript
   // src/lib/navigation.ts
   export const PAGES = {
     // ...
     newPage: { slug: 'new-page', label: 'New Page', description: '...' }
   }
   ```

3. **Add metadata:**
   ```typescript
   export const metadata = {
     title: 'New Page | Krasty Soft',
     description: 'Description...'
   }
   ```

### Adding a New Component

1. **Create component:**
   ```bash
   src/components/ui/new-component/index.tsx
   ```

2. **Export from index:**
   ```typescript
   // src/components/ui/index.ts
   export * from './new-component'
   ```

3. **Use in pages:**
   ```typescript
   import { NewComponent } from '@/components/ui'
   ```

### Working with Contentful

**Fetching Data:**
```typescript
import { safeGetEntries } from '@/lib/cms'

const data = await safeGetEntries({
  content_type: 'yourType',
  limit: 10
})
```

**Rendering Rich Text:**
```typescript
import { renderRichTextAsHtml } from '@/lib/render'

const elements = renderRichTextAsHtml(content.content)
return <div>{elements}</div>
```

### Animation Best Practices

**Do:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

**Don't:**
```tsx
<motion.div
  animate={{ height: 'auto' }} // ❌ Not GPU-accelerated
/>
```

### Testing Locally

```bash
# Start dev server
npm run dev

# Test API endpoints
curl -X POST http://localhost:3000/api/contacts \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "message=Test message"

# Check linting
npm run lint

# Build for production
npm run build
```

---

## Deployment

### Recommended Platform

**Vercel** (optimal for Next.js)

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Import repository
   - Configure environment variables
   - Deploy

3. **Environment Variables:**
   Set in Vercel dashboard:
   ```env
   CONTENTFUL_SPACE_ID=xxx
   CONTENTFUL_DELIVERY_API_TOKEN=xxx
   RESEND_API_KEY=xxx
   CONTACT_EMAIL_TO=xxx
   ```

4. **Custom Domain:**
   - Add domain in Vercel
   - Update DNS records
   - Wait for SSL certificate

### Build Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Performance Optimization

- ✅ Static generation where possible
- ✅ Image optimization via Next.js
- ✅ CSS purging with Tailwind
- ✅ Code splitting automatic
- ✅ Lazy loading for images
- ✅ Prefetching for links

---

## Troubleshooting

### Issue: "Contentful client not initialized"

**Solution:**
1. Check `.env.local` exists
2. Verify `CONTENTFUL_SPACE_ID` and `CONTENTFUL_DELIVERY_API_TOKEN`
3. Restart dev server

### Issue: Contact form not sending emails

**Solution:**
1. Check `RESEND_API_KEY` is set
2. Verify `CONTACT_EMAIL_TO` email address
3. Check Resend dashboard for logs
4. Verify domain is verified in Resend (for production)

### Issue: Images not loading

**Solution:**
1. Check image path is correct
2. For Contentful images, ensure URL has `https:` prefix
3. Verify Next.js `remotePatterns` config
4. Check file exists in `public/` or `src/assets/`

### Issue: Animations not working

**Solution:**
1. Check `framer-motion` is installed
2. Verify component is client component (`'use client'`)
3. Check browser doesn't have `prefers-reduced-motion` enabled
4. Verify animation props are correct

### Issue: Build fails

**Common causes:**
1. TypeScript errors - run `npm run lint`
2. Missing environment variables - add to Vercel
3. Import errors - check paths are correct
4. Contentful queries failing - ensure fallback data exists

### Issue: Page loads slowly

**Solutions:**
1. Check image sizes (optimize before upload)
2. Reduce number of animations
3. Use dynamic imports for heavy components
4. Enable caching for API routes
5. Check Vercel Analytics for bottlenecks

---

## Additional Notes

### Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari, Chrome Android
- **Fallbacks:** Reduced motion, no JS (basic functionality)

### Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast text
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Semantic HTML

### Security

- ✅ Environment variables for secrets
- ✅ Input validation on forms
- ✅ File upload restrictions
- ✅ HTTPS only (in production)
- ✅ No hardcoded credentials
- ✅ CORS properly configured

### Maintenance

**Regular Tasks:**
- Update dependencies monthly
- Review Contentful content
- Check analytics for issues
- Monitor error logs
- Test contact form
- Review and update documentation

**Updating Dependencies:**
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

---

## Quick Reference

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Paths
- **Components:** `@/components/ui` or `@/components/blocks`
- **Utilities:** `@/lib/[name]`
- **Types:** `@/types`
- **Assets:** `@/assets/[name].svg`
- **Public:** `/[filename]`

### Important Files
- **Layout:** `src/app/layout.tsx`
- **Global CSS:** `src/app/globals.css`
- **Navigation:** `src/lib/navigation.ts`
- **CMS Client:** `src/lib/cms.ts`
- **Rich Text:** `src/lib/render.ts`
- **Config:** `next.config.ts`, `tsconfig.json`

---

**Documentation maintained by:** Development Team  
**For questions:** Refer to code comments or this documentation  
**Project Repository:** [Add your repo URL]
