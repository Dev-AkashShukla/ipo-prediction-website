'use client';
// src/components/home/StatsSection.jsx
// ── Dark navy background — premium stats strip ───────────────────

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, Newspaper, Clock } from 'lucide-react';

const stats = [
  {
    icon:        Database,
    value:       50000,
    suffix:      '+',
    label:       'Datapoints Tracked',
    sub:         'Stocks, IPOs & MFs',
  },
  {
    icon:        TrendingUp,
    value:       null,
    displayText: 'Live',
    suffix:      '',
    label:       'Market Updates',
    sub:         'Every session',
    isLive:      true,
  },
  {
    icon:        Newspaper,
    value:       100,
    suffix:      '+',
    label:       'Verified Sources',
    sub:         'Trusted outlets',
  },
  {
    icon:        Clock,
    value:       24,
    suffix:      '/7',
    label:       'Monitoring',
    sub:         'Always-on pipeline',
  },
];

function AnimatedCounter({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const step = value / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [value, duration, started]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-7 sm:py-10 bg-[#0B0F19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold
                           uppercase tracking-widest bg-[#2563EB]/15 text-[#93C5FD] mb-2">
            Platform Highlights
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Built for Scale &{' '}
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)' }}>
              Reliability
            </span>
          </h2>
          <p className="text-[#64748B] text-xs mt-1.5 max-w-xs mx-auto">
            Real-time data aggregated from verified sources.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-white/[0.04] border border-white/10 rounded-xl p-3.5 sm:p-4
                           hover:bg-white/[0.07] hover:border-[#2563EB]/30
                           transition-all duration-200 text-center"
              >
                {/* Icon */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#2563EB]/20 rounded-lg flex items-center justify-center mx-auto mb-2.5">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#60A5FA]" strokeWidth={1.8} />
                </div>

                {/* Value */}
                <div className="text-xl sm:text-2xl font-bold text-white leading-none mb-1">
                  {stat.value !== null ? (
                    <>
                      <AnimatedCounter value={stat.value} />
                      {stat.suffix}
                    </>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full
                                        rounded-full bg-green-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                      </span>
                      {stat.displayText}
                    </span>
                  )}
                </div>

                <p className="text-white/70 text-[11px] font-semibold mb-0.5 leading-tight">{stat.label}</p>
                <p className="text-white/30 text-[10px] leading-tight">{stat.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}