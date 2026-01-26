'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { PLAY_STORE_URL, APP_STORE_URL, APP_NAME, GRADIENTS } from '../../lib/constants';
import { AndroidIcon, AppleIcon } from '../ui/PlatformIcons';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'How It Works', href: '/#how' },
  { name: 'Contact', href: '/contact' },
  {name: 'About Us', href:'/about'}
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-10 h-10 relative">
                <Image 
                  src="/finnotia-logo.png" 
                  alt={`${APP_NAME} Logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#2E5CB8] transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2E5CB8] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
              
            {/* Download Dropdown - Right */}
            <div className="hidden md:block flex-shrink-0">
              <div className="relative">
                <button
                  onClick={() => setShowDownload(!showDownload)}
                  className={`flex items-center gap-2 bg-gradient-to-r ${GRADIENTS.primary} text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  Download
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDownload ? 'rotate-180' : ''}`} />
                </button>

                {showDownload && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDownload(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                      {/* Android - Working Link */}
                      <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors"
                        onClick={() => setShowDownload(false)}
                      >
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <AndroidIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-900">Android</div>
                          <div className="text-xs text-green-600">Download Now</div>
                        </div>
                      </a>

                      {/* iOS - Download Page Link */}
                      <Link
                        href={APP_STORE_URL}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDownload(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <AppleIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-700">iOS</div>
                          <div className="text-xs text-gray-500">Coming Soon</div>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#2E5CB8] transition-colors duration-200 relative z-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 relative z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-gray-700 hover:text-[#2E5CB8] transition-colors duration-200 py-2"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Download Section */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                {/* Android */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 bg-gradient-to-r ${GRADIENTS.primary} text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  onClick={() => setIsOpen(false)}
                >
                  <AndroidIcon className="w-6 h-6" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold">Download for Android</div>
                    <div className="text-xs opacity-80">Available Now</div>
                  </div>
                </a>

                {/* iOS */}
                <Link
                  href={APP_STORE_URL}
                  className="flex items-center gap-3 bg-white text-gray-700 px-4 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <AppleIcon className="w-6 h-6 text-gray-700" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-bold">Download for iOS</div>
                    <div className="text-xs text-gray-500">Coming Soon</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}