'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Check, TrendingUp, Shield, Zap, BarChart3, Sparkles, Loader2, Newspaper } from 'lucide-react';
import { APP_NAME, GRADIENTS } from '../../lib/constants';
import AndroidIcon from '../../components/ui/AndroidIcon';
import { useRecaptcha, useWeb3Forms } from '../../hooks';
import { RecaptchaNotice } from '../../components/forms';

const features = [
  { icon: BarChart3, text: "IPO & Stock Data" },
  { icon: Zap, text: "Real-Time GMP" },
  { icon: Newspaper, text: "Market News" },
];

export default function DownloadPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { isLoaded: recaptchaLoaded, verify } = useRecaptcha();
  const { submit, isSubmitting } = useWeb3Forms();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');

    const captchaResult = await verify('notify_me');
    if (!captchaResult.success) {
      setError('Security check failed. Please try again.');
      return;
    }

    const result = await submit(
      {
        name: 'New Subscriber',
        email,
        message: `New notification signup!\n\nEmail: ${email}\nTime: ${new Date().toISOString()}\nSource: Download Page`,
      },
      {
        subject: '🔔 New App Launch Notification Signup - FINNOTIA',
        fromName: 'FINNOTIA Notify Me',
      }
    );

    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setError(result.message || 'Failed to submit. Please try again.');
    }
  };

  const isDisabled = isSubmitting || !recaptchaLoaded;

  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/30 flex flex-col relative overflow-hidden font-sans">
      <BackgroundEffects />

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-0 flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <div className="text-center lg:text-left space-y-5 sm:space-y-8 order-2 lg:order-1">
            <LaunchBadge />
            <HeroTitle />
            <HeroDescription />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto lg:mx-0"
            >
              {!isSubmitted ? (
                <EmailForm
                  email={email}
                  setEmail={setEmail}
                  error={error}
                  setError={setError}
                  isDisabled={isDisabled}
                  isSubmitting={isSubmitting}
                  recaptchaLoaded={recaptchaLoaded}
                  onSubmit={handleSubmit}
                />
              ) : (
                <SuccessMessage />
              )}
              <RecaptchaNotice className="mt-2" />
            </motion.div>

            <FeatureBadges features={features} />
          </div>

          <PhoneMockup />
        </div>
      </div>

      <div className="absolute bottom-2 w-full text-center z-20 px-4">
        <p className="text-[10px] text-gray-400">
          Disclaimer: {APP_NAME} provides market data for educational purposes only. We are NOT SEBI registered. This is NOT investment advice.
        </p>
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

// ============ Sub-Components ============

function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-15%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-400/15 to-indigo-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-15%] left-[-15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-300/5 rounded-full blur-[100px]" />
    </div>
  );
}

function LaunchBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-[#2E5AAD] shadow-lg shadow-blue-100/50"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A90E2]" />
      </span>
      <Sparkles className="w-3 h-3" />
      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">Launching Soon</span>
    </motion.div>
  );
}

function HeroTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-gray-900 leading-[1.1]"
    >
      Research Simplified. <br />
      <span className={`bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent drop-shadow-sm`}>
        No Noise. Just Data.
      </span>
    </motion.h1>
  );
}

function HeroDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
    >
      {APP_NAME} brings IPOs, Stocks, Mutual Funds & Market News in one place. AI-powered research based on real data — not hype.
    </motion.p>
  );
}

function EmailForm({ email, setEmail, error, setError, isDisabled, isSubmitting, recaptchaLoaded, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
      <div className="relative bg-white p-1.5 sm:p-2 rounded-2xl shadow-2xl shadow-blue-200/50 border border-gray-100/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
            disabled={isDisabled}
            className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-blue-200 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${GRADIENTS.primary} text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden xs:inline">Sending...</span>
              </>
            ) : !recaptchaLoaded ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden xs:inline">Loading...</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span className="hidden xs:inline">Notify Me</span>
                <span className="xs:hidden">Notify</span>
              </>
            )}
          </button>
        </div>
        {error && <p className="text-xs text-red-600 mt-2 px-2">{error}</p>}
      </div>
    </form>
  );
}

function SuccessMessage() {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-20" />
      <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-3 border border-green-200/50 shadow-xl shadow-green-200/50">
        <Check className="w-5 h-5" />
        <span className="font-bold text-sm sm:text-base">You're on the list! 🎉</span>
      </div>
    </div>
  );
}

function FeatureBadges({ features }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 pt-2"
    >
      {features.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md hover:scale-105 transition-all"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-[#4A90E2] shadow-sm">
            <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="hidden sm:inline">{item.text}</span>
          <span className="sm:hidden">{item.text.split(' ')[0]}</span>
        </div>
      ))}
    </motion.div>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative h-[500px] sm:h-[600px] flex items-center justify-center order-1 lg:order-2"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-[260px] sm:w-[300px] h-[520px] sm:h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105"
        style={{
          transform: 'rotateY(-12deg) rotateX(5deg)',
          boxShadow: '30px 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 40px rgba(74, 144, 226, 0.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        <div className="w-full h-full relative overflow-hidden rounded-[30px] sm:rounded-[32px]">
          {/* ✅ Optimized Image with Next.js Image - priority for LCP */}
          <Image
            src="/finnotia-app-download.png"
            alt="Finnotia App Interface"
            fill
            sizes="(max-width: 640px) 260px, 300px"
            className="object-cover object-center"
            priority
            quality={85}
          />
        </div>
      </div>

      {/* GMP Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-[15%] sm:top-[20%] -left-[8%] sm:-left-[10%] bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/70 hover:scale-110 transition-transform"
        style={{
          animation: 'float 3s ease-in-out infinite',
          boxShadow: '0 20px 40px -15px rgba(34, 197, 94, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-1.5 sm:p-2 rounded-full shadow-sm">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wide">Live GMP Data</p>
            <p className="text-xs sm:text-sm font-black text-gray-900">Updated</p>
          </div>
        </div>
      </motion.div>

      {/* AI Research Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-[12%] sm:bottom-[15%] -right-[3%] sm:-right-[5%] bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/70 hover:scale-110 transition-transform"
        style={{
          animation: 'float 4s ease-in-out infinite',
          animationDelay: '1s',
          boxShadow: '0 20px 40px -15px rgba(74, 144, 226, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 sm:p-2 rounded-full shadow-sm">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A90E2]" />
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-wide">AI Research</p>
            <p className="text-xs sm:text-sm font-black text-gray-900">Data Ready</p>
          </div>
        </div>
      </motion.div>

      {/* Android Badge */}
      <motion.div
        initial={{ opacity: 0, rotate: 0, scale: 0 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
        className="absolute top-6 sm:top-10 right-0 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xl shadow-green-500/20 border border-green-100/50 hover:rotate-0 hover:scale-110 transition-all"
      >
        <AndroidIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#3DDC84]" />
      </motion.div>
    </motion.div>
  );
}