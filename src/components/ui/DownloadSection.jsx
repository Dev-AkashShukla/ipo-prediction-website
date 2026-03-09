'use client';
// src/components/ui/DownloadSection.jsx
// ── Unified download buttons — consistent new palette ────────────

import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PLAY_STORE_URL, APP_STORE_URL } from '../../lib/constants';
import { AndroidIcon, AppleIcon } from './PlatformIcons';

/**
 * @param {'hero'|'compact'|'full'} variant
 * @param {'dark'|'light'}          theme     – parent bg colour
 */
export default function DownloadSection({
  variant    = 'default',
  theme      = 'light',    // 'dark' when inside navy sections
  title,
  description,
  className  = '',
}) {
  const dark = theme === 'dark';

  return (
    <div className={className}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-2xl sm:text-3xl font-bold mb-3
                      ${dark ? 'text-white' : 'text-[#0F172A]'}`}
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-sm sm:text-base mb-6 max-w-xl mx-auto
                      ${dark ? 'text-white/60' : 'text-[#64748B]'}`}
        >
          {description}
        </motion.p>
      )}

      {/* Buttons row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="flex flex-row gap-3 justify-center items-center mb-4"
      >
        {/* Android — always blue filled */}
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8]
                     text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold
                     shadow-md shadow-blue-500/20 hover:shadow-blue-500/35
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex-1 sm:flex-none sm:min-w-[190px] max-w-[200px] justify-center"
        >
          <AndroidIcon className="w-5 h-5 flex-shrink-0" />
          <div className="text-left">
            <div className="text-[9px] sm:text-[10px] opacity-75 leading-none">Download for</div>
            <div className="text-xs sm:text-sm font-bold leading-tight">Android</div>
          </div>
          <Download className="w-3.5 h-3.5 ml-auto hidden sm:block
                               group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* iOS — outlined */}
        <Link
          href={APP_STORE_URL}
          className={`group flex items-center gap-2.5
                     px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold border
                     hover:scale-105 active:scale-95 transition-all duration-200
                     flex-1 sm:flex-none sm:min-w-[190px] max-w-[200px] justify-center shadow-sm
                     ${dark
                       ? 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                       : 'bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#BFDBFE]'
                     }`}
        >
          <AppleIcon className={`w-5 h-5 flex-shrink-0 ${dark ? 'text-white' : 'text-[#0F172A]'}`} />
          <div className="text-left">
            <div className={`text-[9px] sm:text-[10px] leading-none ${dark ? 'opacity-50' : 'text-[#94A3B8]'}`}>
              Coming Soon for
            </div>
            <div className="text-xs sm:text-sm font-bold leading-tight">iOS</div>
          </div>
        </Link>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className={`flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs
                    ${dark ? 'text-white/40' : 'text-[#94A3B8]'}`}
      >
        {['100% Free', 'Quick Sign Up', 'Educational Tool'].map((t) => (
          <span key={t} className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}