'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how' },
    { name: 'Download App', href: 'https://play.google.com/store/apps/details?id=com.finnotia' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

// const socialLinks = [
//   { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
//   { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
//   { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
//   { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
// ];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Company Info Section */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image 
                src="/finnotia-logo.png" 
                alt="Finnotia Logo" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold">FINNOTIA</span>
          </Link>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            AI-powered IPO predictions and stock market analysis platform. Make smarter investment decisions with real-time data and intelligent insights.
          </p>
        </div>

        {/* Links Grid - Mobile Horizontal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-xs text-gray-400 hover:text-[#4A90E2] transition-colors duration-200 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
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

          {/* Legal Links */}
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

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold mb-3 text-[#4A90E2]">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:support@finnotia.com" className="flex items-center gap-2 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors">
                <Mail className="w-3 h-3" />
                <span>support@finnotia.com</span>
              </a>
              <a href="mailto:contact@finnotia.com" className="flex items-center gap-2 text-gray-400 hover:text-[#4A90E2] text-xs transition-colors">
                <Mail className="w-3 h-3" />
                <span>contact@finnotia.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} FINNOTIA. All rights reserved.
            </p>

            {/* Social Links */}
            {/* <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#4A90E2] hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}