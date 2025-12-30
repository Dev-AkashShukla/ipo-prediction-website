'use client';
import { motion } from 'framer-motion';
import { Sparkles, Download, TrendingUp, Shield, Zap } from 'lucide-react';
import { PLAY_STORE_URL, GRADIENTS } from '../../lib/constants';
import GradientText from '../ui/GradientText';

export default function HeroSection() {
  return (
    <section className="relative flex justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 pt-20 pb-10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-md mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-xs font-semibold text-gray-700">
              AI-Powered Market Insights
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            Understand IPOs & Markets with{" "}
            <GradientText>AI-Driven Insights</GradientText>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm lg:text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            Analyze IPOs, stocks, mutual funds, and market news using real-time
            data and structured AI analysis — built to help you understand market
            trends clearly and confidently.
          </motion.p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3 py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Market Analysis
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-[#1E3A8A] rounded-full text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Real-Time Data
            </span>
            <span className="px-3 py-1 bg-blue-100 text-[#3B82F6] rounded-full text-xs font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Verified Sources
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gradient-to-r ${GRADIENTS.primary} text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
            >
              Download from PlayStore
              <Download className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="bg-white text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm border-2 border-gray-200 hover:border-[#2E5CB8] hover:text-[#2E5CB8]"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
