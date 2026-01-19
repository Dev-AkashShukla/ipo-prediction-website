// src/app/page.js - Performance Optimized Version
import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';

// Lazy load below-the-fold components with loading states
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection'), {
  loading: () => <div className="h-96 bg-white" />,
  ssr: false, // Client-side only for better performance
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
      {/* Above the fold - loads immediately */}
      <HeroSection />
      <StatsSection />
      
      {/* Below the fold - lazy loaded */}
      <FeaturesSection />
      <HowItWorks />
      <AppScreenshots />
      <CTASection />
    </>
  );
}