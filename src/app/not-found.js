import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,26,26,0.07), transparent)' }} />
      <div className="section-container text-center relative z-10">
        <div className="text-9xl font-black text-gradient mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
          404
        </div>
        <h1 className="text-3xl font-black mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Page Not Found</h1>
        <p className="opacity-60 mb-10 max-w-md mx-auto">This page doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-shimmer text-white font-bold px-8 py-4 rounded-xl text-sm">Back to Home</Link>
          <Link href="/contact" className="glass px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
