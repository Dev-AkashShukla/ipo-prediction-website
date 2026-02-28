// src/app/holi/HoliClient.jsx
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Send,
  ArrowRight,
  Heart,
  PartyPopper,
  Gift,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { APP_NAME, PLAY_STORE_URL, GRADIENTS } from '../../lib/constants';
import './holi.css';

// ─── Constants ───────────────────────────────────────────────────────
const HOLI_COLORS = [
  '#FF1744', '#F50057', '#D500F9', '#651FFF',
  '#2979FF', '#00E676', '#FFEA00', '#FF9100',
  '#FF6D00', '#E040FB', '#00E5FF', '#76FF03',
  '#FF4081', '#7C4DFF', '#18FFFF', '#69F0AE',
];

const WISH_MESSAGES = [
  { text: 'Spread colors with love and joy!', emoji: '🎨' },
  { text: "Don't mind it, it's Holi!", emoji: '🥳' },
  { text: 'Colors of Holi, joy of friendship!', emoji: '💕' },
  { text: 'Sweet Holi, sweeter bonds!', emoji: '🍬' },
  { text: 'A shower of colors and a burst of joy!', emoji: '💦' },
  { text: 'May your life be filled with a thousand colors!', emoji: '🌈' },
  { text: 'Paint the world bright and wash away all sorrows!', emoji: '✨' },
];

// Google AdSense Publisher ID - REPLACE with your actual ID
const ADSENSE_PUB_ID = 'ca-pub-XXXXXXXXXX';

// ─── Ad Component ────────────────────────────────────────────────────
function AdUnit({ slot, format = 'auto', className = '', style = {} }) {
  return (
    <div className={`ad-container ${className}`} style={style}>
      {/* 
        ============================================
        GOOGLE ADSENSE AD UNIT
        ============================================
        Replace ADSENSE_PUB_ID and slot with your actual values.
        
        Steps:
        1. Go to adsense.google.com
        2. Create a new ad unit (Display ads)
        3. Copy the data-ad-slot value
        4. Replace below
        
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUB_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
      <div className="w-full bg-gray-100/60 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-[10px] text-gray-400 py-3">
        <span>Sponsored • Ad Unit ({slot || 'banner'})</span>
      </div>
    </div>
  );
}

// ─── Color Splash Effect ─────────────────────────────────────────────
function ColorSplash({ x, y, color, size }) {
  return (
    <div
      className="holi-splash"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, ${color}66 35%, transparent 70%)`,
      }}
    />
  );
}

function Particle({ x, y, color, delay }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 30 + Math.random() * 100;
  const tx = Math.cos(angle) * dist;
  const ty = Math.sin(angle) * dist;
  const size = 3 + Math.random() * 8;

  return (
    <div
      className="holi-particle"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        animationDelay: `${delay}s`,
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
      }}
    />
  );
}

// ─── Floating Gulal Background ───────────────────────────────────────
function FloatingGulal() {
  const gulals = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        color: HOLI_COLORS[i % HOLI_COLORS.length],
        left: Math.random() * 100,
        size: 15 + Math.random() * 35,
        duration: 5 + Math.random() * 8,
        delay: i * 0.6,
        opacity: 0.12 + Math.random() * 0.15,
      })),
    []
  );

  return (
    <>
      {gulals.map((g) => (
        <div
          key={g.id}
          className="holi-gulal"
          style={{
            left: `${g.left}%`,
            width: g.size,
            height: g.size,
            background: `radial-gradient(circle, ${g.color}, transparent)`,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
            opacity: g.opacity,
          }}
        />
      ))}
    </>
  );
}

// ─── Share Button ────────────────────────────────────────────────────
function ShareButton({ icon: Icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:shadow-lg"
      style={{ background: color }}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      <span>{label}</span>
    </button>
  );
}

// ═════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════
export default function HoliClient() {
  const searchParams = useSearchParams();

  // ── State ──
  const [screen, setScreen] = useState('home'); // home | loading | greeting
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

  // ── Parse URL for incoming wish ──
  useEffect(() => {
    const to = searchParams.get('to');
    const from = searchParams.get('from');
    if (to && from) {
      setReceiverName(decodeURIComponent(to));
      setSenderName(decodeURIComponent(from));
      setShowInterstitial(true);
    }
  }, [searchParams]);

  // ── Interstitial countdown ──
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

  // ── Rotate wish messages ──
  useEffect(() => {
    if (screen !== 'greeting') return;
    const iv = setInterval(() => setWishIdx((i) => (i + 1) % WISH_MESSAGES.length), 3500);
    return () => clearInterval(iv);
  }, [screen]);

  // ── Touch / Click color splash ──
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

  // ── Generate shareable link ──
  const generateLink = () => {
    if (!senderName.trim() || !receiverName.trim()) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://finnotia.com';
    return `${base}/holi?to=${encodeURIComponent(receiverName.trim())}&from=${encodeURIComponent(senderName.trim())}`;
  };

  // ── Create wish ──
  const handleCreate = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    setScreen('loading');
    setTimeout(() => setShowShare(true), 1200);
  };

  // ── Share handlers ──
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

  // ── Reset ──
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

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════

  // ── Interstitial Ad Screen ──
  if (showInterstitial) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-white via-orange-50/30 to-pink-50/30">
        {/* AdSense Script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

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

          {/* ── INTERSTITIAL AD PLACEMENT ── */}
          <div className="mb-6">
            <AdUnit slot="interstitial-holi" className="min-h-[250px]" />
          </div>

          {/* Countdown */}
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
      onTouchStart={screen === 'greeting' ? onTouch : undefined}
      onClick={screen === 'greeting' ? onClick : undefined}
    >
      {/* AdSense Script (loaded once) */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Floating Gulal BG */}
      <FloatingGulal />

      {/* Splashes & Particles */}
      {splashes.map((s) => (
        <ColorSplash key={s.id} {...s} />
      ))}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* ═══════ HOME SCREEN ═══════ */}
      {screen === 'home' && (
        <div className="relative z-10 max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
          {/* Top Banner Ad */}
          <AdUnit slot="holi-top-banner" className="w-full mb-4" />

          {/* Hero */}
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

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 mb-4"
          >
            <div className="space-y-3">
              {/* Sender Input */}
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

              {/* Receiver Input */}
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

              {/* CTA Button */}
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

          {/* Social Proof */}
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

          {/* Bottom Banner Ad */}
          <AdUnit slot="holi-bottom-banner" className="w-full mt-5" />

          {/* Finnotia Promo */}
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
        <div className="relative z-10 max-w-lg mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
          {/* Color Counter */}
          <div className="fixed top-16 right-3 z-30 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-gray-100 text-xs font-bold text-gray-700">
            🎨 {colorCount}
          </div>

          {/* Top Ad */}
          <AdUnit slot="holi-greeting-top" className="w-full mb-4" />

          {/* Greeting Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
            className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-4"
          >
            {/* Card Header Gradient */}
            <div className="holi-gradient-bg px-5 py-4 text-center text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />

              <div className="text-3xl mb-1">🎉</div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Happy Holi!</h1>
              <p className="text-xs opacity-80 mt-0.5">Festival of Colors 2026</p>
            </div>

            {/* Card Body */}
            <div className="px-5 py-5 text-center">
              <p className="text-sm text-gray-500 mb-1">Dear</p>
              <h2 className="text-2xl font-black holi-gradient-text mb-3">{receiverName} ✨</h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                May this Holi fill your life with countless colors — a splash of happiness and a
                shower of love! This special wish is just for you! 🌈💕
              </p>

              {/* Rotating Wish */}
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

              {/* Sender */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400">With love from</span>
                <span className="text-xl font-extrabold text-[#FF1744] mt-0.5">
                  {senderName} <Heart className="inline w-4 h-4 fill-current" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Touch Prompt */}
          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-gray-400 mb-3 text-center"
          >
            👆 Tap the screen to splash colors!
          </motion.p>

          {/* Action Buttons */}
          <div className="flex gap-2.5 w-full mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetHome();
              }}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm flex items-center justify-center gap-1.5 hover:border-gray-300 active:scale-95 transition-all"
            >
              <Gift className="w-4 h-4" />
              Create Your Own
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShare(true);
              }}
              className="flex-1 py-3 rounded-xl holi-gradient-bg text-white font-semibold text-sm flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Bottom Ad */}
          <AdUnit slot="holi-greeting-bottom" className="w-full mb-3" />

          {/* Finnotia Promo (Greeting Page) */}
         <a
  href={PLAY_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full p-3 rounded-xl bg-blue-500 border border-blue-600 text-center hover:bg-blue-600 transition-all"
>
  <div className="text-[10px] text-white/80 mb-0.5">Powered by</div>
  <div className="text-xs font-bold text-white">
    {APP_NAME} — Stock & IPO Tracker 📊
  </div>
</a>
        </div>
      )}

      {/* ═══════ SHARE MODAL ═══════ */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pb-4 sm:pb-0"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowShare(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Drag Handle */}
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="text-center mb-4">
                <div className="text-2xl mb-1">🎨</div>
                <h3 className="text-lg font-bold text-gray-900">Your Wish is Ready!</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Send this special Holi wish to {receiverName}
                </p>
              </div>

              {/* Share Buttons */}
              <div className="space-y-2.5 mb-4">
                <ShareButton
                  icon={() => (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  )}
                  label="Share on WhatsApp"
                  color="#25D366"
                  onClick={() => handleShare('whatsapp')}
                />
                <ShareButton
                  icon={() => (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012.056 12C18.63 24 24 18.63 24 12S18.63 0 12.056 0h-.112zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  )}
                  label="Share on Telegram"
                  color="#0088cc"
                  onClick={() => handleShare('telegram')}
                />
                <ShareButton
                  icon={() => (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  label="Share on X (Twitter)"
                  color="#000"
                  onClick={() => handleShare('twitter')}
                />

                {/* Copy Link */}
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition-all"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                  <span>{copied ? 'Link Copied! ✅' : 'Copy Link'}</span>
                </button>
              </div>

              {/* ── AD IN SHARE MODAL ── */}
              <AdUnit slot="holi-share-modal" className="mb-3" />

              {/* Finnotia Promo in Modal */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full p-3 rounded-xl bg-gradient-to-r ${GRADIENTS.primary} text-white text-center hover:shadow-lg transition-all`}
              >
                <div className="text-[10px] opacity-80">📊 Track Stocks & IPOs for FREE!</div>
                <div className="text-xs font-bold mt-0.5">Download {APP_NAME} App →</div>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}