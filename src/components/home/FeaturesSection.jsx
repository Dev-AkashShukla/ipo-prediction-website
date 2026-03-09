'use client';
// src/components/home/FeaturesSection.jsx

import { motion } from 'framer-motion';
import { Brain, TrendingUp, Newspaper, BarChart3, Shield, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const features = [
  {
    icon:   Brain,
    title:  'AI-Curated IPO Data',
    desc:   'GMP, subscription status, and listing dates — all in one place.',
    iconBg: 'bg-[#2563EB]',
  },
  {
    icon:   TrendingUp,
    title:  'Stock Market Updates',
    desc:   'Price movements and trending stocks across NSE & BSE.',
    iconBg: 'bg-[#1D4ED8]',
  },
  {
    icon:   Newspaper,
    title:  'Curated Market News',
    desc:   'Real-time news aggregated from trusted financial sources.',
    iconBg: 'bg-[#2563EB]',
  },
  {
    icon:   BarChart3,
    title:  'Mutual Fund Info',
    desc:   'Equity, debt & hybrid fund data with NAV tracking.',
    iconBg: 'bg-[#1E40AF]',
  },
  {
    icon:   Shield,
    title:  'Secure & Private',
    desc:   'No unnecessary data collection. Your usage stays private.',
    iconBg: 'bg-[#1D4ED8]',
  },
  {
    icon:   Zap,
    title:  'Timely Notifications',
    desc:   'Alerts for new IPOs, market news, and key updates.',
    iconBg: 'bg-[#2563EB]',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Features"
          title="Everything You Need to"
          highlightedText="Stay Informed"
          description="Curated market data and news to support your research."
          className="mb-6 sm:mb-8"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative bg-white rounded-xl border border-[#E2E8F0]
                           p-3.5 sm:p-4 hover:border-[#BFDBFE] hover:shadow-md
                           hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Icon */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 ${f.iconBg} rounded-lg flex items-center justify-center mb-2.5
                                 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.8} />
                </div>

                <h3 className="text-[12px] sm:text-[13px] font-bold text-[#0F172A] mb-1 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
                  {f.desc}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#2563EB]
                                scale-x-0 group-hover:scale-x-100 origin-left
                                transition-transform duration-300 rounded-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}