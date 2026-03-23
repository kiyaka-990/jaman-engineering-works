'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const services = [
  'Mechanical Works (HVAC, Pipework, Fire Systems)',
  'Electrical Works',
  'Civil Construction',
  'Roads & Infrastructure',
  'Water & Sanitation',
  'Maintenance Contract (AMC/PPM)',
  'Project Management',
  'Other',
]

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+254 733 315 621',
    href: 'tel:+254733315621',
    desc: 'Call or WhatsApp anytime',
    color: '#cc1a1a',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@jamanengineering.co.ke',
    href: 'mailto:info@jamanengineering.co.ke',
    desc: 'We reply within 24 hours',
    color: '#0d2a6e',
  },
  {
    icon: MapPin,
    label: 'Office Location',
    value: 'Re-Plaza, Upper Hill, Nairobi',
    href: 'https://maps.google.com/?q=Re-Plaza+Upper+Hill+Nairobi+Kenya',
    desc: 'Click to open in Google Maps',
    color: '#5b9bd5',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Sat: 8:00 AM – 6:00 PM',
    href: null,
    desc: '24/7 emergency: +254 733 315 622',
    color: '#d4a017',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '', privacy: false,
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email address required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim() || form.message.length < 20) e.message = 'Please describe your project (min 20 characters)'
    if (!form.privacy) e.privacy = 'Please accept the privacy policy'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors below')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setSent(true)
    setLoading(false)
    toast.success('Message sent! We\'ll contact you within 24 hours. 🎉')
  }

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: null }))
  }

  const inputStyle = (field) => ({
    width: '100%',
    background: 'var(--card-bg)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${errors[field] ? '#cc1a1a' : 'var(--card-border)'}`,
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="" aria-hidden className="w-full h-full object-cover"
            style={{ opacity: 0.25 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(4,4,16,0.96),rgba(13,42,110,0.75))' }} />
          <div className="absolute inset-0 grid-overlay" />
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="badge mb-6">— Let's Build Together</div>
          <h1 className="hero-title text-white mb-6">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Free consultations · Competitive quotes · 24-hour response.<br />
            Based at Re-Plaza, Upper Hill, Nairobi.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — contact cards */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="section-title mb-6">
                <span style={{ color: 'var(--text-primary)' }}>Reach Us </span>
                <span className="text-gradient">Anytime</span>
              </h2>

              {contactDetails.map(({ icon: Icon, label, value, href, desc, color }) => (
                <div key={label} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color, opacity: 0.8 }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="text-sm font-bold transition-colors hover:underline" style={{ color: 'var(--text-primary)' }}>
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
                    )}
                    <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>{desc}</div>
                  </div>
                </div>
              ))}

              {/* Emergency */}
              <div className="glass-red rounded-2xl p-5">
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#cc1a1a' }}>
                  🚨 Emergency / After Hours
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                  For urgent mechanical breakdowns outside business hours:
                </p>
                <a href="tel:+254733315622" className="text-sm font-black hover:underline" style={{ color: '#cc1a1a' }}>
                  +254 733 315 622
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <div className="glass-heavy rounded-3xl p-8 lg:p-10">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '2px solid rgba(16,185,129,0.4)' }}>
                      <CheckCircle2 size={40} style={{ color: '#10b981' }} />
                    </div>
                    <h3 className="section-title mb-3" style={{ color: 'var(--text-primary)' }}>
                      Message Sent! 🎉
                    </h3>
                    <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Thank you, <strong style={{ color: 'var(--text-primary)' }}>{form.name}</strong>. Our team will reach you within 24 hours.
                    </p>
                    <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                      📞 You can also call us directly: <a href="tel:+254733315621" className="font-bold" style={{ color: '#cc1a1a' }}>+254 733 315 621</a>
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',company:'',service:'',budget:'',message:'',privacy:false }) }}
                      className="glass px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                      style={{ color: 'var(--text-primary)', border: '1px solid var(--card-border)' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Barlow Condensed,sans-serif', color: 'var(--text-primary)' }}>
                      Send Us a Message
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Full Name <span style={{ color: '#cc1a1a' }}>*</span>
                        </label>
                        <input id="name" type="text" required placeholder="John Kamau"
                          value={form.name} onChange={e => set('name', e.target.value)}
                          style={inputStyle('name')}
                          onFocus={e => { e.target.style.borderColor = '#0d2a6e'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.12)' }}
                          onBlur={e => { e.target.style.borderColor = errors.name ? '#cc1a1a' : 'var(--card-border)'; e.target.style.boxShadow = 'none' }}
                        />
                        {errors.name && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#cc1a1a' }}><AlertCircle size={11} />{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Email <span style={{ color: '#cc1a1a' }}>*</span>
                        </label>
                        <input id="email" type="email" required placeholder="john@company.co.ke"
                          value={form.email} onChange={e => set('email', e.target.value)}
                          style={inputStyle('email')}
                          onFocus={e => { e.target.style.borderColor = '#0d2a6e'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.12)' }}
                          onBlur={e => { e.target.style.borderColor = errors.email ? '#cc1a1a' : 'var(--card-border)'; e.target.style.boxShadow = 'none' }}
                        />
                        {errors.email && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#cc1a1a' }}><AlertCircle size={11} />{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Phone / WhatsApp
                        </label>
                        <input id="phone" type="tel" placeholder="+254 733 315 621"
                          value={form.phone} onChange={e => set('phone', e.target.value)}
                          style={inputStyle('phone')}
                          onFocus={e => { e.target.style.borderColor = '#0d2a6e'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.12)' }}
                          onBlur={e => { e.target.style.borderColor = 'var(--card-border)'; e.target.style.boxShadow = 'none' }}
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Company / Organisation
                        </label>
                        <input id="company" type="text" placeholder="Your company (optional)"
                          value={form.company} onChange={e => set('company', e.target.value)}
                          style={inputStyle('company')}
                          onFocus={e => { e.target.style.borderColor = '#0d2a6e'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.12)' }}
                          onBlur={e => { e.target.style.borderColor = 'var(--card-border)'; e.target.style.boxShadow = 'none' }}
                        />
                      </div>

                      {/* Service */}
                      <div>
                        <label htmlFor="service" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Service Required <span style={{ color: '#cc1a1a' }}>*</span>
                        </label>
                        <select id="service" required value={form.service} onChange={e => set('service', e.target.value)}
                          style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                          <option value="">Select a service…</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#cc1a1a' }}><AlertCircle size={11} />{errors.service}</p>}
                      </div>

                      {/* Budget */}
                      <div>
                        <label htmlFor="budget" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                          Estimated Budget
                        </label>
                        <select id="budget" value={form.budget} onChange={e => set('budget', e.target.value)}
                          style={{ ...inputStyle('budget'), cursor: 'pointer' }}>
                          <option value="">Select range…</option>
                          {['Under KSh 5M','KSh 5M – 20M','KSh 20M – 100M','KSh 100M – 500M','Over KSh 500M'].map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-5">
                      <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Project Description <span style={{ color: '#cc1a1a' }}>*</span>
                      </label>
                      <textarea id="message" required rows={5} placeholder="Describe your project — location, scope, timeline and any specific requirements…"
                        value={form.message} onChange={e => set('message', e.target.value)}
                        style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                        onFocus={e => { e.target.style.borderColor = '#0d2a6e'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.12)' }}
                        onBlur={e => { e.target.style.borderColor = errors.message ? '#cc1a1a' : 'var(--card-border)'; e.target.style.boxShadow = 'none' }}
                      />
                      {errors.message && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#cc1a1a' }}><AlertCircle size={11} />{errors.message}</p>}
                    </div>

                    {/* Privacy */}
                    <label className="flex items-start gap-3 cursor-pointer mb-6">
                      <input type="checkbox" checked={form.privacy} onChange={e => set('privacy', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded" style={{ accentColor: '#0d2a6e' }} />
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        I agree to the{' '}
                        <a href="/privacy" className="font-semibold underline" style={{ color: '#0d2a6e' }}>Privacy Policy</a>
                        {' '}and consent to being contacted about my enquiry.
                      </span>
                    </label>
                    {errors.privacy && <p className="text-xs -mt-4 mb-4 flex items-center gap-1" style={{ color: '#cc1a1a' }}><AlertCircle size={11} />{errors.privacy}</p>}

                    <button type="submit" disabled={loading}
                      className="w-full btn-shimmer text-white font-black py-4 rounded-2xl text-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:scale-[1.01]">
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Sending your message…</> : <><Send size={16} /> Send Message — We'll Reply in 24hrs</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed — Re-Plaza Upper Hill Nairobi */}
      <section id="map" aria-label="Our location on Google Maps">
        <div style={{ height: '420px', position: 'relative' }}>
          {/* Map header overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="glass-heavy px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl">
              <MapPin size={16} style={{ color: '#cc1a1a' }} />
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Re-Plaza, Upper Hill, Nairobi, Kenya
              </span>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8115738959766!2d36.81457307496601!3d-1.2963694987117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a3c7b2a155%3A0x1e0d4e8e8e8e8e8e!2sUpper%20Hill%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1703000000000!5m2!1sen!2ske"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jaman Engineering Location — Re-Plaza, Upper Hill, Nairobi"
          />
        </div>
      </section>
    </div>
  )
}
