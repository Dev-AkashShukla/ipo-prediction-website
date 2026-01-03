// src/app/page.js - Optimized Order
import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';
// ✅ Stats ko Static import rakho (Above fold content ke liye fast hota hai)
import StatsSection from '../components/home/StatsSection'; 

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
      {/* 1. Hero loads immediately */}
      <HeroSection />

      {/* 2. Stats immediately after Hero (Builds Trust) */}
      {/* Iska Dark Blue background Hero ke Light Blue ke sath mast contrast karega */}
      <StatsSection />
      
      {/* 3. Features (White Background) */}
      <FeaturesSection />

      {/* 4. How It Works (Gray Background) */}
      <HowItWorks />

      {/* 5. Screenshots (White/Gradient Background) */}
      <AppScreenshots />

      {/* 6. CTA (Dark Blue Background) - End of page action */}
      <CTASection />
    </>
  );
}