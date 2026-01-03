// src/components/home/StatsSection.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, Newspaper, Target } from 'lucide-react';

const stats = [
  {
    icon: Database,
    value: 50000,
    suffix: '+',
    label: 'Datapoints', // Shortened label
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    icon: TrendingUp,
    value: null,
    displayText: 'Live',
    suffix: '',
    label: 'Updates', // Shortened label
    color: 'from-[#2E5CB8] to-[#3B82F6]',
  },
  {
    icon: Newspaper,
    value: 100,
    suffix: '+',
    label: 'Sources', // Shortened label
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Target,
    value: 24,
    suffix: '/7',
    label: 'Monitoring', // Shortened label
    color: 'from-[#4A90E2] to-[#1E3A8A]',
  },
];

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-5 sm:py-8 bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A]">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">
            Platform Highlights
          </h2>
          <p className="text-[10px] sm:text-sm text-white/80 max-w-xl mx-auto">
            Real-time market data aggregated from verified sources.
          </p>
        </motion.div>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {/* Flex layout for mobile: Icon left, Text right (optional, keep center for now but tight) */}
                <div className="flex flex-col sm:flex-col items-center justify-center gap-1 sm:gap-2">
                  
                  {/* Smaller Icon Container */}
                  <div className={`w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-br ${stat.color} rounded-md sm:rounded-lg flex items-center justify-center shadow-sm`}>
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-sm sm:text-2xl font-bold text-white leading-tight">
                      {stat.value !== null ? (
                        <>
                          <AnimatedCounter value={stat.value} />
                          {stat.suffix}
                        </>
                      ) : (
                        <span className="text-green-300">{stat.displayText}</span>
                      )}
                    </div>
                    <div className="text-[9px] sm:text-xs text-white/70 font-medium truncate">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tiny Disclaimer */}
        <p className="text-center text-[9px] text-white/40 mt-3">
          For educational purposes only
        </p>
      </div>
    </section>
  );
}