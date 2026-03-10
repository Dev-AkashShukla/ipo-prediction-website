'use client';
// src/components/home/HeroSection.jsx
// ── Mobile-first hero — market insights + app as product ─────────
// FIXES APPLIED:
//   1. Badge: "AI-Powered Market Information" → "Real-Time Market Intelligence"
//   2. Heading: "AI-Curated Data" → "Smart Market Data"
//   3. Description: "structured AI-curated information" → "structured, verified information"

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';
import GradientText from '../ui/GradientText';
import HeroBg from '../ui/HeroBg';

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden
                 min-h-fit-content pt-4 pb-8 px-4
                 sm:pt-6 sm:pb-12 md:pt-10 md:pb-16"
      style={{
        background: [
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.11) 0%, transparent 65%)',
          '#02091A',
        ].join(', '),
      }}
    >
      {/* ── Canvas: market chart + stick people ── */}
      <HeroBg />

      {/* ── Vignette (keeps text readable) ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, rgba(2,9,26,0.68) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-[660px] mx-auto text-center flex flex-col items-center
                        gap-3 sm:gap-4 md:gap-5">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                       bg-[#2563EB]/15 border border-[#60A5FA]/25
                       text-[#93C5FD] text-[10px] sm:text-[11px] font-semibold tracking-wider"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
              style={{ boxShadow: '0 0 6px #22D3EE', animation: 'pulse 2s infinite' }}
            />
            {/* FIX #1: was "AI-Powered Market Information" */}
            Real-Time Market Intelligence
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[22px] sm:text-[32px] md:text-[42px] lg:text-[50px]
                       font-extrabold text-[#F0F6FF] leading-[1.15] tracking-tight"
          >
            Master Financial Markets{' '}
            <span className="block sm:inline">
              {/* FIX #2: was "AI-Curated Data" */}
              with <GradientText>Smart Market Data</GradientText>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[12px] sm:text-[14px] md:text-[15px] text-[#BAD0EB]/70
                       leading-[1.6] sm:leading-relaxed max-w-[520px] px-2 sm:px-0"
          >
            {/* FIX #3: was "structured AI-curated information" */}
            Track IPOs, stocks, mutual funds, and market news using real-time
            data and structured, verified information — built to help you
            understand market trends clearly and confidently.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
          >
            {[
              { icon: TrendingUp, label: 'IPO Tracking' },
              { icon: Zap,        label: 'Real-Time Data' },
              { icon: Shield,     label: 'Verified Sources' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full
                           bg-[#2563EB]/12 border border-[#2563EB]/22
                           text-[#93C5FD] text-[10px] sm:text-[11px] font-semibold"
              >
                <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row gap-2 sm:gap-3 justify-center flex-wrap"
          >
            {/* Primary: Explore Insights → blog/stories */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5
                         rounded-xl font-semibold text-[12px] sm:text-sm text-white
                         bg-gradient-to-r from-[#2563EB] to-[#0EA5E9]
                         hover:from-[#1D4ED8] hover:to-[#0284C7]
                         shadow-md shadow-blue-600/25 hover:shadow-blue-600/40
                         hover:scale-[1.03] active:scale-[0.97]
                         transition-all duration-200"
            >
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span>Explore Insights</span>
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>

            {/* Secondary: Get the App */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ipo.ipopredictor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5
                         rounded-xl font-semibold text-[12px] sm:text-[13px]
                         bg-white/[0.06] hover:bg-white/[0.1]
                         border border-white/12 hover:border-[#60A5FA]/40
                         text-slate-300 hover:text-[#93C5FD]
                         backdrop-blur-sm
                         hover:scale-[1.02] active:scale-[0.97]
                         transition-all duration-200"
            >
              <AndroidIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3DDC84] flex-shrink-0" />
              <span>Get the App</span>
              <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* ── Trust row ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1
                       text-[9px] sm:text-[11px] text-slate-500"
          >
            {['100% Free', 'Quick Sign Up', 'Educational Tool'].map((item) => (
              <span key={item} className="flex items-center gap-1">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Pulse keyframe for badge dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}

/* ── Inline Android icon (no extra import needed) ── */
function AndroidIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48A10.44 10.44 0 001 18h22a10.44 10.44 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
    </svg>
  );
}