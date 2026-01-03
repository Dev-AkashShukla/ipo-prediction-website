'use client';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Newspaper, BarChart3, Shield, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const features = [
  {
    icon: Brain,
    title: 'AI-Curated IPO Data',
    description: 'Access IPO information including GMP, subscription status, and listing dates in one place.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Stock Market Updates',
    description: 'Stay updated with market news, price movements, and trending stocks.',
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    icon: Newspaper,
    title: 'Curated Market News',
    description: 'Important market news aggregated from trusted financial sources.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Mutual Fund Information',
    description: 'Browse mutual fund data across equity, debt, and hybrid categories.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'No unnecessary data collection. Your usage and preferences stay private.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Timely Notifications',
    description: 'Get notified about new IPOs, market news, and important updates.',
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Features"
          title="Everything You Need to"
          highlightedText="Stay Informed"
          description="Access curated market data and news to support your own research and learning."
        />

        {/* Features Grid - same as before */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white border-2 border-gray-100 rounded-xl p-4 sm:p-5 hover:border-transparent hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10`} />
                <div className="absolute inset-0.5 bg-white rounded-xl -z-10" />

                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
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