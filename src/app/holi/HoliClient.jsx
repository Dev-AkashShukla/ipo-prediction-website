// src/app/holi/HoliClient.jsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Sparkles,
  ArrowRight,
  Heart,
  PartyPopper,
  Gift,
} from 'lucide-react';
import Script from 'next/script';
import { APP_NAME, PLAY_STORE_URL, GRADIENTS } from '../../lib/constants';
import { HOLI_COLORS, ColorSplash, Particle, FloatingGulal } from './HoliAnimations';
import { ShareModal } from './HoliShare';
import AdUnit, { ADSENSE_PUB_ID } from './AdUnit';
import './holi.css';

const WISH_MESSAGES = [
  { text: 'Spread colors with love and joy!', emoji: '🎨' },
  { text: "Don't mind it, it's Holi!", emoji: '🥳' },
  { text: 'Colors of Holi, joy of friendship!', emoji: '💕' },
  { text: 'Sweet Holi, sweeter bonds!', emoji: '🍬' },
  { text: 'A shower of colors and a burst of joy!', emoji: '💦' },
  { text: 'May your life be filled with a thousand colors!', emoji: '🌈' },
  { text: 'Paint the world bright and wash away all sorrows!', emoji: '✨' },
];

export default function HoliClient() {
  const searchParams = useSearchParams();

  const [screen, setScreen] = useState('home');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [splashes, setSplashes] = useState([]);
  const [particles, setParticles] = useState([]);
  const [wishIdx, setWishIdx] = useState(0);
  const [colorCount, setColorCount] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialCountdown, setInterstitialCountdown] = useState(5);

  const splashId = useRef(0);
  const particleId = useRef(0);

  useEffect(() => {
    const to = searchParams.get('to');
    const from = searchParams.get('from');
    if (to && from) {
      setReceiverName(decodeURIComponent(to));
      setSenderName(decodeURIComponent(from));
      setShowInterstitial(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!showInterstitial) return;
    if (interstitialCountdown <= 0) {
      setShowInterstitial(false);
      setScreen('greeting');
      return;
    }
    const t = setTimeout(() => setInterstitialCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showInterstitial, interstitialCountdown]);

  useEffect(() => {
    if (screen !== 'greeting') return;
    const iv = setInterval(() => setWishIdx((i) => (i + 1) % WISH_MESSAGES.length), 3500);
    return () => clearInterval(iv);
  }, [screen]);

  const addSplash = useCallback(
    (cx, cy) => {
      if (screen !== 'greeting') return;
      const color = HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)];
      const size = 70 + Math.random() * 100;
      setSplashes((p) => [...p.slice(-12), { id: ++splashId.current, x: cx, y: cy, color, size }]);
      setColorCount((c) => c + 1);
      const newP = Array.from({ length: 6 }, (_, i) => ({
        id: ++particleId.current,
        x: cx,
        y: cy,
        color: HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)],
        delay: i * 0.04,
      }));
      setParticles((p) => [...p.slice(-30), ...newP]);
    },
    [screen]
  );

  const onTouch = (e) => {
    e.preventDefault();
    addSplash(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onClick = (e) => addSplash(e.clientX, e.clientY);

  const generateLink = () => {
    if (!senderName.trim() || !receiverName.trim()) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://finnotia.com';
    return `${base}/holi?to=${encodeURIComponent(receiverName.trim())}&from=${encodeURIComponent(senderName.trim())}`;
  };

  const handleCreate = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    setScreen('loading');
    setTimeout(() => setShowShare(true), 1200);
  };

  const handleShare = (platform) => {
    const link = generateLink();
    const txt = `🎨🥳 *Happy Holi 2026!*\n\n${senderName} has sent a special Holi wish for ${receiverName}!\n\n👉 View it here: ${link}\n\n_Create yours too - FREE!_ 🌈`;
    const encoded = encodeURIComponent(txt);
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(txt)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard?.writeText(link).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
        break;
    }
  };

  const resetHome = () => {
    setScreen('home');
    setSenderName('');
    setReceiverName('');
    setShowShare(false);
    setSplashes([]);
    setParticles([]);
    setColorCount(0);
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/holi');
    }
  };

  // ── AdSense Script (once globally) ──
  const adScript = (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );

  // ── Interstitial Screen ──
  if (showInterstitial) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
        style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #fff8f0 50%, #f5f0ff 100%)' }}
      >
        {adScript}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm w-full"
        >
          <div className="text-4xl mb-3 animate-bounce">🎨</div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            A special wish for <span className="holi-gradient-text">{receiverName}</span>
          </h2>
          <p className="text-sm text-gray-500 mb-6">Your Holi wish is on its way...</p>
          <AdUnit className="mb-6 min-h-[250px]" />
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border-[3px] border-gray-200 border-t-[#FF1744] animate-spin" />
            <span className="text-sm text-gray-400">
              {interstitialCountdown > 0 ? `Opening in ${interstitialCountdown}s...` : 'Opening...'}
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[80vh] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #fff8f0 50%, #f5f0ff 100%)' }}
      onTouchStart={screen === 'greeting' ? onTouch : undefined}
      onClick={screen === 'greeting' ? onClick : undefined}
    >
      {adScript}
      <FloatingGulal />
      {splashes.map((s) => (<ColorSplash key={s.id} {...s} />))}
      {particles.map((p) => (<Particle key={p.id} {...p} />))}

      {/* ═══════ HOME SCREEN ═══════ */}
      {screen === 'home' && (
        <div className="relative z-10 max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
          <AdUnit className="mb-4" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-[10px] sm:text-xs font-semibold text-pink-700">
                Festival of Colors 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
              Happy{' '}
              <span className="holi-gradient-text">Holi!</span>{' '}
              <span className="text-3xl sm:text-4xl">🎨</span>
            </h1>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Send your loved ones a{' '}
              <span className="font-semibold text-gray-700">personalized Holi wish</span> with
              stunning color effects!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 mb-4"
          >
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Your Name 🙋</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Who are you wishing? 💕
                </label>
                <input
                  type="text"
                  placeholder="Friend / Crush / Family name..."
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={!senderName.trim() || !receiverName.trim()}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  senderName.trim() && receiverName.trim()
                    ? 'holi-gradient-bg hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <PartyPopper className="w-4 h-4" />
                <span>Create & Send Wish!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 text-center"
          >
            <div>
              <div className="text-base font-extrabold text-gray-900">10K+</div>
              <div className="text-[9px] text-gray-400 font-medium">Wishes Sent</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <div className="text-base font-extrabold text-gray-900">100%</div>
              <div className="text-[9px] text-gray-400 font-medium">Free</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <div className="text-base font-extrabold text-gray-900">5s</div>
              <div className="text-[9px] text-gray-400 font-medium">Ready in Seconds</div>
            </div>
          </motion.div>

          <AdUnit className="mt-5" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 w-full"
          >
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full p-3 rounded-xl bg-gradient-to-r ${GRADIENTS.primary} text-white text-center hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-[10px] opacity-80 mb-0.5">Brought to you by</div>
              <div className="text-sm font-bold">{APP_NAME} — Free Stock & IPO Tracker 📊</div>
              <div className="text-[10px] opacity-70 mt-0.5">Download Now on Play Store →</div>
            </a>
          </motion.div>
        </div>
      )}

      {/* ═══════ LOADING SCREEN ═══════ */}
      {screen === 'loading' && (
        <div className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="text-5xl mb-4"
          >
            🎨
          </motion.div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Preparing Your Wish...</h2>
          <p className="text-xs text-gray-400">
            Mixing special colors just for{' '}
            <span className="font-semibold text-gray-600">{receiverName}</span>! 🌈
          </p>
        </div>
      )}

      {/* ═══════ GREETING SCREEN ═══════ */}
      {screen === 'greeting' && (
        <div className="h-screen relative z-10 max-w-lg mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
          <div className="fixed top-16 right-3 z-30 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-gray-100 text-xs font-bold text-gray-700">
            🎨 {colorCount}
          </div>

          <AdUnit className="mb-4" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
            className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-4"
          >
            <div className="holi-gradient-bg px-5 py-4 text-center text-white relative overflow-hidden">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
              <div className="text-3xl mb-1">🎉</div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Happy Holi!</h1>
              <p className="text-xs opacity-80 mt-0.5">Festival of Colors 2026</p>
            </div>
            <div className="px-5 py-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Dear</p>
              <h2 className="text-2xl font-black holi-gradient-text mb-3">{receiverName} ✨</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                May this Holi fill your life with countless colors — a splash of happiness and a
                shower of love! This special wish is just for you! 🌈💕
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={wishIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl px-4 py-3 mb-4"
                >
                  <span className="text-lg mr-1">{WISH_MESSAGES[wishIdx].emoji}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {WISH_MESSAGES[wishIdx].text}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400">With love from</span>
                <span className="text-xl font-extrabold text-[#FF1744] mt-0.5">
                  {senderName} <Heart className="inline w-4 h-4 fill-current" />
                </span>
              </div>
            </div>
          </motion.div>

          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-gray-400 mb-3 text-center"
          >
            👆 Tap the screen to splash colors!
          </motion.p>

          <div className="flex gap-2.5 w-full mb-4">
            <button
              onClick={(e) => { e.stopPropagation(); resetHome(); }}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm flex items-center justify-center gap-1.5 hover:border-gray-300 active:scale-95 transition-all"
            >
              <Gift className="w-4 h-4" />
              Create Your Own
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
              className="flex-1 py-3 rounded-xl holi-gradient-bg text-white font-semibold text-sm flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <AdUnit className="mb-3" />

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full p-3 rounded-xl bg-gradient-to-r ${GRADIENTS.primary} text-white text-center hover:shadow-lg transition-all`}
          >
            <div className="text-[10px] opacity-80 mb-0.5">Powered by</div>
            <div className="text-xs font-bold">{APP_NAME} — Stock & IPO Tracker 📊</div>
          </a>
        </div>
      )}

      {/* ═══════ SHARE MODAL ═══════ */}
      <ShareModal
        showShare={showShare}
        setShowShare={setShowShare}
        receiverName={receiverName}
        copied={copied}
        handleShare={handleShare}
      />
    </div>
  );
}
