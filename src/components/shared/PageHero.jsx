// components/shared/PageHero.jsx
// Reusable dark hero header — used by About, Crypto, Contact, Founder, etc.
// Matches the exact style of the About page hero.

import Link from 'next/link';

/**
 * @param {string}   badge        - Small label above title e.g. "Financial Data Platform"
 * @param {string}   title        - Plain part of the title e.g. "Track"
 * @param {string}   titleHighlight - Gradient-highlighted part e.g. "Cryptocurrency"
 * @param {string}   subtitle     - Description below title
 * @param {Array}    stats        - Optional array of { value, label } for stats row
 * @param {ReactNode} breadcrumb  - Optional breadcrumb element
 * @param {string}   accentColor  - Optional custom accent for radial glow (default blue)
 */
export default function PageHero({
  badge,
  title,
  titleHighlight,
  titleAfter,
  subtitle,
  stats = [],
  breadcrumb,
  accentColor = '#4A90E2',
}) {
  return (
    <div className="bg-[#0c1e35] px-4 pt-8 pb-12 relative overflow-hidden">

      {/* Radial glow — top right */}
      <div
        className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />
      {/* Radial glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* White rounded curve at bottom — matches about page */}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#f8f7f4] rounded-t-3xl" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">

        {/* Optional breadcrumb */}
        {breadcrumb && (
          <div className="mb-3 flex justify-center">{breadcrumb}</div>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
            <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
          {title && <span>{title} </span>}
          {titleHighlight && (
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)' }}
            >
              {titleHighlight}
            </span>
          )}
          {titleAfter && <span> {titleAfter}</span>}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/40 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Optional stats row */}
        {stats.length > 0 && (
          <div
            className="grid gap-2 mt-5 max-w-sm mx-auto"
            style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-1">
                <div className="text-base sm:text-lg font-black text-white">{s.value}</div>
                <div className="text-[9px] text-white/40 mt-0.5 font-medium leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}