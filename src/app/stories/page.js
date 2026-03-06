'use client';
// src/app/stories/page.js — Finnotia Market Stories
// Clean IPO-style cards with auto-sliding text sections

import { useState, useEffect } from 'react';

const IMP = {
  CRITICAL: { color: '#ef4444', bg: '#fef2f2', label: 'Critical', dot: '#ef4444' },
  HIGH:     { color: '#2563eb', bg: '#eff6ff', label: 'High',     dot: '#2563eb' },
  MEDIUM:   { color: '#16a34a', bg: '#f0fdf4', label: 'Medium',   dot: '#16a34a' },
  LOW:      { color: '#6b7280', bg: '#f9fafb', label: 'Low',      dot: '#9ca3af' },
};

const SENT_ICON  = { POSITIVE: '↑', NEGATIVE: '↓', NEUTRAL: '—' };
const SENT_COLOR = { POSITIVE: '#16a34a', NEGATIVE: '#ef4444', NEUTRAL: '#6b7280' };

export default function StoriesPage() {
  const [stories, setStories]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('ALL');
  const [date, setDate]         = useState('');

  useEffect(() => {
    fetch('/api/stories')
      .then(r => r.json())
      .then(d => { setStories(d.items || []); setDate(d.date || ''); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const FILTERS  = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'];
  const filtered = filter === 'ALL' ? stories : stories.filter(s => s.importance === filter);

  const fmtDate = (d) => {
    if (!d) return 'Today';
    return new Date(d).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .sr { min-height:100vh; background:#f4f6f9; padding-top:64px; font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif; }

        /* ── HEADER ── */
        .sh { background:linear-gradient(135deg,#1a2f4a 0%,#0c1e35 100%); padding:24px 16px 30px; position:relative; }
        .sh::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:16px; background:#f4f6f9; border-radius:16px 16px 0 0; }
        .sh-in { max-width:560px; margin:0 auto; }
        .sh-badge { display:inline-flex; align-items:center; gap:4px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:5px; padding:3px 8px; margin-bottom:10px; }
        .sh-badge span { color:rgba(255,255,255,0.8); font-size:9px; font-weight:600; letter-spacing:1px; }
        .sh-title { color:#fff; font-size:20px; font-weight:700; margin:0 0 3px; line-height:1.25; }
        .sh-sub { color:rgba(255,255,255,0.45); font-size:11px; margin:0; }

        /* ── FILTER ── */
        .sf { max-width:560px; margin:-2px auto 0; padding:0 16px; display:flex; gap:5px; overflow-x:auto; scrollbar-width:none; position:relative; z-index:2; }
        .sf::-webkit-scrollbar { display:none; }
        .sf-btn { padding:5px 12px; border-radius:7px; border:1.5px solid #dde1e8; background:#fff; color:#64748b; font-size:11px; font-weight:600; cursor:pointer; font-family:inherit; white-space:nowrap; flex-shrink:0; transition:all .15s; }
        .sf-btn.act { background:#0c1e35; color:#fff; border-color:#0c1e35; }

        /* ── STATS ── */
        .ss { max-width:560px; margin:10px auto 0; padding:0 16px; display:flex; align-items:center; gap:12px; }
        .ss-i { display:flex; align-items:center; gap:4px; font-size:10px; color:#94a3b8; }
        .ss-d { width:5px; height:5px; border-radius:50%; }
        .ss-n { font-weight:700; color:#334155; }

        /* ── CARD LIST ── */
        .cl { max-width:560px; margin:14px auto 0; padding:0 16px 80px; display:flex; flex-direction:column; gap:8px; }

        /* ── STORY CARD ── */
        .sc { background:#fff; border-radius:10px; border:1px solid #e4e8ee; overflow:hidden; text-decoration:none; display:block; transition:border-color .15s,box-shadow .15s; }
        .sc:active { border-color:#2563eb; box-shadow:0 2px 10px rgba(37,99,235,.08); }

        .sc-top { display:flex; align-items:stretch; gap:0; padding:10px 10px 0; }
        .sc-bar { width:3px; border-radius:3px; flex-shrink:0; margin-right:8px; }
        .sc-body { flex:1; min-width:0; }

        .sc-meta { display:flex; align-items:center; gap:5px; margin-bottom:5px; flex-wrap:wrap; }
        .sc-imp { font-size:8px; font-weight:700; letter-spacing:.4px; padding:2px 6px; border-radius:3px; text-transform:uppercase; }
        .sc-sent { font-size:10px; font-weight:600; }
        .sc-time { font-size:9px; color:#94a3b8; margin-left:auto; }

        .sc-hl { font-size:13.5px; font-weight:700; color:#0f172a; line-height:1.35; margin:0 0 6px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        /* ── AUTO-SLIDE ── */
        .sl-area { position:relative; height:46px; overflow:hidden; margin-bottom:4px; }
        .sl-track { display:flex; flex-direction:column; animation:sl 12s ease-in-out infinite; }
        .sl-item { height:46px; display:flex; flex-direction:column; justify-content:center; }
        .sl-lbl { font-size:8px; font-weight:700; letter-spacing:.4px; color:#94a3b8; text-transform:uppercase; margin-bottom:1px; }
        .sl-txt { font-size:11.5px; color:#475569; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        @keyframes sl {
          0%,28%   { transform:translateY(0); }
          33%,61%  { transform:translateY(-46px); }
          66%,94%  { transform:translateY(-92px); }
          100%     { transform:translateY(0); }
        }

        .sl-dots { display:flex; gap:3px; align-items:center; margin-bottom:2px; }
        .sl-dot { width:3px; height:3px; border-radius:50%; background:#d1d5db; }
        .sl-dot-a { width:10px; height:3px; border-radius:2px; animation:dotC 12s ease-in-out infinite; }
        @keyframes dotC {
          0%,28%  { background:#2563eb; }
          33%,61% { background:#16a34a; }
          66%,94% { background:#f59e0b; }
          100%    { background:#2563eb; }
        }

        /* ── TAGS ── */
        .sc-tags { display:flex; gap:3px; flex-wrap:wrap; padding:0 10px; }
        .sc-tag { font-size:9px; color:#64748b; background:#f1f5f9; padding:1px 6px; border-radius:3px; font-weight:500; }

        /* ── FOOTER ── */
        .sc-ft { display:flex; align-items:center; justify-content:space-between; padding:7px 10px; border-top:1px solid #f1f5f9; margin-top:6px; }
        .sc-kp { font-size:9px; color:#94a3b8; }
        .sc-rd { font-size:10px; font-weight:600; color:#2563eb; }

        /* ── SKELETON ── */
        .sk { background:#fff; border-radius:10px; border:1px solid #e4e8ee; padding:12px; animation:skP 1.5s ease-in-out infinite; }
        .sk-l { height:8px; background:#f1f5f9; border-radius:5px; margin-bottom:8px; }
        @keyframes skP { 0%,100%{opacity:1} 50%{opacity:.5} }

        .empty { text-align:center; padding:50px 20px; color:#94a3b8; font-size:12px; }
      `}</style>

      <div className="sr">
        {/* Header */}
        <div className="sh">
          <div className="sh-in">
            <div className="sh-badge"><span>⚡ MARKET STORIES</span></div>
            <h1 className="sh-title">Today&apos;s Market News</h1>
            <p className="sh-sub">{fmtDate(date)} · For Indian investors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="sf">
          {FILTERS.map(f => {
            const c = f === 'ALL' ? stories.length : stories.filter(s => s.importance === f).length;
            return (
              <button key={f} className={`sf-btn${filter === f ? ' act' : ''}`} onClick={() => setFilter(f)}>
                {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()} ({c})
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="ss">
          {['CRITICAL','HIGH','MEDIUM'].map(k => {
            const c = stories.filter(s => s.importance === k).length;
            return c > 0 ? (
              <div key={k} className="ss-i">
                <div className="ss-d" style={{ background: IMP[k].dot }} />
                <span className="ss-n">{c}</span> {IMP[k].label}
              </div>
            ) : null;
          })}
        </div>

        {/* Cards */}
        <div className="cl">
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} className="sk">
                <div className="sk-l" style={{ width:'20%' }} />
                <div className="sk-l" style={{ width:'75%', height:'12px' }} />
                <div className="sk-l" style={{ width:'55%', height:'12px' }} />
                <div className="sk-l" style={{ width:'90%' }} />
                <div className="sk-l" style={{ width:'70%' }} />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="empty">
              <div style={{ fontSize:'28px', marginBottom:'6px' }}>📭</div>
              No stories found
            </div>
          ) : (
            filtered.map((s, i) => <StoryCard key={s.slug || i} story={s} />)
          )}
        </div>
      </div>
    </>
  );
}

/* ══ STORY CARD ══ */
function StoryCard({ story }) {
  const imp      = IMP[story.importance] || IMP.HIGH;
  const sentIcon = SENT_ICON[story.sentiment] || '—';
  const sentClr  = SENT_COLOR[story.sentiment] || '#6b7280';

  // Build slide items
  const slides = [];
  if (story.quick_summary)    slides.push({ label: 'Summary', text: story.quick_summary });
  if (story.what_it_means)    slides.push({ label: 'Impact',  text: story.what_it_means });
  if (story.context)          slides.push({ label: 'Context', text: story.context });
  if (story.detailed_summary && slides.length < 3) slides.push({ label: 'Detail', text: story.detailed_summary });

  // Pad to 3 for smooth animation loop
  while (slides.length < 3) {
    slides.push(slides.length > 0 ? { ...slides[0] } : { label: 'Summary', text: story.headline });
  }

  return (
    <a href={`/stories/${story.slug}`} className="sc">
      <div className="sc-top">
        <div className="sc-bar" style={{ background: imp.color }} />
        <div className="sc-body">
          {/* Meta */}
          <div className="sc-meta">
            <span className="sc-imp" style={{ color: imp.color, background: imp.bg }}>
              {story.importance}
            </span>
            <span className="sc-sent" style={{ color: sentClr }}>
              {sentIcon} {story.sentiment}
            </span>
            <span className="sc-time">{story.published_time || ''}</span>
          </div>

          {/* Headline */}
          <h3 className="sc-hl">{story.headline}</h3>

          {/* Auto-sliding section */}
          <div className="sl-area">
            <div className="sl-track">
              {slides.slice(0, 3).map((s, i) => (
                <div key={i} className="sl-item">
                  <div className="sl-lbl">{s.label}</div>
                  <div className="sl-txt">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="sl-dots">
            <div className="sl-dot sl-dot-a" />
            <div className="sl-dot" />
            <div className="sl-dot" />
          </div>
        </div>
      </div>

      {/* Tags + Key Points */}
      {(story.tags?.length > 0 || story.key_points?.length > 0) && (
        <div className="sc-tags">
          {(story.tags || []).slice(0, 3).map((t, i) => (
            <span key={`t${i}`} className="sc-tag">#{t}</span>
          ))}
          {(story.key_points || []).slice(0, 2).map((kp, i) => (
            <span key={`k${i}`} className="sc-tag">{kp}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="sc-ft">
        <span className="sc-kp">{story.key_points?.length || 0} key points</span>
        <span className="sc-rd">Read →</span>
      </div>
    </a>
  );
}