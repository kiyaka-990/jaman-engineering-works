'use client'
import { useState, useEffect } from 'react'
import { Accessibility, ZoomIn, ZoomOut, Eye, Minus, Plus, RotateCcw } from 'lucide-react'

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [dyslexiaFont, setDyslexiaFont] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
    if (reduceMotion) {
      const style = document.getElementById('reduce-motion-style') || document.createElement('style')
      style.id = 'reduce-motion-style'
      style.textContent = '*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }'
      document.head.appendChild(style)
    } else {
      document.getElementById('reduce-motion-style')?.remove()
    }
  }, [reduceMotion])

  useEffect(() => {
    if (dyslexiaFont) {
      document.body.style.fontFamily = "Arial, sans-serif"
    } else {
      document.body.style.fontFamily = ''
    }
  }, [dyslexiaFont])

  const reset = () => {
    setFontSize(100)
    setHighContrast(false)
    setReduceMotion(false)
    setDyslexiaFont(false)
  }

  return (
    <div className="fixed left-4 bottom-6 z-40">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110"
        style={{ border: '1px solid rgba(91,155,213,0.3)' }}
      >
        <Accessibility size={18} className="text-sky-400" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="absolute bottom-14 left-0 glass-heavy rounded-2xl p-4 w-56 shadow-2xl animate-slide-up"
          style={{ border: '1px solid rgba(91,155,213,0.2)' }}
        >
          <div className="text-xs font-bold tracking-widest uppercase mb-4 opacity-60">Accessibility</div>

          {/* Font size */}
          <div className="mb-4">
            <div className="text-xs font-semibold mb-2 opacity-70">Text Size</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFontSize(s => Math.max(80, s - 10))} aria-label="Decrease font size"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <Minus size={12} />
              </button>
              <span className="flex-1 text-center text-xs font-mono">{fontSize}%</span>
              <button onClick={() => setFontSize(s => Math.min(150, s + 10))} aria-label="Increase font size"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Toggles */}
          {[
            { label: 'High Contrast', value: highContrast, set: setHighContrast },
            { label: 'Reduce Motion', value: reduceMotion, set: setReduceMotion },
            { label: 'Dyslexia Font', value: dyslexiaFont, set: setDyslexiaFont },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex items-center justify-between py-2 cursor-pointer border-t border-white/5">
              <span className="text-xs opacity-70">{label}</span>
              <button
                role="switch"
                aria-checked={value}
                aria-label={label}
                onClick={() => set(!value)}
                className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${value ? 'bg-sky-500' : 'bg-white/20'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </label>
          ))}

          {/* Reset */}
          <button onClick={reset}
            className="w-full mt-3 glass hover:bg-white/10 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all">
            <RotateCcw size={11} /> Reset All
          </button>
        </div>
      )}
    </div>
  )
}
