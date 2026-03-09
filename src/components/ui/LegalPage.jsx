'use client';
// src/components/ui/LegalPage.jsx
// ── Single reusable component for Disclaimer, Privacy & Terms ────
// Usage: <LegalPage data={legalContent.disclaimer} />

import {
  AlertTriangle, Shield, FileWarning, FileText,
  Mail, Lock, Info,
} from 'lucide-react';

// ── Icon resolver ─────────────────────────────────────────────────
const ICONS = { AlertTriangle, Shield, FileWarning, FileText, Mail, Lock, Info };
function Ico({ name, className }) {
  const C = ICONS[name] || FileText;
  return <C className={className} />;
}

// ── Color configs for boxes ───────────────────────────────────────
const BOX = {
  red:    { wrap: 'bg-red-50 border border-red-300',       head: 'text-red-900',    body: 'text-red-800'    },
  yellow: { wrap: 'bg-yellow-50 border border-yellow-300', head: 'text-yellow-900', body: 'text-yellow-800' },
  purple: { wrap: 'bg-purple-50 border border-purple-300', head: 'text-purple-900', body: 'text-purple-800' },
  blue:   { wrap: 'bg-blue-50 border-l-2 border-[#4A90E2]',head: 'text-[#2E5AAD]',  body: 'text-gray-700'   },
  green:  { wrap: 'bg-green-50 border border-green-300',   head: 'text-green-900',  body: 'text-green-800'  },
  amber:  { wrap: 'bg-amber-50 border border-amber-300',   head: 'text-amber-900',  body: 'text-amber-800'  },
  gray:   { wrap: 'bg-gray-50 border-l-2 border-gray-400', head: 'text-gray-900',   body: 'text-gray-700'   },
};

// ── Accent number badge color ─────────────────────────────────────
const NUM_BG = { red: 'bg-red-600', blue: 'bg-[#4A90E2]' };

// ── Subcomponents ─────────────────────────────────────────────────
function ContentBox({ color = 'blue', heading, body }) {
  const c = BOX[color] || BOX.blue;
  return (
    <div className={`${c.wrap} rounded-lg p-2.5 md:p-3`}>
      {heading && <p className={`font-bold mb-1 text-xs ${c.head}`}>{heading}</p>}
      <p className={`text-xs leading-relaxed ${c.body}`}>{body}</p>
    </div>
  );
}

function GridCells({ cells }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {cells.map((cell, i) => (
        <div key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 border border-blue-200">
          <h4 className="font-bold text-[#2E5AAD] mb-0.5 text-xs">{cell.icon} {cell.title}</h4>
          <p className="text-[11px] text-gray-600">{cell.body}</p>
        </div>
      ))}
    </div>
  );
}

function SectionItem({ item }) {
  if (item.type === 'box')  return <ContentBox color={item.color} heading={item.heading} body={item.body} />;
  if (item.type === 'grid') return <GridCells cells={item.cells} />;
  // type === 'text'
  return <p className="text-xs text-gray-700 leading-relaxed">{item.body}</p>;
}

// ── Top Banner ────────────────────────────────────────────────────
function TopBanner({ banner, accentColor }) {
  const isInfo    = banner.style === 'info';
  const isWarning = banner.style === 'warning';

  if (isInfo) return (
    <div className="bg-blue-50 border border-[#4A90E2] rounded-xl p-3 md:p-4 mb-4 shadow-sm">
      <div className="flex items-start gap-2 md:gap-3">
        <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#2E5AAD] flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xs md:text-sm font-bold text-[#2E5AAD] mb-1">{banner.title}</h2>
          <p className="text-gray-700 text-xs leading-relaxed">{banner.body}</p>
        </div>
      </div>
    </div>
  );

  if (isWarning) return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-3 md:p-4 mb-4 shadow-sm">
      <div className="flex items-start gap-2 md:gap-3">
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xs md:text-sm font-bold text-red-900 mb-1">{banner.title}</h2>
          <p className="text-red-800 text-xs leading-relaxed font-medium">{banner.body}</p>
        </div>
      </div>
    </div>
  );

  // default: solid gradient (red warning)
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-3 md:p-4 mb-4 shadow-md">
      <div className="flex items-start gap-2 md:gap-3">
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-xs md:text-sm font-bold mb-1">{banner.title}</h2>
          <p className="text-xs opacity-90 leading-relaxed">{banner.body}</p>
        </div>
      </div>
    </div>
  );
}

// ── Bottom Banner ─────────────────────────────────────────────────
function BottomBanner({ banner, accentColor }) {
  const isBlue = accentColor === 'blue';
  const grad   = isBlue
    ? 'from-[#4A90E2] to-[#2E5AAD]'
    : 'from-red-600 to-orange-600';

  return (
    <div className={`bg-gradient-to-r ${grad} p-3 md:p-4 rounded-b-xl text-white`}>
      <div className="flex items-start gap-2 md:gap-3">
        <Ico name={banner.icon} className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
        <div className="w-full">
          <h3 className="text-xs md:text-sm font-bold mb-1.5">{banner.title}</h3>

          {/* List lines (disclaimer final reminders) */}
          {banner.lines && (
            <ul className="space-y-0.5 mb-2">
              {banner.lines.map((line, i) => (
                <li key={i} className="text-xs opacity-90">{line}</li>
              ))}
            </ul>
          )}

          {/* Body text (privacy / terms) */}
          {banner.body && <p className="text-xs opacity-90 mb-1.5">{banner.body}</p>}

          <div className="mt-2 pt-2 border-t border-white/25 space-y-0.5">
            {banner.contact && (
              <p className="text-xs">
                <strong>Support:</strong>{' '}
                <a href={`mailto:${banner.contact}`} className="underline">{banner.contact}</a>
              </p>
            )}
            {banner.address && (
              <p className="text-xs opacity-80"><strong>Address:</strong> {banner.address}</p>
            )}
            <p className="text-xs opacity-70 mt-1"><strong>Effective:</strong> {banner.effective}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function LegalPage({ data }) {
  const numBg = NUM_BG[data.accentColor] || NUM_BG.blue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-3 mb-6 max-w-3xl">

        {/* ── Header ── */}
        <div className="text-center mb-4 md:mb-5">
          <div className={`inline-block p-1.5 rounded-lg mb-2 shadow-md ${
            data.accentColor === 'red'
              ? 'bg-gradient-to-br from-red-500 to-orange-600'
              : 'bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD]'
          }`}>
            <Ico name={data.icon} className="w-5 h-5 text-white" />
          </div>

          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            {data.title}{' '}
            <span className={`bg-clip-text text-transparent ${
              data.accentColor === 'red'
                ? 'bg-gradient-to-r from-red-600 to-orange-600'
                : 'bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD]'
            }`}>
              {data.highlight}
            </span>
          </h1>

          <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1
                          bg-gray-100 text-gray-500">
            {data.badge}
          </div>

          <p className="text-[11px] text-gray-500">Last Updated: {data.lastUpdated}</p>
        </div>

        {/* ── Top Banner ── */}
        {data.topBanner && <TopBanner banner={data.topBanner} accentColor={data.accentColor} />}

        {/* ── Sections ── */}
        <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
          <div className="p-3 md:p-5 space-y-4 md:space-y-5">
            {data.sections.map((sec) => (
              <section key={sec.num}>
                {/* Section heading */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className={`flex-shrink-0 w-5 h-5 ${numBg} text-white rounded text-[10px] flex items-center justify-center font-bold`}>
                    {sec.num}
                  </div>
                  <h2 className="text-sm md:text-base font-bold text-gray-900 leading-tight">{sec.title}</h2>
                </div>

                {/* Section content */}
                <div className="pl-7 space-y-2">
                  {sec.items.map((item, j) => (
                    <SectionItem key={j} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* ── Bottom Banner ── */}
          <BottomBanner banner={data.bottomBanner} accentColor={data.accentColor} />
        </div>

      </div>
    </div>
  );
}