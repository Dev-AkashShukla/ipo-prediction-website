'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, TrendingUp, Newspaper, Target } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 100000,
    suffix: '+',
    label: 'Active Users',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: TrendingUp,
    value: 50000,
    suffix: '+',
    label: 'Stocks Analyzed',
    color: 'from-teal-500 to-cyan-500',
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
    color: 'from-emerald-500 to-green-500',
  },
];

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = React.useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
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
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Trusted by Thousands
          </h2>
          <p className="text-sm text-white/80 max-w-2xl mx-auto">
            Join the community making smarter investment decisions every day with FINNOTIA.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-xs text-white/80 font-medium">
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