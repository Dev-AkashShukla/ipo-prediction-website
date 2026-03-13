'use client';
// src/app/stories/[slug]/StoryPageClient.jsx
// Full-screen story viewer for individual story URL
// finnotia.com/stories/[slug] → opens directly into story viewer

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  X, Share2, ChevronLeft, ChevronRight,
  Link2, Check, MessageCircle,
  TrendingUp, TrendingDown, Minus, Activity, Pause,
} from 'lucide-react';

const SLIDE_DURATION = 7000;

const IMPORTANCE_CONFIG = {
  CRITICAL: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  label: 'Critical' },
  HIGH:     { color: '#2563EB', bg: 'rgba(37,99,235,0.12)',  label: 'High'     },
  MEDIUM:   { color: '#22C55E', bg: 'rgba(34,197,94,0.12)',  label: 'Medium'   },
  LOW:      { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', label: 'Low'      },
};

const SENTIMENT_CONFIG = {
  POSITIVE: { icon: TrendingUp,   color: '#22C55E', label: 'Bullish' },
  NEGATIVE: { icon: TrendingDown, color: '#EF4444', label: 'Bearish' },
  NEUTRAL:  { icon: Minus,        color: '#94A3B8', label: 'Neutral' },
  MIXED:    { icon: Activity,     color: '#F59E0B', label: 'Mixed'   },
};

function buildSlides(story) {
  const imp  = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const sent = SENTIMENT_CONFIG[story.sentiment]   || SENTIMENT_CONFIG.NEUTRAL;
  const slides = [];
  slides.push({ type: 'cover', story, imp, sent });
  if (story.quick_summary || story.detailed_summary)
    slides.push({ type: 'summary', story, imp, sent });
  if (story.key_points?.length > 0)
    slides.push({ type: 'keypoints', story, imp, sent });
  if (story.what_it_means)
    slides.push({ type: 'impact', story, imp, sent });
  if (story.context)
    slides.push({ type: 'context', story, imp, sent });
  slides.push({ type: 'source', story, imp, sent });
  slides.push({ type: 'cta',    story, imp, sent });
  return slides;
}

function SlideContent({ slide }) {
  const { type, story, imp, sent } = slide;
  const SentIcon = sent.icon;

  if (type === 'cover') return (
    <div className="w-full h-full flex flex-col justify-end p-6 pb-10"
      style={{ background: 'linear-gradient(160deg,#0B0F19 0%,#0f1f3d 100%)' }}>
      {story.image_url_og && (
        <img src={story.image_url_og} alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20" />
      )}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ background: imp.color }}>{imp.label}</span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: sent.color + '20', color: sent.color }}>
            <SentIcon className="w-3 h-3" strokeWidth={2.5} />
            {sent.label}
          </span>
        </div>
        <h2 className="text-white text-2xl font-bold leading-tight mb-4"
          style={{ fontFamily: 'Georgia, serif' }}>{story.headline}</h2>
        <div className="flex items-center gap-3 text-white/40 text-xs">
          <span>{story.source?.name || 'Market Update'}</span>
          {story.date_display && <><span>·</span><span>{story.date_display}</span></>}
        </div>
      </div>
    </div>
  );

  if (type === 'summary') return (
    <div className="w-full h-full flex flex-col justify-center p-6" style={{ background: '#0B0F19' }}>
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: imp.color }}>What Happened</div>
        <div className="w-8 h-0.5 rounded" style={{ background: imp.color }} />
      </div>
      <div className="rounded-2xl p-5" style={{ background: imp.bg, border: `1px solid ${imp.color}30` }}>
        <p className="text-white text-[17px] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
          {story.detailed_summary || story.quick_summary}
        </p>
      </div>
    </div>
  );

  if (type === 'keypoints') return (
    <div className="w-full h-full flex flex-col justify-center p-6" style={{ background: '#080D19' }}>
      <div className="mb-5">
        <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: imp.color }}>Key Takeaways</div>
        <h3 className="text-white text-xl font-bold">{story.key_points.length} Things to Know</h3>
      </div>
      <div className="flex flex-col gap-3">
        {story.key_points.slice(0, 4).map((pt, i) => (
          <div key={i} className="flex gap-3 items-start rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black text-white mt-0.5"
              style={{ background: imp.color }}>{i + 1}</div>
            <p className="text-white/85 text-[15px] leading-snug flex-1">{pt}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'impact') return (
    <div className="w-full h-full flex flex-col justify-center p-6"
      style={{ background: 'linear-gradient(160deg,#050d1a 0%,#0B0F19 100%)' }}>
      <div className="text-[11px] font-bold tracking-widest uppercase mb-2 text-[#F59E0B]">Business Impact</div>
      <h3 className="text-white text-xl font-bold mb-6">Why It Matters</h3>
      <div className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderLeft: '4px solid #F59E0B' }}>
        <p className="text-white text-[16px] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{story.what_it_means}</p>
      </div>
    </div>
  );

  if (type === 'context') return (
    <div className="w-full h-full flex flex-col justify-center p-6" style={{ background: '#0B0F19' }}>
      <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: imp.color }}>Background</div>
      <h3 className="text-white text-xl font-bold mb-6">The Bigger Picture</h3>
      <div className="rounded-2xl p-5 pl-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${imp.color}` }}>
        <p className="text-white/80 text-[16px] leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>{story.context}</p>
      </div>
    </div>
  );

  if (type === 'source') return (
    <div className="w-full h-full flex flex-col justify-center p-6" style={{ background: '#080D19' }}>
      <div className="text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: imp.color }}>Source & Tags</div>
      <div className="rounded-2xl p-5 mb-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white/40 text-[11px] mb-1">Reported by</p>
        <p className="text-white text-lg font-bold">{story.source?.name || 'Financial Sources'}</p>
      </div>
      {story.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {story.tags.slice(0, 6).map(t => (
            <span key={t} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (type === 'cta') return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0B0F19 0%,#0f1a30 100%)' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full blur-3xl" style={{ background: imp.color, opacity: 0.08 }} />
      </div>
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ background: imp.color }}>
          <span className="text-3xl">📊</span>
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">Want More?</h3>
        <p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-xs">
          Read the full story with detailed analysis on FINNOTIA.
        </p>
        <a href={`/blog/${story.slug}`}
          className="inline-block px-8 py-3.5 rounded-full text-white font-bold text-[15px] mb-4"
          style={{ background: imp.color }}>
          Read Full Article
        </a>
        <p className="text-white/20 text-[10px]">Educational only · Not SEBI registered</p>
      </div>
    </div>
  );

  return null;
}

// ── Share Sheet ───────────────────────────────────────────────────
function ShareSheet({ story, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.finnotia.com/stories/${story.slug}`;

  const shareWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(story.headline + '\n\n' + url)}`);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full rounded-t-3xl p-6 pb-10"
        style={{ background: '#151C2E', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
        <h3 className="text-white font-bold text-lg mb-1">Share Story</h3>
        <p className="text-white/40 text-sm mb-2 line-clamp-1">{story.headline}</p>
        <p className="text-white/20 text-[10px] mb-6 font-mono truncate">{url}</p>
        <div className="flex flex-col gap-3">
          <button onClick={shareWhatsApp}
            className="flex items-center gap-4 p-4 rounded-2xl w-full text-left"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(37,211,102,0.15)' }}>
              <MessageCircle className="w-5 h-5" style={{ color: '#25D166' }} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Share on WhatsApp</p>
              <p className="text-white/40 text-xs">Send story link to contacts</p>
            </div>
          </button>
          <button onClick={copyLink}
            className="flex items-center gap-4 p-4 rounded-2xl w-full text-left"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(37,99,235,0.15)' }}>
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Link2 className="w-5 h-5 text-blue-400" />}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{copied ? 'Copied!' : 'Copy Story Link'}</p>
              <p className="text-white/40 text-xs">finnotia.com/stories/{story.slug}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Story Page Client ────────────────────────────────────────
export default function StoryPageClient({ story }) {
  const router = useRouter();
  const [slideIdx, setSlideIdx]   = useState(0);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const timerRef    = useRef(null);
  const progressRef = useRef(null);
  const elapsedRef  = useRef(0);

  const slides      = buildSlides(story);
  const totalSlides = slides.length;
  const imp         = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const clearTimers = useCallback(() => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(progressRef.current);
  }, []);

  const goNext = useCallback(() => {
    clearTimers(); elapsedRef.current = 0;
    if (slideIdx < totalSlides - 1) setSlideIdx(s => s + 1);
    else router.push('/stories');
  }, [slideIdx, totalSlides, router, clearTimers]);

  const goPrev = useCallback(() => {
    clearTimers(); elapsedRef.current = 0;
    if (slideIdx > 0) setSlideIdx(s => s - 1);
  }, [slideIdx, clearTimers]);

  const startProgress = useCallback(() => {
    const startTime = Date.now() - elapsedRef.current;
    const tick = () => {
      const pct = Math.min(((Date.now() - startTime) / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    timerRef.current = setTimeout(() => goNext(), SLIDE_DURATION - elapsedRef.current);
  }, [goNext]);

  useEffect(() => {
    if (paused || showShare) { clearTimers(); return; }
    elapsedRef.current = 0; setProgress(0);
    startProgress();
    return clearTimers;
  }, [slideIdx, paused, showShare]); // eslint-disable-line

  const handleTap = (e) => {
    if (showShare) return;
    if (e.clientX / window.innerWidth < 0.3) goPrev(); else goNext();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onTouchStart={e => setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={e => {
        if (touchStart && e.changedTouches[0].clientY - touchStart.y > 80) router.push('/stories');
        setTouchStart(null);
      }}>
      <div className="relative w-full h-full max-w-[430px] overflow-hidden select-none"
        style={{ touchAction: 'pan-y' }}>

        {/* Slide content */}
        <div className="absolute inset-0" onClick={handleTap}
          onMouseDown={() => { clearTimers(); setPaused(true); }}
          onMouseUp={() => setPaused(false)}>
          <div className="w-full h-full relative overflow-hidden">
            <SlideContent slide={slides[slideIdx]} />
          </div>
        </div>

        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1.5 p-3 pt-4">
          {slides.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full rounded-full" style={{
                background: '#fff',
                width: i < slideIdx ? '100%' : i === slideIdx ? `${progress}%` : '0%',
              }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white">
             <img src="/finnotia-logo.png" alt="Logo" className="w-4 h-4" />
            </div>

            <span className="text-white text-sm font-semibold">FINNOTIA</span>
            <span className="text-white/40 text-xs">{slideIdx + 1}/{totalSlides}</span>
          </div>
          {paused && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <Pause className="w-3 h-3 text-white" />
              <span className="text-white text-[10px]">Paused</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-8 right-4 z-30 flex items-center gap-2">
          <button onClick={e => { e.stopPropagation(); setShowShare(true); }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button onClick={() => router.push('/stories')}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Desktop nav arrows */}
        <button onClick={e => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full hidden md:flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', opacity: slideIdx === 0 ? 0.3 : 0.8 }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={e => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full hidden md:flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', opacity: 0.8 }}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-none">
          {slides.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-200"
              style={{ width: i === slideIdx ? '16px' : '5px', height: '5px',
                background: i === slideIdx ? '#fff' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      {showShare && <ShareSheet story={story} onClose={() => setShowShare(false)} />}
    </div>
  );
}