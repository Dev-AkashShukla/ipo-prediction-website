'use client';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Newspaper, PieChart } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const screenshots = [
  {
    title: 'Live Dashboard',
    description: 'Market Activity Scanner',
    icon: BarChart3,
    image: 'stock.png',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
  },
  {
    title: 'AI Analysis',
    description: 'AI-Powered Predictions',
    icon: TrendingUp,
    image: 'ai_prediction.png',
    gradient: 'from-indigo-500 via-purple-600 to-purple-700',
  },
  {
    title: 'Mutual Funds',
    description: 'Smart SIP Calculator',
    icon: PieChart,
    image: 'mutual_fund.png',
    gradient: 'from-cyan-500 via-blue-500 to-blue-600',
  },
  {
    title: 'News Feed',
    description: 'Real-time Updates',
    icon: Newspaper,
    image: 'news.png',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
  },
];

export default function AppScreenshots() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          badge="App Preview"
          title="Beautiful &"
          highlightedText="Intuitive Design"
          description="Experience a modern, user-friendly interface designed for both beginners and professionals."
          className="mb-10 sm:mb-12 lg:mb-16"
        />

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {screenshots.map((screen, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Modern Phone Mockup */}
                <div className="relative">
                  {/* Glow Effect on Hover */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${screen.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Phone Container with White Background */}
                  <div className="relative bg-white rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl group-hover:shadow-3xl transition-all duration-500 max-w-[180px] sm:max-w-[200px] lg:max-w-none mx-auto border-[6px] sm:border-[8px] border-gray-800">
                    
                    {/* Small Notch (No Content Hidden) */}
                    <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 z-30">
                      <div className="bg-gray-900 rounded-full px-4 sm:px-5 py-1 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
                          <div className="w-8 sm:w-10 h-1 bg-gray-800 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Screen Content with Proper Padding */}
                    <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] aspect-[9/19] overflow-hidden">
                      
                      {/* Screenshot Image - Proper Top Padding */}
                      <div className="absolute inset-0 pt-6 sm:pt-7">
                        <img 
                          src={screen.image} 
                          alt={screen.title}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>

                      {/* Gradient Overlay on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${screen.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

                      {/* Subtle Bottom Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                      {/* Fallback Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${screen.gradient} -z-10`} />
                    </div>

                    {/* Phone Buttons - Side Details */}
                    <div className="absolute top-24 sm:top-28 -right-1 w-1 h-12 sm:h-14 bg-gray-700 rounded-l-md shadow-inner" />
                    <div className="absolute top-20 sm:top-24 -left-1 w-1 h-8 bg-gray-700 rounded-r-md shadow-inner" />
                    <div className="absolute top-32 sm:top-36 -left-1 w-1 h-12 sm:h-14 bg-gray-700 rounded-r-md shadow-inner" />
                  </div>
                </div>

                {/* Title & Description Below Phone */}
                <motion.div 
                  className="text-center mt-5 sm:mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${screen.gradient} text-white mb-2 sm:mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <screen.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
                    {screen.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    {screen.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}