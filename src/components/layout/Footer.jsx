'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, AlertTriangle } from 'lucide-react';
import { APP_NAME, PLAY_STORE_URL, CONTACT_INFO } from '../../lib/constants';

const footerLinks = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how' },
    { name: 'Download App', href: PLAY_STORE_URL, external: true },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Founder', href: '/founder' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Delete Account', href: '/delete-account' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

export default function Footer() {
  const [year, setYear] = useState(2024);

  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // ✅ Early return AFTER all hooks
  if (pathname === '/holi') return null;

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Company Info */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image 
                src="/finnotia-logo.png" 
                alt={`${APP_NAME} Logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold">{APP_NAME}</span>
          </Link>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            AI-powered IPO tracking and stock market information platform. 
            Access real-time data and curated news for educational purposes.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Product */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Product</h3>
            <ul className="space-y-2">
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

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Contact</h3>
            <div className="space-y-2">
              <a 
                href={`mailto:${CONTACT_INFO.supportEmail}`} 
                className="flex items-center gap-2 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors"
              >
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="break-all">{CONTACT_INFO.supportEmail}</span>
              </a>
              <a 
                href={`mailto:${CONTACT_INFO.contactEmail}`} 
                className="flex items-center gap-2 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors"
              >
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="break-all">{CONTACT_INFO.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          {/* SEBI Disclaimer */}
          <div className="p-3 sm:p-4 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <h4 className="text-xs sm:text-sm font-bold text-yellow-500">Important Disclaimer</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">{APP_NAME}</strong> is an educational tool and{' '}
              <strong className="text-gray-300">NOT a SEBI registered investment advisor</strong>. 
              Data provided is for informational purposes only. Investments in securities market are subject to market risks. 
              Read all related documents carefully before investing.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {year} {APP_NAME}. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs text-center sm:text-right">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}