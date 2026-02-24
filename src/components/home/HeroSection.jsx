'use client';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import GradientText from '../ui/GradientText';
import DownloadSection from '../ui/DownloadSection';


export default function HeroSection() {
  return (
    <section className="relative flex justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 pt-16 sm:pt-20 pb-4 sm:pb-6">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4A90E2] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-[#2E5CB8] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-[#3B82F6] rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white rounded-full shadow-md mb-2 sm:mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B82F6]" />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
              AI-Powered Market Information
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight"
          >
            Master Financial Markets with{" "}
            <GradientText>AI-Curated Data</GradientText>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Track IPOs, stocks, mutual funds, and market news using real-time
            data and structured AI-curated information — built to help you understand market
            trends clearly and confidently.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-6"
          >
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Market Information
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-indigo-100 text-[#1E3A8A] rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Real-Time Data
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-[#3B82F6] rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Verified Sources
            </span>
          </motion.div>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DownloadSection variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
