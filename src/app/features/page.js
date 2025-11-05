'use client';
import { Brain, TrendingUp, Bell, BarChart3, Shield, Zap, Smartphone, Globe, Lock, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

const allFeatures = [
  {
    icon: Brain,
    title: 'AI IPO Predictions',
    description: 'Predict IPO listing gains, GMP trends, and subscription patterns with advanced ML algorithms. Get 95% accurate predictions on IPO performance before listing.',
    benefits: ['95% accuracy', 'GMP forecasts', 'Subscription trends'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: TrendingUp,
    title: 'Stock Market Analysis',
    description: 'Deep technical analysis of stocks with live prices, charts, indicators, and AI-powered trading signals for profitable decision-making.',
    benefits: ['Live prices', 'Technical analysis', 'Trading signals'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Newspaper,
    title: 'Real-Time Market News',
    description: 'Breaking financial news, IPO announcements, market updates, and sector insights curated specifically for Indian stock market investors.',
    benefits: ['Breaking news', 'IPO updates', 'Sector insights'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Mutual Fund Insights',
    description: 'Complete mutual fund analysis with NAV tracking, performance metrics, sector allocation, and smart fund recommendations based on goals.',
    benefits: ['NAV tracking', 'Performance metrics', 'Fund recommendations'],
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Bell,
    title: 'Smart IPO Alerts',
    description: 'Instant notifications for IPO openings, closings, allotment results, and GMP updates. Never miss an IPO opportunity again.',
    benefits: ['IPO alerts', 'GMP updates', 'Allotment notifications'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your investment data protected with 256-bit encryption and advanced security. Your privacy and data security is our top priority.',
    benefits: ['Data encryption', 'Privacy protected', 'Secure authentication'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native Android app with all features, offline capability, and biometric login. Trade and track IPOs anytime, anywhere.',
    benefits: ['Offline mode', 'Biometric login', 'Push notifications'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Globe,
    title: '24/7 Market Coverage',
    description: 'Complete coverage of NSE, BSE IPO calendars, and mutual funds. Live data updated every second for real-time accuracy.',
    benefits: ['Live data', 'All exchanges', 'IPO calendar'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'Blazing fast load times and smooth interactions. Get market data and IPO predictions in milliseconds.',
    benefits: ['Sub-second loading', 'Smooth UI', 'Optimized mobile'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lock,
    title: 'Advanced Analytics',
    description: 'Professional trading tools including technical indicators, volume analysis, moving averages, and IPO trend analysis.',
    benefits: ['Technical indicators', 'Volume analysis', 'IPO trends'],
    color: 'from-violet-500 to-purple-500',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-semibold mb-4"
          >
            All Features
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Everything You Need to <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Invest Smart</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover all the powerful features that make FINNOTIA the most comprehensive market analysis platform for Indian investors.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Download FINNOTIA from Google Play Store today and start making smarter investment decisions.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.finnotia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Download App
          </a>
        </motion.div>
      </div>
    </div>
  );
}