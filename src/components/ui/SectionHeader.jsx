'use client';
// src/components/ui/SectionHeader.jsx
// ── Consistent section header with new design tokens ─────────────

import { motion } from 'framer-motion';

/**
 * @param {string}  badge           – small label above heading e.g. "Features"
 * @param {string}  title           – main title text
 * @param {string}  highlightedText – blue gradient portion of title
 * @param {string}  description     – subtitle paragraph
 * @param {'light'|'dark'} theme    – 'light' (default) or 'dark' for dark-bg sections
 * @param {boolean} animate
 * @param {string}  className
 */
export default function SectionHeader({
  badge,
  title,
  highlightedText,
  description,
  theme = 'light',
  animate = true,
  className = '',
}) {
  const dark = theme === 'dark';

  const animProps = animate
    ? {
        initial:    { opacity: 0, y: 20 },
        whileInView:{ opacity: 1, y: 0 },
        viewport:   { once: true },
        transition: { duration: 0.55 },
      }
    : {};

  return (
    <motion.div
      {...animProps}
      className={`text-center mb-10 sm:mb-14 ${className}`}
    >
      {/* Badge pill */}
      {badge && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold
                      uppercase tracking-widest mb-3
                      ${dark
                        ? 'bg-[#2563EB]/20 text-[#93C5FD]'
                        : 'bg-[#DBEAFE] text-[#1E40AF]'
                      }`}
        >
          {badge}
        </span>
      )}

      {/* Heading */}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3
                    ${dark ? 'text-white' : 'text-[#0F172A]'}`}
      >
        {title}{' '}
        {highlightedText && (
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)' }}
          >
            {highlightedText}
          </span>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed
                      ${dark ? 'text-white/60' : 'text-[#64748B]'}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}