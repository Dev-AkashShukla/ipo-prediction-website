'use client';
import { motion } from 'framer-motion';
import { Smartphone, TrendingUp, BarChart3, Bell, Newspaper, PieChart } from 'lucide-react';

// Yahan maine teri images ko map kar diya hai.
// Make sure ki ye images (stock.png, ai_prediction.png, etc.) tere project ke 'public' folder mein hon.
const screenshots = [
  {
    title: 'Live Dashboard',
    description: 'Market Activity Scanner',
    icon: BarChart3,
    image: 'stock.png', // Image file name
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
    icon: PieChart, // Changed icon to match Mutual Funds
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
                  {/* Notch - Thoda refine kiya hai taki real phone lage */}
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

                    {/* Overlay Gradient (Optional: Text visibility ke liye niche thoda fade diya hai) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10 pointer-events-none" />

                    {/* Placeholder fallback agar image na mile */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} -z-10`} />
                  </div>

                  {/* Side Buttons (Volume/Power) - Realistic detail */}
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