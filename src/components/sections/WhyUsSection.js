'use client'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Shield, Clock, Award, Users, Zap, Leaf, ArrowRight, ChevronRight } from 'lucide-react'

const reasons = [
  { icon: Award, title: 'NCA & EBK Certified', desc: 'Fully accredited by Kenya\'s top construction and engineering regulatory bodies.', color: '#cc1a1a' },
  { icon: Clock, title: 'On-Time Delivery', desc: '97% of our projects are delivered on or before the agreed deadline.', color: '#d4a017' },
  { icon: Shield, title: 'Safety First', desc: 'Rigorous OSHA-compliant safety protocols on every site, protecting all stakeholders.', color: '#0d2a6e' },
  { icon: Users, title: '50+ Expert Team', desc: 'Certified engineers, architects, and project managers with decades of combined experience.', color: '#5b9bd5' },
  { icon: Zap, title: 'Modern Equipment', desc: 'State-of-the-art construction machinery ensuring precision and efficiency.', color: '#8b5cf6' },
  { icon: Leaf, title: 'Eco-Conscious', desc: 'Sustainable building practices minimizing environmental impact on every project.', color: '#10b981' },
]

export function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="py-24 relative" aria-labelledby="why-heading">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(204,26,26,0.05), transparent 60%)' }} />
      <div className="section-container">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="badge mb-4">— Why Choose Us</div>
            <h2 id="why-heading" className="section-title mb-6">
              <span style={{ color: 'var(--text-primary)' }}>The Jaman </span>
              <span className="text-gradient">Advantage</span>
            </h2>
            <p className="text-base opacity-60 leading-relaxed mb-8">
              We don't just build structures — we build trust, value, and lasting relationships with every client across Kenya.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:gap-3 transition-all">
              Learn About Our Approach <ArrowRight size={16} />
            </Link>

            {/* Feature image */}
            <div className="mt-10 relative rounded-2xl overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="Jaman Engineering team at work" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,15,0.7), transparent)' }} />
              <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-xl text-xs font-bold text-white">
                200+ Projects Delivered Across Kenya
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <div key={i}
                  className={`glass-card rounded-xl p-5 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${r.color}18`, border: `1px solid ${r.color}30` }}>
                    <Icon size={18} style={{ color: r.color }} aria-hidden />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{r.title}</h3>
                  <p className="text-xs opacity-55 leading-relaxed">{r.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <section className="py-24 relative overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
          alt="" aria-hidden className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(204,26,26,0.85), rgba(13,42,110,0.85))' }} />
        <div className="absolute inset-0 grid-overlay" />
      </div>
      <div className="section-container relative z-10">
        <div ref={ref} className={`text-center max-w-3xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="badge mb-6" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Start Your Project Today
          </div>
          <h2 className="section-title text-white mb-6">
            Let's Build Something<br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Extraordinary Together</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            From concept to completion, Jaman Engineering delivers. Get your free consultation and competitive quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="bg-white text-brand-red font-bold px-10 py-4 rounded-xl text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Get Free Quote <ArrowRight size={16} />
            </Link>
            <Link href="/projects"
              className="glass text-white font-semibold px-10 py-4 rounded-xl text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View Our Work <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const blogPosts = [
  {
    title: 'Top 5 Construction Trends in Kenya for 2024',
    excerpt: 'From green building to smart construction technology, discover what\'s shaping Kenya\'s built environment this year.',
    category: 'Industry', date: 'Dec 12, 2024',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=75',
    readTime: '5 min read',
  },
  {
    title: 'How to Choose the Right Construction Contractor',
    excerpt: 'Key factors to consider when selecting a construction company for your residential or commercial project in Kenya.',
    category: 'Guide', date: 'Nov 28, 2024',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75',
    readTime: '7 min read',
  },
  {
    title: 'Our Nakuru Water Treatment Plant: A Case Study',
    excerpt: 'An inside look at how we delivered a 40,000m³/day water treatment facility for 300,000 residents on time and budget.',
    category: 'Case Study', date: 'Nov 10, 2024',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=75',
    readTime: '8 min read',
  },
]

export function BlogPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="py-24" aria-labelledby="blog-heading">
      <div className="section-container">
        <div ref={ref} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <div className="badge mb-3">— Latest Insights</div>
            <h2 id="blog-heading" className="section-title">
              <span style={{ color: 'var(--text-primary)' }}>News & </span>
              <span className="text-gradient">Articles</span>
            </h2>
          </div>
          <Link href="/blog" className="text-brand-red text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all whitespace-nowrap">
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article key={i}
              className={`glass-card rounded-2xl overflow-hidden group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={post.image} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute top-3 left-3"><span className="badge text-xs">{post.category}</span></div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs opacity-40 mb-3">
                  <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-brand-red transition-colors"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <p className="text-xs opacity-50 leading-relaxed">{post.excerpt}</p>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-brand-red font-semibold mt-4 hover:gap-2.5 transition-all">
                  Read More <ArrowRight size={11} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const partners = [
  'Kenya National Highways Authority', 'Nairobi City County', 'Kenya Power',
  'Kenya Pipeline Company', 'National Housing Corporation', 'World Bank Group',
]

export function PartnersSection() {
  return (
    <section className="py-16 relative overflow-hidden" aria-label="Partners and clients">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(204,26,26,0.04), transparent)' }} />
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase opacity-40">Trusted By</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          {partners.map((p, i) => (
            <div key={i} className="glass px-5 py-3 rounded-xl text-xs font-semibold opacity-50 hover:opacity-100 transition-opacity">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
