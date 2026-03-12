// components/shared/PageHero.jsx
// Reusable dark hero header — used by Blog, Stories, About, Crypto, Contact, etc.
//
// Props:
//  badge            string       - Small label above title e.g. "Finnotia Research"
//  badgeIcon        ReactNode    - Icon before badge text (e.g. <BookOpen />)
//  title            string       - Plain part of the title
//  titleHighlight   string       - Italic/colored part (rendered in accentColor or gradient)
//  titleAfter       string       - Plain text after highlight
//  titleStyle       'serif-italic' | 'gradient' | 'plain'
//                                - How to style titleHighlight
//                                  'serif-italic' → like Blog page (italic, accentColor)
//                                  'gradient'     → like your crypto/about page (blue gradient)
//                                  'plain'        → no special styling
//  subtitle         string       - Description below title
//  subtitleNode     ReactNode    - Custom subtitle if you need JSX
//  stats            Array        - [{ value, label, icon? }] for stats row
//  meta             ReactNode    - Bottom-left meta line (e.g. article count, date)
//  breadcrumb       ReactNode    - Optional breadcrumb element
//  accentColor      string       - Radial glow + italic color (default: '#c8421e' = Finnotia red)
//  bgBottom         string       - Color of the rounded bottom curve (default: '#f8f7f4')
//  align            'left'|'center' - Content alignment (default: 'left')
//  children         ReactNode    - Anything extra inside the hero

export default function PageHero({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  titleAfter,
  titleStyle = 'serif-italic',
  subtitle,
  subtitleNode,
  stats = [],
  meta,
  breadcrumb,
  accentColor = '#c8421e',
  bgBottom = '#f8f7f4',
  align = 'left',
  children,
}) {
  const isCenter = align === 'center';

  // Gradient for 'gradient' titleStyle
  const gradientStyle = {
    backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <div className="bg-[#0c1e35] px-4 pt-8 pb-14 relative overflow-hidden">

      {/* ── Radial glow top-right ── */}
      <div
        className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.06,
          transform: 'translate(35%, -35%)',
        }}
      />

      {/* ── Radial glow bottom-left ── */}
      <div
        className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.04,
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* ── Bottom rounded curve ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-5 rounded-t-3xl"
        style={{ background: bgBottom }}
      />

      {/* ── Content ── */}
      <div
        className={`max-w-4xl mx-auto relative z-10 ${isCenter ? 'text-center' : ''}`}
      >

        {/* Optional breadcrumb */}
        {breadcrumb && (
          <div className={`mb-3 ${isCenter ? 'flex justify-center' : ''}`}>
            {breadcrumb}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div
            className={`inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-4 ${
              isCenter ? 'justify-center' : ''
            }`}
          >
            {badgeIcon
              ? <span className="text-white/50 w-3 h-3">{badgeIcon}</span>
              : <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            }
            <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        {(title || titleHighlight || titleAfter) && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight mb-2">
            {title && <span>{title}</span>}

            {titleHighlight && (
              <>
                {title && <br />}
                {titleStyle === 'serif-italic' && (
                  <em
                    className="not-italic font-serif italic"
                    style={{ color: accentColor }}
                  >
                    {titleHighlight}
                  </em>
                )}
                {titleStyle === 'gradient' && (
                  <span style={gradientStyle}>{titleHighlight}</span>
                )}
                {titleStyle === 'plain' && (
                  <span>{titleHighlight}</span>
                )}
              </>
            )}

            {titleAfter && <span> {titleAfter}</span>}
          </h1>
        )}

        {/* Subtitle */}
        {subtitleNode
          ? subtitleNode
          : subtitle && (
              <p
                className={`text-white/35 text-xs sm:text-sm leading-relaxed ${
                  isCenter ? 'max-w-sm mx-auto' : 'max-w-md'
                }`}
              >
                {subtitle}
              </p>
            )
        }

        {/* Stats row */}
        {stats.length > 0 && (
          <div
            className={`grid gap-2 mt-5 ${isCenter ? 'max-w-sm mx-auto' : 'max-w-xs'}`}
            style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-1 text-center"
              >
                {s.icon && (
                  <div className="flex justify-center mb-1 text-white/40">{s.icon}</div>
                )}
                <div className="text-base sm:text-lg font-black text-white">{s.value}</div>
                <div className="text-[9px] text-white/40 mt-0.5 font-medium leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Meta line (e.g. "42 articles published") */}
        {meta && (
          <div className="mt-4 flex items-center gap-1.5 text-white/25 text-xs">
            {meta}
          </div>
        )}

        {/* Extra slot */}
        {children}
      </div>
    </div>
  );
}