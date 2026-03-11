// FILE: app/founder/page.js
// Route: finnotia.com/founder

import { APP_NAME, GRADIENTS } from '../../lib/constants';
import {
  founderMetadata,
  personJsonLd,
  organizationJsonLd,
  highlights,
  journey,
  socialLinks,
} from '../../lib/founder-data';
import Link from 'next/link';

export const metadata = founderMetadata;

const highlightIcons = [
  <svg key="finnotia" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M12 2.5C12 2.5 8 6.5 8 12C8 14.5 9 17 9 17L12 15L15 17C15 17 16 14.5 16 12C16 6.5 12 2.5 12 2.5Z" fill="white"/>
    <circle cx="12" cy="10" r="2" fill="#3b82f6"/>
    <path d="M9 17L7 21L12 19L17 21L15 17" fill="white" opacity="0.8"/>
  </svg>,
  <svg key="dev" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="yt" viewBox="0 0 24 24" fill="white" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>,
  <svg key="india" viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
    <g stroke="white" strokeWidth="0.8">
      <line x1="12" y1="2" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="22" y2="12"/>
    </g>
  </svg>,
];

const socialIcons = {
  YouTube: (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: (
    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
};

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <div className="min-h-screen bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>

        {/* ── Hero ── */}
        <div className="bg-[#0c1e35] px-4 pt-8 pb-12 relative overflow-hidden">
          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4A90E2 0%, transparent 70%)', transform: 'translate(30%,-30%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#f8f7f4] rounded-t-3xl" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-5 md:gap-8">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                 <img 
  src="https://res.cloudinary.com/dy2ckihxj/image/upload/w_300,h_300,c_fill,f_auto,q_auto/v1773204265/ldjo3jgpipbcvru1c8iy.png" 
  alt="Akash Shukla - Founder of Finnotia" 
  className="w-full h-full object-cover" 
/>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap">
                  ✓ Founder
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 mb-2">
                  <span className="text-white/50 text-[9px] font-bold tracking-widest uppercase">Finnotia</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Akash Shukla</h1>
                <p className="text-white/50 text-xs sm:text-sm mb-3">
                  Founder of{' '}
                  <Link href="/" className="text-white/80 font-semibold hover:text-white transition-colors">
                    {APP_NAME}
                  </Link>{' '}
                  · Full Stack Developer · Creator
                </p>

                {/* Social links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2">
                  {socialLinks.map(({ label, href, className }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-white rounded-full text-[10px] sm:text-xs font-medium transition-all ${className}`}>
                      {socialIcons[label.includes('Subscribers') ? 'YouTube' : href.includes('linkedin') ? 'LinkedIn' : 'Instagram']}
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">

          {/* ── About ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">About Me</h2>
            <div className="text-gray-600 space-y-2.5 text-xs sm:text-sm leading-relaxed text-justify">
              <p>I'm <strong className="text-gray-900">Akash Shukla</strong>, a Full Stack Developer and the founder of <strong className="text-gray-900">Finnotia</strong> — an AI-powered platform that helps Indians track and understand IPOs, stocks, and mutual funds with clarity.</p>
              <p>Based in Kolkata, I specialize in building scalable web applications using Next.js, Python FastAPI, Azure, and MongoDB. I'm passionate about using technology to solve real-world problems, especially in the Indian financial space.</p>
              <p>Outside of building tech products, I create content on YouTube where I've built a community of over 1 million subscribers — sharing tech insights, startup journey updates, and entertaining content.</p>
              <p>My mission is simple: use technology to make complex things accessible to everyone, whether it's financial markets through Finnotia or tech knowledge through my content.</p>
            </div>
          </div>

          {/* ── What I Do ── */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-3">What I Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {highlightIcons[i]}
                    </div>
                    <h3 className="text-[13px] sm:text-sm font-bold text-gray-900 leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed pl-[37px] sm:pl-[42px]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Journey ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h2 className="text-base font-bold text-gray-900 mb-4">My Journey</h2>
            <div className="space-y-0">
              {journey.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${item.year === '2026' ? 'bg-green-500 ring-2 ring-green-200' : 'bg-[#0c1e35]'}`} />
                    {i < journey.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.year === '2026' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.year}
                      </span>
                      <h3 className="text-[13px] sm:text-sm font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Connect ── */}
          <div className="bg-[#0c1e35] rounded-xl p-4 sm:p-5 text-center">
            <h2 className="text-sm sm:text-base font-bold text-white mb-1.5">Let's Connect</h2>
            <p className="text-white/50 text-xs sm:text-sm mb-4 max-w-md mx-auto">
              Whether you want to discuss tech, startups, or just say hi — I'm always happy to connect with fellow builders and creators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-3">
              <a
                href="https://www.youtube.com/@i_amakashs"
                target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-lg text-xs font-semibold transition-all"
              >
                Subscribe on YouTube
              </a>
              <Link
                href="/"
                className="px-4 py-2 bg-white text-[#0c1e35] rounded-lg text-xs font-bold hover:bg-gray-100 transition-all"
              >
                Check out Finnotia →
              </Link>
            </div>
            <p className="text-white/30 text-[10px]">
              Business inquiries:{' '}
              <a href="mailto:contact@finnotia.com" className="text-white/60 hover:text-white transition-colors">
                contact@finnotia.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}