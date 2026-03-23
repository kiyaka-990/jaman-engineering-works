'use client'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Building2, Truck, Cog, BarChart3, Droplets, Hammer, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Cog,
    title: 'Mechanical Works',
    desc: 'Our primary specialty — HVAC, industrial pipework, fire protection, pump systems, fabrication and mechanical maintenance.',
    features: ['HVAC design & installation', 'Industrial pipework & welding', 'Fire suppression systems', 'Pump & mechanical equipment'],
    color: '#cc1a1a',
    href: '/services#mechanical',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=75',
    badge: 'Primary Service',
  },
  {
    icon: BarChart3,
    title: 'Electrical Works',
    desc: 'LV/MV installations, solar PV, building management systems, generators, and full electrical commissioning.',
    features: ['LV/MV electrical', 'Solar PV systems', 'Generator installations', 'BMS & controls'],
    color: '#d4a017',
    href: '/services#electrical',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=75',
  },
  {
    icon: Building2,
    title: 'Civil Construction',
    desc: 'Residential, commercial, and industrial buildings crafted to international standards with local expertise.',
    features: ['Multi-storey buildings', 'Residential estates', 'Commercial complexes', 'Industrial facilities'],
    color: '#0d2a6e',
    href: '/services#building',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=75',
  },
  {
    icon: Truck,
    title: 'Roads & Infrastructure',
    desc: 'Highways, access roads, bridges and drainage systems — connecting communities across Kenya.',
    features: ['Highway construction', 'Access roads', 'Bridges & culverts', 'Drainage systems'],
    color: '#5b9bd5',
    href: '/services#roads',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',
  },
  {
    icon: Droplets,
    title: 'Water & Sanitation',
    desc: 'Water supply, sewerage networks, treatment plants and sanitation infrastructure for communities and developments.',
    features: ['Water supply systems', 'Sewerage networks', 'Treatment plants', 'Pumping stations'],
    color: '#00a8cc',
    href: '/services#water',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=75',
  },
  {
    icon: Hammer,
    title: 'Maintenance Contracts',
    desc: 'Planned preventive and corrective maintenance keeping your mechanical, electrical and civil assets running efficiently.',
    features: ['Annual AMC contracts', 'PPM scheduling', '24/7 breakdown response', 'HVAC servicing'],
    color: '#8b5cf6',
    href: '/services#maintenance',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=75',
  },
]

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const Icon = service.icon

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl overflow-hidden group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(5,5,15,0.9), transparent 50%, rgba(5,5,15,0.3))` }} />
        {/* Icon badge */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${service.color}22`, border: `1px solid ${service.color}44`, backdropFilter: 'blur(10px)' }}>
          <Icon size={22} style={{ color: service.color }} aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}>
          {service.title}
          {service.badge && (
            <span className="ml-2 text-[9px] bg-brand-red text-white px-1.5 py-0.5 rounded-full font-bold tracking-widest uppercase align-middle">
              {service.badge}
            </span>
          )}
        </h3>
        <p className="text-sm leading-relaxed mb-4 opacity-60">{service.desc}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-6">
          {service.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-xs opacity-70">
              <CheckCircle2 size={12} style={{ color: service.color }} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <Link href={service.href}
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link"
          style={{ color: service.color }}
          aria-label={`Learn more about ${service.title}`}
        >
          Learn More
          <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }} />
    </div>
  )
}

export default function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 relative" aria-labelledby="services-heading">
      <div className="section-container">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="badge mb-4">— What We Do</div>
          <h2 id="services-heading" className="section-title mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Our Core </span>
            <span className="text-gradient">Services</span>
          </h2>
          <p className="text-base opacity-60 max-w-2xl mx-auto leading-relaxed">
            Mechanical Works is our core specialty — supported by electrical, civil, water and maintenance services for fully integrated project delivery across Kenya.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/services"
            className="inline-flex items-center gap-3 glass px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all border-glow"
            style={{ color: 'var(--text-primary)' }}
          >
            View All Services
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
