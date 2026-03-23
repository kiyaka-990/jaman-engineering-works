'use client'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Industrial', 'Government']

const projects = [
  {
    title: 'Westlands Luxury Apartments',
    category: 'Residential',
    location: 'Westlands, Nairobi',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    desc: 'A 24-unit luxury apartment complex featuring modern finishes, underground parking, and smart home integration.',
    value: 'KSh 280M',
  },
  {
    title: 'Upper Hill Office Complex',
    category: 'Commercial',
    location: 'Upper Hill, Nairobi',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    desc: '12-storey Grade A office space with LEED-certified design and state-of-the-art facilities.',
    value: 'KSh 650M',
  },
  {
    title: 'Thika Access Roads',
    category: 'Infrastructure',
    location: 'Kiambu County',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: '42km of access roads connecting 8 villages to the main highway network.',
    value: 'KSh 180M',
  },
  {
    title: 'Athi River Logistics Hub',
    category: 'Industrial',
    location: 'Athi River, Machakos',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1590059390047-7efe2bc2fb5e?w=600&q=80',
    desc: 'State-of-the-art warehousing complex with 15,000sqm of storage and modern logistics facilities.',
    value: 'KSh 320M',
  },
  {
    title: 'Nakuru Water Treatment Plant',
    category: 'Government',
    location: 'Nakuru County',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80',
    desc: 'Capacity 40,000m³/day water treatment facility serving 300,000 residents.',
    value: 'KSh 420M',
  },
  {
    title: 'Machakos County Buildings',
    category: 'Government',
    location: 'Machakos Town',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    desc: 'County government administrative complex with offices, public halls and parking for 500 vehicles.',
    value: 'KSh 240M',
  },
]

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl overflow-hidden group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.9) 0%, transparent 60%)' }} />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="badge text-xs">{project.category}</span>
        </div>

        {/* Value badge */}
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-white">
          {project.value}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(204,26,26,0.15)', backdropFilter: 'blur(2px)' }}>
          <Link href="/projects"
            className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label={`View ${project.title} project`}>
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-xs opacity-50 mb-3 leading-relaxed">{project.desc}</p>
        <div className="flex items-center gap-4 text-xs opacity-50">
          <span className="flex items-center gap-1"><MapPin size={10} aria-hidden />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar size={10} aria-hidden />{project.year}</span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState('All')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section className="py-24 relative" aria-labelledby="projects-heading">
      {/* BG accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(13,42,110,0.08), transparent)' }} />

      <div className="section-container">
        {/* Header */}
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="badge mb-4">— Our Portfolio</div>
          <h2 id="projects-heading" className="section-title mb-4">
            <span style={{ color: 'var(--text-primary)' }}>Featured </span>
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-base opacity-60 max-w-2xl mx-auto">
            A selection of our proudest achievements — delivering quality across Kenya.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Project category filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                active === cat
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'glass hover:bg-white/10'
              }`}
              style={{ color: active === cat ? 'white' : 'var(--text-primary)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects"
            className="btn-shimmer inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-xl text-sm"
          >
            View All Projects
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
