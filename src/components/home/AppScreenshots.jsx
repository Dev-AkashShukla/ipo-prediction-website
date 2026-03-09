'use client';
import { useEffect, useState, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, BarChart3, Newspaper, PieChart } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const screenshots = [
  {
    title: 'Live Dashboard',
    description: 'Market Activity Scanner',
    icon: BarChart3,
    image: 'marketdata.png',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    tilt: 'rotateY(18deg) rotateX(5deg) rotateZ(-2deg)',
    hoverTilt: 'rotateY(8deg) rotateX(2deg) rotateZ(-1deg)',
  },
  {
    title: 'AI Data',
    description: 'AI-Powered Market Data',
    icon: TrendingUp,
    image: 'stock.png',
    gradient: 'from-indigo-500 via-purple-600 to-purple-700',
    tilt: 'rotateY(-5deg) rotateX(3deg) rotateZ(1deg)',
    hoverTilt: 'rotateY(-2deg) rotateX(1deg) rotateZ(0deg)',
  },
  {
    title: 'Mutual Funds',
    description: 'Smart SIP Calculator',
    icon: PieChart,
    image: 'mutual_fund.png',
    gradient: 'from-cyan-500 via-blue-500 to-blue-600',
    tilt: 'rotateY(5deg) rotateX(-3deg) rotateZ(-1deg)',
    hoverTilt: 'rotateY(2deg) rotateX(-1deg) rotateZ(0deg)',
  },
  {
    title: 'News Feed',
    description: 'Real-time Updates',
    icon: Newspaper,
    image: 'news.png',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    tilt: 'rotateY(-18deg) rotateX(5deg) rotateZ(2deg)',
    hoverTilt: 'rotateY(-8deg) rotateX(2deg) rotateZ(1deg)',
  },
];

const PhoneMockup = memo(function PhoneMockup({ screen, index, reduceMotion }) {
  const [isHovered, setIsHovered] = useState(false);

  const currentTilt = reduceMotion
    ? 'none'
    : isHovered
      ? screen.hoverTilt
      : screen.tilt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Container */}
      <div
        className="relative transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: currentTilt, transformStyle: 'preserve-3d' }}
      >
        {/* Ground Shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[55%] h-4 bg-black/10 blur-xl rounded-[50%] transition-all duration-500"
          style={{ opacity: isHovered ? 0.2 : 0.1 }}
        />

        {/* Ambient Glow */}
        <div
          className={`absolute -inset-5 bg-gradient-to-br ${screen.gradient} rounded-[2.5rem] blur-2xl transition-opacity duration-500`}
          style={{ opacity: isHovered ? 0.28 : 0.1, transform: 'translateZ(-30px)' }}
        />

        {/* Phone Device */}
        <div className="relative w-[120px] sm:w-[140px] md:w-[155px] lg:w-[165px]">

          {/* Frame */}
          <div
            className="relative rounded-[1.6rem] sm:rounded-[1.8rem] p-[2.5px] shadow-xl transition-shadow duration-500"
            style={{
              background: 'linear-gradient(145deg, #4a4a4a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              boxShadow: isHovered
                ? '0 20px 45px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)'
                : '0 12px 30px -10px rgba(0,0,0,0.35)',
            }}
          >
            <div className="bg-black rounded-[1.45rem] sm:rounded-[1.65rem] p-[2px]">
              <div className="relative rounded-[1.35rem] sm:rounded-[1.55rem] overflow-hidden aspect-[9/19.5] bg-gray-900">

                {/* Dynamic Island */}
                <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="bg-black rounded-full flex items-center justify-center gap-1 px-3 py-0.5 sm:py-1"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.08)' }}
                  >
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-800 rounded-full ring-1 ring-gray-600" />
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* Screenshot */}
                <img
                  src={screen.image}
                  alt={screen.title}
                  className="absolute inset-0 w-full h-full object-cover object-top pt-4 sm:pt-5"
                  loading="lazy"
                  decoding="async"
                />

                {/* Glass Reflection */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' }}
                />

                {/* Hover wash */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${screen.gradient} pointer-events-none transition-opacity duration-500`}
                  style={{ opacity: isHovered ? 0.1 : 0 }}
                />

                <div className={`absolute inset-0 bg-gradient-to-br ${screen.gradient} -z-10`} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="absolute top-[22%] -right-[2px] w-[2.5px] h-8 rounded-l-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
          <div
            className="absolute top-[15%] -left-[2px] w-[2.5px] h-5 rounded-r-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
          <div
            className="absolute top-[26%] -left-[2px] w-[2.5px] h-9 rounded-r-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
        </div>
      </div>

      {/* Feature Info */}
      <motion.div
        className="mt-4 sm:mt-5 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        <div
          className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${screen.gradient} text-white mb-2 shadow-md transition-transform duration-300`}
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        >
          <screen.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 tracking-tight">
          {screen.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight">
          {screen.description}
        </p>
      </motion.div>
    </motion.div>
  );
});

export default function AppScreenshots() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <section className="py-10 sm:py-14 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="h-[400px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-10 sm:py-14 lg:py-18 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100" />

      {/* Decorative blurs — smaller & subtler */}
      <div className="absolute top-20 -left-16 w-56 h-56 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-16 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionHeader
          badge="App Preview"
          title="Beautiful &"
          highlightedText="Intuitive Design"
          description="Modern interface designed for beginners and professionals alike."
          className="mb-8 sm:mb-12 lg:mb-16"
        />

        {/* Phone Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 max-w-4xl mx-auto"
          style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}
        >
          {screenshots.map((screen, index) => (
            <PhoneMockup
              key={screen.title}
              screen={screen}
              index={index}
              reduceMotion={prefersReducedMotion ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}