'use client';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Bell, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Predictions',
    description: 'Advanced machine learning algorithms analyze market data to provide accurate IPO predictions with 95% accuracy rate.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Stock Analysis',
    description: 'Get live market data, technical analysis, and AI-generated insights for stocks and IPOs updated every second.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Never miss an opportunity with instant notifications for IPO launches, price movements, and breaking news.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Comprehensive Dashboard',
    description: 'Track your portfolio, view market trends, and analyze historical data all in one beautiful, intuitive interface.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level encryption ensures your data and investments are protected. We never sell your information.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance delivers market data and analysis in milliseconds, giving you the speed advantage.',
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools and intelligent insights designed to help you make smarter investment decisions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10`} />
                <div className="absolute inset-0.5 bg-white rounded-2xl -z-10" />

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
