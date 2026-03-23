# Jaman Engineering Works Limited — Next.js Website

A full-featured, modern Next.js 14 website for **Jaman Engineering Works Limited**, Kenya's premier construction and engineering company.

## ✨ Features

### Design
- **Heavy Glassmorphism** — layered glass effects on all cards, nav, chatbot, modals
- **Dark / Light Mode** — system-aware with manual toggle, persisted to localStorage
- **Hero Carousel** — 4-slide fade + Ken Burns with progress dots and auto-play
- **Animated Counters** — triggered on scroll via IntersectionObserver
- **Particle system** on hero with floating dots
- **Grid overlays & noise textures** for depth

### Pages (6 full pages)
1. **Home** — Hero, Stats, Services, Why Us, Projects, Testimonials, Partners, Blog, CTA
2. **Services** — Detailed 6-service page with process flows and image blocks
3. **Projects** — Filterable gallery with click-to-open detail modals
4. **About** — Mission, values, animated timeline, team section
5. **Blog** — Searchable + filterable article grid
6. **Contact** — Validated form with service/budget selectors, contact details

### Interactivity
- **AI Chatbot (JAMA)** — Menu-first navigation, back button, AI-powered free chat via Anthropic API, typing indicators, quick replies, conversation reset
- **Cookie Banner** — GDPR/POPIA compliant with granular preferences (functional, analytics, marketing)
- **Accessibility Menu** — Font size, high contrast, reduce motion, dyslexia font
- **Back to Top** button
- **Sticky Navbar** — with glassmorphic scroll blur, dropdown menus, mobile hamburger

### Mobile
- Fully responsive across all breakpoints (320px → 4K)
- Touch-friendly tap targets
- Mobile-optimised navigation drawer

### SEO & Performance
- `metadata` objects on all pages
- Structured data (JSON-LD) for Organization
- Open Graph + Twitter Card meta tags
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- Skip-to-content link
- ARIA labels, roles, and live regions throughout
- Next.js Image component with lazy loading and responsive `sizes`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment variables
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

> **Note:** The chatbot uses the Anthropic API. Get your key at https://console.anthropic.com

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout (ThemeProvider, Navbar, Footer, ChatBot, etc.)
│   ├── page.js            # Home page
│   ├── globals.css        # Global styles, CSS variables, glassmorphism utilities
│   ├── about/page.js      # About page
│   ├── services/page.js   # Services page
│   ├── projects/page.js   # Projects gallery page
│   ├── contact/page.js    # Contact form page
│   ├── blog/page.js       # Blog listing page
│   ├── privacy/page.js    # Privacy policy
│   └── not-found.js       # 404 page
├── components/
│   ├── Navbar.js           # Sticky glassmorphic nav with dropdown
│   ├── Footer.js           # Full footer with links and CTA band
│   ├── chatbot/
│   │   └── ChatBot.js      # AI chatbot with menu + chat view
│   ├── sections/
│   │   ├── HeroCarousel.js      # 4-slide carousel with particles
│   │   ├── StatsSection.js      # Animated counters
│   │   ├── ServicesSection.js   # Services cards grid
│   │   ├── ProjectsSection.js   # Projects filter + cards
│   │   ├── TestimonialsSection.js # Testimonials carousel
│   │   └── WhyUsSection.js      # Why us + CTA + Blog + Partners
│   └── ui/
│       ├── CookieBanner.js      # GDPR cookie consent
│       ├── BackToTop.js         # Scroll-to-top button
│       └── AccessibilityMenu.js # A11y controls panel
```

---

## 🎨 Customization

### Colors (tailwind.config.js)
```js
brand: {
  red: '#cc1a1a',       // Primary brand red
  'red-dark': '#a01414',
  blue: '#0d2a6e',      // Primary brand blue
  sky: '#5b9bd5',       // Accent blue
}
```

### Company Data
Edit the constants at the top of each component/page:
- `src/components/chatbot/ChatBot.js` — SYSTEM_PROMPT with company info
- `src/components/sections/HeroCarousel.js` — slides array
- `src/app/projects/page.js` — projects array
- `src/app/about/page.js` — team and timeline arrays

### Logo
Replace the `<HardHat>` icon in `Navbar.js` with an `<Image>` component pointing to your logo file in `/public/logo.png`.

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework |
| `framer-motion` | Animations (optional, not yet wired — ready to use) |
| `lucide-react` | Icons |
| `react-intersection-observer` | Scroll animations |
| `react-countup` | Animated number counters |
| `react-hot-toast` | Toast notifications |
| `tailwindcss` | Utility CSS |

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Other Platforms
Any Node.js host supporting Next.js 14 (Railway, Render, AWS Amplify, etc.)

---

## 📄 License
© 2024 Jaman Engineering Works Limited. All rights reserved.
