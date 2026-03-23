'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, Settings, Check, ArrowLeft } from 'lucide-react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false, functional: true })

  useEffect(() => {
    const consent = localStorage.getItem('jaman-cookie-consent')
    if (!consent) setTimeout(() => setShow(true), 1500)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('jaman-cookie-consent', JSON.stringify({ analytics: true, marketing: true, functional: true, timestamp: Date.now() }))
    setShow(false)
  }

  const rejectAll = () => {
    localStorage.setItem('jaman-cookie-consent', JSON.stringify({ analytics: false, marketing: false, functional: false, timestamp: Date.now() }))
    setShow(false)
  }

  const savePrefs = () => {
    localStorage.setItem('jaman-cookie-consent', JSON.stringify({ ...prefs, timestamp: Date.now() }))
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
      className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:w-[420px] z-50 cookie-banner"
    >
      <div className="glass-heavy rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(204,26,26,0.2)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(204,26,26,0.08)' }}>
          <Cookie size={18} className="text-brand-red flex-shrink-0" />
          <span className="font-bold text-sm" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            We Value Your Privacy
          </span>
          <button onClick={() => setShow(false)} aria-label="Dismiss cookie banner"
            className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {!showSettings ? (
            <>
              <p className="text-xs leading-relaxed opacity-60 mb-4">
                We use cookies to improve your experience, analyze traffic, and personalize content.
                By clicking "Accept All", you consent to our use of cookies.{' '}
                <Link href="/privacy" className="text-brand-red hover:underline">Privacy Policy</Link>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={acceptAll}
                  className="flex-1 btn-shimmer text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5">
                  <Check size={13} /> Accept All
                </button>
                <button onClick={() => setShowSettings(true)}
                  className="flex-1 glass hover:bg-white/10 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all">
                  <Settings size={13} /> Customize
                </button>
                <button onClick={rejectAll}
                  className="flex-1 glass hover:bg-white/10 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all opacity-60">
                  Reject All
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {[
                  { key: 'functional', label: 'Functional Cookies', desc: 'Required for the site to work properly', required: true },
                  { key: 'analytics', label: 'Analytics Cookies', desc: 'Help us understand site usage' },
                  { key: 'marketing', label: 'Marketing Cookies', desc: 'Used for targeted advertising' },
                ].map(({ key, label, desc, required }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={required ? true : prefs[key]}
                        disabled={required}
                        onChange={e => setPrefs(p => ({ ...p, [key]: e.target.checked }))}
                        className="sr-only"
                        aria-label={label}
                      />
                      <div className={`w-9 h-5 rounded-full transition-colors duration-200 ${(required || prefs[key]) ? 'bg-brand-red' : 'bg-white/20'}`}>
                        <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${(required || prefs[key]) ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{label} {required && <span className="text-brand-red">(Required)</span>}</div>
                      <div className="text-xs opacity-50 mt-0.5">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={savePrefs}
                  className="flex-1 btn-shimmer text-white text-xs font-bold py-2.5 px-4 rounded-xl">
                  Save Preferences
                </button>
                <button onClick={() => setShowSettings(false)}
                  className="glass hover:bg-white/10 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all">
                  <ArrowLeft size={12} /> Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


