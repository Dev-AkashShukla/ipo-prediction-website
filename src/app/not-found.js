'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] sm:min-h-[65vh] bg-white flex items-center justify-center px-4 py-8 sm:py-10">
      <div className="max-w-xl mt-8 mx-auto text-center">
        {/* 404 Animated Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="mb-4 sm:mb-5"
        >
          <h1 className="text-[100px] sm:text-[130px] lg:text-[150px] font-black leading-none">
            <span className="bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A] bg-clip-text text-transparent">4</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block bg-gradient-to-br from-[#2E5CB8] via-[#4A90E2] to-[#3B82F6] bg-clip-text text-transparent"
            >
              0
            </motion.span>
            <span className="bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A] bg-clip-text text-transparent">4</span>
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] rounded-2xl shadow-lg shadow-blue-500/30">
            <Search className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-5 sm:mb-6"
        >
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-2.5 justify-center mb-5 sm:mb-6"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-gray-200 hover:border-[#4A90E2] hover:text-[#2E5AAD] hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-xs text-gray-500 mb-1.5">Looking for IPO predictions? Get our app!</p>
          <a
            href="https://play.google.com/store/apps/details?id=com.finnotia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#2E5AAD] hover:text-[#4A90E2] font-semibold text-xs sm:text-sm transition-colors duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48A10.44 10.44 0 001 18h22a10.44 10.44 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
            </svg>
            <span>Download from Play Store</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}