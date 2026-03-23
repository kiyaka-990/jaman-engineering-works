import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatBot from '@/components/chatbot/ChatBot'
import CookieBanner from '@/components/ui/CookieBanner'
import BackToTop from '@/components/ui/BackToTop'
import AccessibilityMenu from '@/components/ui/AccessibilityMenu'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Jaman Engineering Works Limited | Mechanical & Civil Engineering Kenya',
  description: "Kenya's premier mechanical and engineering works company. HVAC, pipework, fire protection, civil construction. NCA Registered, EBK Accredited.",
  keywords: 'mechanical engineering Kenya, HVAC Nairobi, construction Kenya, Jaman Engineering',
  openGraph: {
    title: 'Jaman Engineering Works Limited',
    description: 'Premier mechanical and engineering works across Kenya.',
    type: 'website',
    url: 'https://jamanengineering.co.ke',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0d2a6e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Theme init script — must run BEFORE paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('jaman-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Jaman Engineering Works Limited',
              url: 'https://jamanengineering.co.ke',
              telephone: '+254733315621',
              email: 'info@jamanengineering.co.ke',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Re-Plaza, Upper Hill',
                addressLocality: 'Nairobi',
                addressCountry: 'KE',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:bg-brand-red focus:text-white"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ChatBot />
          <CookieBanner />
          <BackToTop />
          <AccessibilityMenu />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(13,13,30,0.95)',
                color: '#fff',
                border: '1px solid rgba(13,42,110,0.5)',
                backdropFilter: 'blur(20px)',
                fontFamily: 'Barlow, sans-serif',
                fontSize: '0.875rem',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
