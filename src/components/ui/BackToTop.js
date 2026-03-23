'use client'
import { useState, useEffect } from 'react'
import { ChevronUp, Accessibility, ZoomIn, ZoomOut, Eye, Type } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 shadow-lg"
      style={{ border: '1px solid rgba(204,26,26,0.3)' }}
    >
      <ChevronUp size={18} className="text-brand-red" />
    </button>
  )
}
