// src/app/page.js - Replace with this optimized version
import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';

// CRITICAL: Lazy load components that are below the fold
const FeaturesSection = dynamic(() => import('../components/home/FeaturesSection'), {
  loading: () => <div className="py-12 bg-white min-h-[400px]" />,
});

const HowItWorks = dynamic(() => import('../components/home/HowItWorks'), {
  loading: () => <div className="py-12 bg-gray-50 min-h-[400px]" />,
});

const AppScreenshots = dynamic(() => import('../components/home/AppScreenshots'), {
  loading: () => <div className="py-12 bg-white min-h-[400px]" />,
});

const CTASection = dynamic(() => import('../components/home/CTASection'), {
  loading: () => <div className="py-12 bg-gradient-to-br from-[#4A90E2] to-[#1E3A8A] min-h-[300px]" />,
});

export default function HomePage() {
  return (
    <>
      {/* Hero loads immediately - most important */}
      <HeroSection />
      
      {/* These load when user scrolls - saves initial load time */}
      <FeaturesSection />
      <HowItWorks />
      <AppScreenshots />
      <CTASection />
    </>
  );
}