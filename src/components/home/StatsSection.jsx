'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Newspaper, Target } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 100000,
    suffix: '+',
    label: 'Active Users',
    color: 'from-[#4A90E2] to-[#2E5CB8]',
  },
  {
    icon: TrendingUp,
    value: 50000,
    suffix: '+',
    label: 'Stocks Analyzed',
    color: 'from-[#2E5CB8] to-[#3B82F6]',
  },
  {
    icon: Newspaper,
    value: 1000,
    suffix: '+',
    label: 'Daily News Updates',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Target,
    value: 24,
    suffix: '/7',
    label: 'Market Coverage',
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
    <section className="py-8 sm:py-12 bg-gradient-to-br from-[#4A90E2] via-[#2E5CB8] to-[#1E3A8A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Trusted by Thousands
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto">
            Join the community making smarter investment decisions every day with FINNOTIA.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}