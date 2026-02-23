// FILE: app/founder/page.js
// Route: finnotia.com/founder

import { seoConfig } from '../../lib/seo-metadata';
import { APP_NAME, GRADIENTS } from '../../lib/constants';
import Link from 'next/link';

export const metadata = {
  title: 'Akash Shukla - Founder of Finnotia | Software Developer & Content Creator',
  description:
    'Akash Shukla is the Founder of Finnotia, a Full Stack Developer, and a YouTube creator with 1M+ subscribers. Building AI-powered financial tools for India.',
  keywords: [
    'Akash Shukla',
    'Akash Shukla Finnotia',
    'Akash Shukla YouTube',
    'Akash Shukla developer',
    'Akash Shukla software engineer',
    'Akash Shukla Kolkata',
    'Finnotia founder',
  ],
  openGraph: {
    title: 'Akash Shukla - Founder of Finnotia',
    description:
      'Akash Shukla is the Founder of Finnotia, Full Stack Developer, and YouTube creator with 1M+ subscribers.',
    url: `${seoConfig.siteUrl}/founder`,
    type: 'profile',
    images: [
      {
        url: `${seoConfig.siteUrl}/akash-shukla.jpg`,
        width: 800,
        height: 800,
        alt: 'Akash Shukla - Founder of Finnotia',
      },
    ],
    profile: {
      firstName: 'Akash',
      lastName: 'Shukla',
      username: 'i_amakashs',
    },
  },
  twitter: {
    card: 'summary',
    title: 'Akash Shukla - Founder of Finnotia',
    description:
      'Founder of Finnotia | Full Stack Developer | YouTube Creator with 1M+ Subscribers',
    images: [`${seoConfig.siteUrl}/akash-shukla.jpg`],
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/founder`,
  },
};

export default function FounderPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
    name: 'Akash Shukla',
    givenName: 'Akash',
    familyName: 'Shukla',
    description:
      'Founder of Finnotia, Full Stack Developer, and YouTube content creator with over 1 million subscribers based in Kolkata, India.',
    url: `${seoConfig.siteUrl}/founder`,
    image: `${seoConfig.siteUrl}/akash-shukla.jpg`,
    jobTitle: 'Founder & Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Finnotia',
      url: seoConfig.siteUrl,
    },
    // ✅ PERSONAL social links - dono YouTube URLs (username + channel ID)
    sameAs: [
      'https://www.youtube.com/@i_amakashs',
      'https://www.youtube.com/channel/UCBGPCsbo4DHW8AplgzlWJmw',
      'https://www.linkedin.com/in/akash-shukla-dev/',
      'https://www.instagram.com/i_amakashs/',
    ],
    knowsAbout: [
      'Full Stack Development',
      'Next.js',
      'React',
      'Python',
      'FastAPI',
      'Azure',
      'MongoDB',
      'Firebase',
      'AI Development',
      'Indian Stock Market',
      'IPO Tracking',
      'Financial Technology',
      'Content Creation',
    ],
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressCountry: 'India',
    },
    award: [
      'YouTube Silver Play Button (100K Subscribers)',
      'YouTube Gold Play Button (1M Subscribers)',
    ],
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Finnotia',
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/finnotia-logo.png`,
    founder: {
      '@type': 'Person',
      '@id': `${seoConfig.siteUrl}/founder#akash-shukla`,
      name: 'Akash Shukla',
    },
    foundingDate: '2025',
    description:
      'AI-powered Indian market information platform for IPOs, stocks, mutual funds, and financial news.',
  };

  const highlights = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M12 2.5C12 2.5 8 6.5 8 12C8 14.5 9 17 9 17L12 15L15 17C15 17 16 14.5 16 12C16 6.5 12 2.5 12 2.5Z" fill="white"/>
          <circle cx="12" cy="10" r="2" fill="#3b82f6"/>
          <path d="M9 17L7 21L12 19L17 21L15 17" fill="white" opacity="0.8"/>
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      title: 'Founder of Finnotia',
      description: 'AI-powered IPO tracking & financial information platform for India',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
      title: 'Full Stack Developer',
      description: 'Expertise in Next.js, Python, FastAPI, Azure & MongoDB',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 sm:w-6 sm:h-6">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      iconBg: 'bg-[#FF0000]',
      title: '1M+ YouTube Subscribers',
      description: 'Creating tech & entertainment content',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
          <circle cx="12" cy="12" r="10" stroke="#000080" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="#000080"/>
          <g stroke="#000080" strokeWidth="0.8">
            <line x1="12" y1="2" x2="12" y2="10"/>
            <line x1="12" y1="14" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="10" y2="12"/>
            <line x1="14" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
          </g>
        </svg>
      ),
      iconBg: 'bg-gradient-to-b from-[#FF9933] via-white to-[#138808]',
      title: 'Building for India',
      description: 'Creating tools to simplify Indian financial markets',
    },
  ];

  const journey = [
    {
      year: '2026',
      title: 'On a Mission',
      description:
        'Focused on making Finnotia the go-to platform for Indian retail investors. Building in public, shipping fast, and helping people make better financial decisions.',
    },
    {
      year: '2025',
      title: 'Founded Finnotia',
      description:
        'Launched AI-powered IPO tracking platform to help Indians understand markets better.',
    },
    {
      year: '2024',
      title: 'Associate Software Engineer',
      description:
        'Worked at Indiminds Technology LLP building enterprise applications with React, FastAPI & Azure.',
    },
    {
      year: '2023',
      title: 'Started Professional Development',
      description:
        'Began full-stack development journey with React, Next.js, Python, and cloud technologies.',
    },
    {
      year: '2022',
      title: '1 Million YouTube Subscribers',
      description: 'YouTube channel crossed 1 million subscribers milestone.',
    },
  ];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-6 md:gap-12">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src="/akash-shukla.png"
                    alt="Akash Shukla - Founder of Finnotia"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg whitespace-nowrap">
                  ✓ Founder
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  Akash Shukla
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">
                  Founder of{' '}
                  <Link
                    href="/"
                    className={`font-bold bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent hover:underline`}
                  >
                    {APP_NAME}
                  </Link>{' '}
                  • Developer • Creator
                </p>

                {/* Social Links - ✅ UPDATED YouTube URL */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mt-4">
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@i_amakashs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="hidden xs:inline">1M+ Subscribers</span>
                    <span className="xs:hidden">1M+</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/akash-shukla-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/i_amakashs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              About Me
            </h2>
            <div className="max-w-none text-gray-600 space-y-3 sm:space-y-4 text-justify">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                I'm <strong className="text-gray-900">Akash Shukla</strong>, a Full Stack Developer and the
                founder of <strong className="text-gray-900">Finnotia</strong> — an AI-powered platform that
                helps Indians track and understand IPOs, stocks, and mutual funds
                with clarity.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Based in Kolkata, I specialize in building scalable web applications
                using Next.js, Python FastAPI, Azure, and MongoDB. I'm passionate
                about using technology to solve real-world problems, especially in
                the Indian financial space.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Outside of building tech products, I create content on YouTube where
                I've built a community of over 1 million subscribers. I share tech
                insights, startup journey updates, and entertaining content.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                My mission is simple — use technology to make complex things
                accessible to everyone, whether it's financial markets through
                Finnotia or tech knowledge through my content.
              </p>
            </div>
          </div>
        </section>

        {/* Highlights Grid - What I Do */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              What I Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  {/* Icon + Title in same line */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10 sm:pl-13">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey/Timeline */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              My Journey
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {journey.map((item, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex-grow pb-4 sm:pb-6 border-l-2 border-gray-200 pl-4 sm:pl-6 relative">
                    <div
                      className={`absolute -left-[5px] sm:-left-2 top-0 w-2 h-2 sm:w-4 sm:h-4 rounded-full ${
                        item.year === '2026'
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-blue-500'
                      }`}
                    ></div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section - ✅ UPDATED YouTube link */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Let's Connect
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Whether you want to discuss tech, startups, or just say hi — I'm
              always happy to connect with fellow builders and creators.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="https://www.youtube.com/@i_amakashs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe on YouTube
              </a>
              <Link
                href="/"
                className={`px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${GRADIENTS.primary} text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition-opacity`}
              >
                Check out Finnotia
              </Link>
            </div>

            {/* Contact Email */}
            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
              For business inquiries:{' '}
              <a
                href="mailto:contact@finnotia.com"
                className="text-blue-600 hover:underline"
              >
                contact@finnotia.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}