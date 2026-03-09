// src/app/sitemap/page.js
// User-facing HTML sitemap (NOT the XML sitemap — that's handled by next-sitemap)

import Link from 'next/link';
import { Map, FileText, Scale, Building2, BookOpen, Tag } from 'lucide-react';

export const metadata = {
  title: 'Sitemap | FINNOTIA',
  description: 'Complete sitemap of Finnotia — navigate all pages including research articles, legal pages, and platform features.',
  alternates: { canonical: 'https://finnotia.com/sitemap' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    icon: Building2,
    color: '#1e40af',
    bg: '#dbeafe',
    title: 'Main Pages',
    links: [
      { name: 'Home', href: '/', desc: 'AI-powered market intelligence platform' },
      { name: 'About Us', href: '/about', desc: 'Our mission and story' },
      { name: 'Founder', href: '/founder', desc: 'Meet Akash Shukla, founder of Finnotia' },
      { name: 'Contact', href: '/contact', desc: 'Get in touch with us' },
      { name: 'Download App', href: '/download', desc: 'Get the Android app' },
    ],
  },
  {
    icon: BookOpen,
    color: '#065f46',
    bg: '#d1fae5',
    title: 'Research & Blog',
    links: [
      { name: 'All Articles', href: '/blog', desc: 'Full research library' },
      { name: 'Markets', href: '/category/markets', desc: 'Stock and equity market analysis' },
      { name: 'Economy', href: '/category/economy', desc: 'Macro and global economic coverage' },
      { name: 'Commodities', href: '/category/commodities', desc: 'Oil, gold, and commodity markets' },
      { name: 'Corporate', href: '/category/corporate', desc: 'M&A, earnings, and corporate news' },
      { name: 'Policy', href: '/category/policy', desc: 'Central bank and regulatory updates' },
      { name: 'IPO', href: '/category/ipo', desc: 'IPO analysis and tracking' },
      { name: 'Mutual Funds', href: '/category/mutual-funds', desc: 'Fund performance and analysis' },
    ],
  },
  {
    icon: FileText,
    color: '#5b21b6',
    bg: '#ede9fe',
    title: 'Platform Features',
    links: [
      { name: 'Web Stories', href: '/stories', desc: 'Latest market stories' },
      { name: 'App Features', href: '/#features', desc: 'What the Finnotia app offers' },
      { name: 'How It Works', href: '/#how', desc: 'Getting started guide' },
    ],
  },
  {
    icon: Scale,
    color: '#374151',
    bg: '#f3f4f6',
    title: 'Legal & Policies',
    links: [
      { name: 'Privacy Policy', href: '/privacy', desc: 'How we handle your data' },
      { name: 'Terms of Service', href: '/terms', desc: 'Platform terms and conditions' },
      { name: 'Disclaimer', href: '/disclaimer', desc: 'Investment risk disclaimer' },
      { name: 'Editorial Policy', href: '/editorial-policy', desc: 'Our editorial standards' },
      { name: 'Delete Account', href: '/delete-account', desc: 'Request account deletion' },
    ],
  },
];

export default function SitemapPage() {
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
            <Map className="w-3 h-3 text-white/50" strokeWidth={2} />
            <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">Sitemap</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-3">
            All Pages on <em className="text-[#c8421e] not-italic italic">Finnotia</em>
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            A complete directory of every page on our platform — from research articles to legal documents.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: section.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: section.color }} strokeWidth={2} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">{section.title}</span>
                </div>

                {/* Links */}
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group block"
                      >
                        <span className="text-[13px] font-semibold text-[#c8421e] group-hover:underline">
                          {link.name}
                        </span>
                        <span className="block text-[11px] text-gray-400 mt-0.5">{link.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400">
            Looking for machine-readable data?{' '}
            <a href="/sitemap.xml" className="text-[#c8421e] hover:underline">View XML Sitemap →</a>
          </p>
        </div>
      </div>
    </div>
  );
}