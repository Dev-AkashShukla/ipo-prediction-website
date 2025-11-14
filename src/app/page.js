import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';
import AppScreenshots from '../components/home/AppScreenshots';
import StatsSection from '../components/home/StatsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <AppScreenshots />
      {/* <StatsSection /> */}
      <CTASection />
    </>
  );
}