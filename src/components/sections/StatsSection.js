'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', description: 'Delivering excellence since 2009' },
  { value: 200, suffix: '+', label: 'Projects Completed', description: 'Across Kenya & East Africa' },
  { value: 50, suffix: '+', label: 'Expert Engineers', description: 'Certified professionals' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Based on client reviews' },
]

function StatCard({ stat, index, inView }) {
  return (
    <div
      className="glass-card rounded-2xl p-8 text-center group cursor-default"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Top accent */}
      <div className="w-12 h-0.5 mx-auto mb-6 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #cc1a1a, transparent)' }} />

      {/* Number */}
      <div className="text-5xl lg:text-6xl font-black mb-2 text-gradient"
        style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        aria-label={`${stat.value}${stat.suffix}`}
      >
        {inView ? (
          <CountUp end={stat.value} duration={2.5} delay={index * 0.2} suffix={stat.suffix} />
        ) : '0'}
      </div>

      <div className="text-sm font-bold tracking-widest uppercase mb-2"
        style={{ color: 'var(--text-primary)', opacity: 0.9 }}>
        {stat.label}
      </div>
      <div className="text-xs opacity-50">{stat.description}</div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(204,26,26,0.07), transparent 70%)' }} />
    </div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="stats" className="py-20 relative overflow-hidden" aria-label="Company statistics">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(13,42,110,0.08), transparent)' }} />

      <div className="section-container" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
