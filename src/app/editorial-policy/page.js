// src/app/editorial-policy/page.js
import Link from 'next/link';
import { BookOpen, CheckCircle, ShieldCheck, AlertTriangle, RefreshCw, Users } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy | FINNOTIA',
  description: 'Learn how FINNOTIA researches, writes, and reviews financial content. Our editorial standards ensure accuracy, transparency, and SEBI compliance.',
  alternates: { canonical: 'https://finnotia.com/editorial-policy' },
  robots: { index: true, follow: true },
};

const principles = [
  { icon: CheckCircle,   color: '#065f46', bg: '#d1fae5', title: 'Accuracy First',          body: 'Every article is grounded in public financial data, verified market reports, and credible sources. We do not publish unverified claims or speculation presented as fact.' },
  { icon: ShieldCheck,   color: '#1e40af', bg: '#dbeafe', title: 'SEBI Compliance',          body: 'Finnotia is an educational data platform, not a SEBI-registered investment advisor. Our content is clearly labelled as informational and never constitutes personalised advice.' },
  { icon: RefreshCw,     color: '#92400e', bg: '#fef3c7', title: 'Regular Updates',          body: 'Articles referencing time-sensitive data (prices, policy rates, NAVs) are reviewed periodically to reflect the latest publicly available information.' },
  { icon: Users,         color: '#5b21b6', bg: '#ede9fe', title: 'Editorial Independence',   body: 'Our editorial team operates independently of commercial interests. No advertiser, sponsor, or third party influences topics we cover or conclusions we reach.' },
  { icon: AlertTriangle, color: '#991b1b', bg: '#fee2e2', title: 'Corrections Policy',       body: 'When an error is identified — factual, statistical, or interpretive — we correct it promptly. Significant corrections are noted within the article.' },
  { icon: BookOpen,      color: '#374151', bg: '#f3f4f6', title: 'Source Transparency',      body: 'We cite primary sources wherever possible: NSE/BSE filings, RBI publications, Ministry of Finance reports, company press releases, and recognised financial news organisations.' },
];

const steps = [
  { step: '01', title: 'Topic Selection',           body: 'Topics are selected based on market relevance, reader interest, and educational value. We do not accept paid placements that influence topic selection.' },
  { step: '02', title: 'Research & Data Gathering', body: 'Writers gather data from primary sources — official filings, regulatory announcements, and verified market data — before drafting begins.' },
  { step: '03', title: 'AI-Assisted Drafting',      body: 'AI tools may assist in structuring and drafting content. All AI output is reviewed, fact-checked, and edited by a human author before publication.' },
  { step: '04', title: 'Editorial Review',           body: 'A final review checks factual accuracy, disclaimer compliance, SEBI alignment, and editorial tone before the article goes live.' },
  { step: '05', title: 'Post-Publication Monitoring',body: 'Published articles are monitored for accuracy. Significant corrections are applied promptly and documented within the article.' },
];

const sources = [
  'NSE / BSE official filings and announcements',
  'Reserve Bank of India (RBI) publications',
  'Ministry of Finance and SEBI notifications',
  'Company press releases and investor relations pages',
  'Globally recognised financial news organisations',
  'Peer-reviewed economic research and white papers',
];

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Hero ── */}
      <div className="bg-[#0c1e35] px-4 pt-8 pb-12 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#f8f7f4] rounded-t-3xl" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-4">
            <BookOpen className="w-3 h-3 text-white/50" strokeWidth={2} />
            <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">Editorial Policy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-white leading-tight mb-2">
            How We Research,<br />
            <em className="text-[#c8421e] not-italic italic">Write & Review</em>
          </h1>
          <p className="text-white/40 text-xs sm:text-sm max-w-md leading-relaxed">
            Finnotia is committed to accurate, transparent, and SEBI-compliant financial content.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-4 py-7 sm:py-10 space-y-7">

        {/* Intro */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Finnotia</span> publishes data-driven analysis
            across global markets, macroeconomics, IPOs, commodities, and corporate finance. Our editorial
            mission: help readers understand complex financial events clearly and confidently — without hype,
            speculation, or conflict of interest.
          </p>
        </div>

        {/* Principles */}
        <div>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Our Editorial Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: p.bg }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: p.color }} strokeWidth={2} />
                  </div>
                  <h3 className="text-[13px] font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Our Content Process</h2>
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <ol className="space-y-3.5">
              {steps.map((item) => (
                <li key={item.step} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white bg-[#0c1e35]">
                    {item.step}
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{item.title}</div>
                    <div className="text-[12px] text-gray-500 leading-relaxed">{item.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sources */}
        <div>
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Primary Sources We Use</h2>
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <ul className="space-y-2">
              {sources.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[12px] text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-[#c8421e] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl px-4 py-4" style={{ backgroundColor: '#0c1e35' }}>
          <div className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-1.5">Important Notice</div>
          <p className="text-white/75 text-[12px] leading-relaxed">
            Nothing published on Finnotia constitutes financial advice, investment recommendations, or
            endorsement of any securities or financial products. Finnotia is not registered with SEBI as
            an investment advisor. Always consult a qualified financial professional before making
            investment decisions.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-1.5">Editorial Contact</h3>
          <p className="text-[12px] text-gray-500 mb-2.5">
            For editorial queries, corrections, or feedback on our content standards, please reach out.
          </p>
          <a href="mailto:contact@finnotia.com" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#c8421e]">
            contact@finnotia.com →
          </a>
        </div>

        <div className="text-center">
          <Link href="/" className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to Finnotia
          </Link>
        </div>
      </div>
    </div>
  );
}