// src/app/page.js
// FIX #1: SSR enabled for all sections — Googlebot ab pura page dekhega
// CHANGE: ssr: false HATAYA from FeaturesSection, HowItWorks, CTASection
// StoriesSection aur AppScreenshots mein ssr:false rakha kyunki ye client-heavy hain

import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import LatestArticles from '../components/home/LatestArtciles';

// ✅ FeaturesSection — static content hai, SSR safe
import FeaturesSection from '../components/home/FeaturesSection';

// ✅ HowItWorks — static content hai, SSR safe
import HowItWorks from '../components/home/HowItWorks';

// ✅ CTASection — static content hai, SSR safe
import CTASection from '../components/home/CTASection';

// ⚠️ StoriesSection — API fetch karta hai client-side, ssr:false theek hai
// But loading placeholder mein meaningful text daalo for Googlebot
const StoriesSection = dynamic(() => import('../components/home/StoriesSection'), {
  loading: () => (
    <section className="py-7 sm:py-10 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Market Stories</h2>
        <p className="text-sm text-gray-500 mt-2">Loading latest market updates...</p>
      </div>
    </section>
  ),
  ssr: false,
});

// ⚠️ AppScreenshots — framer-motion heavy, ssr:false theek hai
// But loading placeholder mein meaningful text daalo
const AppScreenshots = dynamic(() => import('../components/home/AppScreenshots'), {
  loading: () => (
    <section className="py-10 sm:py-14 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Beautiful & Intuitive Design</h2>
        <p className="text-sm text-gray-500 mt-2">Modern interface designed for beginners and professionals alike.</p>
      </div>
    </section>
  ),
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      {/* Above the fold */}
      <HeroSection />
      <StoriesSection />
      <StatsSection />

      {/* Latest research articles */}
      <LatestArticles />

      {/* Below the fold — NOW SSR ENABLED */}
      <FeaturesSection />
      <AppScreenshots />
      <HowItWorks />
      
      <CTASection />
    </>
  );
}