'use client';
import { motion } from 'framer-motion';
import { Download, Sparkles } from 'lucide-react';
import { PLAY_STORE_URL, DISCLAIMER_TEXT } from '../../lib/constants';

export default function CTASection() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl mb-4 sm:mb-6"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>

          {/* ✅ FIXED: Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Start Tracking Markets Smarter Today
          </h2>

          {/* ✅ FIXED: Description - removed "research" and "analysis" */}
          <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed">
            Download FINNOTIA and access AI-curated market data, real-time stock updates, 
            and curated financial news — all in one educational platform.
          </p>

          {/* CTA Button */}
          <motion.a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 bg-white text-[#2E5CB8] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Download from PlayStore
            <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </motion.a>

          {/* Trust Badges */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/80 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">Educational Tool</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span className="font-medium">Instant Access</span>
            </div>
          </div>

          {/* ✅ ADDED: Small disclaimer */}
          <p className="mt-4 text-[10px] text-white/60">
            For educational purposes only. Not SEBI registered.
          </p>
        </motion.div>
      </div>
    </section>
  );
}