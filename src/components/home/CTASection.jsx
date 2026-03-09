'use client';
// src/components/home/CTASection.jsx

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Newspaper, PieChart } from 'lucide-react';
import { AndroidIcon, AppleIcon } from '../ui/PlatformIcons';
import { PLAY_STORE_URL, APP_STORE_URL } from '../../lib/constants';
import Link from 'next/link';

const features = [
  { icon: BarChart3,  label: 'Live Stock Data' },
  { icon: TrendingUp, label: 'IPO Tracker'     },
  { icon: PieChart,   label: 'Mutual Funds'    },
  { icon: Newspaper,  label: 'Market News'     },
];

export default function CTASection() {
  return (
    <section className="relative py-8 sm:py-14 overflow-hidden bg-[#0B0F19]">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Accent glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[180px] sm:w-[400px] sm:h-[260px] bg-[#2563EB] rounded-full blur-[100px] opacity-[0.07]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                     tracking-widest bg-[#2563EB]/15 text-[#93C5FD] mb-2.5"
        >
          Free Download
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2"
        >
          Start Tracking Markets{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)' }}
          >
            Smarter Today
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="text-[#94A3B8] text-xs sm:text-base max-w-sm sm:max-w-md mx-auto mb-4"
        >
          AI-curated market data, real-time stock updates, and financial news —
          all in one free platform.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-5"
        >
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full
                         bg-white/5 border border-white/10 text-white/55 text-[10px] sm:text-[11px] font-medium"
            >
              <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#60A5FA]" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Download buttons — ALWAYS side by side */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-row gap-2 sm:gap-3 justify-center items-center mb-4"
        >
          {/* Android */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]
                       text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl
                       shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                       hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <AndroidIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <div className="text-left">
              <div className="text-[8px] sm:text-[9px] opacity-80 leading-tight">Download for</div>
              <div className="text-[11px] sm:text-[13px] font-bold leading-tight">Android</div>
            </div>
          </a>

          {/* iOS */}
          <Link
            href={APP_STORE_URL}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15
                       text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl
                       hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <AppleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
            <div className="text-left">
              <div className="text-[8px] sm:text-[9px] opacity-60 leading-tight">Coming Soon for</div>
              <div className="text-[11px] sm:text-[13px] font-bold leading-tight">iOS</div>
            </div>
          </Link>
        </motion.div>

        {/* Trust line */}
        <p className="text-white/25 text-[10px]">
          100% Free · No Registration · Educational Purposes Only · Not SEBI Registered
        </p>

      </div>
    </section>
  );
}