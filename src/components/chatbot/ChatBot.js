'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageCircle, X, Send, ArrowLeft, RotateCcw,
  Phone, Mail, ChevronRight, Loader2, Wrench,
  Cog, Building2, Droplets, Hammer, Zap
} from 'lucide-react'

// ─── KNOWLEDGE BASE ────────────────────────────────────────────────────────────
const KB = {
  contact: { phone: '+254 733 315 621', email: 'info@jamanengineering.co.ke', location: 'Re-Plaza, Upper Hill, Nairobi', emergency: '+254 733 315 622', hours: 'Mon–Sat, 8AM–6PM' },
  services: {
    mechanical: ['HVAC design, supply & installation (split, VRF, AHU, FCU)', 'Industrial pipework & pressure vessels', 'Mechanical equipment — pumps, compressors, boilers', 'Industrial steel fabrication & welding', 'Fire protection — sprinklers, gas suppression, hydrants', 'Lifts & escalator installation & maintenance', 'Compressed air systems', 'Planned preventive maintenance (PPM) contracts'],
    electrical: ['LV/MV electrical installations', 'Solar PV & renewable energy systems', 'Building management systems (BMS)', 'Generator supply, installation & commissioning', 'Street & outdoor lighting', 'UPS & backup power systems'],
    civil: ['Residential, commercial & industrial buildings', 'Roads, bridges & drainage', 'Structural engineering & design', 'Foundation & earthworks', 'Renovation & fit-out'],
    water: ['Water supply & distribution', 'Sewerage & drainage systems', 'Water treatment plant M&E', 'Borehole pump installations'],
    maintenance: ['Annual maintenance contracts (AMC)', 'PPM scheduling & reporting', '24/7 emergency breakdown response', 'HVAC servicing & re-gassing', 'Generator load testing', 'Fire system inspections'],
  },
  projects: [
    'Upper Hill Office Complex — Full M&E | KSh 650M (2023)',
    'Westlands Luxury Apartments — HVAC, Plumbing & Civil | KSh 280M (2023)',
    'Athi River Logistics Hub — Industrial Mechanical | KSh 320M (2022)',
    'Nakuru Water Treatment Plant — Mechanical & Civil | KSh 420M (2021)',
    'Thika Access Roads — Civil Infrastructure | KSh 180M (2022)',
    'Machakos County Buildings — Civil & M&E | KSh 240M (2021)',
  ],
}

// ─── RULE-BASED ENGINE ────────────────────────────────────────────────────────
function getReply(raw, history) {
  const m = raw.toLowerCase()
  const h = (...t) => t.some(w => m.includes(w))

  if (h('hello','hi ','hey','good morning','good afternoon','good evening','hujambo','habari','howdy','greet'))
    return '👋 Hello! Welcome to **Jaman Engineering Works Limited**.\n\nI\'m **JAMA** — your virtual assistant. Our main specialty is **Mechanical Works** (HVAC, pipework, fire systems, fabrication) plus electrical, civil, water and maintenance services.\n\nHow can I help you today?'

  if (h('thank','thanks','asante','appreciate'))
    return '🙏 You\'re very welcome! Feel free to ask anything else.\n\n📞 **+254 733 315 621** · info@jamanengineering.co.ke'

  if (h('bye','goodbye','see you','kwaheri'))
    return '👋 Goodbye! Thank you for contacting Jaman Engineering. Have a great day! 🇰🇪\n\n📞 **+254 733 315 621**'

  if (h('quote','price','cost','how much','estimate','rate','fee','budget','afford'))
    return '💰 **Getting a Quote — FREE & Fast:**\n\n1️⃣ Call/WhatsApp: **+254 733 315 621**\n2️⃣ Email: **info@jamanengineering.co.ke**\n3️⃣ Fill the Contact form on our website\n\nWe provide free site visits and tailored quotes within **24–48 hours**. No obligation!'

  if (h('hvac','air condition','aircon',' ac ',' a/c','ventilation','heating','cooling','chiller','ahu','fcu','split unit','vrf','cassette','ducted'))
    return '❄️ **HVAC — Our Core Specialty!**\n\nWe provide full HVAC services:\n\n• Split units, VRF/VRV, AHU, FCU systems\n• Chiller & cooling tower plants\n• Data centre & clean room cooling\n• Ducting fabrication & installation\n• Commissioning, balancing & testing\n• Annual maintenance contracts (AMC)\n\n📞 Free site survey: **+254 733 315 621**'

  if (h('plumb','pipe','pipework','water supply','drainage','sewage','hot water','cold water','booster','manifold'))
    return '💧 **Plumbing & Pipework:**\n\n• Cold & hot water distribution\n• High-pressure industrial pipework (steel, copper, HDPE, CPVC)\n• Booster pump sets & pressure vessels\n• Sewerage & drainage networks\n• Pressure testing & commissioning'

  if (h('fire','sprinkler','suppression','hose reel','hydrant','riser','fm200','foam','gas suppression'))
    return '🔥 **Fire Protection Systems:**\n\n• Wet & dry riser systems\n• Automatic sprinklers\n• Gas suppression (FM200, CO₂, Novec)\n• Foam systems\n• Fire hydrants & hose reels\n• KFRS-compliant installations\n• Annual service contracts'

  if (h('pump','submersible','centrifugal','borehole pump','fire pump','sewage pump','grundfos','wilo','ksb'))
    return '⚙️ **Pump Installation & Maintenance:**\n\n• Submersible & centrifugal pumps\n• Booster pump sets\n• Fire pump sets (jockey, duty, standby)\n• Sewage & sump pumps\n• Borehole pumps\n\nBrands: Grundfos, KSB, Wilo, DAB, Speroni\n\nMaintenance contracts available!'

  if (h('generator','genset','standby power','backup power','amf','ats ','load bank','kva '))
    return '🔋 **Generator Services:**\n\n• Standby & prime generators — 10kVA to 2,000kVA\n• AMF/ATS changeover panels\n• Acoustic canopies\n• Load bank testing\n• Annual maintenance contracts\n\nBrands: Perkins, Cummins, CAT, FG Wilson'

  if (h('solar','pv ','renewable','photovoltaic','off-grid','on-grid','battery storage','inverter'))
    return '☀️ **Solar PV & Renewable Energy:**\n\n• Grid-tied & off-grid solar PV\n• Battery storage systems\n• Hybrid solar + generator systems\n• Commercial & industrial rooftop\n• System monitoring & maintenance\n\nSized from 5kW to multi-MW!'

  if (h('electric','wiring','panel','switchgear','lv ','mv ','transformer','earthing','bms ','ups '))
    return `⚡ **Electrical Works:**\n\n${KB.services.electrical.map(i=>`• ${i}`).join('\n')}`

  if (h('maintenance','service contract','amc','ppm','preventive','breakdown','repair','fault','not working'))
    return `🔧 **Maintenance Contracts:**\n\n${KB.services.maintenance.map(i=>`• ${i}`).join('\n')}\n\nFlexible AMC packages tailored to your equipment & budget.\n\n📞 **+254 733 315 621**`

  if (h('fabricat','weld','steel work','metalwork','tank','vessel','skid','frame'))
    return '🏭 **Industrial Fabrication & Welding:**\n\n• Structural steel fabrication\n• Pressure vessel fabrication\n• Custom pipe spools & supports\n• Stainless steel fabrication\n• MIG, TIG & Arc welding\n• ASME/AWS certified welders'

  if (h('lift','elevator','escalator','dumbwaiter'))
    return '🛗 **Lifts & Escalators:**\n\n• Passenger lifts (6–2,000kg)\n• Service & goods lifts\n• Escalators & moving walkways\n• Modernisation & upgrades\n• DOSHS-compliant inspections\n\n📞 **+254 733 315 621** for site survey'

  if (h('mechanical','compressor','boiler','pressure','industrial mechanical','m&e','mep','mechanical works'))
    return `⚙️ **Mechanical Works — Our Primary Specialty:**\n\n${KB.services.mechanical.map(i=>`• ${i}`).join('\n')}\n\n15+ years · 50+ engineers · 200+ projects across Kenya.\n\n📞 **+254 733 315 621**`

  if (h('building','construct','civil','structural','concrete','foundation','renovation','fit-out','refurb'))
    return `🏗️ **Civil & Structural Works:**\n\n${KB.services.civil.map(i=>`• ${i}`).join('\n')}\n\nIntegrated with our M&E divisions for complete turnkey delivery.`

  if (h('service','what do you do','what you do','offer','speciali','capability','scope','provide'))
    return '🔩 **Jaman Engineering — Full Services:**\n\n⚙️ **MECHANICAL WORKS** ← Primary\n   HVAC, pipework, pumps, fire, fabrication, lifts\n\n⚡ **Electrical Works**\n   LV/MV, solar, BMS, generators\n\n🏗️ **Civil Construction**\n   Buildings, roads, structural\n\n💧 **Water & Sanitation**\n   Supply, drainage, treatment\n\n🔧 **Maintenance (AMC/PPM)**\n   24/7 breakdown response\n\nWhich service can I tell you more about?'

  if (h('project','portfolio','completed','previous','past work','example','case study'))
    return `📐 **Our Notable Projects:**\n\n${KB.projects.map(p=>`• ${p}`).join('\n')}\n\nVisit the Projects page for full details!`

  if (h('certif','accredit','nca','ebk','register','license','iso','osha'))
    return '🏆 **Accreditations:**\n\n• NCA — National Construction Authority\n• EBK — Engineers Board of Kenya\n• ISO 9001:2015 Quality Management\n• OSHA Safety Compliance\n• DOSHS — Lifts & pressure vessels\n\nAll engineers individually registered with EBK.'

  if (h('where','location','address','upper hill','nairobi','office','find you'))
    return `📍 **Our Location:**\n\n**Re-Plaza, Upper Hill, Nairobi, Kenya**\n\nWe serve clients across all 47 counties in Kenya — from Mombasa to Kisumu.\n\n🗺️ [Open in Google Maps](https://maps.google.com/?q=Re-Plaza+Upper+Hill+Nairobi)`

  if (h('contact','call','phone','email','reach','whatsapp','number'))
    return `📞 **Contact Jaman Engineering:**\n\n📱 Phone/WhatsApp: **${KB.contact.phone}**\n✉️ Email: **${KB.contact.email}**\n📍 ${KB.contact.location}\n⏰ ${KB.contact.hours}\n\n🚨 Emergency: **${KB.contact.emergency}**`

  if (h('hour','open','close','working day','available'))
    return `⏰ **Working Hours:**\n\nMon–Sat: **8:00 AM – 6:00 PM** EAT\nSunday: Closed\n\n🚨 Emergency breakdowns — 24/7:\n📞 **${KB.contact.emergency}**`

  if (h('about','history','founded','experience','company','background'))
    return '👷 **About Jaman Engineering Works Limited:**\n\nFounded **2009** · Nairobi, Kenya\n\n📊 Track record:\n• 15+ years of engineering excellence\n• 200+ completed projects\n• 50+ certified professionals\n• 98% client satisfaction\n\n🏆 NCA · EBK · ISO 9001 · OSHA'

  if (h('safe','health and safety','hse','accident','ppe'))
    return '🦺 **Safety First — Always:**\n\n• Dedicated HSE officer on every site\n• Daily toolbox talks\n• Mandatory PPE compliance\n• Method statements & risk assessments\n• OSHA-compliant procedures\n• **Zero major incidents in 5 years**'

  if (h('warrant','guarantee','defect','liability'))
    return '✅ **Warranty:**\n\n12-month Defects Liability Period (DLP) on all completed works. Extended warranties available on mechanical plant per manufacturer specs. Full O&M documentation & as-built drawings provided.'

  if (h('how long','timeline','duration','schedule','programme','time frame'))
    return '⏱️ **Project Timelines:**\n\n• Small mechanical works: 1–5 days\n• Medium M&E package: 2–8 weeks\n• Full building M&E: 3–12 months\n• Large civil + M&E: 12–24 months\n\nDetailed programme provided at quotation stage.'

  if (h('can you','do you','are you able','will you'))
    return `Yes! We specialise in **Mechanical Works** (HVAC, pipework, fire systems, fabrication) plus electrical, civil & maintenance services.\n\nTell me more about what you need — I'll give you detailed info! 😊\n\n📞 **${KB.contact.phone}**`

  // Fallback
  const opts = [
    `I want to make sure I give you the right answer! Could you rephrase?\n\nOr reach us directly:\n📞 **${KB.contact.phone}**\n✉️ ${KB.contact.email}\n\n**Our services:**\n⚙️ Mechanical (HVAC, pipework, fire) ← Primary\n⚡ Electrical · 🏗️ Civil · 🔧 Maintenance`,
    `Great question — let me point you in the right direction!\n\n• ⚙️ **Mechanical Works** — our flagship\n• ⚡ Electrical installations\n• 🏗️ Civil & structural\n• 🔧 Maintenance & AMC\n\nWhat would you like to know more about?`,
    `For the best answer, contact our team directly:\n\n📞 **${KB.contact.phone}** (call or WhatsApp)\n✉️ ${KB.contact.email}\n⏰ Mon–Sat, 8AM–6PM\n\nWe love talking engineering!`,
  ]
  return opts[Math.floor(Date.now() / 9000) % opts.length]
}

// ─── MENU DATA ────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 'mechanical', icon: Cog,      label: '⚙️ Mechanical Works',    desc: 'HVAC, pipework, fire, fabrication', primary: true },
  { id: 'electrical', icon: Zap,      label: '⚡ Electrical Works',     desc: 'Power, solar, BMS, generators' },
  { id: 'civil',      icon: Building2,label: '🏗️ Civil Construction',   desc: 'Buildings, roads, structures' },
  { id: 'water',      icon: Droplets, label: '💧 Water & Sanitation',   desc: 'Treatment, supply, drainage' },
  { id: 'maintenance',icon: Hammer,   label: '🔧 Maintenance Contracts', desc: 'AMC, PPM, 24/7 response' },
  { id: 'quote',      icon: Phone,    label: '💰 Get a Quote',           desc: 'Free site consultation' },
  { id: 'contact',    icon: Mail,     label: '📞 Contact Us',            desc: 'Phone, email, location' },
]

const MENU_REPLIES = {
  mechanical: `⚙️ **Mechanical Works — Our Primary Specialty:**\n\n${KB.services.mechanical.map(i=>`• ${i}`).join('\n')}\n\n15+ years · 50+ certified engineers · Kenya-wide coverage.\n\n📞 **+254 733 315 621**`,
  electrical: `⚡ **Electrical Works:**\n\n${KB.services.electrical.map(i=>`• ${i}`).join('\n')}`,
  civil:       `🏗️ **Civil & Structural Works:**\n\n${KB.services.civil.map(i=>`• ${i}`).join('\n')}`,
  water:       `💧 **Water & Sanitation:**\n\n${KB.services.water.map(i=>`• ${i}`).join('\n')}`,
  maintenance: `🔧 **Maintenance Contracts:**\n\n${KB.services.maintenance.map(i=>`• ${i}`).join('\n')}\n\n📞 **+254 733 315 621** for a maintenance proposal`,
  quote: `💰 **Getting a Quote — FREE:**\n\n1️⃣ Call/WhatsApp: **+254 733 315 621**\n2️⃣ Email: **info@jamanengineering.co.ke**\n3️⃣ Use the Contact form on the website\n\nFree site visits · Tailored quotes · 24hr response`,
  contact: `📞 **Contact Jaman Engineering:**\n\n📱 **+254 733 315 621** (Phone/WhatsApp)\n✉️ info@jamanengineering.co.ke\n📍 Re-Plaza, Upper Hill, Nairobi\n⏰ Mon–Sat: 8AM–6PM\n🚨 Emergency: **+254 733 315 622**`,
}

// ─── TYPING INDICATOR ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)' }}>J</div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-none"
        style={{ background: 'rgba(13,42,110,0.12)', border: '1px solid rgba(13,42,110,0.15)' }}>
        {[0,0.18,0.36].map((d,i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: '#0d2a6e', animation: `bounce-dot 1.1s ${d}s ease-in-out infinite` }} />
        ))}
      </div>
    </div>
  )
}

function Msg({ msg }) {
  const isBot = msg.role === 'bot'
  const html = msg.content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
  return (
    <div className={`flex items-end gap-2 chat-msg-enter ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)' }}>J</div>
      )}
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isBot ? 'rounded-bl-none' : 'rounded-br-none text-white'}`}
        style={isBot
          ? { background: 'rgba(13,42,110,0.1)', border: '1px solid rgba(13,42,110,0.15)', color: 'var(--text-primary)' }
          : { background: 'linear-gradient(135deg,#0d2a6e,#1a4a9e)' }
        }
        dangerouslySetInnerHTML={{ __html: html }}
        role="article"
      />
    </div>
  )
}

// ─── WELCOME POPUP ────────────────────────────────────────────────────────────
function WelcomePopup({ onOpen, onDismiss }) {
  return (
    <div className="fixed bottom-24 right-6 z-50 animate-pop-in" style={{ maxWidth: '280px' }}>
      <div className="rounded-2xl p-4 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg,rgba(13,42,110,0.96),rgba(4,4,16,0.97))',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(13,42,110,0.5)',
          boxShadow: '0 20px 60px rgba(13,42,110,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)' }}>J</div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2" style={{ borderColor: '#0d0d1e' }} />
          </div>
          <div>
            <div className="text-sm font-bold text-white" style={{ fontFamily: 'Barlow Condensed,sans-serif' }}>JAMA Assistant</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online now
            </div>
          </div>
          <button onClick={onDismiss} className="ml-auto text-white/40 hover:text-white/80 transition-colors p-1">
            <X size={14} />
          </button>
        </div>

        {/* Message */}
        <div className="text-sm text-white/80 leading-relaxed mb-4">
          👋 Hi! I'm <strong className="text-white">JAMA</strong>, your Jaman Engineering assistant.<br /><br />
          Need help with <strong className="text-blue-300">HVAC, mechanical works</strong>, or a free quote?<br />
          I'm here to help! 💬
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2">
          <button onClick={onOpen}
            className="flex-1 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(90deg,#0d2a6e,#cc1a1a)' }}>
            Chat with JAMA
          </button>
          <a href="tel:+254733315621"
            className="glass flex items-center justify-center px-3 py-2 rounded-xl text-white/70 hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <Phone size={13} />
          </a>
        </div>
      </div>
      {/* Tail */}
      <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
        style={{ background: 'rgba(4,4,16,0.97)', borderRight: '1px solid rgba(13,42,110,0.5)', borderBottom: '1px solid rgba(13,42,110,0.5)' }} />
    </div>
  )
}

// ─── MAIN CHATBOT ─────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('menu')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupDismissed, setPopupDismissed] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  // Show welcome popup after 4 seconds, once
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !popupDismissed) setShowPopup(true)
    }, 4000)
    return () => clearTimeout(t)
  }, [open, popupDismissed])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => {
    if (open) {
      setShowPopup(false)
      if (view === 'chat') setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open, view])

  const pushBot = useCallback((text) => {
    setMessages(prev => [...prev, { role: 'bot', content: text }])
  }, [])

  const openChat = () => {
    setOpen(true)
    setShowPopup(false)
  }

  const goToChat = useCallback((id) => {
    setView('chat')
    const welcome = '👋 Hi! I\'m **JAMA** — Jaman Engineering\'s virtual assistant.\n\nOur primary specialty is **Mechanical Works** (HVAC, pipework, fire systems & more).\n\nHow can I help you today?'
    const base = messages.length === 0 ? [{ role: 'bot', content: welcome }] : [...messages]
    if (id && id !== 'open' && MENU_REPLIES[id]) {
      setMessages([...base, { role: 'bot', content: MENU_REPLIES[id] }])
    } else {
      setMessages(base)
    }
  }, [messages])

  const send = useCallback(async (override) => {
    const text = (override || input).trim()
    if (!text || loading) return
    setInput('')
    const updated = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    await new Promise(r => setTimeout(r, 650 + Math.min(text.length * 7, 1000)))
    const reply = getReply(text, updated)
    setLoading(false)
    setMessages(prev => [...prev, { role: 'bot', content: reply }])
  }, [input, loading, messages])

  const reset = () => { setMessages([]); setView('menu') }

  const CHIPS = ['HVAC systems', 'Get a quote', 'Maintenance AMC', 'Our projects', 'Find our office']

  return (
    <>
      {/* Welcome popup */}
      {showPopup && !open && (
        <WelcomePopup
          onOpen={openChat}
          onDismiss={() => { setShowPopup(false); setPopupDismissed(true) }}
        />
      )}

      {/* FAB — MessageCircle icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <div className="absolute inset-0 rounded-full opacity-30"
            style={{ background: '#0d2a6e', animation: 'pulseRing 2.5s ease-out infinite' }} />
        )}
        <button
          onClick={() => { open ? setOpen(false) : openChat() }}
          aria-label={open ? 'Close chat' : 'Chat with JAMA assistant'}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: 'linear-gradient(135deg,#0d2a6e,#1a4a9e,#cc1a1a)',
            boxShadow: '0 8px 30px rgba(13,42,110,0.5), 0 3px 12px rgba(204,26,26,0.3)',
          }}
        >
          {open
            ? <X size={22} />
            : <MessageCircle size={24} />
          }
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="JAMA — Jaman Engineering Assistant"
          aria-modal="true"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[620px] flex flex-col rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(4,4,16,0.97)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(13,42,110,0.35)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
            animation: 'slideUp 0.3s ease forwards',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,rgba(13,42,110,0.3),rgba(204,26,26,0.2))', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {view === 'chat' && (
              <button onClick={() => setView('menu')} aria-label="Back to menu"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-white/70 hover:text-white flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={16} />
              </button>
            )}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base text-white"
                style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)', fontFamily: 'Barlow Condensed,sans-serif' }}>J</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2" style={{ borderColor: '#04040f' }} aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate" style={{ fontFamily: 'Barlow Condensed,sans-serif', letterSpacing: '0.05em' }}>JAMA Assistant</div>
              <div className="text-xs text-green-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online · Mechanical & Engineering Works
              </div>
            </div>
            <div className="flex gap-1">
              {view === 'chat' && messages.length > 1 && (
                <button onClick={reset} aria-label="New conversation"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-white/50 hover:text-white hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  <RotateCcw size={13} />
                </button>
              )}
              <button onClick={() => setOpen(false)} aria-label="Close chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-white/70 hover:text-white hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MENU VIEW */}
          {view === 'menu' && (
            <div className="flex-1 overflow-y-auto">
              {/* Welcome bubble */}
              <div className="p-5 pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)' }}>J</div>
                  <div className="rounded-2xl rounded-tl-none px-4 py-3 text-sm text-white/80 leading-relaxed"
                    style={{ background: 'rgba(13,42,110,0.15)', border: '1px solid rgba(13,42,110,0.2)' }}>
                    👋 Welcome to <strong className="text-white">Jaman Engineering Works Limited</strong>!
                    <span className="block text-white/45 text-xs mt-1">Kenya's premier mechanical & engineering company</span>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="px-4 pb-3 space-y-2">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase px-1 mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>Quick Options</p>
                {MENU_ITEMS.map(item => (
                  <button key={item.id} onClick={() => goToChat(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200 group"
                    style={{
                      background: item.primary ? 'rgba(13,42,110,0.18)' : 'rgba(255,255,255,0.04)',
                      border: item.primary ? '1px solid rgba(13,42,110,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,42,110,0.22)'; e.currentTarget.style.borderColor = 'rgba(13,42,110,0.5)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = item.primary ? 'rgba(13,42,110,0.18)' : 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = item.primary ? 'rgba(13,42,110,0.4)' : 'rgba(255,255,255,0.06)' }}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        {item.label}
                        {item.primary && <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest" style={{ background: '#0d2a6e', color: 'white' }}>PRIMARY</span>}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>{item.desc}</div>
                    </div>
                    <ChevronRight size={13} className="text-white/20 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </button>
                ))}

                <button onClick={() => goToChat('open')}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all"
                  style={{ background: 'rgba(204,26,26,0.08)', border: '1px solid rgba(204,26,26,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(204,26,26,0.14)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(204,26,26,0.08)' }}
                >
                  <div>
                    <div className="text-sm font-semibold text-white">💬 Ask Anything</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>Type your own question</div>
                  </div>
                  <ChevronRight size={13} style={{ color: '#cc1a1a' }} />
                </button>
              </div>

              {/* Direct contact strip */}
              <div className="px-4 pb-5">
                <div className="rounded-xl px-4 py-3.5 space-y-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>Direct Contact</p>
                  <a href="tel:+254733315621" className="flex items-center gap-2 text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <Phone size={11} style={{ color: '#cc1a1a' }} /> +254 733 315 621
                  </a>
                  <a href="mailto:info@jamanengineering.co.ke" className="flex items-center gap-2 text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <Mail size={11} style={{ color: '#0d2a6e' }} /> info@jamanengineering.co.ke
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* CHAT VIEW */}
          {view === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(13,42,110,0.4) transparent' }}>
                {messages.map((m, i) => <Msg key={i} msg={m} />)}
                {loading && <TypingDots />}
                <div ref={endRef} />
              </div>

              {/* Quick chips */}
              {messages.length <= 2 && !loading && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {CHIPS.map(c => (
                    <button key={c} onClick={() => send(c)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all hover:text-white"
                      style={{ background: 'rgba(13,42,110,0.12)', border: '1px solid rgba(13,42,110,0.2)', color: 'rgba(255,255,255,0.55)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,42,110,0.22)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,42,110,0.12)' }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                    placeholder="Ask about HVAC, pipework, quotes…"
                    aria-label="Type your message"
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none text-white placeholder-white/25"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(13,42,110,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' }}
                  />
                  <button onClick={() => send()} disabled={!input.trim() || loading}
                    aria-label="Send message"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
                    style={{ background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)' }}>
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  </button>
                </div>
                <p className="text-[10px] text-center mt-2" style={{ color: 'rgba(255,255,255,0.16)' }}>
                  JAMA · Built-in AI · No data stored · No API key required
                </p>
              </div>
            </>
          )}
        </div>
      )}

    </>
  )
}
