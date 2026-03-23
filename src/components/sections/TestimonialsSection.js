'use client'
import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'James Kamau',
    role: 'CEO, Kamau Properties Ltd',
    text: 'Jaman Engineering transformed our vision into reality. The quality of work on our Westlands apartment complex was exceptional — completed 3 weeks ahead of schedule.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    project: 'Westlands Apartments',
  },
  {
    name: 'Grace Wanjiku',
    role: 'Director, Nairobi County Government',
    text: 'Their professionalism and commitment to quality is unmatched. The road project in Kiambu was delivered on budget and the community response has been overwhelmingly positive.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6f4a072?w=80&q=80',
    project: 'Kiambu Access Roads',
  },
  {
    name: 'Peter Ochieng',
    role: 'MD, Eastern Africa Logistics',
    text: 'We engaged Jaman for our 15,000sqm warehouse project. Their project management was flawless. I would recommend them to any serious developer.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    project: 'Athi River Logistics Hub',
  },
  {
    name: 'Amina Hassan',
    role: 'CFO, KenWater Corporation',
    text: 'The water treatment plant project was complex but Jaman handled every challenge with expertise. They genuinely care about the communities they serve.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    project: 'Nakuru Water Treatment',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[current]

  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(204,26,26,0.05) 0%, transparent 50%, rgba(13,42,110,0.05) 100%)'
        }} />
        <div className="absolute inset-0 grid-overlay opacity-50" />
      </div>

      <div className="section-container">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="badge mb-4">— Client Voices</div>
          <h2 id="testimonials-heading" className="section-title">
            <span style={{ color: 'var(--text-primary)' }}>What Our Clients </span>
            <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="glass-heavy rounded-3xl p-8 lg:p-12 relative overflow-hidden" key={current}>
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote size={80} className="text-brand-red" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img src={t.avatar} alt={t.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                    style={{ border: '2px solid rgba(204,26,26,0.4)' }} />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: '#cc1a1a' }}>
                    <Quote size={12} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" aria-hidden />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl leading-relaxed mb-6 opacity-80 italic">
                  "{t.text}"
                </blockquote>

                <div>
                  <div className="font-bold text-sm" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                    {t.name}
                  </div>
                  <div className="text-xs opacity-50 mt-0.5">{t.role}</div>
                  <div className="badge mt-2 text-xs">{t.project}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="glass w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronLeft size={18} />
            </button>

            {/* Avatars row */}
            <div className="flex gap-3" role="group" aria-label="Testimonial navigation">
              {testimonials.map((t2, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  aria-label={`Testimonial from ${t2.name}`}
                  aria-pressed={i === current}
                  className={`rounded-full overflow-hidden transition-all duration-300 ${i === current ? 'w-10 h-10 ring-2 ring-brand-red ring-offset-2 ring-offset-transparent' : 'w-8 h-8 opacity-40 hover:opacity-70'}`}>
                  <img src={t2.avatar} alt={t2.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="glass w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
