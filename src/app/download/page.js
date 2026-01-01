'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, TrendingUp, Shield, Zap, ArrowLeft, BarChart3, Sparkles } from 'lucide-react';
import { APP_NAME, GRADIENTS } from '../../lib/constants'; 
import AndroidIcon from '../../components/ui/AndroidIcon';

export default function DownloadPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setEmail(''), 3000);
    }
  };

  const features = [
    { icon: BarChart3, text: "Deep Market Insights" },
    { icon: Zap, text: "Real-Time GMP" },
    { icon: Shield, text: "Unbiased Analysis" },
  ];

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/30 flex flex-col relative overflow-hidden font-sans">

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-400/15 to-indigo-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-15%] left-[-15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-300/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-0 flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Enhanced Text Section */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-8 order-2 lg:order-1">
            
            {/* Enhanced Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-[#2E5AAD] shadow-lg shadow-blue-100/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A90E2]"></span>
              </span>
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">Launching Soon</span>
            </motion.div>

            {/* Enhanced Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1]"
            >
              Investing Simplified. <br />
              <span className={`bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent drop-shadow-sm`}>
                No Noise. Just Data.
              </span>
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              {APP_NAME} cuts through the market hype. We use AI to analyze IPOs and stocks based on logic, financials, and real-time data—not rumors.
            </motion.p>

            {/* Enhanced Email Form */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto lg:mx-0"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>
                  <div className="relative bg-white p-1.5 sm:p-2 rounded-2xl shadow-2xl shadow-blue-200/50 border border-gray-100/50 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-blue-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base text-gray-900 placeholder:text-gray-400"
                      />
                      <button 
                        type="submit"
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${GRADIENTS.primary} text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base`}
                      >
                        <Bell className="w-4 h-4" />
                        <span className="hidden xs:inline">Notify Me</span>
                        <span className="xs:hidden">Notify</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-3 border border-green-200/50 shadow-xl shadow-green-200/50">
                    <Check className="w-5 h-5" />
                    <span className="font-bold text-sm sm:text-base">You're on the list!</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Enhanced Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 pt-2"
            >
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-[#4A90E2] shadow-sm">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="hidden sm:inline">{item.text}</span>
                  <span className="sm:hidden">{item.text.split(' ')[0]}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Enhanced 3D Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative h-[500px] sm:h-[600px] flex items-center justify-center order-1 lg:order-2"
            style={{ perspective: '1200px' }}
          >
            {/* Enhanced 3D Phone Container */}
            <div 
              className="relative w-[260px] sm:w-[300px] h-[520px] sm:h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105"
              style={{ 
                transform: 'rotateY(-12deg) rotateX(5deg)', 
                boxShadow: '30px 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 40px rgba(74, 144, 226, 0.1)' 
              }}
            >
              {/* Screen Overlay Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10"></div>

              {/* Screen Content */}
              <div className="w-full h-full bg-gradient-to-br from-[#F5F7FB] to-[#E8EDF5] relative flex flex-col">
                
                {/* Enhanced Header */}
                <div className="h-32 sm:h-36 bg-gradient-to-br from-[#4A90E2] via-[#3A7BC8] to-[#5BA3F5] p-5 sm:p-6 flex flex-col justify-end relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-blue-300/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/25 rounded-lg mb-2.5 sm:mb-3 backdrop-blur-sm shadow-lg"></div>
                  <div className="w-28 sm:w-32 h-5 sm:h-6 bg-white rounded-lg shadow-md"></div>
                </div>

                {/* Enhanced Cards List */}
                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 overflow-hidden">
                  {/* Card 1 - Active */}
                  <div className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-md border border-blue-100/50 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-2.5 sm:mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm"></div>
                      <div className="px-2 py-0.5 sm:py-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-[9px] sm:text-[10px] font-bold rounded-md border border-green-200/50">HIGH GMP</div>
                    </div>
                    <div className="w-3/4 h-3.5 sm:h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded mb-1.5 sm:mb-2"></div>
                    <div className="w-1/2 h-2.5 sm:h-3 bg-gray-50 rounded"></div>
                  </div>

                  {/* Card 2 - Inactive */}
                  <div className="bg-white/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 opacity-70">
                    <div className="flex justify-between items-start mb-2.5 sm:mb-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg"></div>
                      <div className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-400 text-[9px] sm:text-[10px] font-bold rounded-md">CLOSED</div>
                    </div>
                    <div className="w-2/3 h-3.5 sm:h-4 bg-gray-100 rounded mb-1.5 sm:mb-2"></div>
                  </div>

                  {/* Card 3 - Subtle */}
                  <div className="bg-white/50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-50 opacity-50">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 rounded-lg"></div>
                      <div className="w-12 sm:w-14 h-5 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Bottom Nav */}
                <div className="mt-auto bg-white/90 backdrop-blur-md h-14 sm:h-16 border-t border-gray-200/50 flex items-center justify-around px-4 shadow-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full text-[#4A90E2] flex items-center justify-center shadow-md"><TrendingUp size={16} strokeWidth={2.5}/></div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-gray-300 flex items-center justify-center"><BarChart3 size={16}/></div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-gray-300 flex items-center justify-center"><Shield size={16}/></div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-[15%] sm:top-[20%] -left-[8%] sm:-left-[10%] bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/70 hover:scale-110 transition-transform"
              style={{ 
                animation: 'float 3s ease-in-out infinite',
                boxShadow: '0 20px 40px -15px rgba(34, 197, 94, 0.2)'
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-1.5 sm:p-2 rounded-full shadow-sm">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wide">Listing Gain</p>
                  <p className="text-xs sm:text-sm font-black text-gray-900">+45.2%</p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Floating Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-[12%] sm:bottom-[15%] -right-[3%] sm:-right-[5%] bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/70 hover:scale-110 transition-transform"
              style={{ 
                animation: 'float 4s ease-in-out infinite',
                animationDelay: '1s',
                boxShadow: '0 20px 40px -15px rgba(74, 144, 226, 0.2)'
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 sm:p-2 rounded-full shadow-sm">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90E2]" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wide">Risk Analysis</p>
                  <p className="text-xs sm:text-sm font-black text-gray-900">Low Risk</p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Android Icon */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, scale: 0 }}
              animate={{ opacity: 1, rotate: 12, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              className="absolute top-6 sm:top-10 right-0 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xl shadow-green-500/20 border border-green-100/50 hover:rotate-0 hover:scale-110 transition-all"
            >
              <AndroidIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#3DDC84]" />
            </motion.div>

          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}