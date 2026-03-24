'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ArrowLeft, RotateCcw, Phone, Mail, ChevronRight, Loader2 } from 'lucide-react'

// ─── COLOURS (chatbot is always dark regardless of page theme) ────────────
const BG        = 'rgba(5,5,18,0.97)'
const BORDER    = 'rgba(13,42,110,0.45)'
const HDR       = 'linear-gradient(135deg,rgba(13,42,110,0.4),rgba(204,26,26,0.22))'
const AVATAR    = 'linear-gradient(135deg,#0d2a6e,#cc1a1a)'
const TXT       = '#f0f4ff'
const TXT_MID   = 'rgba(220,228,255,0.55)'
const TXT_FAINT = 'rgba(220,228,255,0.28)'
const BOT_BG    = 'rgba(13,42,110,0.22)'
const BOT_BD    = 'rgba(13,42,110,0.32)'
const USR_BG    = 'linear-gradient(135deg,#0d2a6e,#1a4a9e)'
const ITEM_BG   = 'rgba(255,255,255,0.05)'
const ITEM_BD   = 'rgba(255,255,255,0.08)'
const PRIM_BG   = 'rgba(13,42,110,0.25)'
const PRIM_BD   = 'rgba(13,42,110,0.5)'
const HOV_BG    = 'rgba(13,42,110,0.38)'
const HOV_BD    = 'rgba(13,42,110,0.6)'
const ASK_BG    = 'rgba(204,26,26,0.12)'
const ASK_BD    = 'rgba(204,26,26,0.28)'
const STRIP_BG  = 'rgba(255,255,255,0.05)'
const STRIP_BD  = 'rgba(255,255,255,0.08)'
const INP_BG    = 'rgba(255,255,255,0.07)'
const INP_BD    = 'rgba(255,255,255,0.1)'
const CHIP_BG   = 'rgba(13,42,110,0.18)'
const CHIP_BD   = 'rgba(13,42,110,0.28)'
const FAB_BG    = 'linear-gradient(135deg,#0d2a6e,#1a4a9e,#cc1a1a)'

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────
const PHONE     = '+254 733 315 621'
const EMAIL     = 'info@jamanengineering.co.ke'
const LOCATION  = 'Re-Plaza, Upper Hill, Nairobi'
const EMERGENCY = '+254 733 315 622'
const HOURS     = 'Mon-Sat, 8AM-6PM'

const SVC_MECH = [
  'HVAC - design, supply, install and AMC',
  'Industrial pipework and pressure vessels',
  'Mechanical equipment: pumps, compressors, boilers',
  'Industrial steel fabrication and welding',
  'Fire protection: sprinklers, gas suppression, hydrants',
  'Lifts, escalators and moving walkways',
  'Compressed air systems',
  'Planned Preventive Maintenance (PPM / AMC)',
]
const SVC_ELEC = [
  'LV/MV electrical installations',
  'Solar PV and renewable energy',
  'Building Management Systems (BMS)',
  'Generator supply, install and commissioning',
  'Street and outdoor lighting',
  'UPS and backup power',
]
const SVC_CIVIL = [
  'Residential, commercial and industrial buildings',
  'Roads, bridges and drainage',
  'Structural engineering and design',
  'Foundation and earthworks',
  'Renovation and fit-out',
]
const SVC_WATER = [
  'Water supply and distribution networks',
  'Sewerage and drainage systems',
  'Water treatment plant M&E',
  'Borehole pump installations',
]
const SVC_MAINT = [
  'Annual Maintenance Contracts (AMC)',
  'Planned Preventive Maintenance (PPM)',
  '24/7 emergency breakdown response',
  'HVAC servicing and re-gassing',
  'Generator load testing and servicing',
  'Fire system inspections and compliance',
]
const PROJECTS = [
  'Upper Hill Office Complex - Full M&E | KSh 650M (2023)',
  'Westlands Luxury Apartments - HVAC and Civil | KSh 280M (2023)',
  'Athi River Logistics Hub - Industrial Mechanical | KSh 320M (2022)',
  'Nakuru Water Treatment Plant - M&E and Civil | KSh 420M (2021)',
  'Thika Access Roads - Civil Infrastructure | KSh 180M (2022)',
  'Machakos County Buildings - Civil and M&E | KSh 240M (2021)',
]

// ─── REPLY ENGINE ─────────────────────────────────────────────────────────
function getReply(raw, historyLen) {
  const m = raw.toLowerCase()
  const h = function() {
    for (let i = 0; i < arguments.length; i++) {
      if (m.indexOf(arguments[i]) !== -1) return true
    }
    return false
  }

  if (h('hello','hi ','hey','good morning','good afternoon','hujambo','habari'))
    return 'Hello! Welcome to Jaman Engineering Works Limited.\n\nI am JAMA your virtual assistant. Our primary specialty is Mechanical Works (HVAC, pipework, fire systems, fabrication) plus electrical, civil and maintenance services.\n\nHow can I help you today?'

  if (h('thank','thanks','asante','appreciate'))
    return 'You are very welcome! Anything else I can help with?\n\nPhone: ' + PHONE

  if (h('bye','goodbye','kwaheri'))
    return 'Goodbye! Thank you for contacting Jaman Engineering.\nPhone: ' + PHONE

  if (h('quote','price','cost','how much','estimate','rate','fee','budget'))
    return 'Getting a Quote - FREE and Fast:\n\n1. Call/WhatsApp: ' + PHONE + '\n2. Email: ' + EMAIL + '\n3. Use the Contact form on our website\n\nFree site visits. Tailored quotes. 24hr response!'

  if (h('hvac','air condition','aircon','ventilation','cooling','chiller','ahu','fcu','vrf','split unit'))
    return 'HVAC - Our Core Specialty!\n\n- Split units, VRF/VRV, AHU, FCU systems\n- Chiller and cooling tower plants\n- Data centre and clean room cooling\n- Ducting fabrication and installation\n- Commissioning and testing\n- Annual maintenance contracts (AMC)\n\nCall for a free site survey: ' + PHONE

  if (h('plumb','pipe','pipework','water supply','drainage','sewage','booster'))
    return 'Plumbing and Pipework:\n\n- Cold and hot water distribution\n- High-pressure industrial pipework\n- Booster pump sets and pressure vessels\n- Sewerage and drainage networks\n- Pressure testing and commissioning'

  if (h('fire','sprinkler','suppression','hose reel','hydrant','riser','fm200'))
    return 'Fire Protection Systems:\n\n- Wet and dry riser systems\n- Automatic sprinklers\n- Gas suppression (FM200, CO2, Novec)\n- Fire hydrants and hose reels\n- KFRS-compliant installations\n- Annual service contracts'

  if (h('pump','submersible','centrifugal','borehole','fire pump'))
    return 'Pump Services:\n\n- Submersible and centrifugal pumps\n- Booster and fire pump sets\n- Borehole pumps\n\nBrands: Grundfos, KSB, Wilo, DAB\n\nMaintenance contracts available!'

  if (h('generator','genset','standby power','backup power','amf','load bank','kva'))
    return 'Generator Services:\n\n- Standby and prime generators 10kVA to 2000kVA\n- AMF/ATS changeover panels\n- Load bank testing\n- Annual maintenance\n\nBrands: Perkins, Cummins, CAT, FG Wilson'

  if (h('solar','renewable','photovoltaic','off-grid','battery storage','inverter'))
    return 'Solar PV and Renewable Energy:\n\n- Grid-tied and off-grid solar PV\n- Battery storage systems\n- Hybrid solar and generator systems\n- Commercial and industrial rooftop'

  if (h('electric','wiring','panel','switchgear','lv ','mv ','transformer','bms ','ups '))
    return 'Electrical Works:\n\n' + SVC_ELEC.map(function(i) { return '- ' + i }).join('\n')

  if (h('maintenance','amc','ppm','preventive','breakdown','fault'))
    return 'Maintenance Contracts:\n\n' + SVC_MAINT.map(function(i) { return '- ' + i }).join('\n') + '\n\nPhone: ' + PHONE

  if (h('fabricat','weld','steel','metalwork','tank','vessel'))
    return 'Industrial Fabrication:\n\n- Structural steel fabrication\n- Pressure vessel fabrication\n- Custom pipe spools and supports\n- Stainless steel and MIG/TIG welding'

  if (h('lift','elevator','escalator'))
    return 'Lifts and Escalators:\n\n- Passenger lifts (6-2000kg)\n- Service and goods lifts\n- Escalators and moving walkways\n- DOSHS-compliant inspections\n\nPhone: ' + PHONE

  if (h('mechanical','compressor','boiler','m&e','mep','industrial'))
    return 'Mechanical Works - Our Primary Specialty:\n\n' + SVC_MECH.map(function(i) { return '- ' + i }).join('\n') + '\n\n15+ years. 50+ engineers. 200+ projects.\nPhone: ' + PHONE

  if (h('building','construct','civil','structural','road','bridge','renovation'))
    return 'Civil and Structural Works:\n\n' + SVC_CIVIL.map(function(i) { return '- ' + i }).join('\n')

  if (h('service','what do you do','offer','speciali','capability'))
    return 'Jaman Engineering Services:\n\nMECHANICAL WORKS (Primary)\n- HVAC, pipework, pumps, fire, fabrication\n\nElectrical Works\n- LV/MV, solar, BMS, generators\n\nCivil Construction\n- Buildings, roads, structural\n\nWater and Sanitation\n\nMaintenance AMC/PPM\n- 24/7 breakdown response\n\nWhich can I tell you more about?'

  if (h('project','portfolio','completed','previous','case study'))
    return 'Notable Projects:\n\n' + PROJECTS.map(function(p) { return '- ' + p }).join('\n')

  if (h('certif','nca','ebk','register','iso','osha','accredit'))
    return 'Our Accreditations:\n\n- NCA - National Construction Authority\n- EBK - Engineers Board of Kenya\n- ISO 9001:2015 Quality Management\n- OSHA Safety Compliance'

  if (h('where','location','address','upper hill','office','re-plaza'))
    return 'Our Location:\n\nRe-Plaza, Upper Hill, Nairobi, Kenya\n\nWe serve clients across all 47 counties of Kenya.'

  if (h('contact','call','phone','email','reach','whatsapp'))
    return 'Contact Jaman Engineering:\n\nPhone/WhatsApp: ' + PHONE + '\nEmail: ' + EMAIL + '\nLocation: ' + LOCATION + '\nHours: ' + HOURS + '\n\nEmergency 24/7: ' + EMERGENCY

  if (h('hour','open','close','working','available'))
    return 'Working Hours:\n\nMon-Sat: 8:00 AM - 6:00 PM EAT\nSunday: Closed\n\nEmergency 24/7:\n' + EMERGENCY

  if (h('about','history','founded','experience','company'))
    return 'About Jaman Engineering Works Limited:\n\nFounded 2009, Nairobi, Kenya\n\n- 15+ years of engineering excellence\n- 200+ completed projects\n- 50+ certified professionals\n- 98% client satisfaction\n\nNCA, EBK, ISO 9001, OSHA accredited'

  if (h('safe','safety','hse','ppe'))
    return 'Safety First - Always:\n\n- HSE officer on every site\n- Daily toolbox talks and mandatory PPE\n- Method statements and risk assessments\n- OSHA-compliant procedures\n- Zero major incidents in 5 years'

  if (h('warrant','guarantee','defect','liability'))
    return 'Warranty:\n\n12-month Defects Liability Period on all works. Extended warranties on mechanical plant per manufacturer specs. Full O&M documentation provided.'

  var opts = [
    'Could you tell me more about what you need? I am happy to help!\n\nPhone: ' + PHONE + '\nEmail: ' + EMAIL + '\n\nOur services:\n- Mechanical Works (HVAC, pipework, fire) - Primary\n- Electrical, Civil, Maintenance',
    'We specialise in:\n- Mechanical Works - our core specialty\n- Electrical installations\n- Civil and structural works\n- Maintenance and AMC\n\nWhat would you like to know more about?',
    'For the most accurate answer:\n\nPhone: ' + PHONE + ' (call or WhatsApp)\nEmail: ' + EMAIL + '\nHours: Mon-Sat, 8AM-6PM\n\nWe love talking engineering!',
  ]
  return opts[(historyLen || 0) % opts.length]
}

// ─── MENU DATA ────────────────────────────────────────────────────────────
var MENU = [
  { id: 'mechanical',  label: 'Mechanical Works',    emoji: '⚙️', desc: 'HVAC, pipework, fire, fabrication', primary: true },
  { id: 'electrical',  label: 'Electrical Works',    emoji: '⚡', desc: 'Power, solar, BMS, generators' },
  { id: 'civil',       label: 'Civil Construction',  emoji: '🏗️', desc: 'Buildings, roads, structures' },
  { id: 'water',       label: 'Water and Sanitation',emoji: '💧', desc: 'Treatment, supply, drainage' },
  { id: 'maintenance', label: 'Maintenance',         emoji: '🔧', desc: 'AMC, PPM, 24/7 response' },
  { id: 'quote',       label: 'Get a Quote',         emoji: '💰', desc: 'Free site consultation' },
  { id: 'contact',     label: 'Contact Us',          emoji: '📞', desc: 'Phone, email, location' },
]
var MENU_REPLY = {
  mechanical:  'Mechanical Works - Primary Specialty:\n\n' + SVC_MECH.map(function(i){return '- '+i}).join('\n') + '\n\n15+ years. 50+ engineers. 200+ projects.\nPhone: ' + PHONE,
  electrical:  'Electrical Works:\n\n' + SVC_ELEC.map(function(i){return '- '+i}).join('\n'),
  civil:       'Civil and Structural Works:\n\n' + SVC_CIVIL.map(function(i){return '- '+i}).join('\n'),
  water:       'Water and Sanitation:\n\n' + SVC_WATER.map(function(i){return '- '+i}).join('\n'),
  maintenance: 'Maintenance Contracts:\n\n' + SVC_MAINT.map(function(i){return '- '+i}).join('\n') + '\n\nPhone: ' + PHONE,
  quote:       'Getting a Quote - FREE:\n\n1. Call/WhatsApp: ' + PHONE + '\n2. Email: ' + EMAIL + '\n3. Contact form on the website\n\nFree site visits. Tailored quotes. 24hr response.',
  contact:     'Contact Jaman Engineering:\n\nPhone/WhatsApp: ' + PHONE + '\nEmail: ' + EMAIL + '\nLocation: ' + LOCATION + '\nHours: ' + HOURS + '\nEmergency: ' + EMERGENCY,
}
var CHIPS = ['HVAC systems', 'Get a quote', 'Maintenance AMC', 'Our projects', 'Find our office']

// ─── AVATAR ───────────────────────────────────────────────────────────────
function Avatar(props) {
  var size = props.size || 28
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: AVATAR, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: Math.round(size * 0.38),
      fontWeight: 900, color: '#fff', fontFamily: 'Barlow Condensed,sans-serif',
    }}>J</div>
  )
}

// ─── TYPING DOTS ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <Avatar />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
        background: BOT_BG, border: '1px solid ' + BOT_BD,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', background: '#5b9bd5', animation: 'bounceDot 1.1s 0s ease-in-out infinite' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', background: '#5b9bd5', animation: 'bounceDot 1.1s 0.18s ease-in-out infinite' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', background: '#5b9bd5', animation: 'bounceDot 1.1s 0.36s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

// ─── MESSAGE ──────────────────────────────────────────────────────────────
function Msg(props) {
  var msg = props.msg
  var isBot = msg.role === 'bot'
  var html = msg.content
    .replace(/\n/g, '<br/>')
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flexDirection: isBot ? 'row' : 'row-reverse', animation: 'slideUp 0.28s ease forwards' }}>
      {isBot && <Avatar />}
      <div
        style={{
          maxWidth: '82%', padding: '10px 14px', fontSize: '0.875rem', lineHeight: 1.6,
          borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          background: isBot ? BOT_BG : USR_BG,
          border: isBot ? ('1px solid ' + BOT_BD) : 'none',
          color: '#f0f4ff',
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

// ─── WELCOME POPUP ────────────────────────────────────────────────────────
function WelcomePopup(props) {
  return (
    <div style={{
      position: 'fixed', zIndex: 50, bottom: 88, right: 16,
      width: 'min(278px, calc(100vw - 32px))',
      animation: 'popIn 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards',
    }}>
      <div style={{
        borderRadius: 20, padding: 16,
        background: 'linear-gradient(145deg,rgba(8,10,28,0.98),rgba(13,42,110,0.92))',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: '1px solid rgba(13,42,110,0.6)',
        boxShadow: '0 24px 70px rgba(13,42,110,0.55)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <Avatar size={38} />
            <span style={{ position: 'absolute', bottom: -1, right: -1, width: 11, height: 11, background: '#4ade80', borderRadius: '50%', border: '2px solid #08091c' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', fontFamily: 'Barlow Condensed,sans-serif' }}>JAMA Assistant</div>
            <div style={{ fontSize: '0.72rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Online now
            </div>
          </div>
          <button onClick={props.onDismiss} aria-label="Dismiss"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4, fontSize: 14, lineHeight: 1 }}>
            ✕
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(220,228,255,0.82)', marginBottom: 14 }}>
          Hi! I am <strong style={{ color: '#fff' }}>JAMA</strong>, your Jaman Engineering assistant.
          Need help with HVAC, mechanical works or a free quote? Chat with me!
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={props.onOpen} style={{
            flex: 1, padding: '8px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(90deg,#0d2a6e,#cc1a1a)', color: '#fff',
            fontSize: '0.8rem', fontWeight: 700,
          }}>Chat with JAMA</button>
          <a href={'tel:' + PHONE.replace(/\s/g,'')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
          }} aria-label="Call us">
            <Phone size={14} />
          </a>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: -6, right: 28, width: 12, height: 12,
        transform: 'rotate(45deg)',
        background: 'rgba(13,42,110,0.92)',
        borderRight: '1px solid rgba(13,42,110,0.6)',
        borderBottom: '1px solid rgba(13,42,110,0.6)',
      }} />
    </div>
  )
}

// ─── ICON BUTTON ─────────────────────────────────────────────────────────
function IconBtn(props) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.label}
      style={{
        width: 32, height: 32, borderRadius: 10, flexShrink: 0,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: props.color || 'rgba(255,255,255,0.72)', transition: 'background 0.15s',
      }}
      onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.13)' }}
      onMouseLeave={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
    >
      {props.children}
    </button>
  )
}

// ─── MAIN CHATBOT ─────────────────────────────────────────────────────────
export default function ChatBot() {
  var openState     = useState(false)
  var open          = openState[0]
  var setOpen       = openState[1]

  var viewState     = useState('menu')
  var view          = viewState[0]
  var setView       = viewState[1]

  var messagesState = useState([])
  var messages      = messagesState[0]
  var setMessages   = messagesState[1]

  var loadingState  = useState(false)
  var loading       = loadingState[0]
  var setLoading    = loadingState[1]

  var popupState    = useState(false)
  var showPopup     = popupState[0]
  var setShowPopup  = popupState[1]

  var dismissState  = useState(false)
  var dismissed     = dismissState[0]
  var setDismissed  = dismissState[1]

  var inputValState = useState('')
  var inputVal      = inputValState[0]
  var setInputVal   = inputValState[1]

  var endRef   = useRef(null)
  var inputRef = useRef(null)

  // Show popup after 4s
  useEffect(function() {
    var t = setTimeout(function() {
      if (!open && !dismissed) setShowPopup(true)
    }, 4000)
    return function() { clearTimeout(t) }
  }, [open, dismissed])

  // Scroll to bottom
  useEffect(function() {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input
  useEffect(function() {
    if (open && view === 'chat') {
      setTimeout(function() {
        if (inputRef.current) inputRef.current.focus()
      }, 150)
    }
  }, [open, view])

  function openChat() {
    setOpen(true)
    setShowPopup(false)
  }

  function goToChat(id) {
    setView('chat')
    var welcome = 'Hi! I am JAMA - Jaman Engineering virtual assistant.\n\nOur primary specialty is Mechanical Works (HVAC, pipework, fire systems and more). How can I help you today?'
    var base = messages.length === 0 ? [{ role: 'bot', content: welcome }] : messages.slice()
    if (id && id !== 'open' && MENU_REPLY[id]) {
      setMessages(base.concat([{ role: 'bot', content: MENU_REPLY[id] }]))
    } else {
      setMessages(base)
    }
  }

  function send(override) {
    var text = ((typeof override === 'string' ? override : (inputRef.current ? inputRef.current.value : '')) || '').trim()
    if (!text || loading) return
    if (inputRef.current) inputRef.current.value = ''
    setInputVal('')
    var updated = messages.concat([{ role: 'user', content: text }])
    setMessages(updated)
    setLoading(true)
    // Defer off main thread to prevent INP
    setTimeout(function() {
      var delay = 600 + Math.min(text.length * 7, 900)
      setTimeout(function() {
        setLoading(false)
        setMessages(function(prev) {
          return prev.concat([{ role: 'bot', content: getReply(text, prev.length) }])
        })
      }, delay)
    }, 0)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(inputRef.current ? inputRef.current.value : '')
    }
  }

  function reset() {
    setMessages([])
    setView('menu')
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Welcome Popup */}
      {showPopup && !open && (
        <WelcomePopup
          onOpen={openChat}
          onDismiss={function() { setShowPopup(false); setDismissed(true) }}
        />
      )}

      {/* FAB button */}
      <div style={{ position: 'fixed', bottom: 20, right: 16, zIndex: 50 }}>
        {!open && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: '#0d2a6e', opacity: 0.4,
            animation: 'pulseRing 2.5s ease-out infinite',
          }} />
        )}
        <button
          onClick={function() { open ? setOpen(false) : openChat() }}
          aria-label={open ? 'Close chat' : 'Chat with JAMA'}
          aria-expanded={open}
          style={{
            position: 'relative', width: 56, height: 56, borderRadius: '50%',
            background: FAB_BG, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 6px 24px rgba(13,42,110,0.5), 0 2px 10px rgba(204,26,26,0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={function(e) { e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={function(e) { e.currentTarget.style.transform = 'scale(1)' }}
        >
          {open ? <X size={22} color="#fff" /> : <MessageCircle size={24} color="#fff" />}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="JAMA Jaman Engineering Assistant"
          aria-modal="true"
          className="jaman-chat-panel"
          style={{
            position: 'fixed', zIndex: 50,
            bottom: 84, left: 8, right: 8,
            maxHeight: 'calc(100dvh - 100px)',
            display: 'flex', flexDirection: 'column',
            borderRadius: 20,
            background: BG,
            backdropFilter: 'blur(48px) saturate(220%)',
            WebkitBackdropFilter: 'blur(48px) saturate(220%)',
            border: '1px solid ' + BORDER,
            boxShadow: '0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)',
            color: TXT,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 14px', flexShrink: 0,
            background: HDR,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            {view === 'chat' && (
              <IconBtn onClick={function() { setView('menu') }} label="Back to menu">
                <ArrowLeft size={15} color="currentColor" />
              </IconBtn>
            )}

            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Avatar size={36} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, background: '#4ade80', borderRadius: '50%', border: '2px solid #050512' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', fontFamily: 'Barlow Condensed,sans-serif', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                JAMA Assistant
              </div>
              <div style={{ fontSize: '0.7rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Online
              </div>
            </div>

            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              {view === 'chat' && messages.length > 1 && (
                <IconBtn onClick={reset} label="New conversation" color="rgba(255,255,255,0.5)">
                  <RotateCcw size={13} color="currentColor" />
                </IconBtn>
              )}
              <IconBtn onClick={function() { setOpen(false) }} label="Close">
                <X size={15} color="currentColor" />
              </IconBtn>
            </div>
          </div>

          {/* Menu view */}
          {view === 'menu' && (
            <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain' }}>
              {/* Welcome bubble */}
              <div style={{ padding: '14px 14px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Avatar />
                  <div style={{
                    borderRadius: '16px 16px 16px 4px', padding: '10px 14px',
                    background: BOT_BG, border: '1px solid ' + BOT_BD,
                    fontSize: '0.875rem', lineHeight: 1.55, color: TXT,
                  }}>
                    Welcome to{' '}
                    <strong style={{ color: '#fff' }}>Jaman Engineering Works Limited</strong>!
                    <span style={{ display: 'block', fontSize: '0.72rem', marginTop: 3, color: TXT_MID }}>
                      Kenya's premier mechanical and engineering company
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '0 10px 10px' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: TXT_FAINT, padding: '0 4px', marginBottom: 8 }}>
                  Quick Options
                </p>
                {MENU.map(function(item) {
                  return (
                    <button key={item.id}
                      onClick={function() { goToChat(item.id) }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '11px 12px', borderRadius: 12, marginBottom: 6, textAlign: 'left',
                        background: item.primary ? PRIM_BG : ITEM_BG,
                        border: '1px solid ' + (item.primary ? PRIM_BD : ITEM_BD),
                        cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = HOV_BG; e.currentTarget.style.borderColor = HOV_BD }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = item.primary ? PRIM_BG : ITEM_BG; e.currentTarget.style.borderColor = item.primary ? PRIM_BD : ITEM_BD }}
                    >
                      <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.emoji} {item.label}
                          </span>
                          {item.primary && (
                            <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: '#0d2a6e', color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.72rem', marginTop: 2, color: TXT_MID, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.desc}
                        </div>
                      </div>
                      <ChevronRight size={13} color={TXT_FAINT} style={{ flexShrink: 0 }} />
                    </button>
                  )
                })}

                {/* Ask anything */}
                <button
                  onClick={function() { goToChat('open') }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 12px', borderRadius: 12, textAlign: 'left', marginTop: 2,
                    background: ASK_BG, border: '1px solid ' + ASK_BD,
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(204,26,26,0.22)' }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = ASK_BG }}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>💬 Ask Anything</div>
                    <div style={{ fontSize: '0.72rem', marginTop: 2, color: TXT_MID }}>Type your own question</div>
                  </div>
                  <ChevronRight size={13} color="#cc1a1a" style={{ flexShrink: 0 }} />
                </button>
              </div>

              {/* Contact strip */}
              <div style={{ padding: '0 10px 14px' }}>
                <div style={{ borderRadius: 12, padding: '12px 14px', background: STRIP_BG, border: '1px solid ' + STRIP_BD }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TXT_FAINT, marginBottom: 8 }}>
                    Direct Contact
                  </p>
                  <a href={'tel:' + PHONE.replace(/\s/g,'')}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: TXT_MID, textDecoration: 'none', fontSize: '0.8rem', marginBottom: 6 }}
                    onMouseEnter={function(e) { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={function(e) { e.currentTarget.style.color = TXT_MID }}
                  >
                    <Phone size={12} color="#cc1a1a" /> {PHONE}
                  </a>
                  <a href={'mailto:' + EMAIL}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: TXT_MID, textDecoration: 'none', fontSize: '0.8rem' }}
                    onMouseEnter={function(e) { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={function(e) { e.currentTarget.style.color = TXT_MID }}
                  >
                    <Mail size={12} color="#5b9bd5" /> {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Chat view */}
          {view === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
                {messages.map(function(m, i) { return <Msg key={i} msg={m} /> })}
                {loading && <TypingDots />}
                <div ref={endRef} />
              </div>

              {/* Quick chips */}
              {messages.length <= 2 && !loading && (
                <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {CHIPS.map(function(c) {
                    return (
                      <button key={c}
                        onClick={function() { send(c) }}
                        style={{ fontSize: '0.75rem', padding: '6px 10px', borderRadius: 999, cursor: 'pointer', background: CHIP_BG, border: '1px solid ' + CHIP_BD, color: 'rgba(220,228,255,0.65)', transition: 'background 0.15s' }}
                        onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(13,42,110,0.3)'; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={function(e) { e.currentTarget.style.background = CHIP_BG; e.currentTarget.style.color = 'rgba(220,228,255,0.65)' }}
                      >
                        {c}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Input row */}
              <div style={{ padding: '10px 12px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    ref={inputRef}
                    type="text"
                    defaultValue=""
                    onChange={function(e) { setInputVal(e.target.value) }}
                    onKeyDown={handleKey}
                    placeholder="Ask about HVAC, pipework, quotes..."
                    aria-label="Type your message"
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 12, fontSize: '1rem', outline: 'none',
                      background: INP_BG, border: '1px solid ' + INP_BD,
                      color: '#f0f4ff', minWidth: 0,
                    }}
                    onFocus={function(e) { e.target.style.borderColor = 'rgba(13,42,110,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,42,110,0.2)' }}
                    onBlur={function(e) { e.target.style.borderColor = INP_BD; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    onClick={function() { send(inputRef.current ? inputRef.current.value : '') }}
                    disabled={!inputVal.trim() || loading}
                    aria-label="Send"
                    style={{
                      width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg,#0d2a6e,#cc1a1a)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      opacity: (!inputVal.trim() || loading) ? 0.4 : 1,
                      transition: 'opacity 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={function(e) { if (inputVal.trim() && !loading) e.currentTarget.style.transform = 'scale(1.07)' }}
                    onMouseLeave={function(e) { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {loading
                      ? <Loader2 size={15} color="#fff" style={{ animation: 'spin 1s linear infinite' }} />
                      : <Send size={15} color="#fff" />
                    }
                  </button>
                </div>
                <p style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: 6, color: 'rgba(255,255,255,0.15)' }}>
                  JAMA - Built-in AI - No API key required
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
