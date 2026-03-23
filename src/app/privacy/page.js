export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This includes your name, email address, phone number, company name, and project details. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to: respond to your enquiries and provide quotations; communicate with you about our services and projects; improve our website and services; comply with legal obligations; and send you relevant industry updates with your consent.' },
    { title: '3. Cookies and Tracking', content: 'We use cookies to improve your browsing experience. Functional cookies are required for the site to operate. Analytics cookies help us understand how visitors use our site. Marketing cookies may be used to show you relevant advertising. You can manage your cookie preferences through our Cookie Banner.' },
    { title: '4. Data Sharing', content: 'We do not sell, rent, or trade your personal information. We may share your data with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose information when required by law.' },
    { title: '5. Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.' },
    { title: '6. Data Retention', content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions are retained for 3 years.' },
    { title: '7. Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your data, and the right to data portability. To exercise these rights, contact us at privacy@jamanengineering.co.ke.' },
    { title: '8. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact: Jaman Engineering Works Limited, Nairobi, Kenya. Email: privacy@jamanengineering.co.ke. Phone: +254 733 315 621.' },
  ]

  return (
    <div>
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,15,0.98), rgba(13,42,110,0.6))' }} />
        <div className="absolute inset-0 grid-overlay" />
        <div className="section-container relative z-10 text-center">
          <h1 className="hero-title text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-white/50 text-sm">Last updated: December 2024</p>
        </div>
      </section>
      <section className="py-20">
        <div className="section-container max-w-4xl">
          <div className="glass-heavy rounded-3xl p-8 lg:p-12 space-y-8">
            <p className="opacity-70 leading-relaxed">
              Jaman Engineering Works Limited ("we", "us", "our") is committed to protecting your personal information in accordance with the Kenya Data Protection Act 2019 and applicable international standards.
            </p>
            {sections.map(s => (
              <div key={s.title}>
                <h2 className="text-xl font-black mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}>{s.title}</h2>
                <p className="opacity-65 leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
