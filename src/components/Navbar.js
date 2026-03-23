'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'
import {
  Menu, X, Sun, Moon, ChevronDown, Phone, Mail,
  Building2, Truck, Cog, Droplets, Hammer, BarChart3, ArrowRight
} from 'lucide-react'

// ── LOGO as inline SVG recreation (Engineering Works Limited branding) ────────
const LOGO_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAbAAAAENCAYAAABuGjCBAAEAAElEQVR4nOz9d7glx3XeC/+qqsMOJ86ciZhBzoEAicQkiDlKlGlS'

// ── NAV DATA ──────────────────────────────────────────────────────────────────
const serviceLinks = [
  { label: 'Mechanical Works', desc: 'HVAC, pipework, fire systems', icon: Cog, color: '#cc1a1a', href: '/services#mechanical', badge: 'Primary' },
  { label: 'Electrical Works', desc: 'LV/MV, solar, generators, BMS', icon: BarChart3, color: '#d4a017', href: '/services#electrical' },
  { label: 'Civil Construction', desc: 'Buildings, roads, structures', icon: Building2, color: '#0d2a6e', href: '/services#building' },
  { label: 'Roads & Infrastructure', desc: 'Highways, bridges, drainage', icon: Truck, color: '#5b9bd5', href: '/services#roads' },
  { label: 'Water & Sanitation', desc: 'Treatment plants, pipeworks', icon: Droplets, color: '#00a8cc', href: '/services#water' },
  { label: 'Maintenance Contracts', desc: 'AMC, PPM, 24/7 response', icon: Hammer, color: '#8b5cf6', href: '/services#maintenance' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()
  const pathname = usePathname()
  const dropRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setServicesOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const navBg = scrolled
    ? dark ? 'rgba(4,4,16,0.94)' : 'rgba(255,255,255,0.94)'
    : dark ? 'rgba(4,4,16,0.6)' : 'rgba(255,255,255,0.75)'

  const textColor = dark ? 'rgba(255,255,255,0.88)' : '#0a0f1e'
  const hoverColor = dark ? '#fff' : '#0d2a6e'

  return (
    <>
      {/* Top info bar */}
      <div className="hidden lg:block w-full" style={{ background: 'linear-gradient(90deg,#0d2a6e,#1a4a9e,#cc1a1a)', color: 'white' }}>
        <div className="section-container flex items-center justify-between py-1.5">
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="tel:+254733315621" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone size={11} /> +254 733 315 621
            </a>
            <a href="mailto:info@jamanengineering.co.ke" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail size={11} /> info@jamanengineering.co.ke
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>Re-Plaza, Upper Hill, Nairobi</span>
            <span>•</span>
            <span>Mon–Sat 8AM–6PM</span>
            <span>•</span>
            <span className="text-yellow-300 font-semibold">NCA Registered · EBK Accredited</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'blur(12px)',
          borderBottom: `1px solid ${dark ? 'rgba(204,26,26,0.2)' : 'rgba(13,42,110,0.15)'}`,
          boxShadow: scrolled ? `0 4px 30px rgba(0,0,0,${dark ? '0.4' : '0.08'})` : 'none',
        }}
      >
        <nav className="section-container flex items-center justify-between py-3" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Jaman Engineering Home">
            {/* Logo image */}
            <div className="relative h-12 w-auto flex-shrink-0">
              <img
                src="/logo.png"
                alt="Jaman Engineering Logo"
                className="h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(13,42,110,0.3))' }}
                onError={(e) => {
                  // Fallback if logo.png missing
                  e.target.style.display = 'none'
                }}
              />
            </div>
            {/* Text */}
            <div>
              <div className="font-black leading-none tracking-wider" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontSize: '1.35rem', color: '#cc1a1a' }}>
                JAMAN
              </div>
              <div className="text-[0.55rem] font-bold tracking-[0.18em] uppercase leading-tight" style={{ color: dark ? '#5b9bd5' : '#0d2a6e' }}>
                Engineering Works Limited
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none" ref={link.children ? dropRef : null}>
                {link.children ? (
                  <div className="relative">
                    <button
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen(v => !v)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                      style={{
                        color: pathname.startsWith(link.href) ? '#cc1a1a' : textColor,
                        background: pathname.startsWith(link.href) ? 'rgba(204,26,26,0.1)' : 'transparent',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#cc1a1a'}
                      onMouseLeave={e => e.currentTarget.style.color = pathname.startsWith(link.href) ? '#cc1a1a' : textColor}
                    >
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform duration-250 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* MEGA DROPDOWN — badge style */}
                    {servicesOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] animate-slide-down"
                        style={{
                          background: dark ? 'rgba(6,6,20,0.97)' : 'rgba(255,255,255,0.98)',
                          backdropFilter: 'blur(40px) saturate(200%)',
                          border: `1px solid ${dark ? 'rgba(204,26,26,0.2)' : 'rgba(13,42,110,0.12)'}`,
                          borderRadius: '20px',
                          boxShadow: `0 24px 80px rgba(0,0,0,${dark ? '0.6' : '0.15'}), 0 0 0 1px rgba(255,255,255,0.05)`,
                        }}
                        role="menu"
                      >
                        {/* Dropdown header */}
                        <div className="px-5 pt-4 pb-3" style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(13,42,110,0.08)'}` }}>
                          <p className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#0d2a6e', opacity: dark ? 1 : 0.6 }}>
                            Our Engineering Services
                          </p>
                        </div>

                        {/* Badge-style service grid */}
                        <div className="p-4 grid grid-cols-2 gap-2.5">
                          {serviceLinks.map((svc) => {
                            const Icon = svc.icon
                            return (
                              <Link
                                key={svc.href}
                                href={svc.href}
                                role="menuitem"
                                className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                                style={{ border: `1px solid transparent` }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = dark ? `${svc.color}14` : `${svc.color}0d`
                                  e.currentTarget.style.borderColor = `${svc.color}30`
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'transparent'
                                  e.currentTarget.style.borderColor = 'transparent'
                                }}
                              >
                                {/* Icon badge */}
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                                  style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                                  <Icon size={16} style={{ color: svc.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold leading-tight" style={{ color: dark ? '#fff' : '#0a0f1e' }}>
                                      {svc.label}
                                    </span>
                                    {svc.badge && (
                                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase"
                                        style={{ background: svc.color, color: 'white' }}>
                                        {svc.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs mt-0.5 leading-tight" style={{ color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(10,15,30,0.55)' }}>
                                    {svc.desc}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>

                        {/* Footer CTA */}
                        <div className="px-4 pb-4">
                          <Link href="/services"
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01]"
                            style={{ background: 'linear-gradient(90deg,#0d2a6e,#cc1a1a)' }}
                          >
                            <span>View All Services</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    role="menuitem"
                    className="px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 block"
                    style={{
                      color: pathname === link.href ? '#cc1a1a' : textColor,
                      background: pathname === link.href ? 'rgba(204,26,26,0.1)' : 'transparent',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#cc1a1a'}
                    onMouseLeave={e => e.currentTarget.style.color = pathname === link.href ? '#cc1a1a' : textColor}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Dark/light toggle */}
            <button
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
              style={{
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,42,110,0.08)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,42,110,0.15)'}`,
              }}
            >
              {dark
                ? <Sun size={17} style={{ color: '#fbbf24' }} />
                : <Moon size={17} style={{ color: '#0d2a6e' }} />
              }
            </button>

            {/* CTA */}
            <Link href="/contact"
              className="hidden lg:flex btn-shimmer text-white text-sm font-bold px-5 py-2.5 rounded-xl items-center gap-1.5"
            >
              Get Quote
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl transition-all"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,42,110,0.08)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(13,42,110,0.15)'}`,
              }}
            >
              {mobileOpen ? <X size={20} style={{ color: textColor }} /> : <Menu size={20} style={{ color: textColor }} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[90vh] overflow-y-auto' : 'max-h-0'}`}
          style={{ background: dark ? 'rgba(4,4,16,0.98)' : 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)' }}
        >
          <div className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link href={link.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    color: pathname === link.href ? '#cc1a1a' : textColor,
                    background: pathname === link.href ? 'rgba(204,26,26,0.1)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map(child => {
                      const Icon = child.icon
                      return (
                        <Link key={child.href} href={child.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors"
                          style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(10,15,30,0.65)' }}
                        >
                          <Icon size={13} style={{ color: child.color }} />
                          {child.label}
                          {child.badge && (
                            <span className="text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest"
                              style={{ background: child.color, color: 'white' }}>
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Link href="/contact"
                className="btn-shimmer text-white text-sm font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2">
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
