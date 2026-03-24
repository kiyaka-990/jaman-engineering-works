'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, ArrowDown } from 'lucide-react'

const slides = [
  {
    image: '/images/hero.jpg',
    badge: 'Building Kenya\'s Future',
    title: 'Engineering',
    titleAccent: 'Excellence',
    subtitle: 'From foundations to skylines — Jaman Engineering delivers world-class construction projects across Kenya.',
    cta: 'Explore Services',
    ctaLink: '/services',
    cta2: 'View Projects',
    cta2Link: '/projects',
  },
  {
    image: '/images/hero-2.jpg',
    badge: 'Infrastructure Leaders',
    title: 'Roads That',
    titleAccent: 'Connect',
    subtitle: 'Modern road networks and civil infrastructure connecting communities and driving development across East Africa.',
    cta: 'Our Capabilities',
    ctaLink: '/services',
    cta2: 'Contact Us',
    cta2Link: '/contact',
  },
  {
    image: '/images/hero-6.jpg',
    badge: '200+ Completed Projects',
    title: 'Built to',
    titleAccent: 'Last',
    subtitle: 'Structural engineering expertise combined with premium materials for buildings that stand the test of time.',
    cta: 'Get a Quote',
    ctaLink: '/contact',
    cta2: 'Learn More',
    cta2Link: '/about',
  },
  {
    image: '/images/hero-1.jpg',
    badge: 'NCA Registered',
    title: 'Trusted',
    titleAccent: 'Partners',
    subtitle: 'Certified by the National Construction Authority and Engineers Board of Kenya — delivering with integrity since 2009.',
    cta: 'About Jaman',
    ctaLink: '/about',
    cta2: 'Our Team',
    cta2Link: '/about#team',
  },
]

// Pre-computed particle positions — deterministic, same on server & client
// Generated once at module load (not in render), so no hydration mismatch
const PARTICLES = Array.from({ length: 15 }, (_, i) => {
  // Simple deterministic pseudo-random based on index
  const seed = (i * 2654435761) >>> 0
  const a = ((seed ^ (seed >> 16)) * 0x45d9f3b) >>> 0
  const b = ((a ^ (a >> 16)) * 0x45d9f3b) >>> 0
  const c = ((b ^ (b >> 16))) >>> 0
  return {
    w:     3 + (a % 100) / 20,           // 3–8 px
    x:     (b % 10000) / 100,            // 0–100%
    y:     (c % 10000) / 100,            // 0–100%
    dur:   4 + (a % 100) / 16.7,         // 4–10s
    delay: (b % 400) / 100,              // 0–4s
  }
})

const INTERVAL = 6000

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setPrev(current)
    setCurrent(idx)
    setProgress(0)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 800)
  }, [current, animating])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const back = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  // Auto-play
  useEffect(() => {
    if (paused) return
    const timer = setTimeout(next, INTERVAL)
    return () => clearTimeout(timer)
  }, [current, paused, next])

  // Progress bar
  useEffect(() => {
    if (paused) return
    setProgress(0)
    const start = Date.now()
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / INTERVAL, 1))
      if (elapsed < INTERVAL) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [current, paused])

  const slide = slides[current]

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
      aria-label="Hero carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : i === prev ? 'opacity-0 z-10' : 'opacity-0 z-0'}`}
          style={{ transform: i === current ? 'scale(1.03)' : 'scale(1)', transition: 'opacity 1s ease, transform 6s ease' }}
        >
          <Image
            src={s.image}
            alt={`${s.titleAccent} construction project`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Minimal bottom scrim only — keeps text readable without hiding the image */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)'
          }} />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="section-container w-full">
          <div className="max-w-4xl">
            {/* Badge */}
            <div
              key={`badge-${current}`}
              className="badge mb-6 animate-slide-down"
              role="text"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              {slide.badge}
            </div>

            {/* Title */}
            <h1
              key={`title-${current}`}
              className="hero-title text-white mb-6 animate-slide-up"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', animationDelay: '0.1s' }}
            >
              {slide.title}<br />
              <span className="text-gradient">{slide.titleAccent}</span>
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="text-white/70 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="flex flex-wrap gap-4 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href={slide.ctaLink}
                className="btn-shimmer text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide flex items-center gap-2"
              >
                {slide.cta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={slide.cta2Link}
                className="glass text-white font-semibold px-8 py-4 rounded-xl text-sm tracking-wide flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <Play size={15} className="text-brand-red" />
                {slide.cta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={back}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
      >
        <ChevronRight size={22} />
      </button>

      {/* Bottom controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="section-container flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3" role="tablist" aria-label="Slide indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="group relative h-0.5 transition-all duration-300"
                style={{ width: i === current ? '40px' : '20px' }}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-red' : 'bg-white/30 group-hover:bg-white/60'}`} />
                {i === current && (
                  <div
                    className="absolute inset-0 rounded-full bg-brand-red origin-left"
                    style={{ transform: `scaleX(${progress})`, transition: 'none' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide count */}
          <div className="glass px-4 py-2 rounded-full text-white/70 text-xs font-medium tracking-widest">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 animate-bounce-slow">
        <a href="#stats" aria-label="Scroll to content"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
          <span className="text-xs tracking-widest font-medium">SCROLL</span>
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  )
}
