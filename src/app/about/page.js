// FILE: app/about/page.js
// Route: finnotia.com/about
// FIX #4 APPLIED: All "AI-powered/AI-curated/AI-First" references removed or replaced

import { pageMetadata, seoConfig } from '../../lib/seo-metadata';
import { APP_NAME, GRADIENTS } from '../../lib/constants';
import Link from 'next/link';
import { Target, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  openGraph: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    url: `${seoConfig.siteUrl}/about`,
    images: ['/og-image.png'],
  },
  twitter: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
  },
  alternates: { canonical: `${seoConfig.siteUrl}/about` },
};

// ── Static Data ───────────────────────────────────────────────
const stats = [
  { value: '📊',   label: 'Market Data' },
  { value: '5+',   label: 'Market Categories' },
  { value: '2025', label: 'Founded' },
  { value: '🇮🇳',  label: 'Built for India' },
];

const offerings = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M3 3h18v4H3zM3 10h12v4H3zM3 17h8v4H3z" fill="white" opacity="0.9"/>
        <circle cx="19" cy="19" r="3" fill="#60a5fa"/>
        <path d="M18 19h2M19 18v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    title: 'IPO Tracking',
    // FIX #4 CHANGE 4: was 'AI-curated IPO data using GMP...'
    description: 'Comprehensive IPO data including GMP, subscription status & market conditions with listing performance tracking.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    title: 'Stock Updates',
    description: 'Real-time stock updates based on news, sentiment analysis & prevailing market factors.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
        <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12h1M15 12h1M12 8v1M12 15v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: 'bg-gradient-to-br from-violet-500 to-violet-700',
    title: 'Mutual Funds',
    // FIX #4 CHANGE 5: was 'AI-curated mutual fund info...'
    description: 'Curated mutual fund info across equity, debt & hybrid categories with clear insights.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M4 4h16v2.5L12 13 4 6.5V4z" fill="white" opacity="0.9"/>
        <rect x="4" y="9" width="16" height="11" rx="1" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M9 15h6M9 18h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    title: 'Market News',
    // FIX #4 CHANGE 6: was 'Verified financial news with AI-curated alerts...'
    description: 'Verified financial news with curated alerts and notifications — no hype, no rumours.',
  },
];

const values = [
  { icon: Target,      iconColor: '#2563EB', iconBg: '#dbeafe', title: 'Clarity Over Noise',  description: 'Complex market data presented in simple, structured formats that anyone can understand.' },
  { icon: ShieldCheck, iconColor: '#059669', iconBg: '#d1fae5', title: 'Verified Data',        description: 'All information sourced from verified data providers with defined market logic.' },
  // FIX #4 CHANGE 7: was title: 'AI-First Approach', description: 'Machine learning and AI continuously...'
  { icon: Sparkles,    iconColor: '#7c3aed', iconBg: '#ede9fe', title: 'Data-First Approach',  description: 'Advanced systems continuously improve data accuracy and insight quality.' },
];

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: APP_NAME,
      // FIX #4 CHANGE 8: was 'AI-powered Indian market information platform...'
      description: 'Indian market information platform for IPOs, stocks, mutual funds, and verified financial news.',
      foundingDate: '2025',
      url: seoConfig.siteUrl,
      logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
      areaServed: 'IN',
      founder: {
        '@type': 'Person',
        '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
        name: 'Akash Shukla',
        url: `${seoConfig.siteUrl}/founder`,
        jobTitle: 'Founder',
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      <div className="min-h-screen bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>

        {/* ── Hero ── */}
        <div className="bg-[#0c1e35] px-4 pt-8 pb-12 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4A90E2 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#f8f7f4] rounded-t-3xl" />

          <div className="max-w-3xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
              {/* FIX #4 CHANGE 1: was "AI-Powered Financial Platform" */}
              <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">Financial Data Platform</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
              About{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)' }}
              >
                {APP_NAME}
              </span>
            </h1>
            {/* FIX #4 CHANGE 2: was "An AI-powered Indian market information platform..." */}
            <p className="text-white/40 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              An Indian market information platform — track IPOs, stocks, mutual funds,
              and financial news with clarity and zero hype.
            </p>

            {/* Stats row in hero */}
            <div className="grid grid-cols-4 gap-2 mt-5 max-w-sm mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-1">
                  <div className="text-base sm:text-lg font-black text-white">{s.value}</div>
                  <div className="text-[9px] text-white/40 mt-0.5 font-medium leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-5">

          {/* ── Mission ── */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Mission text */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2">Our Mission</h2>
              {/* FIX #4 CHANGE 3: was "...simplify complex market data using AI and present..." */}
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                Our mission is to simplify complex market data and present clear, unbiased,
                and structured information — so every Indian investor can understand market behavior
                without hype, rumours, or misleading tips.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-col gap-2">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: v.iconBg }}>
                    <v.icon className="w-3.5 h-3.5" style={{ color: v.iconColor }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[12px] font-bold text-gray-900">{v.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── What We Offer ── */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">What We Offer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {offerings.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed pl-[37px] sm:pl-[42px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Founder Card ── */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">The Team</h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                    <img
                      src="https://res.cloudinary.com/dy2ckihxj/image/upload/v1773204265/ldjo3jgpipbcvru1c8iy.png"
                      alt="Akash Shukla - Founder of Finnotia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow">
                    ✓ Founder
                  </div>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <Link
                    href="/founder"
                    className="text-sm font-black text-[#0c1e35] hover:text-[#4A90E2] transition-colors"
                  >
                    Akash Shukla
                  </Link>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5 mb-1.5">
                    Founder &amp; Full Stack Developer · Kolkata, India
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed text-justify">
                    Akash built {APP_NAME} to simplify complex market data for Indian retail investors.
                    With expertise in full-stack development, AI systems, and a YouTube community of 1M+
                    subscribers, his mission is to make financial information accessible and actionable.
                  </p>
                  <Link
                    href="/founder"
                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-[#4A90E2] hover:underline"
                  >
                    View full profile
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}