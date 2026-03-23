'use client'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Building2, Truck, Cog, BarChart3, Droplets, Hammer, CheckCircle2, ArrowRight, Phone } from 'lucide-react'

const services = [
  {
    id: 'building',
    icon: Building2,
    title: 'Building Construction',
    tagline: 'From foundations to finishing',
    color: '#cc1a1a',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    desc: 'We construct residential, commercial, and industrial buildings to international standards using certified materials, modern techniques, and an experienced team of over 50 professionals.',
    details: [
      'Residential homes and apartments',
      'Multi-storey commercial complexes',
      'Industrial and manufacturing facilities',
      'Schools, hospitals and public buildings',
      'Pre-engineered steel structures',
      'Green and sustainable buildings',
    ],
    process: ['Site survey & soil test', 'Architectural design', 'Foundation works', 'Structural build', 'MEP installation', 'Finishing & handover'],
  },
  {
    id: 'roads',
    icon: Truck,
    title: 'Roads & Infrastructure',
    tagline: 'Connecting communities across Kenya',
    color: '#0d2a6e',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: 'Modern road networks, bridges, and civil infrastructure solutions using state-of-the-art equipment and proven engineering methodologies that withstand Kenya\'s climate.',
    details: [
      'Highway and trunk road construction',
      'Urban and access road networks',
      'Bridges and culverts',
      'Drainage and stormwater systems',
      'Pavements and road markings',
      'Traffic management systems',
    ],
    process: ['Route survey', 'Environmental assessment', 'Sub-base preparation', 'Base course', 'Paving works', 'Road furniture'],
  },
  {
    id: 'structural',
    icon: Cog,
    title: 'Structural Engineering',
    tagline: 'Built to exceed expectations',
    color: '#5b9bd5',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    desc: 'Expert structural design, analysis, and site supervision ensuring every project meets Kenya\'s engineering codes, international best practices, and the highest safety standards.',
    details: [
      'Structural design and analysis',
      'Foundation and geotechnical engineering',
      'Steel frame and reinforced concrete structures',
      'Seismic and load analysis',
      'Site supervision and inspection',
      'Structural safety audits',
    ],
    process: ['Geotechnical survey', 'Structural analysis', 'Design & drawings', 'Approvals', 'Supervision', 'As-built records'],
  },
  {
    id: 'pm',
    icon: BarChart3,
    title: 'Project Management',
    tagline: 'On time. On budget. On spec.',
    color: '#d4a017',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    desc: 'End-to-end project management from inception to commissioning. Our PMP-certified managers ensure every project is delivered with precision, transparency, and accountability.',
    details: [
      'Full project lifecycle management',
      'Cost planning and quantity surveying',
      'Schedule and programme management',
      'Quality assurance and control',
      'Risk identification and mitigation',
      'Contractor and subcontractor management',
    ],
    process: ['Project brief', 'Feasibility study', 'Procurement', 'Construction management', 'Progress reporting', 'Commissioning'],
  },
  {
    id: 'water',
    icon: Droplets,
    title: 'Water & Sanitation',
    tagline: 'Clean water for every community',
    color: '#00a8cc',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80',
    desc: 'Comprehensive water supply and sanitation infrastructure designed to serve communities, industries, and government facilities across Kenya — built for reliability and long-term sustainability.',
    details: [
      'Water intake and treatment plants',
      'Water supply distribution networks',
      'Sewerage and wastewater systems',
      'Pumping stations and storage tanks',
      'Irrigation infrastructure',
      'Borehole drilling and water wells',
    ],
    process: ['Hydrological survey', 'System design', 'Procurement', 'Civil works', 'Mechanical & electrical', 'Commissioning'],
  },
  {
    id: 'reno',
    icon: Hammer,
    title: 'Renovation & Fit-Out',
    tagline: 'Transforming spaces, elevating lives',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    desc: 'We revitalize existing spaces through expert renovation, refurbishment, and fit-out works — transforming tired structures into modern, functional, and beautiful environments.',
    details: [
      'Interior renovation and refurbishment',
      'Exterior facelift and re-cladding',
      'Office and commercial fit-out',
      'Retail interior design and fit-out',
      'MEP upgrades and replacements',
      'Accessibility modifications',
    ],
    process: ['Condition assessment', 'Design concept', 'Works programme', 'Strip-out & prep', 'Fit-out works', 'Snagging & handover'],
  },
]

function ServiceBlock({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const Icon = service.icon
  const isEven = index % 2 === 0

  return (
    <div id={service.id} ref={ref}
      className={`py-20 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'} ${index > 0 ? 'border-t border-white/5' : ''}`}>
      <div className="section-container">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
          {/* Image */}
          <div className={`relative rounded-2xl overflow-hidden h-80 lg:h-96 group ${!isEven ? 'lg:col-start-2' : ''}`}>
            <img src={service.image} alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(5,5,15,0.7), transparent)` }} />
            {/* Icon overlay */}
            <div className="absolute bottom-5 left-5 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${service.color}22`, border: `1px solid ${service.color}44`, backdropFilter: 'blur(12px)' }}>
              <Icon size={26} style={{ color: service.color }} />
            </div>
          </div>

          {/* Content */}
          <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <div className="badge mb-4" style={{ background: `${service.color}15`, borderColor: `${service.color}35`, color: service.color }}>
              {service.tagline}
            </div>
            <h2 className="section-title mb-4" style={{ color: 'var(--text-primary)' }}>{service.title}</h2>
            <p className="opacity-60 leading-relaxed mb-8">{service.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {service.details.map(d => (
                <div key={d} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                  <span className="opacity-70">{d}</span>
                </div>
              ))}
            </div>

            {/* Process pills */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-widest uppercase opacity-40 mb-3">Our Process</p>
              <div className="flex flex-wrap gap-2">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="glass px-3 py-1.5 rounded-full text-xs font-medium opacity-80">{i + 1}. {step}</span>
                    {i < service.process.length - 1 && <span className="text-brand-red opacity-40 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl text-sm">
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80"
            alt="" aria-hidden className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,15,0.95), rgba(13,42,110,0.7))' }} />
          <div className="absolute inset-0 grid-overlay" />
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="badge mb-6">— What We Build</div>
          <h1 className="hero-title text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Six decades of combined expertise, 200+ projects delivered, and a team of 50+ professionals — ready to bring your construction vision to life.
          </p>
          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {services.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="glass text-white/70 hover:text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/10">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service blocks */}
      {services.map((service, i) => <ServiceBlock key={service.id} service={service} index={i} />)}

      {/* Contact CTA */}
      <section className="py-20" style={{ background: 'rgba(204,26,26,0.05)', borderTop: '1px solid rgba(204,26,26,0.1)' }}>
        <div className="section-container text-center">
          <Phone size={32} className="text-brand-red mx-auto mb-6" />
          <h2 className="section-title mb-4"><span className="text-gradient">Ready to Start?</span></h2>
          <p className="opacity-60 mb-8 max-w-xl mx-auto">Contact us for a free site consultation and competitive quotation tailored to your project needs.</p>
          <Link href="/contact" className="btn-shimmer inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl">
            Get Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
