'use client';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PLAY_STORE_URL, APP_STORE_URL, GRADIENTS } from '../../lib/constants';
import { AndroidIcon, AppleIcon } from './PlatformIcons';

/**
 * Unified Download Section Component
 * Used across all pages for consistency
 * 
 * @param {string} variant - 'default' | 'hero' | 'compact' | 'full'
 * @param {string} title - Optional custom title
 * @param {string} description - Optional custom description
 * @param {string} className - Additional classes
 */
export default function DownloadSection({ 
  variant = 'default',
  title,
  description,
  className = '' 
}) {
  const variants = {
    default: {
      container: 'py-8 bg-gradient-to-br from-slate-50 to-blue-50',
      title: 'text-2xl sm:text-3xl',
      description: 'text-sm sm:text-base',
    },
    hero: {
      container: 'py-3 sm:py-6',
      title: 'text-xl sm:text-2xl',
      description: 'text-xs sm:text-sm',
    },
    compact: {
      container: 'py-4',
      title: 'text-lg sm:text-xl',
      description: 'text-xs',
    },
    full: {
      container: 'py-12 bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A]',
      title: 'text-3xl sm:text-4xl text-white',
      description: 'text-sm sm:text-base text-white/90',
    },
  };

  const config = variants[variant];

  return (
    <div className={`${config.container} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Title */}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${config.title} font-bold mb-3`}
            >
              {title}
            </motion.h2>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${config.description} ${variant === 'full' ? 'text-white/90' : 'text-gray-600'} mb-6 max-w-2xl mx-auto`}
            >
              {description}
            </motion.p>
          )}

          {/* Download Buttons - ALWAYS side by side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-row gap-2 sm:gap-3 justify-center items-center mb-3 sm:mb-6"
          >
            {/* Android Button */}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${GRADIENTS.primary} text-white px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex-1 sm:flex-none sm:min-w-[200px] max-w-[200px] justify-center`}
            >
              <AndroidIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="text-[8px] sm:text-[10px] opacity-80 leading-tight">Download for</div>
                <div className="text-xs sm:text-sm font-bold leading-tight">Android</div>
              </div>
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto group-hover:translate-y-0.5 transition-transform hidden sm:block" />
            </a>

            {/* iOS Button */}
            <Link
              href={APP_STORE_URL}
              className="group flex items-center gap-2 sm:gap-3 bg-white text-gray-700 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 flex-1 sm:flex-none sm:min-w-[200px] max-w-[200px] justify-center shadow-md"
            >
              <AppleIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-gray-700 group-hover:text-gray-900 transition-colors" />
              <div className="text-left">
                <div className="text-[8px] sm:text-[10px] leading-tight text-gray-600">Coming Soon for</div>
                <div className="text-xs sm:text-sm font-bold leading-tight">iOS</div>
              </div>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs"
          >
            <div className={`flex items-center gap-1 ${variant === 'full' ? 'text-white/80' : 'text-gray-600'}`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">100% Free</span>
            </div>
            <div className={`flex items-center gap-1 ${variant === 'full' ? 'text-white/80' : 'text-gray-600'}`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">Quick Sign Up</span>
            </div>
            <div className={`flex items-center gap-1 ${variant === 'full' ? 'text-white/80' : 'text-gray-600'}`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">Educational Tool</span>
            </div>
          </motion.div>

          {/* Small Disclaimer */}
          {variant !== 'compact' && (
            <p className={`mt-2 sm:mt-4 text-[9px] sm:text-[10px] ${variant === 'full' ? 'text-white/60' : 'text-gray-400'}`}>
              For educational purposes only • Not SEBI registered
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
