'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageCircle, X, Send, ArrowLeft, RotateCcw,
  Phone, Mail, ChevronRight, Loader2,
  Cog, Building2, Droplets, Hammer, Zap
} from 'lucide-react'

/* ─── ALWAYS-DARK COLOUR PALETTE (chatbot never uses light mode) ─────────── */
const C = {
  panelBg:      'rgba(5,5,18,0.97)',
  panelBorder:  'rgba(13,42,110,0.45)',
  headerBg:     'linear-gradient(135deg,rgba(13,42,110,0.4),rgba(204,26,26,0.22))',
  headerBorder: 'rgba(255,255,255,0.07)',
  avatarBg:     'linear-gradient(135deg,#0d2a6e,#cc1a1a)',
  // Texts — all explicit white values
  textPrimary:  '#f0f4ff',
  textMuted:    'rgba(220,228,255,0.55)',
  textFaint:    'rgba(220,228,255,0.28)',
  // Message bubbles
  botBubbleBg:  'rgba(13,42,110,0.22)',
  botBubbleBd:  'rgba(13,42,110,0.32)',
  userBubbleBg: 'linear-gradient(135deg,#0d2a6e,#1a4a9e)',
  // Menu items
  menuItemBg:      'rgba(255,255,255,0.05)',
  menuItemBd:      'rgba(255,255,255,0.08)',
  menuItemPrimBg:  'rgba(13,42,110,0.25)',
  menuItemPrimBd:  'rgba(13,42,110,0.5)',
  menuItemHoverBg: 'rgba(13,42,110,0.38)',
  menuItemHoverBd: 'rgba(13,42,110,0.6)',
  askBg:           'rgba(204,26,26,0.12)',
  askBd:           'rgba(204,26,26,0.28)',
  askHoverBg:      'rgba(204,26,26,0.22)',
  // Contact strip
  stripBg:      'rgba(255,255,255,0.05)',
  stripBd:      'rgba(255,255,255,0.08)',
  // Input
  inputBg:      'rgba(255,255,255,0.07)',
  inputBd:      'rgba(255,255,255,0.1)',
  inputFocusBd: 'rgba(13,42,110,0.7)',
  // Typing dots
  dotColor:     '#5b9bd5',
  // Chip
  chipBg:       'rgba(13,42,110,0.18)',
  chipBd:       'rgba(13,42,110,0.28)',
  chipText:     'rgba(220,228,255,0.65)',
  // Welcome bubble
  welcomeBg:    'rgba(13,42,110,0.22)',
  welcomeBd:    'rgba(13,42,110,0.32)',
  // Popup
  popupBg:      'linear-gradient(145deg,rgba(8,10,28,0.98),rgba(13,42,110,0.92))',
  popupBd:      'rgba(13,42,110,0.6)',
  // FAB
  fabBg:        'linear-gradient(135deg,#0d2a6e,#1a4a9e,#cc1a1a)',
  fabShadow:    '0 6px 24px rgba(13,42,110,0.5), 0 2px 10px rgba(204,26,26,0.3)',
}

/* ─── KNOWLEDGE BASE ─────────────────────────────────────────────────────── */
const KB = {
  phone:     '+254 733 315 621',
  email:     'info@jamanengineering.co.ke',
  location:  'Re-Plaza, Upper Hill, Nairobi',
  emergency: '+254 733 315 622',
  hours:     'Mon–Sat, 8AM–6PM',

  mechanical:  ['HVAC — design, supply, install & AMC', 'Industrial pipework & pressure vessels', 'Mechanical equipment: pumps, compressors, boilers', 'Industrial steel fabrication & welding', 'Fire protection: sprinklers, gas suppression, hydrants', 'Lifts, escalators & moving walkways', 'Compressed air systems', 'Planned Preventive Maintenance (PPM / AMC)'],
  electrical:  ['LV/MV electrical installations', 'Solar PV & renewable energy', 'Building Management Systems (BMS)', 'Generator supply, install & commissioning', 'Street & outdoor lighting', 'UPS & backup power'],
  civil:       ['Residential, commercial & industrial buildings', 'Roads, bridges & drainage', 'Structural engineering & design', 'Foundation & earthworks', 'Renovation & fit-out'],
  water:       ['Water supply & distribution networks', 'Sewerage & drainage systems', 'Water treatment plant M&E', 'Borehole pump installations'],
  maintenance: ['Annual Maintenance Contracts (AMC)', 'Planned Preventive Maintenance (PPM)', '24/7 emergency breakdown response', 'HVAC servicing & re-gassing', 'Generator load testing & servicing', 'Fire system inspections & compliance'],
  projects:    ['Upper Hill Office Complex — Full M&E | KSh 650M (2023)', 'Westlands Luxury Apartments — HVAC & Civil | KSh 280M (2023)', 'Athi River Logistics Hub — Industrial Mechanical | KSh 320M (2022)', 'Nakuru Water Treatment Plant — M&E & Civil | KSh 420M (2021)', 'Thika Access Roads — Civil Infrastructure | KSh 180M (2022)', 'Machakos County Buildings — Civil & M&E | KSh 240M (2021)'],
}

/* ─── RULE-BASED REPLY ───────────────────────────────────────────────────── */
function getReply(raw) {
  const m = raw.toLowerCase()
  const h = (...t) => t.some(w => m.includes(w))

  if (h('hello','hi ','hey','good morning','good afternoon','hujambo','habari'))
    return `👋 Hello! Welcome to **Jaman Engineering Works Limited**.\n\nI'm **JAMA** — your virtual assistant. Our primary specialty is **Mechanical Works** (HVAC, pipework, fire systems, fabrication) plus electrical, civil and maintenance services.\n\nHow can I help you today?`
  if (h('thank','thanks','asante','appreciate'))
    return `🙏 You're very welcome! Anything else I can help with?\n\n📞 **${KB.phone}**`
  if (h('bye','goodbye','kwaheri'))
    return `👋 Goodbye! Thank you for contacting Jaman Engineering. 🇰🇪\n📞 **${KB.phone}**`
  if (h('quote','price','cost','how much','estimate','rate','fee','budget'))
    return `💰 **Getting a Quote — FREE & Fast:**\n\n1️⃣ Call/WhatsApp: **${KB.phone}**\n2️⃣ Email: **${KB.email}**\n3️⃣ Use the Contact form on our website\n\nFree site visits · Tailored quotes · 24hr response!`
  if (h('hvac','air condition','aircon',' ac ',' a/c','ventilation','cooling','chiller','ahu','fcu','vrf','split unit'))
    return `❄️ **HVAC — Our Core Specialty!**\n\n• Split units, VRF/VRV, AHU, FCU systems\n• Chiller & cooling tower plants\n• Data centre & clean room cooling\n• Ducting fabrication & installation\n• Commissioning & testing\n• Annual maintenance contracts (AMC)\n\n📞 Free site survey: **${KB.phone}**`
  if (h('plumb','pipe','pipework','water supply','drainage','sewage','booster'))
    return `💧 **Plumbing & Pipework:**\n\n• Cold & hot water distribution\n• High-pressure industrial pipework\n• Booster pump sets & pressure vessels\n• Sewerage & drainage networks\n• Pressure testing & commissioning`
  if (h('fire','sprinkler','suppression','hose reel','hydrant','riser','fm200'))
    return `🔥 **Fire Protection:**\n\n• Wet & dry riser systems\n• Automatic sprinklers\n• Gas suppression (FM200, CO₂, Novec)\n• Fire hydrants & hose reels\n• KFRS-compliant installations\n• Annual service contracts`
  if (h('pump','submersible','centrifugal','borehole','fire pump'))
    return `⚙️ **Pump Services:**\n\n• Submersible & centrifugal pumps\n• Booster & fire pump sets\n• Borehole pumps\n\nBrands: Grundfos, KSB, Wilo, DAB\n\nMaintenance contracts available!`
  if (h('generator','genset','standby power','backup','amf','load bank','kva'))
    return `🔋 **Generator Services:**\n\n• Standby & prime — 10kVA to 2,000kVA\n• AMF/ATS changeover panels\n• Load bank testing\n• Annual maintenance\n\nBrands: Perkins, Cummins, CAT, FG Wilson`
  if (h('solar','pv ','renewable','photovoltaic','off-grid','battery','inverter'))
    return `☀️ **Solar PV & Renewable Energy:**\n\n• Grid-tied & off-grid solar PV\n• Battery storage systems\n• Hybrid solar + generator systems\n• Commercial & industrial rooftop`
  if (h('electric','wiring','panel','switchgear','lv ','mv ','transformer','bms ','ups '))
    return `⚡ **Electrical Works:**\n\n${KB.electrical.map(i=>`• ${i}`).join('\n')}`
  if (h('maintenance','amc','ppm','preventive','breakdown','fault','servic'))
    return `🔧 **Maintenance Contracts:**\n\n${KB.maintenance.map(i=>`• ${i}`).join('\n')}\n\n📞 **${KB.phone}**`
  if (h('fabricat','weld','steel','metalwork','tank','vessel'))
    return `🏭 **Industrial Fabrication:**\n\n• Structural steel fabrication\n• Pressure vessel fabrication\n• Custom pipe spools & supports\n• Stainless steel & MIG/TIG welding`
  if (h('lift','elevator','escalator'))
    return `🛗 **Lifts & Escalators:**\n\n• Passenger lifts (6–2,000kg)\n• Service & goods lifts\n• Escalators & moving walkways\n• DOSHS-compliant inspections\n\n📞 **${KB.phone}**`
  if (h('mechanical','compressor','boiler','m&e','mep','industrial'))
    return `⚙️ **Mechanical Works — Primary Specialty:**\n\n${KB.mechanical.map(i=>`• ${i}`).join('\n')}\n\n15+ years · 50+ engineers · 200+ projects.\n📞 **${KB.phone}**`
  if (h('building','construct','civil','structural','road','bridge','renovation'))
    return `🏗️ **Civil & Structural Works:**\n\n${KB.civil.map(i=>`• ${i}`).join('\n')}`
  if (h('service','what do you do','offer','speciali','capability','what you'))
    return `🔩 **Jaman Engineering Services:**\n\n⚙️ **MECHANICAL WORKS** ← Primary\n   HVAC, pipework, pumps, fire, fabrication\n\n⚡ **Electrical Works**\n   LV/MV, solar, BMS, generators\n\n🏗️ **Civil Construction**\n   Buildings, roads, structural\n\n💧 **Water & Sanitation**\n\n🔧 **Maintenance (AMC/PPM)**\n   24/7 breakdown response\n\nWhich can I tell you more about?`
  if (h('project','portfolio','completed','previous','case study'))
    return `📐 **Notable Projects:**\n\n${KB.projects.map(p=>`• ${p}`).join('\n')}`
  if (h('certif','nca','ebk','register','iso','osha','accredit'))
    return `🏆 **Accreditations:**\n\n• NCA — National Construction Authority\n• EBK — Engineers Board of Kenya\n• ISO 9001:2015 Quality Management\n• OSHA Safety Compliance`
  if (h('where','location','address','upper hill','office','re-plaza'))
    return `📍 **Our Location:**\n\n**Re-Plaza, Upper Hill, Nairobi, Kenya**\n\nWe serve clients across all 47 counties of Kenya.`
  if (h('contact','call','phone','email','reach','whatsapp'))
    return `📞 **Contact Jaman Engineering:**\n\n📱 Phone/WhatsApp: **${KB.phone}**\n✉️ Email: **${KB.email}**\n📍 ${KB.location}\n⏰ ${KB.hours}\n\n🚨 Emergency: **${KB.emergency}**`
  if (h('hour','open','close','working','available'))
    return `⏰ **Working Hours:**\n\nMon–Sat: **8:00 AM – 6:00 PM** EAT\nSunday: Closed\n\n🚨 Emergency 24/7:\n📞 **${KB.emergency}**`
  if (h('about','history','founded','experience','company'))
    return `👷 **Jaman Engineering Works Limited:**\n\nFounded **2009** · Nairobi, Kenya\n\n• 15+ years of engineering excellence\n• 200+ completed projects\n• 50+ certified professionals\n• 98% client satisfaction\n\n🏆 NCA · EBK · ISO 9001 · OSHA`
  if (h('safe','safety','hse','ppe'))
    return `🦺 **Safety First — Always:**\n\n• HSE officer on every site\n• Daily toolbox talks & mandatory PPE\n• Method statements & risk assessments\n• OSHA-compliant procedures\n• **Zero major incidents in 5 years**`
  if (h('warrant','guarantee','defect','liability'))
    return `✅ **Warranty:**\n\n12-month Defects Liability Period on all works. Extended warranties on mechanical plant per manufacturer specs. Full O&M documentation provided.`

  const opts = [
    `Could you tell me more about what you need? I'm happy to help!\n\nOr reach us directly:\n📞 **${KB.phone}**\n✉️ ${KB.email}\n\n**Services:**\n⚙️ Mechanical · ⚡ Electrical · 🏗️ Civil · 🔧 Maintenance`,
    `Great question! We specialise in:\n• ⚙️ **Mechanical Works** — our core specialty\n• ⚡ Electrical installations\n• 🏗️ Civil & structural\n• 🔧 Maintenance & AMC\n\nWhat would you like to know more about?`,
    `For the most accurate answer:\n\n📞 **${KB.phone}** (call or WhatsApp)\n✉️ ${KB.email}\n⏰ Mon–Sat, 8AM–6PM\n\nWe love talking engineering! 😊`,
  ]
  return opts[Math.floor(Date.now() / 9000) % opts.length]
}

/* ─── MENU DATA ──────────────────────────────────────────────────────────── */
const MENU_ITEMS = [
  { id: 'mechanical',  icon: Cog,       label: '⚙️ Mechanical Works',     desc: 'HVAC, pipework, fire, fabrication', primary: true },
  { id: 'electrical',  icon: Zap,       label: '⚡ Electrical Works',      desc: 'Power, solar, BMS, generators' },
  { id: 'civil',       icon: Building2, label: '🏗️ Civil Construction',    desc: 'Buildings, roads, structures' },
  { id: 'water',       icon: Droplets,  label: '💧 Water & Sanitation',    desc: 'Treatment, supply, drainage' },
  { id: 'maintenance', icon: Hammer,    label: '🔧 Maintenance Contracts',  desc: 'AMC, PPM, 24/7 response' },
  { id: 'quote',       icon: Phone,     label: '💰 Get a Quote',            desc: 'Free site consultation' },
  { id: 'contact',     icon: Mail,      label: '📞 Contact Us',             desc: 'Phone, email, location' },
]
const MENU_REPLIES = {
  mechanical:  `⚙️ **Mechanical Works — Primary Specialty:**\n\n${KB.mechanical.map(i=>`• ${i}`).join('\n')}\n\n15+ years · 50+ certified engineers · Kenya-wide.\n📞 **${KB.phone}**`,
  electrical:  `⚡ **Electrical Works:**\n\n${KB.electrical.map(i=>`• ${i}`).join('\n')}`,
  civil:       `🏗️ **Civil & Structural Works:**\n\n${KB.civil.map(i=>`• ${i}`).join('\n')}`,
  water:       `💧 **Water & Sanitation:**\n\n${KB.water.map(i=>`• ${i}`).join('\n')}`,
  maintenance: `🔧 **Maintenance Contracts:**\n\n${KB.maintenance.map(i=>`• ${i}`).join('\n')}\n\n📞 **${KB.phone}**`,
  quote:       `💰 **Getting a Quote — FREE:**\n\n1️⃣ Call/WhatsApp: **${KB.phone}**\n2️⃣ Email: **${KB.email}**\n3️⃣ Contact form on the website\n\nFree site visits · Tailored quotes · 24hr response`,
  contact:     `📞 **Contact Jaman Engineering:**\n\n📱 **${KB.phone}** (Phone/WhatsApp)\n✉️ ${KB.email}\n📍 ${KB.location}\n⏰ ${KB.hours}\n🚨 Emergency: **${KB.emergency}**`,
}
const CHIPS = ['HVAC systems', 'Get a quote', 'Maintenance AMC', 'Our projects', 'Find our office']

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */
function Avatar({ size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: C.avatarBg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: size * 0.38, fontWeight: 900,
      color: '#fff', fontFamily: 'Barlow Condensed,sans-serif',
    }}>J</div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <Avatar />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
        background: C.botBubbleBg, border: `1px solid ${C.botBubbleBd}`,
      }}>
        {[0, 0.18, 0.36].map((d, i) => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%', display: 'inline-block',
            background: C.dotColor,
            animation: `bounceDot 1.1s ${d}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

function Msg({ msg }) {
  const isBot = msg.role === 'bot'
  const html = msg.content
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>')
    .replace(/\n/g, '<br/>')
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: isBot ? 'row' : 'row-reverse', animation: 'slideUp 0.28s ease forwards' }}>
      {isBot && <Avatar />}
      <div
        style={{
          maxWidth: '82%', padding: '10px 14px', fontSize: '0.875rem', lineHeight: 1.6,
          borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          background: isBot ? C.botBubbleBg : C.userBubbleBg,
          border: isBot ? `1px solid ${C.botBubbleBd}` : 'none',
          color: '#f0f4ff',  /* ALWAYS white — never inherits from page */
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

function WelcomePopup({ onOpen, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', zIndex: 50, bottom: 88, right: 16,
      width: 'min(278px, calc(100vw - 32px))',
      animation: 'popIn 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards',
    }}>
      <div style={{
        borderRadius: 20, padding: 16,
        background: C.popupBg,
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: `1px solid ${C.popupBd}`,
        boxShadow: '0 24px 70px rgba(13,42,110,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Avatar size={38} />
            <span style={{
              position: 'absolute', bottom: -1, right: -1,
              width: 11, height: 11, background: '#4ade80', borderRadius: '50%',
              border: '2px solid #08091c',
            }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', fontFamily: 'Barlow Condensed,sans-serif' }}>JAMA Assistant</div>
            <div style={{ fontSize: '0.72rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Online now
            </div>
          </div>
          <button onClick={onDismiss} aria-label="Dismiss"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, lineHeight: 1, fontSize: 14 }}>✕</button>
        </div>

        {/* Message */}
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(220,228,255,0.82)', marginBottom: 14 }}>
          👋 Hi! I'm <strong style={{ color: '#fff' }}>JAMA</strong>, your Jaman Engineering assistant.<br /><br />
          Need help with <strong style={{ color: '#93c5fd' }}>HVAC, mechanical works</strong> or a free quote? Chat with me! 💬
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onOpen} style={{
            flex: 1, padding: '8px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(90deg,#0d2a6e,#cc1a1a)', color: '#fff',
            fontSize: '0.8rem', fontWeight: 700, transition: 'opacity 0.2s',
          }}>Chat with JAMA</button>
          <a href="tel:+254733315621" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
          }} aria-label="Call us">
            <Phone size={14} />
          </a>
        </div>
      </div>
      {/* Tail */}
      <div style={{
        position: 'absolute', bottom: -6, right: 28, width: 12, height: 12,
        transform: 'rotate(45deg)',
        background: 'rgba(13,42,110,0.92)',
        borderRight: `1px solid ${C.popupBd}`,
        borderBottom: `1px solid ${C.popupBd}`,
      }} />
    </div>
  )
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function ChatBot() {
  const [open,      setOpen]      = useState(false)
  const [view,      setView]      = useState('menu')
  const [messages,  setMessages]  = useState([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const endRef   = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => { if (!open && !dismissed) setShowPopup(true) }, 4000)
    return () => clearTimeout(t)
  }, [open, dismissed])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { if (open && view === 'chat') setTimeout(() => inputRef.current?.focus(), 150) }, [open, view])

  const openChat = () => { setOpen(true); setShowPopup(false) }

  const goToChat = useCallback((id) => {
    setView('chat')
    const welcome = `👋 Hi! I'm **JAMA** — Jaman Engineering's virtual assistant.\n\nOur primary specialty is **Mechanical Works** (HVAC, pipework, fire systems & more). How can I help you today?`
    const base = messages.length === 0 ? [{ role: 'bot', content: welcome }] : [...messages]
    setMessages(id && id !== 'open' && MENU_REPLIES[id] ? [...base, { role: 'bot', content: MENU_REPLIES[id] }] : base)
  }, [messages])

  const send = useCallback(async (override) => {
    const text = (override || input).trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    await new Promise(r => setTimeout(r, 600 + Math.min(text.length * 7, 900)))
    setLoading(false)
    setMessages(prev => [...prev, { role: 'bot', content: getReply(text) }])
  }, [input, loading, messages])

  const reset = () => { setMessages([]); setView('menu') }

  /* ─ Shared inline styles ─ */
  const btnIcon = (hover) => ({
    width: 32, height: 32, borderRadius: 10, border: `1px solid rgba(255,255,255,0.1)`,
    background: 'rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    color: 'rgba(255,255,255,0.72)', transition: 'background 0.15s, color 0.15s',
  })

  return (
    <>
      {/* WELCOME POPUP */}
      {showPopup && !open && (
        <WelcomePopup onOpen={openChat} onDismiss={() => { setShowPopup(false); setDismissed(true) }} />
      )}

      {/* FAB */}
      <div style={{ position: 'fixed', bottom: 20, right: 16, zIndex: 50 }}>
        {!open && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: '#0d2a6e', animation: 'pulseRing 2.5s ease-out infinite', opacity: 0.4,
          }} />
        )}
        <button
          onClick={() => open ? setOpen(false) : openChat()}
          aria-label={open ? 'Close chat' : 'Chat with JAMA'}
          aria-expanded={open}
          style={{
            position: 'relative', width: 56, height: 56, borderRadius: '50%',
            background: C.fabBg, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: C.fabShadow,
            transition: 'transform 0.2s', flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {open ? <X size={22} color="#fff" /> : <MessageCircle size={24} color="#fff" />}
        </button>
      </div>

      {/* CHAT PANEL — always dark, immune to light mode */}
      {open && (
        <div
          role="dialog" aria-label="JAMA — Jaman Engineering Assistant" aria-modal="true"
          style={{
            position: 'fixed', zIndex: 50,
            bottom: 84, left: 8, right: 8,
            maxHeight: 'calc(100dvh - 100px)',
            display: 'flex', flexDirection: 'column',
            borderRadius: 20,
            background: C.panelBg,
            backdropFilter: 'blur(48px) saturate(220%)',
            WebkitBackdropFilter: 'blur(48px) saturate(220%)',
            border: `1px solid ${C.panelBorder}`,
            boxShadow: '0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)',
            color: C.textPrimary,
            overflow: 'hidden',
            /* ← This is the key: force white text on entire panel */
          }}
          className="jaman-chat-panel"
        >

          {/* ── HEADER ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 14px', flexShrink: 0,
            background: C.headerBg,
            borderBottom: `1px solid ${C.headerBorder}`,
          }}>
            {view === 'chat' && (
              <button onClick={() => setView('menu')} aria-label="Back to menu"
                style={{ ...btnIcon(), color: 'rgba(255,255,255,0.8)' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.8)' }}
              ><ArrowLeft size={15} color="currentColor" /></button>
            )}

            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Avatar size={36} />
              <span style={{ position:'absolute', bottom:-1, right:-1, width:10, height:10, background:'#4ade80', borderRadius:'50%', border:'2px solid #050512' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize:'0.875rem', fontWeight:700, color:'#fff', fontFamily:'Barlow Condensed,sans-serif', letterSpacing:'0.04em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                JAMA Assistant
              </div>
              <div style={{ fontSize:'0.7rem', color:'#4ade80', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:5, height:5, background:'#4ade80', borderRadius:'50%', display:'inline-block', animation:'pulse 2s infinite' }} />
                Online · Mechanical & Engineering Works
              </div>
            </div>

            <div style={{ display:'flex', gap:4, flexShrink:0 }}>
              {view === 'chat' && messages.length > 1 && (
                <button onClick={reset} aria-label="New conversation"
                  style={{ ...btnIcon(), color:'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}
                ><RotateCcw size={13} color="currentColor" /></button>
              )}
              <button onClick={() => setOpen(false)} aria-label="Close"
                style={{ ...btnIcon(), color:'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => e.currentTarget.style.color='#fff'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.7)'}
              ><X size={15} color="currentColor" /></button>
            </div>
          </div>

          {/* ── MENU VIEW ── */}
          {view === 'menu' && (
            <div style={{ flex:1, overflowY:'auto', overscrollBehavior:'contain' }}>
              {/* Welcome bubble */}
              <div style={{ padding:'14px 14px 10px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                  <Avatar />
                  <div style={{
                    borderRadius:'16px 16px 16px 4px', padding:'10px 14px',
                    background: C.welcomeBg, border:`1px solid ${C.welcomeBd}`,
                    fontSize:'0.875rem', lineHeight:1.55, color: C.textPrimary,
                  }}>
                    👋 Welcome to <strong style={{ color:'#fff' }}>Jaman Engineering Works Limited</strong>!
                    <span style={{ display:'block', fontSize:'0.72rem', marginTop:3, color: C.textMuted }}>
                      Kenya's premier mechanical & engineering company
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding:'0 10px 10px' }}>
                <p style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color: C.textFaint, padding:'0 4px', marginBottom:8 }}>
                  Quick Options
                </p>
                {MENU_ITEMS.map(item => {
                  const isPrim = item.primary
                  return (
                    <button key={item.id} onClick={() => goToChat(item.id)}
                      style={{
                        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                        padding:'11px 12px', borderRadius:12, marginBottom:6, textAlign:'left',
                        background: isPrim ? C.menuItemPrimBg : C.menuItemBg,
                        border:`1px solid ${isPrim ? C.menuItemPrimBd : C.menuItemBd}`,
                        cursor:'pointer', transition:'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background=C.menuItemHoverBg; e.currentTarget.style.borderColor=C.menuItemHoverBd }}
                      onMouseLeave={e => { e.currentTarget.style.background=isPrim?C.menuItemPrimBg:C.menuItemBg; e.currentTarget.style.borderColor=isPrim?C.menuItemPrimBd:C.menuItemBd }}
                    >
                      <div style={{ flex:1, minWidth:0, marginRight:8 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'nowrap' }}>
                          <span style={{ fontSize:'0.875rem', fontWeight:600, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                            {item.label}
                          </span>
                          {isPrim && (
                            <span style={{ fontSize:'0.6rem', fontWeight:800, padding:'2px 6px', borderRadius:999, background:'#0d2a6e', color:'#fff', letterSpacing:'0.12em', textTransform:'uppercase', flexShrink:0 }}>
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize:'0.72rem', marginTop:2, color: C.textMuted, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {item.desc}
                        </div>
                      </div>
                      <ChevronRight size={13} color={C.textFaint} style={{ flexShrink:0 }} />
                    </button>
                  )
                })}

                {/* Ask Anything */}
                <button onClick={() => goToChat('open')}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'11px 12px', borderRadius:12, textAlign:'left', marginTop:2,
                    background: C.askBg, border:`1px solid ${C.askBd}`,
                    cursor:'pointer', transition:'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background=C.askHoverBg}
                  onMouseLeave={e => e.currentTarget.style.background=C.askBg}
                >
                  <div>
                    <div style={{ fontSize:'0.875rem', fontWeight:600, color:'#fff' }}>💬 Ask Anything</div>
                    <div style={{ fontSize:'0.72rem', marginTop:2, color: C.textMuted }}>Type your own question</div>
                  </div>
                  <ChevronRight size={13} color="#cc1a1a" style={{ flexShrink:0 }} />
                </button>
              </div>

              {/* Contact strip */}
              <div style={{ padding:'0 10px 14px' }}>
                <div style={{ borderRadius:12, padding:'12px 14px', background: C.stripBg, border:`1px solid ${C.stripBd}` }}>
                  <p style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color: C.textFaint, marginBottom:8 }}>
                    Direct Contact
                  </p>
                  <a href="tel:+254733315621" style={{ display:'flex', alignItems:'center', gap:8, color: C.textMuted, textDecoration:'none', fontSize:'0.8rem', marginBottom:6 }}
                    onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color=C.textMuted}>
                    <Phone size={12} color="#cc1a1a" /> +254 733 315 621
                  </a>
                  <a href="mailto:info@jamanengineering.co.ke" style={{ display:'flex', alignItems:'center', gap:8, color: C.textMuted, textDecoration:'none', fontSize:'0.8rem' }}
                    onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color=C.textMuted}>
                    <Mail size={12} color="#0d2a6e" /> info@jamanengineering.co.ke
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ── CHAT VIEW ── */}
          {view === 'chat' && (
            <>
              <div style={{ flex:1, overflowY:'auto', overscrollBehavior:'contain', padding:'12px 12px', display:'flex', flexDirection:'column', gap:10, minHeight:0 }}>
                {messages.map((m, i) => <Msg key={i} msg={m} />)}
                {loading && <TypingDots />}
                <div ref={endRef} />
              </div>

              {/* Chips */}
              {messages.length <= 2 && !loading && (
                <div style={{ padding:'0 12px 8px', display:'flex', flexWrap:'wrap', gap:6 }}>
                  {CHIPS.map(c => (
                    <button key={c} onClick={() => send(c)}
                      style={{ fontSize:'0.75rem', padding:'6px 10px', borderRadius:999, cursor:'pointer', transition:'background 0.15s, color 0.15s', background: C.chipBg, border:`1px solid ${C.chipBd}`, color: C.chipText }}
                      onMouseEnter={e => { e.currentTarget.style.background='rgba(13,42,110,0.3)'; e.currentTarget.style.color='#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background=C.chipBg; e.currentTarget.style.color=C.chipText }}
                    >{c}</button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div style={{ padding:'10px 12px 12px', borderTop:`1px solid rgba(255,255,255,0.06)`, flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <input
                    ref={inputRef}
                    type="text" value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                    placeholder="Ask about HVAC, pipework, quotes…"
                    aria-label="Type your message"
                    style={{
                      flex:1, padding:'10px 14px', borderRadius:12, fontSize:'0.875rem', outline:'none',
                      background: C.inputBg, border:`1px solid ${C.inputBd}`,
                      color:'#f0f4ff', minWidth:0,
                    }}
                    onFocus={e => { e.target.style.borderColor=C.inputFocusBd; e.target.style.boxShadow='0 0 0 3px rgba(13,42,110,0.2)' }}
                    onBlur={e => { e.target.style.borderColor=C.inputBd; e.target.style.boxShadow='none' }}
                  />
                  <button onClick={() => send()} disabled={!input.trim() || loading}
                    aria-label="Send"
                    style={{
                      width:40, height:40, borderRadius:12, border:'none', cursor:'pointer',
                      background:'linear-gradient(135deg,#0d2a6e,#cc1a1a)', color:'#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, transition:'opacity 0.2s, transform 0.15s',
                      opacity: (!input.trim() || loading) ? 0.4 : 1,
                    }}
                    onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform='scale(1.07)' }}
                    onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                  >
                    {loading ? <Loader2 size={15} color="#fff" style={{ animation:'spin 1s linear infinite' }} /> : <Send size={15} color="#fff" />}
                  </button>
                </div>
                <p style={{ fontSize:'0.65rem', textAlign:'center', marginTop:6, color:'rgba(255,255,255,0.15)' }}>
                  JAMA · Built-in AI · No API key required
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
