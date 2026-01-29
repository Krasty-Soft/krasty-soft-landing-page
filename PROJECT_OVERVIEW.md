# Krasty Soft - Project Overview

> **Comprehensive project documentation for developers and AI assistants**

## Table of Contents

- [Project Description](#project-description)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Navigation System](#navigation-system)
- [API Structure](#api-structure)
- [Content Management System](#content-management-system)
- [Component Architecture](#component-architecture)
- [Styling System](#styling-system)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Key Features](#key-features)

---

## Project Description

**Krasty Soft** is a software company website built with Next.js 15 using the App Router. The site showcases the company's services, case studies, team, blog posts, and career opportunities. It integrates with Contentful CMS for content management and uses Retool for contact form processing.

**Key Characteristics:**

- Server-side rendered (SSR) Next.js application
- Headless CMS integration (Contentful)
- Responsive design with mobile-first approach
- SEO-optimized with metadata management
- Custom SVG handling and image optimization
- TypeScript for type safety

---

## Technology Stack

### Core Technologies

| Technology     | Version   | Purpose                         |
| -------------- | --------- | ------------------------------- |
| **Next.js**    | 15.3.6    | React framework with App Router |
| **React**      | 19.0.0    | UI library                      |
| **TypeScript** | 5.x       | Type safety                     |
| **Node.js**    | >=18.18.0 | Runtime environment             |

### Styling

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| **Tailwind CSS** | 4.1.4   | Utility-first CSS framework |
| **PostCSS**      | 8.5.3   | CSS processing              |
| **Autoprefixer** | 10.4.21 | CSS vendor prefixing        |

### Content Management

| Technology                     | Version | Purpose                      |
| ------------------------------ | ------- | ---------------------------- |
| **Contentful SDK**             | 11.10.0 | Headless CMS client          |
| **Contentful Experiences SDK** | 3.8.4   | Enhanced content experiences |

### UI Components

| Technology         | Version | Purpose                       |
| ------------------ | ------- | ----------------------------- |
| **Embla Carousel** | 8.6.0   | Carousel/slider functionality |
| **@svgr/webpack**  | 8.1.0   | SVG as React components       |

### Development Tools

| Tool                                 | Version | Purpose        |
| ------------------------------------ | ------- | -------------- |
| **ESLint**                           | 9.x     | Code linting   |
| **eslint-plugin-simple-import-sort** | 12.1.1  | Import sorting |

### Custom Fonts

- **TT Runs** - Custom font family with multiple weights (Thin, Light, Regular, Medium, DemiBold, Bold, ExtraBold, Black)

---

## Getting Started

### Prerequisites

```bash
Node.js >= 18.18.0
npm, yarn, pnpm, or bun
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd krasty-site

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_API_TOKEN=your_delivery_token

# Optional: Preview mode
# CONTENTFUL_HOST=preview.contentful.com

# Content Type IDs
# CONTENTFUL_POST_TYPE_ID=post
# CONTENTFUL_JOB_TYPE_ID=job
# CONTENTFUL_CASE_TYPE_ID=case

# Retool Integration
RETOOL_CONTACT_URL=your_retool_workflow_url
RETOOL_API_KEY=your_retool_api_key
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

The application will be available at `http://localhost:3000`

---

## Project Structure

```
krasty-site/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── about/               # About us page
│   │   ├── api/                 # API routes
│   │   │   └── contacts/        # Contact form API endpoint
│   │   ├── careers/             # Career opportunities
│   │   │   └── [slug]/         # Dynamic career detail pages
│   │   ├── case-studies/        # Case studies showcase
│   │   │   ├── [slug]/         # Dynamic case study pages
│   │   │   └── templates/      # Case study templates (default, srm)
│   │   ├── custom-software-development/  # Service page
│   │   ├── fintech/             # Industry page
│   │   ├── healthcare/          # Industry page
│   │   ├── insurance/           # Industry page
│   │   ├── maritime-transportation/  # Industry page
│   │   ├── retool-development/  # Service page
│   │   ├── layout.tsx           # Root layout with Header/Footer
│   │   ├── page.tsx             # Homepage
│   │   ├── not-found.tsx        # 404 page
│   │   ├── globals.css          # Global styles & Tailwind config
│   │   └── favicon.ico          # Favicon
│   │
│   ├── components/              # React components
│   │   ├── blocks/             # Page sections & major blocks
│   │   │   ├── awards/         # Awards showcase
│   │   │   ├── banner/         # Hero/banner sections
│   │   │   ├── blog/           # Blog listing & slides
│   │   │   ├── cases/          # Case studies listing
│   │   │   ├── contact-form/   # Contact form component
│   │   │   ├── difference/     # Differentiators section
│   │   │   ├── faq/            # FAQ section
│   │   │   ├── features/       # Features listing
│   │   │   ├── footer/         # Site footer with form
│   │   │   ├── header/         # Site header with menu
│   │   │   ├── industries/     # Industries showcase
│   │   │   ├── opportunities/  # Job opportunities
│   │   │   ├── our-expertise/  # Expertise section
│   │   │   ├── placeholder/    # Placeholder components
│   │   │   ├── reviews/        # Client reviews/testimonials
│   │   │   ├── services/       # Services listing
│   │   │   ├── social-networks/# Social media links
│   │   │   ├── team/           # Team members
│   │   │   ├── technologies/   # Tech stack showcase
│   │   │   ├── toc/            # Table of contents
│   │   │   ├── use-cases/      # Use cases section
│   │   │   └── values/         # Company values
│   │   │
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button/         # Button component
│   │   │   ├── image/          # Image wrapper component
│   │   │   ├── input/          # Input component
│   │   │   ├── link/           # Link component
│   │   │   ├── pill/           # Pill/tag component
│   │   │   ├── scroll-top/     # Scroll to top button
│   │   │   ├── section/        # Section wrapper
│   │   │   └── slider/         # Slider/carousel with controls
│   │   │
│   │   ├── accordion/          # Accordion component
│   │   ├── breadcrumbs/        # Breadcrumb navigation
│   │   ├── case-card/          # Case study card
│   │   ├── filters/            # Filter components
│   │   ├── post-card/          # Blog post card
│   │   └── widget/             # Generic widget
│   │
│   ├── lib/                     # Utility libraries & data fetching
│   │   ├── cases.tsx           # Case studies data & API
│   │   ├── cms.ts              # Contentful client & helpers
│   │   ├── expertise.ts        # Expertise data
│   │   ├── fonts.ts            # Font configuration
│   │   ├── hooks.ts            # Custom React hooks
│   │   ├── jobs.ts             # Career opportunities data & API
│   │   ├── navigation.ts       # Navigation configuration
│   │   ├── posts.ts            # Blog posts data & API
│   │   ├── render.ts           # Content rendering utilities
│   │   ├── team.ts             # Team members data
│   │   └── util.ts             # General utilities
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # Shared types
│   │
│   ├── constants/              # Application constants
│   │   └── technologies.ts     # Technologies configuration
│   │
│   ├── assets/                 # Static assets (images, SVGs)
│   │   ├── *.svg               # SVG icons & illustrations
│   │   ├── *.webp              # Team photos & images
│   │   └── *.jpg               # Background images
│   │
│   └── fonts/                  # Custom font files
│       └── TT Runs Trial *.ttf # TT Runs font family
│
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & scripts
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Basic setup instructions
```

### Key Directories Explained

**`src/app/`** - Next.js App Router

- Uses file-system based routing
- Each folder represents a route segment
- `page.tsx` files define route UI
- `layout.tsx` defines shared layouts
- `[slug]/` folders create dynamic routes

**`src/components/blocks/`** - Large, page-specific sections

- These are typically used once per page
- Contain business logic and composition
- Examples: Header, Footer, Banner, Contact Form

**`src/components/ui/`** - Reusable UI components

- Small, generic components
- No business logic
- Highly reusable across the app
- Examples: Button, Input, Link, Image

**`src/lib/`** - Business logic & data fetching

- Data fetching functions (Contentful integration)
- Utility functions
- Constants and configuration
- Custom hooks

---

## Navigation System

The navigation system is configured in `src/lib/navigation.ts` and defines all primary navigation items.

### Navigation Structure

```typescript
type NavigationItem = {
    slug: string // URL segment
    label: string // Display text
    description: string // SEO/meta description
}
```

### Navigation Categories

**1. Main Pages**

- `case-studies` - Portfolio of client projects
- `about` - Company information
- `careers` - Job opportunities

**2. Industries** (Array of pages)

- `maritime-transportation` - Maritime & logistics solutions
- `healthcare` - Healthcare software solutions
- `fintech` - Financial technology solutions
- `insurance` - Insurance industry solutions

**3. Services** (Array of pages)

- `retool-development` - Retool-based solutions
- `custom-software-development` - Bespoke software
- `retool-consulting` - Retool strategy consulting

**4. Technologies** (Array of pages)

- `retool` - Retool platform
- `react` - React.js
- `python` - Python
- `node` - Node.js

### Header Menu Implementation

- Located in `src/components/blocks/header/menu/`
- Uses the navigation configuration
- Supports multi-level navigation
- Mobile-responsive with hamburger menu

### Routing Pattern

- All routes use Next.js App Router
- URLs follow pattern: `/{slug}`
- Dynamic routes use `[slug]` folder pattern
- Example: `/case-studies/crm-system-with-unified-communications`

---

## API Structure

### API Routes Location

All API routes are in `src/app/api/` following Next.js 15 App Router conventions.

### Available Endpoints

#### POST `/api/contacts`

**Purpose:** Handle contact form submissions

**Runtime:** Node.js (specified with `export const runtime = 'nodejs'`)

**Request Format:**

- Content-Type: `multipart/form-data` or `application/json`
- Fields:
    ```typescript
    {
      name: string;
      email: string;
      phone: string;
      message: string;
      attach?: File; // Optional file attachment
    }
    ```

**Process Flow:**

1. Receives form data (with optional file attachment)
2. Converts file to base64 if present
3. Forwards to Retool workflow endpoint
4. Returns Retool's response

**Response:**

```typescript
// Success (200)
{ ok: true, message: "Triggered successfully" }

// Error (500/502)
{
  error: string,
  status?: number,
  body?: string,
  details?: string
}
```

**Environment Variables Required:**

- `RETOOL_CONTACT_URL` - Retool workflow endpoint
- `RETOOL_API_KEY` - Authentication key

**Error Handling:**

- Missing environment variables → 500
- Retool request failure → 502
- Unexpected errors → 500 with details

**File Upload Support:**

- Accepts files via multipart form data
- Converts to base64 for transmission
- Includes filename, mimeType, and size metadata

---

## Content Management System

### Contentful Integration

The project uses **Contentful** as a headless CMS with fallback to local mock data.

### Content Types

#### 1. **Post** (Blog Posts)

**Content Type ID:** `post` (configurable via `CONTENTFUL_POST_TYPE_ID`)

**Fields:**

- `slug` (Symbol) - URL identifier
- `title` (Text) - Post title
- `tags` (Array) - Category tags
- `content` (Rich Text) - Post content
- `preview` (Asset) - Preview image

**Data Location:**

- API: `src/lib/posts.ts`
- Functions: `getPostBySlug()`, `getAllSlugs()`
- Fallback: 6 mock posts in `posts` array

#### 2. **Job** (Career Opportunities)

**Content Type ID:** `job` (configurable via `CONTENTFUL_JOB_TYPE_ID`)

**Fields:**

- `slug` (Symbol) - URL identifier
- `title` (Text) - Job title
- `description` (Text) - Job description
- `tags` (Text) - Employment type/location
- `link` (Text) - Application link

**Data Location:**

- API: `src/lib/jobs.ts`
- Functions: `getJobBySlug()`, `getAllSlugs()`
- Fallback: 3 mock jobs in `jobs` array

#### 3. **Case** (Case Studies)

**Content Type ID:** `case` (configurable via `CONTENTFUL_CASE_TYPE_ID`)

**Fields:**

- `slug` (Symbol) - URL identifier
- `title` (Text) - Case study title
- `tags` (Text) - Comma-separated tags
- `cardDescription` (Text) - Short description for cards
- `preview` (Asset) - Card preview image
- `media` (Array of Assets) - Gallery images/videos
- `template` (Text) - Template type ('default' | 'srm')
- `seoTitle` (Text) - SEO meta title
- `seoDescription` (Text) - SEO meta description
- `content` (Rich Text) - Main content
- `overview` (Rich Text) - Overview section

**Data Location:**

- API: `src/lib/cases.tsx`
- Functions: `getAllCases()`, `getCaseBySlug()`, `getAllSlugs()`
- Fallback: 1 mock case in `cases` array

### CMS Client Configuration

**File:** `src/lib/cms.ts`

**Functions:**

1. **`getContentfulClient()`**
    - Creates authenticated Contentful client
    - Uses environment variables for configuration
    - Returns `null` if credentials missing

2. **`safeGetEntries<T>(query)`**
    - Safe wrapper for Contentful queries
    - Returns `null` on error or missing credentials
    - Logs query results for debugging

**Configuration:**

```typescript
{
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com'
}
```

### Content Rendering

**File:** `src/lib/render.ts` (267 lines)

Contains utilities for rendering Contentful Rich Text and structured content into React components. This is a critical file for displaying CMS content on the frontend.

### Fallback Strategy

Each content type has hardcoded mock data that serves as:

1. Development fallback when Contentful is not configured
2. Type reference for data structure
3. Example data for testing

---

## Component Architecture

### Component Organization Principles

1. **Blocks** - Large, page-specific sections
2. **UI** - Small, reusable components
3. **Composition** - Blocks compose UI components

### Component Index Files

**`src/components/index.ts`**

- Exports commonly used components
- Simplifies imports across the app

**`src/components/blocks/index.ts`**

- Exports all block components
- Usage: `import { Header, Footer } from '@/components/blocks'`

**`src/components/ui/index.ts`**

- Exports all UI components
- Usage: `import { Button, Link } from '@/components/ui'`

### Key Block Components

| Component         | Purpose                       | Location                |
| ----------------- | ----------------------------- | ----------------------- |
| **Header**        | Site navigation & branding    | `blocks/header/`        |
| **Footer**        | Site footer with links & form | `blocks/footer/`        |
| **Banner**        | Hero sections                 | `blocks/banner/`        |
| **ContactForm**   | Contact form with file upload | `blocks/contact-form/`  |
| **Blog**          | Blog posts listing            | `blocks/blog/`          |
| **Cases**         | Case studies showcase         | `blocks/cases/`         |
| **Team**          | Team members display          | `blocks/team/`          |
| **Reviews**       | Client testimonials           | `blocks/reviews/`       |
| **FAQ**           | Frequently asked questions    | `blocks/faq/`           |
| **Technologies**  | Tech stack showcase           | `blocks/technologies/`  |
| **Industries**    | Industries served             | `blocks/industries/`    |
| **Services**      | Services offered              | `blocks/services/`      |
| **Opportunities** | Job listings                  | `blocks/opportunities/` |

### Key UI Components

| Component     | Purpose                 | Props Pattern                      |
| ------------- | ----------------------- | ---------------------------------- |
| **Button**    | Styled button component | Extends native button props        |
| **Link**      | Next.js Link wrapper    | Extends Next.js Link props         |
| **Image**     | Next.js Image wrapper   | Extends Next.js Image props        |
| **Input**     | Form input component    | Extends native input props         |
| **Section**   | Page section wrapper    | Provides consistent spacing/layout |
| **Slider**    | Carousel/slider         | Uses Embla Carousel                |
| **Pill**      | Tag/badge component     | For displaying tags/categories     |
| **ScrollTop** | Scroll to top button    | Fixed position button              |

### Specialized Components

**Accordion** (`components/accordion/`)

- Collapsible content sections
- Used in FAQ and other expandable content

**Breadcrumbs** (`components/breadcrumbs/`)

- Navigation breadcrumb trail
- Improves UX and SEO

**Filters** (`components/filters/`)

- Content filtering UI
- Used in case studies and blog listings

**CaseCard** (`components/case-card/`)

- Case study preview card
- Displays preview image, title, tags, description

**PostCard** (`components/post-card/`)

- Blog post preview card
- Displays preview image, title, tags

**Widget** (`components/widget/`)

- Generic widget component
- Flexible container for various content types

### Slider/Carousel Implementation

Uses **Embla Carousel React** (`embla-carousel-react`)

**Location:** `components/ui/slider/`

- `index.tsx` - Main slider component
- `controls.tsx` - Navigation controls (prev/next buttons, dots)

**Usage in blocks:**

- Blog slider (`blocks/blog/slide.tsx`)
- Case studies slider (`blocks/cases/slide.tsx`)
- Reviews carousel (`blocks/reviews/`)

---

## Styling System

### Tailwind CSS Configuration

**Version:** 4.1.4 (latest Tailwind v4)

**Configuration File:** `src/app/globals.css`

### Custom Theme Configuration

#### Colors

```css
--color-background: #f5f5f5;
--color-black: #121514;
--color-white: #ffffff;
--color-red: #e50606;
--color-dark-grey: #727272;
--color-light-grey: #d6d6d6;
--color-dark-green: #1e2120;
--color-dark-red: #731d1d;
--color-yellow: #f8ce38;
--color-clutch: #17313b;
```

#### Breakpoints

```css
--breakpoint-xs: 375px; /* Mobile */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1200px; /* Desktop */
--breakpoint-xl: 1920px; /* Large desktop */
```

#### Custom Text Sizes

```css
--text-1xl: 1.375rem; /* 22px */
--text-3xl-plus: 2rem; /* 32px */
--text-4xl-plus: 2.875rem; /* 46px */
--text-5xl-plus: 3.25rem; /* 52px */
```

#### Custom Spacing

```css
--spacing-c-22: 1.375rem; /* 22px */
--spacing-c-50: 3.125rem; /* 50px */
```

### Font System

**Primary Font:** TT Runs (Custom font family)

**Configuration:** `src/lib/fonts.ts`

**Available Weights:**

- Thin
- Light
- Regular
- Medium
- DemiBold
- Bold
- ExtraBold
- Black
- Variable Roman

**Usage:**

```typescript
import { ttRuns } from '@/lib/fonts'

// In layout.tsx
<body className={`${ttRuns.variable}`}>
```

**CSS Variable:** `--font-tt-runs`

### SVG Handling

**Configuration:** `next.config.ts` with `@svgr/webpack`

**Import Patterns:**

1. **As React Component:**

    ```typescript
    import Logo from '@/assets/Logo.svg'
    <Logo />
    ```

2. **As URL:**
    ```typescript
    import logoUrl from '@/assets/Logo.svg?url'
    <img src={logoUrl} alt="Logo" />
    ```

### Image Optimization

**Next.js Image Configuration:**

```typescript
{
  unoptimized: true, // For Contentful compatibility
  remotePatterns: [
    { hostname: 'placehold.co' },       // Placeholder images
    { hostname: 'images.ctfassets.net' }, // Contentful images
    { hostname: 'assets.ctfassets.net' }, // Contentful assets
  ]
}
```

### Responsive Design Strategy

**Mobile-First Approach:**

- Base styles target mobile (375px)
- Use `md:` for tablet (768px+)
- Use `lg:` for desktop (1200px+)
- Use `xl:` for large desktop (1920px+)

**Example:**

```tsx
<div className="xs:text-sm md:text-lg lg:text-xl">Responsive text</div>
```

### PostCSS Configuration

**File:** `postcss.config.mjs`

**Plugins:**

- `@tailwindcss/postcss` - Tailwind CSS v4 processing

**Autoprefixer:** Included via Tailwind v4

---

## Environment Variables

### Required Variables

#### Contentful CMS

```env
CONTENTFUL_SPACE_ID=<your_space_id>
CONTENTFUL_DELIVERY_API_TOKEN=<your_token>
```

#### Retool Integration

```env
RETOOL_CONTACT_URL=<workflow_url>
RETOOL_API_KEY=<api_key>
```

### Optional Variables

#### Contentful Configuration

```env
# Use preview API instead of delivery API
CONTENTFUL_HOST=preview.contentful.com

# Custom content type IDs
CONTENTFUL_POST_TYPE_ID=post
CONTENTFUL_JOB_TYPE_ID=job
CONTENTFUL_CASE_TYPE_ID=case
```

### Environment File

- **Development:** `.env.local` (not in version control)
- **Production:** Set via hosting platform (Vercel, etc.)

### Fallback Behavior

If Contentful variables are missing:

- App still runs
- Uses hardcoded mock data
- Console logs indicate missing CMS connection

---

## Development Workflow

### NPM Scripts

```bash
# Start development server with hot reload
npm run dev

# Build production-ready application
npm run build

# Start production server (requires build first)
npm run start

# Run ESLint for code quality
npm run lint
```

### Development Server

- URL: `http://localhost:3000`
- Hot Module Replacement (HMR) enabled
- Fast Refresh for React components

### Build Process

1. TypeScript compilation
2. Next.js optimization
3. Static generation where possible
4. Image optimization
5. CSS purging and minification

### Code Quality

**ESLint Configuration:** `eslint.config.mjs`

- Next.js recommended rules
- Simple import sort plugin
- Custom project rules

**Import Sorting:**
Uses `eslint-plugin-simple-import-sort` for consistent import ordering

### TypeScript Configuration

**File:** `tsconfig.json`

**Key Settings:**

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Path aliases: `@/*` → `./src/*`

**Path Alias Usage:**

```typescript
import { Button } from '@/components/ui'
import PAGES from '@/lib/navigation'
```

### Git Workflow

- Main branch: Not specified (check with team)
- Current branch: `cases_updates`
- Standard Git workflow applies

---

## Key Features

### 1. Dynamic Routing

- Case studies: `/case-studies/[slug]`
- Career pages: `/careers/[slug]`
- All routes generated from CMS data

### 2. SEO Optimization

- Metadata API for each page
- Custom SEO titles and descriptions
- Structured breadcrumb navigation
- Optimized images with alt text

### 3. Content Management

- Contentful headless CMS integration
- Rich text rendering
- Asset management (images, files)
- Preview mode support

### 4. Form Handling

- Contact form with file upload
- Retool workflow integration
- Base64 file encoding
- Error handling and validation

### 5. Performance

- Server-side rendering (SSR)
- Static generation where applicable
- Image optimization
- Code splitting via Next.js

### 6. Responsive Design

- Mobile-first approach
- Four breakpoints (xs, md, lg, xl)
- Touch-friendly interfaces
- Responsive images

### 7. UI Components

- Reusable component library
- Accessible components
- Consistent design system
- Custom SVG icons

### 8. Animation & Interaction

- Embla Carousel for sliders
- Smooth scroll behaviors
- Scroll-to-top functionality
- Interactive accordions

---

## Additional Notes for AI Assistants

### Important Behaviors

1. **Content Fallbacks:** All CMS-related functions gracefully fall back to mock data if Contentful is unavailable.

2. **Type Safety:** The project uses TypeScript extensively. Always respect type definitions in `src/types/index.ts`.

3. **Render Utilities:** The `src/lib/render.ts` file (267 lines) contains critical content rendering logic. Reference it when working with Contentful rich text.

4. **Navigation Configuration:** All navigation items are defined in `src/lib/navigation.ts`. This is the single source of truth for site structure.

5. **Component Exports:** Use barrel exports from `index.ts` files for cleaner imports.

6. **Asset Handling:** SVG files can be imported as components or URLs using `?url` query parameter.

7. **Environment Safety:** Never commit `.env.local` or actual API keys. The project has fallback behavior for missing env vars.

8. **Styling Consistency:** Use Tailwind utility classes and custom CSS variables defined in `globals.css`.

### Common Patterns

**Page Structure:**

```typescript
// app/[page]/page.tsx
import { Component } from '@/components/blocks'
import { getData } from '@/lib/data'

export default async function Page() {
  const data = await getData()
  return <Component data={data} />
}
```

**Data Fetching:**

```typescript
// Server component - no 'use client' needed
const data = await getCaseBySlug('example-slug')
```

**Styling Pattern:**

```typescript
<div className="xs:text-sm md:text-lg bg-background text-black">
  Content
</div>
```

### File Naming Conventions

- React components: PascalCase (e.g., `Button.tsx`)
- Utilities/libs: camelCase (e.g., `navigation.ts`)
- Pages: lowercase with hyphens (e.g., `case-studies/`)
- Types: PascalCase (e.g., `ServiceType`)

---

## Project Health

**Node Version Required:** >= 18.18.0

**Current Tech Stack Status:**

- ✅ Using latest Next.js 15 (App Router)
- ✅ Using React 19
- ✅ Using Tailwind CSS v4
- ✅ TypeScript 5.x with strict mode
- ✅ Modern ESLint v9

**Dependencies:** All up to date (as of project snapshot)

---

## Deployment

The application is designed to be deployed on **Vercel** (Next.js hosting platform), but can be deployed to any Node.js hosting service.

**Deployment Checklist:**

1. Set all environment variables in hosting platform
2. Run `npm run build` to test production build
3. Ensure Contentful content types are properly configured
4. Test contact form with Retool endpoint
5. Verify image optimization works with remote patterns

**Recommended Platform:** [Vercel](https://vercel.com)

---

## Support & Maintenance

### Updating Content

- Most content updates happen in Contentful CMS
- No code deployment needed for content changes
- Preview changes using `CONTENTFUL_HOST=preview.contentful.com`

### Adding New Pages

1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` file
3. Update `src/lib/navigation.ts` if needed
4. Create required components in `src/components/blocks/`

### Adding New Components

1. Small reusable components → `src/components/ui/`
2. Large page sections → `src/components/blocks/`
3. Export from respective `index.ts` files
4. Follow existing TypeScript patterns

---

**Last Updated:** January 29, 2026
**Project Version:** 0.1.0
**Documentation Version:** 1.0.0
