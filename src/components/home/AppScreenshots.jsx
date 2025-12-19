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
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    title: 'AI Analysis',
    description: 'AI-Powered Predictions',
    icon: TrendingUp,
    image: 'ai_prediction.png',
    color: 'from-[#2E5CB8] to-[#3B82F6]',
  },
  {
    title: 'Mutual Funds',
    description: 'Smart SIP Calculator',
    icon: PieChart,
    image: 'mutual_fund.png',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'News Feed',
    description: 'Real-time Updates',
    icon: Newspaper,
    image: 'news.png',
    color: 'from-[#4A90E2] to-[#1E3A8A]',
  },
];

export default function AppScreenshots() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="App Preview"
          title="Beautiful &"
          highlightedText="Intuitive Design"
          description="Experience a modern, user-friendly interface designed for both beginners and professionals."
          className="mb-10"
        />

        {/* Screenshots Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {screenshots.map((screen, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer"
              >
                {/* Phone Frame */}
                <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl border-4 border-gray-900 max-w-[200px] sm:max-w-none mx-auto">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-gray-900 rounded-b-xl z-20" />
                  
                  {/* Screen Container */}
                  <div className="relative bg-white rounded-[1.5rem] aspect-[9/19] overflow-hidden isolate">
                    
                    {/* Actual Image Render */}
                    <img 
                      src={screen.image} 
                      alt={screen.title}
                      className="absolute inset-0 w-full h-full object-cover object-top z-10"
                      loading="lazy"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10 pointer-events-none" />

                    {/* Placeholder fallback */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} -z-10`} />
                  </div>

                  {/* Side Buttons */}
                  <div className="absolute top-20 -right-1.5 w-1 h-10 bg-gray-800 rounded-r-md" />
                  <div className="absolute top-20 -left-1.5 w-1 h-6 bg-gray-800 rounded-l-md" />
                  <div className="absolute top-32 -left-1.5 w-1 h-10 bg-gray-800 rounded-l-md" />
                </div>

                {/* Title & Description below phone */}
                <div className="text-center mt-5">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 mb-2">
                    <screen.icon size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{screen.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">{screen.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}