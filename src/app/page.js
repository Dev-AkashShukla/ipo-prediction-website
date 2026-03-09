// src/app/page.js
// UPDATED: LatestArticles section added after StoriesSection — homepage ab content-heavy hai

import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import LatestArticles from '../components/home/LatestArtciles';

const StoriesSection = dynamic(() => import('../components/home/StoriesSection'), {
  loading: () => <div className="h-64 bg-white" />,
  ssr: false,
});

const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection'), {
  loading: () => <div className="h-96 bg-white" />,
  ssr: false,
});

const HowItWorks = dynamic(() => import('../components/home/HowItWorks'), {
  loading: () => <div className="h-96 bg-gray-50" />,
  ssr: false,
});

const AppScreenshots = dynamic(() => import('../components/home/AppScreenshots'), {
  loading: () => <div className="h-96 bg-white" />,
  ssr: false,
});

const CTASection = dynamic(() => import('../components/home/CTASection'), {
  loading: () => <div className="h-64 bg-gradient-to-br from-[#4A90E2] to-[#1E3A8A]" />,
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      {/* Above the fold */}
      <HeroSection />
      <StoriesSection />
      <StatsSection />

      {/* ← NEW: Latest research articles — makes homepage content-heavy for AdSense */}
      <LatestArticles />

      {/* Below the fold */}
      <FeaturesSection />
      <HowItWorks />
      <AppScreenshots />
      <CTASection />
    </>
  );
}