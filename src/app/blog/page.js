'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'

const posts = [
  { title: 'Top 5 Construction Trends in Kenya for 2024', excerpt: 'From green building to smart construction technology, discover what\'s shaping Kenya\'s built environment this year.', category: 'Industry', date: 'Dec 12, 2024', readTime: '5 min', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80', featured: true },
  { title: 'How to Choose the Right Construction Contractor', excerpt: 'Key factors to evaluate when selecting a construction company for your project in Kenya — avoiding costly mistakes.', category: 'Guide', date: 'Nov 28, 2024', readTime: '7 min', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { title: 'Our Nakuru Water Treatment Plant: A Case Study', excerpt: 'An inside look at how we delivered a 40,000m³/day water treatment facility on time and budget for 300,000 residents.', category: 'Case Study', date: 'Nov 10, 2024', readTime: '8 min', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80', featured: true },
  { title: 'Understanding NCA Contractor Categories in Kenya', excerpt: 'A comprehensive guide to the National Construction Authority registration categories and what they mean for your project.', category: 'Regulation', date: 'Oct 22, 2024', readTime: '6 min', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { title: 'The Rise of Green Building in East Africa', excerpt: 'How sustainable construction is gaining momentum in Kenya, with LEED certification and eco-friendly materials becoming the norm.', category: 'Sustainability', date: 'Oct 5, 2024', readTime: '5 min', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  { title: 'Road Construction Best Practices for Kenya\'s Climate', excerpt: 'Engineering solutions for building roads that withstand Kenya\'s unique climate challenges — from heavy rains to expansive soils.', category: 'Technical', date: 'Sep 18, 2024', readTime: '9 min', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
]

const categories = ['All', 'Industry', 'Guide', 'Case Study', 'Technical', 'Sustainability', 'Regulation']

function PostCard({ post, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <article ref={ref}
      className={`glass-card rounded-2xl overflow-hidden group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="relative h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute top-3 left-3"><span className="badge text-xs">{post.category}</span></div>
        {post.featured && (
          <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full text-xs font-bold text-white">⭐ Featured</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs opacity-40 mb-3">
          <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} read</span>
        </div>
        <h2 className="font-black text-base leading-snug mb-2 group-hover:text-brand-red transition-colors"
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{post.title}</h2>
        <p className="text-xs opacity-55 leading-relaxed mb-4">{post.excerpt}</p>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-brand-red font-semibold hover:gap-3 transition-all">
          Read Article <ArrowRight size={11} />
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = active === 'All' || p.category === active
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" alt="" aria-hidden className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,15,0.95), rgba(13,42,110,0.7))' }} />
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="badge mb-6">— Insights & News</div>
          <h1 className="hero-title text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Expert insights on construction, engineering, and the built environment in Kenya and East Africa.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search blog posts"
                className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-brand-red/50 transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', background: 'var(--card-bg)' }} />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)} aria-pressed={active === cat}
                  className={`px-3 py-2 rounded-full text-xs font-semibold transition-all ${active === cat ? 'bg-brand-red text-white' : 'glass hover:bg-white/10'}`}
                  style={{ color: active === cat ? 'white' : 'var(--text-primary)' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 opacity-50">
              <Tag size={40} className="mx-auto mb-4" />
              <p>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => <PostCard key={p.title} post={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
