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
    image: 'stock.png',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    tilt: 'rotateY(18deg) rotateX(5deg) rotateZ(-2deg)',
    hoverTilt: 'rotateY(8deg) rotateX(2deg) rotateZ(-1deg)',
  },
  {
    title: 'AI Data',
    description: 'AI-Powered Market Data',
    icon: TrendingUp,
    image: 'ai_prediction.png',
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

// Memoized Phone Component for performance
const PhoneMockup = memo(function PhoneMockup({ screen, index, reduceMotion }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const currentTilt = reduceMotion 
    ? 'none' 
    : isHovered 
      ? screen.hoverTilt 
      : screen.tilt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Container with Perspective */}
      <div 
        className="relative transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: currentTilt,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Soft Shadow on "Ground" */}
        <div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-black/15 blur-2xl rounded-[50%] transition-all duration-500"
          style={{
            transform: `translateZ(-40px) scale(${isHovered ? 1.1 : 1})`,
            opacity: isHovered ? 0.25 : 0.15,
          }}
        />
        
        {/* Ambient Glow */}
        <div 
          className={`absolute -inset-8 bg-gradient-to-br ${screen.gradient} rounded-[3rem] blur-3xl transition-opacity duration-500`}
          style={{
            opacity: isHovered ? 0.35 : 0.15,
            transform: 'translateZ(-30px)',
          }}
        />

        {/* Phone Device */}
        <div className="relative w-[160px] sm:w-[180px] md:w-[210px] lg:w-[230px]">
          
          {/* Frame - Premium Metal Look */}
          <div 
            className="relative rounded-[2rem] sm:rounded-[2.5rem] p-[3px] shadow-2xl transition-shadow duration-500"
            style={{
              background: 'linear-gradient(145deg, #4a4a4a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              boxShadow: isHovered 
                ? '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' 
                : '0 20px 40px -15px rgba(0,0,0,0.4)',
            }}
          >
            {/* Inner Bezel */}
            <div className="bg-black rounded-[1.85rem] sm:rounded-[2.35rem] p-[2px]">
              
              {/* Screen */}
              <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden aspect-[9/19.5] bg-gray-900">
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 z-20">
                  <div 
                    className="bg-black rounded-full flex items-center justify-center gap-1.5 px-4 sm:px-5 py-1 sm:py-1.5 shadow-lg"
                    style={{ 
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)' 
                    }}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-800 rounded-full ring-1 ring-gray-600" />
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* Screenshot */}
                <img 
                  src={screen.image} 
                  alt={screen.title}
                  className="absolute inset-0 w-full h-full object-cover object-top pt-6 sm:pt-8"
                  loading="lazy"
                  decoding="async"
                />

                {/* Screen Glass Reflection */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, transparent 100%)',
                  }}
                />
                
                {/* Hover Color Wash */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t ${screen.gradient} pointer-events-none transition-opacity duration-500`}
                  style={{ opacity: isHovered ? 0.12 : 0 }}
                />

                {/* Fallback BG */}
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.gradient} -z-10`} />
              </div>
            </div>
          </div>

          {/* Physical Buttons */}
          <div 
            className="absolute top-[22%] -right-[2px] w-[3px] h-10 sm:h-12 rounded-l-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
          <div 
            className="absolute top-[15%] -left-[2px] w-[3px] h-6 sm:h-7 rounded-r-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
          <div 
            className="absolute top-[26%] -left-[2px] w-[3px] h-12 sm:h-14 rounded-r-sm"
            style={{ background: 'linear-gradient(180deg, #555 0%, #333 50%, #555 100%)' }}
          />
        </div>
      </div>

      {/* Feature Info */}
      <motion.div 
        className="mt-8 sm:mt-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.5 }}
      >
        {/* Icon Badge */}
        <div 
          className={`inline-flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br ${screen.gradient} text-white mb-3 shadow-lg transition-transform duration-300`}
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        >
          <screen.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
        </div>
        
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 tracking-tight">
          {screen.title}
        </h3>
        <p className="text-[11px] sm:text-xs lg:text-sm text-gray-500 font-medium">
          {screen.description}
        </p>
      </motion.div>
    </motion.div>
  );
});

export default function AppScreenshots() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash during hydration
  if (!mounted) {
    return (
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="h-[600px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100" />
      
      {/* Decorative Blurs */}
      <div className="absolute top-32 -left-20 w-80 h-80 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 -right-20 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-sky-100/30 to-transparent rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay - Subtle */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          badge="App Preview"
          title="Beautiful &"
          highlightedText="Intuitive Design"
          description="Experience a modern, user-friendly interface designed for both beginners and professionals."
          className="mb-14 sm:mb-18 lg:mb-24"
        />

        {/* 3D Phone Grid */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
          style={{ perspective: '2500px', perspectiveOrigin: '50% 50%' }}
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