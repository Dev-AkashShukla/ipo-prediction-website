'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, TrendingUp, Award, Target } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Active Users',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: '%',
    label: 'Prediction Accuracy',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    value: 1000,
    suffix: '+',
    label: 'IPOs Analyzed',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Target,
    value: 24,
    suffix: '/7',
    label: 'Market Coverage',
    color: 'from-orange-500 to-red-500',
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

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Join the community that's making smarter investment decisions every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm sm:text-base text-white/80 font-medium">
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
