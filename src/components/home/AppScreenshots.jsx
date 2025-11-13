'use client';
import { motion } from 'framer-motion';
import { Smartphone, TrendingUp, BarChart3, Bell, Newspaper } from 'lucide-react';

const screenshots = [
  {
    title: 'Live Dashboard',
    description: 'Real-time market overview',
    icon: BarChart3,
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    title: 'Stock Analysis',
    description: 'AI-powered stock insights',
    icon: TrendingUp,
    color: 'from-[#2E5CB8] to-[#3B82F6]',
  },
  {
    title: 'Market Alerts',
    description: 'Instant notifications',
    icon: Bell,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'News Feed',
    description: 'Latest market news',
    icon: Newspaper,
    color: 'from-[#4A90E2] to-[#1E3A8A]',
  },
];

export default function AppScreenshots() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-xs font-semibold mb-3">
            App Preview
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Beautiful & <span className="bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A] bg-clip-text text-transparent">Intuitive Design</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Experience a modern, user-friendly interface designed for both beginners and professionals.
          </p>
        </motion.div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {screenshots.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {/* Phone Frame */}
                <div className="relative bg-gray-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl max-w-[160px] sm:max-w-none mx-auto">
                  {/* Notch */}
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-10 sm:w-16 h-3 sm:h-4 bg-gray-900 rounded-b-lg z-10" />
                  
                  {/* Screen */}
                  <div className={`relative bg-gradient-to-br ${screen.color} rounded-lg sm:rounded-xl aspect-[9/19] overflow-hidden`}>
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="space-y-1 sm:space-y-2 w-full">
                        <div className="h-1.5 sm:h-2 bg-white/30 rounded-full" />
                        <div className="h-1.5 sm:h-2 bg-white/20 rounded-full w-3/4" />
                        <div className="h-1.5 sm:h-2 bg-white/20 rounded-full w-1/2" />
                      </div>
                    </div>

                    {/* Phone Icon */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mt-2 sm:mt-3">
                  <h3 className="text-xs sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">{screen.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">{screen.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}