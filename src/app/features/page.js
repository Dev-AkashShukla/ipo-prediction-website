'use client';
import { Brain, TrendingUp, Bell, BarChart3, Shield, Zap, Smartphone, Globe, Lock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const allFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Predictions',
    description: 'Our advanced machine learning algorithms analyze thousands of data points to provide highly accurate IPO predictions. Get insights on listing gains, GMP, and subscription trends.',
    benefits: ['95% prediction accuracy', 'Real-time analysis', 'Historical data comparison'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Market Data',
    description: 'Access live stock prices, IPO subscription status, and market movements updated every second. Never miss a trading opportunity with instant data feeds.',
    benefits: ['Live price updates', 'Instant notifications', 'Market sentiment analysis'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bell,
    title: 'Smart Alert System',
    description: 'Configure custom alerts for IPO openings, closings, allotment status, and price targets. Stay informed without constantly checking the app.',
    benefits: ['Customizable alerts', 'Multi-channel notifications', 'Priority alerts for premium users'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Tracking',
    description: 'Monitor your investments in one place with comprehensive portfolio analytics. Track performance, dividends, and generate tax reports automatically.',
    benefits: ['Multi-portfolio support', 'Performance analytics', 'Tax reporting'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is protected with 256-bit encryption and multi-factor authentication. We never share your personal information with third parties.',
    benefits: ['Data encryption', 'Two-factor authentication', 'Privacy guaranteed'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'Experience blazing-fast load times and smooth interactions. Our optimized infrastructure ensures you get information in milliseconds.',
    benefits: ['Sub-second loading', 'Optimized for mobile', 'Offline mode available'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native iOS and Android apps with full feature parity. Trade and monitor your investments on the go with our intuitive mobile interface.',
    benefits: ['iOS & Android apps', 'Biometric login', 'Push notifications'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Globe,
    title: 'Market Coverage',
    description: 'Comprehensive coverage of NSE, BSE, and global markets. Get insights on Indian IPOs and track international market trends.',
    benefits: ['All major exchanges', 'Global market data', '24/7 coverage'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Lock,
    title: 'API Access',
    description: 'Enterprise users get API access to integrate our data into their own applications. Build custom solutions with our comprehensive API.',
    benefits: ['RESTful API', 'WebSocket support', 'Detailed documentation'],
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Cpu,
    title: 'Advanced Analytics',
    description: 'Deep dive into market trends with our advanced analytics tools. Get insights from technical indicators, volume analysis, and more.',
    benefits: ['Technical indicators', 'Chart patterns', 'Backtesting tools'],
    color: 'from-emerald-500 to-green-500',
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
            className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4"
          >
            All Features
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            Everything You Need to <span className="gradient-text">Invest Smarter</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover all the powerful features that make IPO Tracker the most comprehensive stock market analysis platform in India.
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
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
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
            Start your free trial today. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Free
          </a>
        </motion.div>
      </div>
    </div>
  );
}
