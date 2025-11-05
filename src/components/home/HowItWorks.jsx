'use client';
import { motion } from 'framer-motion';
import { Download, Smartphone, TrendingUp, Zap } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Download App',
    description: 'Get FINNOTIA from Google Play Store. Available for all Android devices.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Smartphone,
    title: 'Setup Account',
    description: 'Quick one-time setup to personalize your experience and preferences.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Explore Markets',
    description: 'Access real-time market data, stock analysis, news, and mutual fund insights.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Make Smart Decisions',
    description: 'Use AI insights and market analysis to make informed investment decisions.',
    color: 'from-blue-500 to-indigo-500',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs font-semibold mb-3">
            Getting Started
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Start in <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">4 Simple Steps</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Getting started is easy. Download the app and begin your smart investing journey today.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="relative bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-md">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 text-center">
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