// src/app/editorial-policy/page.js
import Link from 'next/link';
import { BookOpen, CheckCircle, ShieldCheck, AlertTriangle, RefreshCw, Users } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy | FINNOTIA',
  description:
    'Learn how FINNOTIA researches, writes, and reviews financial content. Our editorial standards ensure accuracy, transparency, and SEBI compliance.',
  alternates: { canonical: 'https://finnotia.com/editorial-policy' },
  robots: { index: true, follow: true },
};

const principles = [
  {
    icon: CheckCircle,
    color: '#065f46',
    bg: '#d1fae5',
    title: 'Accuracy First',
    body:
      'Every article is grounded in public financial data, verified market reports, and credible economic sources. We do not publish unverified claims or speculation presented as fact.',
  },
  {
    icon: ShieldCheck,
    color: '#1e40af',
    bg: '#dbeafe',
    title: 'SEBI Compliance',
    body:
      'Finnotia is an educational data platform, not a SEBI-registered investment advisor. Our content is clearly labelled as informational and never constitutes personalised investment advice.',
  },
  {
    icon: RefreshCw,
    color: '#92400e',
    bg: '#fef3c7',
    title: 'Regular Updates',
    body:
      'Financial markets evolve quickly. Articles that reference time-sensitive data (prices, policy rates, fund NAVs) are reviewed and updated periodically to reflect the latest publicly available information.',
  },
  {
    icon: Users,
    color: '#5b21b6',
    bg: '#ede9fe',
    title: 'Editorial Independence',
    body:
      'Our editorial team operates independently of commercial interests. No advertiser, sponsor, or third party influences the topics we cover or the conclusions we reach.',
  },
  {
    icon: AlertTriangle,
    color: '#991b1b',
    bg: '#fee2e2',
    title: 'Corrections Policy',
    body:
      'When an error is identified — whether factual, statistical, or interpretive — we correct it promptly and transparently. Significant corrections are noted within the article.',
  },
  {
    icon: BookOpen,
    color: '#374151',
    bg: '#f3f4f6',
    title: 'Source Transparency',
    body:
      'We cite our primary sources wherever possible. These include NSE/BSE filings, RBI publications, Ministry of Finance reports, company press releases, and globally recognised financial news organisations.',
  },
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
    <div className="min-h-screen bg-[#f8f7f4] pt-16" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Hero ── */}
      <div className="bg-[#0c1e35] px-5 pt-14 pb-16 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c8421e 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#f8f7f4] rounded-t-3xl" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 mb-5">
            <BookOpen className="w-3 h-3 text-white/50" strokeWidth={2} />
            <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">
              Editorial Policy
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-3">
            How We Research,<br />
            <em className="text-[#c8421e] not-italic italic">Write & Review</em>
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Finnotia is committed to delivering accurate, transparent, and SEBI-compliant financial
            content. This page explains the standards our editorial team follows.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Intro box */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Finnotia</span> publishes data-driven analysis
            across global markets, macroeconomics, IPOs, commodities, and corporate finance. Our editorial
            mission is simple: help readers understand complex financial events clearly and confidently —
            without hype, speculation, or conflict of interest.
          </p>
        </div>

        {/* Principles grid */}
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-5">Our Editorial Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: p.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: p.color }} strokeWidth={2} />
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Content process */}
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Our Content Process</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 shadow-sm">
          <ol className="space-y-4">
            {[
              { step: '01', title: 'Topic Selection', body: 'Topics are selected based on market relevance, reader interest, and educational value. We do not accept paid placements that influence topic selection.' },
              { step: '02', title: 'Research & Data Gathering', body: 'Writers gather data from primary sources — official filings, regulatory announcements, and verified market data — before drafting begins.' },
              { step: '03', title: 'AI-Assisted Drafting', body: 'AI tools may assist in structuring and drafting content. All AI output is reviewed, fact-checked, and edited by a human author before publication.' },
              { step: '04', title: 'Editorial Review', body: 'A final review checks factual accuracy, disclaimer compliance, SEBI regulation alignment, and editorial tone before the article goes live.' },
              { step: '05', title: 'Post-Publication Monitoring', body: 'Published articles are monitored for accuracy. Significant corrections are applied promptly and documented within the article.' },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: '#0c1e35' }}
                >
                  {item.step}
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900 mb-0.5">{item.title}</div>
                  <div className="text-[13px] text-gray-500 leading-relaxed">{item.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Sources */}
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Primary Sources We Use</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10 shadow-sm">
          <ul className="space-y-2.5">
            {sources.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#c8421e] flex-shrink-0 mt-0.5" strokeWidth={2} />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-2xl px-5 py-5 mb-10"
          style={{ backgroundColor: '#0c1e35' }}
        >
          <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">Important Notice</div>
          <p className="text-white/80 text-[13px] leading-relaxed">
            Nothing published on Finnotia constitutes financial advice, investment recommendations, or
            endorsement of any securities or financial products. Finnotia is not registered with SEBI as
            an investment advisor. Always consult a qualified financial professional before making
            investment decisions.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-2">Editorial Contact</h3>
          <p className="text-[13px] text-gray-500 mb-3">
            For editorial queries, corrections, or feedback on our content standards, please reach out.
          </p>
          <a
            href="mailto:contact@finnotia.com"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#c8421e]"
          >
            contact@finnotia.com →
          </a>
        </div>

        {/* Breadcrumb back */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to Finnotia
          </Link>
        </div>
      </div>
    </div>
  );
}