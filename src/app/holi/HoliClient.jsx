// src/app/holi/HoliClient.jsx
// ✅ OPTIMIZED — Timestamp-based countdown (never stuck), lazy canvas mount
'use client';

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Sparkles, ArrowRight, Heart, PartyPopper, Gift } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import { APP_NAME, PLAY_STORE_URL } from '../../lib/constants';
import { ShareModal } from './HoliShare';
import AdUnit, { ADSENSE_PUB_ID } from './AdUnit';
import './holi.css';

// ✅ FIX 1: Lazy load HoliCanvas — don't load on interstitial screen
// This alone saves ~50KB parse + prevents canvas running during countdown
const HoliCanvas = lazy(() => import('./HoliCanvas'));

const WISH_MESSAGES = [
  { text: 'Spread colors with love and joy!', emoji: '🎨' },
  { text: "Don't mind it, it's Holi!", emoji: '🥳' },
  { text: 'Colors of Holi, joy of friendship!', emoji: '💕' },
  { text: 'Sweet Holi, sweeter bonds!', emoji: '🍬' },
  { text: 'A shower of colors and a burst of joy!', emoji: '💦' },
  { text: 'May your life be filled with a thousand colors!', emoji: '🌈' },
  { text: 'Paint the world bright and wash away all sorrows!', emoji: '✨' },
];

const COUNTDOWN_SECONDS = 5;

function encodeNames(to, from) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify({ t: to, f: from })))); }
  catch { return ''; }
}
function decodeNames(token) {
  try { const { t, f } = JSON.parse(decodeURIComponent(escape(atob(token)))); return { to: t, from: f }; }
  catch { return null; }
}

function FinnotiaStrip() {
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
      className="group relative flex items-center gap-3 w-full px-4 py-3 rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl"
      style={{ background: 'linear-gradient(135deg, #0f1f3d 0%, #1a3a6b 60%, #0f2d5a 100%)' }}
    >
      <div className="absolute top-0 right-10 w-16 h-16 rounded-full opacity-40 blur-xl pointer-events-none" style={{ background: '#FF1744' }} />
      <div className="absolute bottom-0 right-24 w-12 h-12 rounded-full opacity-30 blur-lg pointer-events-none" style={{ background: '#FF9100' }} />
      <div className="relative flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-lg">
        <Image src="/finnotia-logo.png" alt="Finnotia" width={36} height={36} className="w-full h-full object-contain" />
      </div>
      <div className="relative flex-1 text-left min-w-0">
        <div className="text-[9px] text-white/50 leading-tight uppercase tracking-wide">Powered by</div>
        <div className="text-xs font-bold text-white leading-tight truncate">{APP_NAME} — Stock & IPO Tracker 📊</div>
      </div>
      <div className="relative flex-shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-full text-gray-900 whitespace-nowrap group-hover:scale-105 transition-transform duration-200"
        style={{ background: 'linear-gradient(135deg, #FFEA00, #FF9100)' }}>
        Download Free →
      </div>
    </a>
  );
}

export default function HoliClient() {
  const searchParams = useSearchParams();
  const [screen, setScreen] = useState('home');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [wishIdx, setWishIdx] = useState(0);
  const [colorCount, setColorCount] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialCountdown, setInterstitialCountdown] = useState(COUNTDOWN_SECONDS);
  const [canvasReady, setCanvasReady] = useState(false); // ✅ Track if canvas should mount
  const canvasRef = useRef(null);

  // ── Decode URL params ──
  useEffect(() => {
    const token = searchParams.get('w');
    if (token) {
      const decoded = decodeNames(token);
      if (decoded) {
        setReceiverName(decoded.to);
        setSenderName(decoded.from);
        setShowInterstitial(true);
      }
    }
  }, [searchParams]);

  // ── ✅ FIX 2: Timestamp-based countdown — NEVER gets stuck ──
  // Old approach: setTimeout chain that freezes when main thread is busy
  // New approach: Record start time, use rAF to check elapsed time
  useEffect(() => {
    if (!showInterstitial) return;

    const startTime = Date.now();
    let raf;

    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, COUNTDOWN_SECONDS - Math.floor(elapsed));

      setInterstitialCountdown(remaining);

      if (remaining <= 0) {
        // ✅ Countdown done — transition to greeting
        setShowInterstitial(false);
        setCanvasReady(true); // Now mount the canvas
        setScreen('greeting');
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // ✅ Fallback: If rAF somehow stalls, force transition after max wait
    const fallbackTimer = setTimeout(() => {
      setShowInterstitial(false);
      setCanvasReady(true);
      setScreen('greeting');
    }, (COUNTDOWN_SECONDS + 2) * 1000); // Extra 2s grace

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallbackTimer);
    };
  }, [showInterstitial]);

  // ── Wish message rotation ──
  useEffect(() => {
    if (screen !== 'greeting') return;
    const iv = setInterval(() => setWishIdx((i) => (i + 1) % WISH_MESSAGES.length), 3500);
    return () => clearInterval(iv);
  }, [screen]);

  const spawnGulal = useCallback((clientX, clientY) => {
    canvasRef.current?.spawnGulal(clientX, clientY);
    setColorCount((c) => c + 1);
  }, []);

  const handleWrapperClick = useCallback((e) => {
    spawnGulal(e.clientX, e.clientY);
  }, [spawnGulal]);

  const handleWrapperTouch = useCallback((e) => {
    spawnGulal(e.touches[0].clientX, e.touches[0].clientY);
  }, [spawnGulal]);

  const stopBubble = useCallback((e) => e.stopPropagation(), []);

  const generateLink = () => {
    if (!senderName.trim() || !receiverName.trim()) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://finnotia.com';
    return `${base}/holi?w=${encodeURIComponent(encodeNames(receiverName.trim(), senderName.trim()))}`;
  };

  const handleCreate = () => {
    if (!senderName.trim() || !receiverName.trim()) return;
    setScreen('loading');
    setTimeout(() => {
      setScreen('home');
      setShowShare(true);
    }, 1200);
  };

  const handleShare = (platform) => {
    const link = generateLink();
    const jokes = [
      `Warning: Opening this link may cause uncontrollable smiling. 😬`,
      `${senderName} spent 3 seconds on this. Totally worth it — click and judge. 😏`,
      `Side effects: laughter, color cravings & general happiness. 🎨`,
    ];
    const txt = `🎨 Happy Holi 2026! 🎉\n\n${senderName} has sent you a special Holi wish! 🌈\n\n${jokes[Math.floor(Math.random() * jokes.length)]}\n\n👉 Open your surprise: ${link}\n\nCreate your own free Holi wish too! 🥳`;
    const encoded = encodeURIComponent(txt);
    switch (platform) {
      case 'whatsapp': window.open(`https://wa.me/?text=${encoded}`, '_blank'); break;
      case 'telegram': window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(txt)}`, '_blank'); break;
      case 'twitter':  window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank'); break;
      case 'copy': navigator.clipboard?.writeText(link).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); break;
    }
  };

  const resetHome = () => {
    setScreen('home'); setSenderName(''); setReceiverName('');
    setShowShare(false); setColorCount(0); setCanvasReady(false);
    if (typeof window !== 'undefined') window.history.replaceState({}, '', '/holi');
  };

  const adScript = (
    <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`} crossOrigin="anonymous" strategy="afterInteractive" />
  );

  // ═══ INTERSTITIAL ═══
  if (showInterstitial) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
        style={{ background: 'linear-gradient(180deg, #FFFDF0 0%, #F0FFF6 50%, #FFF8F0 100%)' }}>
        {adScript}
        {/* ✅ FIX 3: No canvas running during interstitial — just simple UI */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm w-full">
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
          {/* ✅ FIX 4: Skip button — user can bypass if they don't want to wait */}
          {interstitialCountdown <= 3 && (
            <button
              onClick={() => {
                setShowInterstitial(false);
                setCanvasReady(true);
                setScreen('greeting');
              }}
              className="mt-4 text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
            >
              Skip →
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: screen === 'greeting' ? '0' : '100vh',
        background: 'linear-gradient(180deg, #FFFDF0 0%, #F0FFF6 50%, #FFF8F0 100%)',
      }}
    >
      {adScript}

      {/* ✅ FIX 5: Canvas only mounts when needed (greeting screen or after interstitial) */}
      {canvasReady && (
        <Suspense fallback={null}>
          <HoliCanvas ref={canvasRef} active={screen === 'greeting'} />
        </Suspense>
      )}

      {/* ═══ HOME ═══ */}
      {screen === 'home' && (
        <div className="h-screen relative z-10 max-w-lg mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3" style={{ background: 'linear-gradient(135deg, #FFEA00, #FF9100)' }}>
              <Sparkles className="w-3.5 h-3.5 text-gray-900" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-900">Festival of Colors 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
              Happy <span className="holi-gradient-text">Holi!</span> <span className="text-3xl sm:text-4xl">🎨</span>
            </h1>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Send your loved ones a <span className="font-semibold text-gray-700">personalized Holi wish</span> with stunning color effects!
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6 mb-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Your Name 🙋</label>
                <input type="text" placeholder="Enter your name..." value={senderName} onChange={(e) => setSenderName(e.target.value)} maxLength={25}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Who are you wishing? 💕</label>
                <input type="text" placeholder="Enter the name you want to surprise..." value={receiverName} onChange={(e) => setReceiverName(e.target.value)} maxLength={25}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 text-sm font-medium placeholder:text-gray-300 focus:outline-none focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all duration-200" />
              </div>
              <button onClick={handleCreate} disabled={!senderName.trim() || !receiverName.trim()}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${senderName.trim() && receiverName.trim() ? 'hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                style={senderName.trim() && receiverName.trim() ? { background: 'linear-gradient(135deg, #FF1744, #FF6D00, #E64A00)' } : {}}>
                <PartyPopper className="w-4 h-4" /><span>Create & Send Wish!</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 text-center mb-5">
            <div><div className="text-base font-extrabold text-gray-900">10K+</div><div className="text-[9px] text-gray-400 font-medium">Wishes Sent</div></div>
            <div className="w-px h-8 bg-gray-200" />
            <div><div className="text-base font-extrabold text-gray-900">100%</div><div className="text-[9px] text-gray-400 font-medium">Free</div></div>
            <div className="w-px h-8 bg-gray-200" />
            <div><div className="text-base font-extrabold text-gray-900">5s</div><div className="text-[9px] text-gray-400 font-medium">Ready in Seconds</div></div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-full">
            <FinnotiaStrip />
          </motion.div>
        </div>
      )}

      {/* ═══ LOADING ═══ */}
      {screen === 'loading' && (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ duration: 0.6, type: 'spring' }} className="text-5xl mb-4">🎨</motion.div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Preparing Your Wish...</h2>
          <p className="text-xs text-gray-400">Mixing special colors just for <span className="font-semibold text-gray-600">{receiverName}</span>! 🌈</p>
        </div>
      )}

      {/* ═══ GREETING ═══ */}
      {screen === 'greeting' && (
        <div
          className="flex flex-col items-center justify-start px-4 pt-5 pb-4 overflow-y-auto"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            background: 'linear-gradient(180deg, #FFFDF0 0%, #F0FFF6 50%, #FFF8F0 100%)',
          }}
          onClick={handleWrapperClick}
          onTouchStart={handleWrapperTouch}
        >
          <div className="w-full max-w-lg mx-auto flex flex-col items-center">

            {/* Counter badge */}
            <div
              className="fixed top-5 right-3 z-30 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-gray-100 text-xs font-bold text-gray-700"
              onClick={stopBubble}
              onTouchStart={stopBubble}
            >
              🎨 {colorCount}
            </div>

            {/* Wish card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
              className="w-full bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden mb-4"
              onClick={stopBubble}
              onTouchStart={stopBubble}
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
                  May this Holi fill your life with countless colors — a splash of happiness and a shower of love! This special wish is just for you! 🌈💕
                </p>
                <AnimatePresence mode="wait">
                  <motion.div key={wishIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl px-4 py-3 mb-4" style={{ background: 'linear-gradient(135deg, #FFF9C4, #FFE0B2)' }}>
                    <span className="text-lg mr-1">{WISH_MESSAGES[wishIdx].emoji}</span>
                    <span className="text-sm font-semibold text-gray-700">{WISH_MESSAGES[wishIdx].text}</span>
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

            {/* Tap hint */}
            <motion.p
              animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-gray-500 mb-3 text-center font-semibold drop-shadow-sm"
            >
              💦 Tap anywhere below to throw gulal!
            </motion.p>

            {/* Buttons */}
            <div
              className="flex gap-2.5 w-full mb-4"
              onClick={stopBubble}
              onTouchStart={stopBubble}
            >
              <button
                onClick={resetHome}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur text-gray-700 font-semibold text-sm flex items-center justify-center gap-1.5 hover:border-gray-300 active:scale-95 transition-all"
              >
                <Gift className="w-4 h-4" /> Create Your Own
              </button>
              <button
                onClick={() => setShowShare(true)}
                className="flex-1 py-3 rounded-xl holi-gradient-bg text-white font-semibold text-sm flex items-center justify-center gap-1.5 hover:shadow-lg active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Finnotia strip */}
            <div
              className="w-full"
              onClick={stopBubble}
              onTouchStart={stopBubble}
            >
              <FinnotiaStrip />
            </div>

          </div>
        </div>
      )}

      <ShareModal showShare={showShare} setShowShare={setShowShare} receiverName={receiverName} copied={copied} handleShare={handleShare} />
    </div>
  );
}