'use client'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Award, Target, Eye, Heart, HardHat, ArrowRight } from 'lucide-react'

const team = [
  { name: 'Eng. James Mwangi', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', bio: 'MSc Civil Engineering, University of Nairobi. 20+ years in construction.' },
  { name: 'Eng. Grace Akinyi', role: 'Chief Engineer', image: 'https://images.unsplash.com/photo-1494790108755-2616b6f4a072?w=300&q=80', bio: 'BSc Structural Engineering, Kenyatta University. EBK Registered Engineer.' },
  { name: 'Peter Otieno', role: 'Head of Projects', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bio: 'PMP Certified. 15+ years managing large-scale infrastructure projects.' },
  { name: 'Amina Hassan', role: 'Finance Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', bio: 'CPA Kenya. Ensuring financial excellence and transparency across all projects.' },
]

const timeline = [
  { year: '2009', event: 'Jaman Engineering founded in Nairobi with a team of 5 engineers' },
  { year: '2011', event: 'Achieved NCA registration and first major road infrastructure contract' },
  { year: '2014', event: 'Expanded team to 25 professionals; opened Mombasa regional office' },
  { year: '2017', event: 'EBK accreditation achieved; launched water & sanitation division' },
  { year: '2019', event: 'Completed 100th project milestone — Upper Hill Office Complex' },
  { year: '2021', event: 'ISO-compliant quality management system implemented company-wide' },
  { year: '2023', event: 'Team grows to 50+ experts; 200+ projects completed across Kenya' },
  { year: '2024', event: 'Launching sustainable green building division & East Africa expansion' },
]

const values = [
  { icon: Award, title: 'Excellence', desc: 'We set the highest standards in every project, refusing to compromise on quality.', color: '#cc1a1a' },
  { icon: Heart, title: 'Integrity', desc: 'Transparent pricing, honest communication, and ethical business practice always.', color: '#d4a017' },
  { icon: Target, title: 'Precision', desc: 'Engineered to exact specification — because details determine the difference.', color: '#5b9bd5' },
  { icon: Eye, title: 'Vision', desc: 'Building for tomorrow, not just today — sustainable solutions for lasting impact.', color: '#10b981' },
]

function SectionHeader({ label, title, accent, subtitle }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="badge mb-4">— {label}</div>
      <h2 className="section-title mb-4">
        <span style={{ color: 'var(--text-primary)' }}>{title} </span>
        <span className="text-gradient">{accent}</span>
      </h2>
      {subtitle && <p className="text-base opacity-60 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="" aria-hidden className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,15,0.9), rgba(13,42,110,0.7))' }} />
          <div className="absolute inset-0 grid-overlay" />
        </div>
        <div className="section-container relative z-10 py-24">
          <div className="badge mb-6 animate-slide-down">— Who We Are</div>
          <h1 className="hero-title text-white mb-6 animate-slide-up" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Built on Trust,<br /><span className="text-gradient">Engineered</span><br />for Excellence
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Jaman Engineering Works Limited has been delivering world-class construction and engineering solutions across Kenya since 2009. We combine technical expertise with a genuine passion for building Kenya's future.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10">
            {[
              { icon: Target, title: 'Our Mission', color: '#cc1a1a', text: 'To deliver world-class construction solutions that uplift communities, drive economic development, and stand as enduring testaments to engineering excellence across Kenya and East Africa.' },
              { icon: Eye, title: 'Our Vision', color: '#5b9bd5', text: 'To be the most trusted and respected construction and engineering company in East Africa — known for uncompromising quality, exceptional integrity, and transformative impact on the communities we serve.' },
            ].map(({ icon: Icon, title, color, text }) => (
              <div key={title} className="glass-card rounded-2xl p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}>{title}</h2>
                <p className="opacity-60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="section-container">
          <SectionHeader label="What We Stand For" title="Our Core" accent="Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}>
                    <Icon size={24} style={{ color: v.color }} />
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{v.title}</h3>
                  <p className="text-sm opacity-55 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="section-container">
          <SectionHeader label="Our Journey" title="15 Years of" accent="Excellence" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #cc1a1a, #0d2a6e)' }} />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 pl-16 relative">
                  <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 border-brand-red flex items-center justify-center"
                    style={{ background: 'var(--bg-primary)' }}>
                    <div className="w-2 h-2 rounded-full bg-brand-red" />
                  </div>
                  <div className="glass-card rounded-xl p-5 flex-1">
                    <div className="text-brand-red font-black text-lg mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{item.year}</div>
                    <p className="text-sm opacity-70">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="section-container">
          <SectionHeader label="Leadership" title="Meet Our" accent="Team" subtitle="The experienced professionals driving Jaman Engineering's vision." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img src={member.image} alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.8), transparent 50%)' }} />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-base" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{member.name}</h3>
                  <div className="text-xs text-brand-red font-semibold tracking-wide mt-0.5 mb-2">{member.role}</div>
                  <p className="text-xs opacity-50">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="section-title mb-6"><span className="text-gradient">Work With Us</span></h2>
          <p className="opacity-60 mb-8 max-w-xl mx-auto">Ready to bring your construction vision to life? Let's talk.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-shimmer text-white font-bold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2">
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="glass px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
