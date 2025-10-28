'use client';
import { motion } from 'framer-motion';
import { Smartphone, TrendingUp, BarChart3, Bell, Newspaper } from 'lucide-react';

const screenshots = [
  {
    title: 'Dashboard',
    description: 'Track all your investments in one place',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'IPO Analysis',
    description: 'AI-powered predictions and insights',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Smart Alerts',
    description: 'Real-time notifications',
    icon: Bell,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Market News',
    description: 'Stay updated with latest trends',
    icon: Newspaper,
    color: 'from-green-500 to-emerald-500',
  },
];

export default function AppScreenshots() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
            App Preview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Beautiful & <span className="gradient-text">Intuitive Design</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a modern, user-friendly interface designed for both beginners and professionals.
          </p>
        </motion.div>

        {/* Screenshots Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                  
                  {/* Screen */}
                  <div className={`relative bg-gradient-to-br ${screen.color} rounded-2xl aspect-[9/19] overflow-hidden`}>
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-2 w-full">
                        <div className="h-3 bg-white/30 rounded-full" />
                        <div className="h-3 bg-white/20 rounded-full w-3/4" />
                        <div className="h-3 bg-white/20 rounded-full w-1/2" />
                      </div>
                    </div>

                    {/* Phone Icon */}
                    <div className="absolute top-4 right-4">
                      <Smartphone className="w-6 h-6 text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{screen.title}</h3>
                  <p className="text-sm text-gray-600">{screen.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/download"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Download App Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
