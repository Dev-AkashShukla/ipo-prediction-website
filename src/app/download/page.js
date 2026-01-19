'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';
import { APP_NAME } from '../../lib/constants';
import DownloadSection from '../../components/ui/DownloadSection';

const features = [
  {
    icon: TrendingUp,
    title: 'Live IPO Tracking',
    description: 'Real-time GMP, subscription status, and listing dates',
  },
  {
    icon: Shield,
    title: 'Verified Data',
    description: 'AI-curated information from trusted sources',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Get notified about new IPOs and market updates',
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/30">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-400/15 to-indigo-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-15%] left-[-15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-12 lg:py-16 relative z-10">
        
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-[#2E5AAD] shadow-lg shadow-blue-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A90E2]" />
              </span>
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Available on Android</span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center mb-3 leading-tight"
          >
            Download {APP_NAME} <br />
            <span className="bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A] bg-clip-text text-transparent">
              Start Tracking Markets
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            Get instant access to AI-powered IPO tracking, real-time market data, 
            and curated financial news — all in one free educational app.
          </motion.p>

          {/* App Preview + Download Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-8 sm:mb-10">
            
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative h-[450px] sm:h-[500px] lg:h-[550px] flex items-center justify-center order-2 lg:order-1"
            >
              <div
                className="relative w-[240px] sm:w-[280px] h-[480px] sm:h-[560px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-gray-900 shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500"
                style={{
                  boxShadow: '30px 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 40px rgba(74, 144, 226, 0.1)',
                }}
              >
                <div className="w-full h-full relative overflow-hidden rounded-[30px] sm:rounded-[32px]">
                  <Image
                    src="/finnotia-app-download.png"
                    alt="Finnotia App Interface"
                    fill
                    sizes="(max-width: 640px) 240px, 280px"
                    className="object-cover object-center"
                    priority
                    quality={85}
                  />
                </div>
              </div>
            </motion.div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <DownloadSection
                variant="compact"
                title="Get Started Today"
                description="Download now and access powerful market tracking tools for free. iOS version coming soon!"
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto"
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#4A90E2]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="py-4 bg-white border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center px-4">
          Disclaimer: {APP_NAME} provides market data for educational purposes only. We are NOT SEBI registered. This is NOT investment advice.
        </p>
      </div>
    </div>
  );
}