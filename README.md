# Krasty Soft - Dark Progressive B2B Website

Modern, dark-themed software company website built with Next.js 15, React 19, and TypeScript.

![Tech Stack](https://img.shields.io/badge/Next.js-15.3.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.4-38bdf8?style=flat-square&logo=tailwind-css)

## Features

- **🎨 Dark Progressive Design** - Black/red color scheme with tech/engineering feel
- **✨ Micro-Animations** - Smooth, GPU-accelerated animations using Framer Motion
- **📱 Fully Responsive** - Mobile-first design approach
- **🚀 SEO Optimized** - Core Web Vitals, meta tags, structured data
- **📝 Headless CMS** - Content managed via Contentful
- **📧 Contact Form** - Email integration with Resend API
- **🖼️ Image Lightbox** - Fullscreen image viewer for case studies
- **♿ Accessible** - Keyboard navigation, screen reader support

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Contentful and Resend credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create `.env.local` in the project root:

```env
# Contentful CMS
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_API_TOKEN=your_delivery_token

# Email Service (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_TO=your@email.com
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.1.4
- **Animations:** Framer Motion 11.15.0
- **CMS:** Contentful
- **Email:** Resend API
- **Icons:** Lucide React
- **Font:** TT Runs (Custom)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── blocks/         # Page sections
│   └── ui/             # Reusable UI components
├── lib/                # Utilities & data fetching
├── types/              # TypeScript definitions
├── assets/             # Static assets (SVG, images)
└── fonts/              # Custom fonts
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Key Features Implemented

### Animations
- Scroll-triggered reveals
- Hover effects (lift, glow, scale)
- Typing text animation
- Smooth transitions
- Interruptible animations

### Components
- Fullscreen image lightbox with navigation
- Custom rich text renderer for Contentful
- Smooth scrolling with anchor links
- Interactive contact form with file upload
- Responsive navigation with mobile menu

### Content Management
- Contentful integration with fallback data
- Dynamic case studies, blog posts, job listings
- Rich text rendering with custom styling
- Automatic table of contents generation

### SEO & Performance
- Server-side rendering
- Optimized images
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Core Web Vitals optimized

## Documentation

For complete technical documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

**Topics covered:**
- Architecture & patterns
- Design system & styling
- Content management (Contentful)
- API endpoints
- Development guide
- Deployment instructions
- Troubleshooting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Proprietary - Krasty Soft

## Contact

For questions or support, visit [krasty.me](https://krasty.me)

---

**Built with ❤️ by the Krasty Soft team**
