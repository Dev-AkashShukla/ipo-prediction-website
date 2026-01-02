'use client';
import { motion } from 'framer-motion';
import { Download, Smartphone, TrendingUp, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const steps = [
  {
    icon: Download,
    title: 'Download App',
    description: 'Get FINNOTIA from Google Play Store. Available for all Android devices.',
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    icon: Smartphone,
    title: 'Setup Account',
    description: 'Quick one-time setup to personalize your experience and preferences.',
    color: 'from-[#2E5CB8] to-[#3B82F6]',
  },
  {
    icon: TrendingUp,
    title: 'Explore Markets',
    description: 'Access real-time market data, stock analysis, news, and mutual fund insights.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Analyze & Learn',
    description: 'Use AI insights and market analysis to understand investment trends and make informed research decisions.',
    color: 'from-blue-500 to-indigo-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="Getting Started"
          title="Start in"
          highlightedText="4 Simple Steps"
          description="Getting started is easy. Download the app and begin your market research journey today."
        />

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-x-1/2 z-0" />
                )}

                {/* Card */}
                <div className="relative bg-white rounded-xl p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg transition-shadow duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#4A90E2] to-[#2E5CB8] text-white rounded-lg flex items-center justify-center text-base sm:text-lg font-bold shadow-md">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}