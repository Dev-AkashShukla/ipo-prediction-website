'use client';
// src/app/stories/StoriesClient.jsx
// Client Component — accepts stories + date as props from server
// NO fetch, NO useEffect for data — data comes from page.js (server)

import { useState, useEffect } from 'react';
import {
  Share2, ChevronLeft, ChevronRight,
  Link2, Check, MessageCircle,
  TrendingUp, TrendingDown, Minus, Activity,
  Pause, X,
} from 'lucide-react';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/ui/Pagination';

// ── Constants ────────────────────────────────────────────────────
const SLIDE_DURATION = 7000;

const IMPORTANCE_CONFIG = {
  CRITICAL: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   label: 'Critical' },
  HIGH:     { color: '#2563EB', bg: 'rgba(37,99,235,0.12)',   label: 'High'     },
  MEDIUM:   { color: '#22C55E', bg: 'rgba(34,197,94,0.12)',   label: 'Medium'   },
  LOW:      { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)',  label: 'Low'      },
};

const SENTIMENT_CONFIG = {
  POSITIVE: { icon: TrendingUp,   color: '#22C55E', label: 'Bullish' },
  NEGATIVE: { icon: TrendingDown, color: '#EF4444', label: 'Bearish' },
  NEUTRAL:  { icon: Minus,        color: '#94A3B8', label: 'Neutral' },
  MIXED:    { icon: Activity,     color: '#F59E0B', label: 'Mixed'   },
};

const ITEMS_PER_PAGE = 10;

// ── Build slides ─────────────────────────────────────────────────
function buildSlides(story) {
  const imp  = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const sent = SENTIMENT_CONFIG[story.sentiment]   || SENTIMENT_CONFIG.NEUTRAL;
  const slides = [];
  slides.push({ type: 'cover',     story, imp, sent });
  if (story.quick_summary || story.detailed_summary)
    slides.push({ type: 'summary',   story, imp, sent });
  if (story.key_points?.length > 0)
    slides.push({ type: 'keypoints', story, imp, sent });
  if (story.what_it_means)
    slides.push({ type: 'impact',    story, imp, sent });
  if (story.context)
    slides.push({ type: 'context',   story, imp, sent });
  slides.push({ type: 'source', story, imp, sent });
  slides.push({ type: 'cta',    story, imp, sent });
  return slides;
}

// ── Slide Content ────────────────────────────────────────────────
function SlideContent({ slide }) {
  const { type, story, imp, sent } = slide;
  const SentIcon = sent.icon;

  if (type === 'cover') return (
    <div className="w-full h-full flex flex-col justify-end p-6 pb-10"
      style={{ background: 'linear-gradient(160deg,#0B0F19 0%,#0f1f3d 100%)' }}>
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
        <span>·</span>
        <span>{story.published_time || 'Today'}</span>
      </div>
    </div>
  );

  if (type === 'summary') return (
    <div className="w-full h-full flex flex-col justify-center p-6"
      style={{ background: '#0B0F19' }}>
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-widest uppercase mb-2"
          style={{ color: imp.color }}>What Happened</div>
        <div className="w-8 h-0.5 rounded" style={{ background: imp.color }} />
      </div>
      <div className="rounded-2xl p-5"
        style={{ background: imp.bg, border: `1px solid ${imp.color}30` }}>
        <p className="text-white text-[17px] leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}>
          {story.detailed_summary || story.quick_summary}
        </p>
      </div>
    </div>
  );

  if (type === 'keypoints') return (
    <div className="w-full h-full flex flex-col justify-center p-6"
      style={{ background: '#080D19' }}>
      <div className="mb-5">
        <div className="text-[11px] font-bold tracking-widest uppercase mb-1"
          style={{ color: imp.color }}>Key Takeaways</div>
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
        <p className="text-white text-[16px] leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}>{story.what_it_means}</p>
      </div>
      <p className="text-white/20 text-[10px] mt-4 italic">* Analysis for informational purposes only.</p>
    </div>
  );

  if (type === 'context') return (
    <div className="w-full h-full flex flex-col justify-center p-6"
      style={{ background: '#0B0F19' }}>
      <div className="text-[11px] font-bold tracking-widest uppercase mb-2"
        style={{ color: imp.color }}>Background</div>
      <h3 className="text-white text-xl font-bold mb-6">The Bigger Picture</h3>
      <div className="relative">
        <div className="text-6xl leading-none font-black absolute -top-3 -left-2"
          style={{ color: imp.color, opacity: 0.2 }}>"</div>
        <div className="rounded-2xl p-5 pl-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${imp.color}` }}>
          <p className="text-white/80 text-[16px] leading-relaxed italic"
            style={{ fontFamily: 'Georgia, serif' }}>{story.context}</p>
        </div>
      </div>
    </div>
  );

  if (type === 'source') return (
    <div className="w-full h-full flex flex-col justify-center p-6"
      style={{ background: '#080D19' }}>
      <div className="text-[11px] font-bold tracking-widest uppercase mb-6"
        style={{ color: imp.color }}>Source & Tags</div>
      <div className="rounded-2xl p-5 mb-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white/40 text-[11px] mb-1">Reported by</p>
        <p className="text-white text-lg font-bold">{story.source?.name || 'Financial Sources'}</p>
        {story.source?.url && (
          <a href={story.source.url} target="_blank" rel="noopener noreferrer"
            className="text-[12px] mt-1 block" style={{ color: imp.color }}>
            View original →
          </a>
        )}
      </div>
      {story.tags?.length > 0 && (
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">Topics</p>
          <div className="flex flex-wrap gap-2">
            {story.tags.slice(0, 6).map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                #{t}
              </span>
            ))}
          </div>
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

// ── Share Sheet ──────────────────────────────────────────────────
function ShareSheet({ story, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = `https://finnotia.com/stories/${story.slug}`;

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
        <p className="text-white/40 text-sm mb-6 line-clamp-1">{story.headline}</p>
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
              <p className="text-white/40 text-xs">Send link to contacts</p>
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
              <p className="text-white font-semibold text-sm">{copied ? 'Copied!' : 'Copy Link'}</p>
              <p className="text-white/40 text-xs">Share anywhere</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Story Viewer ─────────────────────────────────────────────────
function StoryViewer({ stories, initialIndex, onClose }) {
  const [storyIdx, setStoryIdx]   = useState(initialIndex);
  const [slideIdx, setSlideIdx]   = useState(0);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const timerRef    = useRef(null);
  const progressRef = useRef(null);
  const elapsedRef  = useRef(0);

  const currentStory = stories[storyIdx];
  const slides       = buildSlides(currentStory);
  const totalSlides  = slides.length;

  const clearTimers = useCallback(() => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(progressRef.current);
  }, []);

  const goNext = useCallback(() => {
    clearTimers(); elapsedRef.current = 0;
    if (slideIdx < totalSlides - 1) setSlideIdx(s => s + 1);
    else if (storyIdx < stories.length - 1) { setStoryIdx(s => s + 1); setSlideIdx(0); }
    else onClose();
  }, [slideIdx, totalSlides, storyIdx, stories.length, onClose, clearTimers]);

  const goPrev = useCallback(() => {
    clearTimers(); elapsedRef.current = 0;
    if (slideIdx > 0) setSlideIdx(s => s - 1);
    else if (storyIdx > 0) { setStoryIdx(s => s - 1); setSlideIdx(0); }
  }, [slideIdx, storyIdx, clearTimers]);

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
  }, [slideIdx, storyIdx, paused, showShare]); // eslint-disable-line

  const handleTap = (e) => {
    if (showShare) return;
    if (e.clientX / window.innerWidth < 0.3) goPrev(); else goNext();
  };

  const imp = IMPORTANCE_CONFIG[currentStory.importance] || IMPORTANCE_CONFIG.HIGH;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onTouchStart={e => setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={e => {
        if (touchStart && e.changedTouches[0].clientY - touchStart.y > 80) onClose();
        setTouchStart(null);
      }}>
      <div className="relative w-full h-full max-w-[430px] overflow-hidden select-none"
        style={{ touchAction: 'pan-y' }}>

        {/* Slide */}
        <div className="absolute inset-0" onClick={handleTap}
          onMouseDown={() => { clearTimers(); setPaused(true); }}
          onMouseUp={() => setPaused(false)}>
          <div className="w-full h-full relative overflow-hidden">
            {slides[slideIdx]?.type === 'cover' && currentStory.image_url_og && (
              <img src={currentStory.image_url_og} alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20" />
            )}
            <SlideContent slide={slides[slideIdx]} />
          </div>
        </div>

        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1.5 p-3 pt-4">
          {slides.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full rounded-full"
                style={{
                  background: '#fff',
                  width: i < slideIdx ? '100%' : i === slideIdx ? `${progress}%` : '0%',
                }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: imp.color }}>
              <span className="text-white text-[10px] font-black">F</span>
            </div>
            <span className="text-white text-sm font-semibold">FINNOTIA</span>
            <span className="text-white/40 text-xs">{storyIdx + 1}/{stories.length}</span>
          </div>
          {paused && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)' }}>
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
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Desktop nav */}
        <button onClick={e => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full hidden md:flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', opacity: slideIdx === 0 && storyIdx === 0 ? 0.3 : 0.8 }}>
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

      {showShare && <ShareSheet story={currentStory} onClose={() => setShowShare(false)} />}
    </div>
  );
}

// ── Story Card ───────────────────────────────────────────────────
function StoryCard({ story }) {
  const imp      = IMPORTANCE_CONFIG[story.importance] || IMPORTANCE_CONFIG.HIGH;
  const sent     = SENTIMENT_CONFIG[story.sentiment]   || SENTIMENT_CONFIG.NEUTRAL;
  const SentIcon = sent.icon;
  const slideCount = Math.min(buildSlides(story).length, 7);

  return (
    <a href={`/stories/${story.slug}`}
      className="group w-full text-left rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] block"
      style={{ background: '#ffffff', border: `1px solid ${imp.color}20`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${imp.color}, ${imp.color}60)` }} />
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white"
              style={{ background: imp.color }}>{imp.label}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
              style={{ background: sent.color + '18', color: sent.color, border: `1px solid ${sent.color}30` }}>
              <SentIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
              {sent.label}
            </span>
          </div>
          <span className="text-[10px] font-medium text-gray-400">{story.published_time || 'Today'}</span>
        </div>
        <h3 className="text-gray-900 text-sm sm:text-[15px] font-bold leading-snug mb-3 line-clamp-3 group-hover:text-[#2563EB] transition-colors duration-200"
          style={{ fontFamily: 'Georgia, serif' }}>{story.headline}</h3>
        {story.quick_summary && (
          <p className="hidden sm:block text-[12px] leading-relaxed line-clamp-2 mb-3 text-gray-500">
            {story.quick_summary}
          </p>
        )}
        {story.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {story.tags.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B' }}>
                #{t}
              </span>
            ))}
          </div>
        )}
        <div className="border-t mb-3 border-gray-100" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-[3px]">
              {[...Array(slideCount)].map((_, i) => (
                <div key={i} className="rounded-full"
                  style={{ width: i === 0 ? '12px' : '4px', height: '4px',
                    background: i === 0 ? imp.color : '#E2E8F0' }} />
              ))}
            </div>
            <span className="text-[10px] truncate text-gray-400">{story.source?.name || 'Finnotia'}</span>
          </div>
          <span className="text-[11px] font-bold flex-shrink-0 flex items-center gap-0.5 group-hover:gap-1.5 transition-all duration-200"
            style={{ color: imp.color }}>
            Read <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Main Client Component ────────────────────────────────────────
export default function StoriesClient({ stories = [], date = '' }) {
  const [filter, setFilter] = useState('ALL');

  const FILTERS  = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'];
  const filtered = filter === 'ALL' ? stories : stories.filter(s => s.importance === filter);

  // usePagination hook — same as blog page
  const pagination = usePagination(filtered, ITEMS_PER_PAGE);

  // Reset to page 1 when filter changes
  useEffect(() => { pagination.goTo(1); }, [filter]); // eslint-disable-line

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    : 'Today';

  return (
    <>
      <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>

        {/* Header */}
        <div style={{ background: '#0c1e35' }} className="px-4 pt-8 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)`,
              backgroundSize: '32px 32px',
            }} />
          <div className="absolute bottom-0 left-0 right-0 h-5"
            style={{ background: '#F8FAFC', borderRadius: '20px 20px 0 0' }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.25)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full opacity-60" style={{ background: '#2563EB' }} />
                <span className="relative rounded-full h-2 w-2" style={{ background: '#2563EB' }} />
              </span>
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#93C5FD' }}>
                TRENDING · Market Stories
              </span>
            </div>
            <h1 className="text-white text-2xl font-bold mb-1">Today's Market News</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {fmtDate(date)} · Tap any story to read
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 mb-4">
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {FILTERS.map(f => {
                const count = f === 'ALL' ? stories.length : stories.filter(s => s.importance === f).length;
                const imp   = IMPORTANCE_CONFIG[f];
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 border whitespace-nowrap"
                    style={{
                      background:  filter === f ? (imp?.color || '#0B0F19') : '#fff',
                      color:       filter === f ? '#fff' : '#64748B',
                      borderColor: filter === f ? (imp?.color || '#0B0F19') : '#E2E8F0',
                    }}>
                    {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()} ({count})
                  </button>
                );
              })}
            </div>
            {stories.length > 0 && (
              <div className="flex gap-4 flex-shrink-0">
                {['CRITICAL', 'HIGH', 'MEDIUM'].map(k => {
                  const c = stories.filter(s => s.importance === k).length;
                  if (!c) return null;
                  return (
                    <div key={k} className="flex items-center gap-1.5 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ background: IMPORTANCE_CONFIG[k].color }} />
                      <span className="font-bold" style={{ color: IMPORTANCE_CONFIG[k].color }}>{c}</span>
                      <span className="text-[#94A3B8]">{IMPORTANCE_CONFIG[k].label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Count */}
          {filtered.length > 0 && (
            <p className="text-xs text-gray-400 mb-4">
              Showing {(pagination.currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(pagination.currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} stories
              {pagination.totalPages > 1 && ` · Page ${pagination.currentPage} of ${pagination.totalPages}`}
            </p>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-[#94A3B8] text-sm">No stories found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {pagination.currentItems.map((story, i) => (
                <StoryCard key={story.slug || i} story={story} />
              ))}
            </div>
          )}

          {filtered.length > ITEMS_PER_PAGE && (
            <div className="mt-8 pb-4" id="stories-grid">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goTo}
              />
            </div>
          )}

          {filtered.length > 0 && (
            <p className="text-center text-xs text-gray-400 pb-8 mt-2">
              Updated regularly · Market insights for informational purposes
            </p>
          )}
        </div>
      </div>
    </>
  );
}