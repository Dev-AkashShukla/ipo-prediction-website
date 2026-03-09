'use client';
// src/components/layout/Footer.jsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, AlertTriangle } from 'lucide-react';
import { APP_NAME, PLAY_STORE_URL, CONTACT_INFO } from '../../lib/constants';

const footerLinks = {
  product: [
    { name: 'Features',     href: '/#features' },
    { name: 'How It Works', href: '/#how' },
    { name: 'Download App', href: PLAY_STORE_URL, external: true },
    { name: 'Web Stories',  href: '/stories' },
  ],
  company: [
    { name: 'About Us',  href: '/about' },
    { name: 'Founder',   href: '/founder' },
    { name: 'Blog',      href: '/blog' },
    { name: 'Contact Us',href: '/contact' },
    { name: 'Sitemap',   href: '/sitemap' },
  ],
  legal: [
    { name: 'Privacy Policy',   href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Editorial Policy', href: '/editorial-policy' },
    { name: 'Disclaimer',       href: '/disclaimer' },
    { name: 'Delete Account',   href: '/delete-account' },
  ],
};

// ── Social Icons (inline SVG — no extra dep) ─────────────────────
const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/finnotia',   // ← apna handle daal
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/finnotia', // ← apna handle daal
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/finnotia',              // ← apna handle daal
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@finnotia',        // ← apna handle daal
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const pathname = usePathname();

  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  if (pathname === '/holi') return null;

  return (
    <footer className="bg-black text-white pt-10 pb-5">
      <div className="container mx-auto px-4">

        {/* Top: Logo + Socials */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2.5 group">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                  src="/finnotia-logo.png"
                  alt={`${APP_NAME} Logo`}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold">{APP_NAME}</span>
            </Link>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
              AI-powered IPO tracking and stock market information platform for educational purposes.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10
                           flex items-center justify-center text-gray-400
                           hover:bg-[#2563EB]/20 hover:border-[#2563EB]/40 hover:text-[#60A5FA]
                           transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
          <div>
            <h3 className="text-xs font-bold mb-2.5 text-[#4A90E2] uppercase tracking-wide">Product</h3>
            <ul className="space-y-1.5">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-2.5 text-[#4A90E2] uppercase tracking-wide">Company</h3>
            <ul className="space-y-1.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-2.5 text-[#4A90E2] uppercase tracking-wide">Legal</h3>
            <ul className="space-y-1.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-2.5 text-[#4A90E2] uppercase tracking-wide">Contact</h3>
            <div className="space-y-1.5">
              <a
                href={`mailto:${CONTACT_INFO.supportEmail}`}
                className="flex items-center gap-1.5 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors"
              >
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="break-all">{CONTACT_INFO.supportEmail}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.contactEmail}`}
                className="flex items-center gap-1.5 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors"
              >
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="break-all">{CONTACT_INFO.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-5">
          {/* SEBI Disclaimer */}
          <div className="p-3 mb-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
            <div className="flex items-start gap-2 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <h4 className="text-[11px] font-bold text-yellow-500">Important Disclaimer</h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              <strong className="text-gray-300">{APP_NAME}</strong> is an educational tool and{' '}
              <strong className="text-gray-300">NOT a SEBI registered investment advisor</strong>.
              Data provided is for informational purposes only. Investments in securities market are subject to market risks.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-[11px] text-center sm:text-left">
              © {year} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-gray-600 text-[11px]">
              <Link href="/editorial-policy" className="hover:text-gray-400 transition-colors">Editorial Policy</Link>
              <Link href="/sitemap" className="hover:text-gray-400 transition-colors">Sitemap</Link>
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}