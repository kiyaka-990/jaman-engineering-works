'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { MapPin, Calendar, DollarSign, ArrowUpRight, X } from 'lucide-react'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Industrial', 'Government', 'Water']

const projects = [
  { title: 'Westlands Luxury Apartments', category: 'Residential', location: 'Westlands, Nairobi', year: '2023', value: 'KSh 280M', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80', desc: 'A 24-unit luxury apartment complex with underground parking and smart home integration. Completed 3 weeks ahead of schedule.', client: 'Kamau Properties Ltd', duration: '18 months' },
  { title: 'Upper Hill Office Complex', category: 'Commercial', location: 'Upper Hill, Nairobi', year: '2023', value: 'KSh 650M', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', desc: '12-storey Grade A office space with LEED-certified sustainable design, 800-capacity parking, and high-speed fibre.', client: 'KenDev Real Estate', duration: '24 months' },
  { title: 'Thika Access Roads', category: 'Infrastructure', location: 'Kiambu County', year: '2022', value: 'KSh 180M', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', desc: '42km of paved access roads connecting 8 rural communities to the main highway network, improving livelihoods.', client: 'Kiambu County Government', duration: '14 months' },
  { title: 'Athi River Logistics Hub', category: 'Industrial', location: 'Athi River, Machakos', year: '2022', value: 'KSh 320M', image: 'https://images.unsplash.com/photo-1590059390047-7efe2bc2fb5e?w=700&q=80', desc: '15,000sqm warehouse complex with modern logistics facilities, truck bays, and cold storage units.', client: 'Eastern Africa Logistics Ltd', duration: '16 months' },
  { title: 'Nakuru Water Treatment Plant', category: 'Water', location: 'Nakuru County', year: '2021', value: 'KSh 420M', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=700&q=80', desc: 'High-capacity 40,000m³/day treatment facility providing clean water to over 300,000 Nakuru residents.', client: 'Nakuru County Water & Sanitation', duration: '20 months' },
  { title: 'Machakos County Buildings', category: 'Government', location: 'Machakos Town', year: '2021', value: 'KSh 240M', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80', desc: 'County government administrative complex with modern offices, public service halls, and 500-vehicle parking.', client: 'Machakos County Government', duration: '22 months' },
  { title: 'Karen Shopping Mall Extension', category: 'Commercial', location: 'Karen, Nairobi', year: '2020', value: 'KSh 190M', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=80', desc: '8,000sqm retail extension adding 40 shops, a food court, and upgraded parking to an existing mall.', client: 'Karen Properties Ltd', duration: '12 months' },
  { title: 'Mombasa Road Widening', category: 'Infrastructure', location: 'Nairobi–Machakos', year: '2020', value: 'KSh 350M', image: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=700&q=80', desc: '28km dual carriageway widening project with new drainage, streetlighting, and pedestrian walkways.', client: 'Kenya National Highways Authority', duration: '18 months' },
  { title: 'Ruiru Estate Phase 2', category: 'Residential', location: 'Ruiru, Kiambu', year: '2019', value: 'KSh 160M', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=700&q=80', desc: 'Phase 2 of 80-unit affordable housing development with shared amenities and perimeter security.', client: 'Affordable Homes Kenya', duration: '14 months' },
]

function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="glass-heavy rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="relative h-64">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.9), transparent 50%)' }} />
          <button onClick={onClose} aria-label="Close project details"
            className="absolute top-4 right-4 glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-5">
            <span className="badge">{project.category}</span>
          </div>
        </div>
        <div className="p-7">
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{project.title}</h2>
          <p className="opacity-60 text-sm leading-relaxed mb-6">{project.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Client', value: project.client },
              { label: 'Location', value: project.location },
              { label: 'Contract Value', value: project.value },
              { label: 'Duration', value: project.duration },
              { label: 'Year', value: project.year },
              { label: 'Status', value: 'Completed' },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-xl p-3">
                <div className="text-xs opacity-40 mb-1">{label}</div>
                <div className="text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" onClick={onClose}
            className="btn-shimmer text-white font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2">
            Start Similar Project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref}
      className={`glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onClick={() => onOpen(project)}
      role="button" tabIndex={0} aria-label={`View ${project.title} project details`}
      onKeyDown={e => e.key === 'Enter' && onOpen(project)}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.85), transparent 55%)' }} />
        <div className="absolute top-3 left-3"><span className="badge text-xs">{project.category}</span></div>
        <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full text-xs font-bold text-white">{project.value}</div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(204,26,26,0.15)' }}>
          <div className="glass w-11 h-11 rounded-full flex items-center justify-center">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-black text-sm mb-1 group-hover:text-brand-red transition-colors" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{project.title}</h3>
        <p className="text-xs opacity-50 mb-3 line-clamp-2">{project.desc}</p>
        <div className="flex items-center gap-4 text-xs opacity-40">
          <span className="flex items-center gap-1"><MapPin size={10} />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar size={10} />{project.year}</span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80" alt="" aria-hidden className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,15,0.95), rgba(13,42,110,0.7))' }} />
          <div className="absolute inset-0 grid-overlay" />
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="badge mb-6">— Portfolio</div>
          <h1 className="hero-title text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Our <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            200+ completed projects across Kenya — from luxury residences to major infrastructure. Each one a testament to our commitment to excellence.
          </p>
        </div>
      </section>

      {/* Projects gallery */}
      <section className="py-20">
        <div className="section-container">
          {/* Filters */}
          <div ref={ref} className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
            role="group" aria-label="Filter projects by category">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} aria-pressed={active === cat}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${active === cat ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30' : 'glass hover:bg-white/10'}`}
                style={{ color: active === cat ? 'white' : 'var(--text-primary)' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs opacity-50">
            <span>{filtered.length} projects shown</span>
            <span>•</span>
            <span>Total value: KSh {filtered.reduce((a, p) => a + parseInt(p.value.replace(/[^0-9]/g, '')), 0)}M+</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <ProjectCard key={p.title} project={p} onOpen={setModal} index={i} />)}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: 'rgba(204,26,26,0.04)', borderTop: '1px solid rgba(204,26,26,0.1)' }}>
        <div className="section-container">
          <h2 className="section-title mb-4"><span className="text-gradient">Your Project Next?</span></h2>
          <p className="opacity-60 mb-8 max-w-xl mx-auto">Join 200+ clients who trusted Jaman Engineering to deliver their vision.</p>
          <Link href="/contact" className="btn-shimmer inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  )
}
