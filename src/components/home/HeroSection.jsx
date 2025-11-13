'use client';
import { motion } from 'framer-motion';
import { Sparkles, Download, TrendingUp, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    // 'min-h-[90vh]' ko yahan se hata diya hai
    <section className="relative flex justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 pt-20 pb-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4A90E2] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-[#2E5CB8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-md mb-3 sm:mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-xs font-semibold text-gray-700">AI-Powered IPO Predictions</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight"
          >
            Master IPO Investing with <span className="bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A] bg-clip-text text-transparent">AI Predictions</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs sm:text-sm lg:text-base text-gray-600 mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Get AI-powered IPO predictions, real-time stock analysis, breaking market news, and mutual fund insights. Make informed investment decisions with intelligent analytics.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
          >
            <span className="px-3 py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              95% Accuracy
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-[#1E3A8A] rounded-full text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Real-Time Data
            </span>
            <span className="px-3 py-1 bg-blue-100 text-[#3B82F6] rounded-full text-xs font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure & Verified
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 sm:mb-8"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.finnotia"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-[#4A90E2] to-[#2E5CB8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Download from PlayStore
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
            <a
              href="#features"
              className="bg-white text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm border-2 border-gray-200 hover:border-[#2E5CB8] hover:text-[#2E5CB8] transition-all duration-300 flex items-center justify-center"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2E5CB8]">100K+</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1E3A8A]">24/7</div>
              <div className="text-xs text-gray-600">Live Updates</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3B82F6]">99%</div>
              <div className="text-xs text-gray-600">Uptime</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}