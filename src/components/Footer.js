'use client'
import Link from 'next/link'
import { HardHat, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Youtube } from 'lucide-react'

const footerLinks = {
  'Services': [
    { label: 'Building Construction', href: '/services#building' },
    { label: 'Roads & Infrastructure', href: '/services#roads' },
    { label: 'Structural Engineering', href: '/services#structural' },
    { label: 'Project Management', href: '/services#pm' },
    { label: 'Water & Sanitation', href: '/services#water' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: 'var(--footer-bg)', borderTop: '2px solid rgba(13,42,110,0.4)', color: '#f0f4ff' }}>
      {/* CTA Band */}
      <div style={{ background: 'linear-gradient(135deg, rgba(204,26,26,0.15), rgba(13,42,110,0.15))', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-black mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'white' }}>
                Ready to Start Your Project?
              </h2>
              <p className="text-sm opacity-50">Free consultation. Professional quote. No obligation.</p>
            </div>
            <Link href="/contact"
              className="btn-shimmer text-white font-bold px-8 py-4 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap">
              Get Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              {/* Footer is always dark background — use the dark logo */}
              <img
                src="/logo-dark.png"
                alt="Jaman Engineering Works Limited"
                className="h-16 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 10px rgba(13,42,110,0.4))' }}
              />
            </Link>

            <p className="text-sm opacity-50 leading-relaxed mb-6 max-w-sm">
              Premier construction and engineering company based in Re-Plaza, Upper Hill, Nairobi, Kenya. Building excellence across East Africa since 2009.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Phone, text: '+254 733 315 621', href: 'tel:+254733315621' },
                { icon: Mail, text: 'info@jamanengineering.co.ke', href: 'mailto:info@jamanengineering.co.ke' },
                { icon: MapPin, text: 'Re-Plaza, Upper Hill, Nairobi', href: '#' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href}
                  className="flex items-center gap-3 text-xs opacity-50 hover:opacity-90 transition-opacity">
                  <Icon size={13} className="text-brand-red flex-shrink-0" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2" role="list" aria-label="Social media links">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} role="listitem"
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/10 transition-all hover:scale-110">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#cc1a1a' }}>{section}</h3>
              <ul className="space-y-2.5" role="list">
                {links.map(link => (
                  <li key={link.label} role="listitem">
                    <Link href={link.href}
                      className="text-xs opacity-50 hover:opacity-90 hover:text-brand-red transition-all flex items-center gap-1.5 group">
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-30">© {new Date().getFullYear()} Jaman Engineering Works Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs opacity-30">
            <span>NCA Registered</span>
            <span>•</span>
            <span>EBK Accredited</span>
            <span>•</span>
            <span>ISO Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
