'use client';
// src/components/home/HowItWorks.jsx
// ── Clean steps — monochromatic blue palette ──────────────────────

import { motion } from 'framer-motion';
import { Download, Smartphone, TrendingUp, Zap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const steps = [
  {
    icon:  Download,
    title: 'Download App',
    desc:  'Get FINNOTIA free from Google Play Store. Works on all Android devices.',
    num:   '01',
  },
  {
    icon:  Smartphone,
    title: 'Setup Account',
    desc:  'Quick one-time setup to personalise your experience and preferences.',
    num:   '02',
  },
  {
    icon:  TrendingUp,
    title: 'Explore Markets',
    desc:  'Access real-time market data, stock updates, news and mutual fund information.',
    num:   '03',
  },
  {
    icon:  Zap,
    title: 'Track & Learn',
    desc:  'Use AI-curated data to follow market trends and support your learning.',
    num:   '04',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge="Getting Started"
          title="Start in"
          highlightedText="4 Simple Steps"
          description="Getting started is easy. Download the app and begin exploring market data today."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px
                                  bg-gradient-to-r from-[#BFDBFE] to-transparent
                                  -translate-x-1/2 z-0" />
                )}

                {/* Card */}
                <div className="relative bg-white rounded-2xl border border-[#E2E8F0]
                                p-5 sm:p-6 hover:border-[#BFDBFE] hover:shadow-md
                                hover:-translate-y-0.5 transition-all duration-200
                                h-full flex flex-col z-10">

                  {/* Step number */}
                  <span className="absolute -top-3 -left-2 text-[10px] font-black
                                   text-[#2563EB] bg-[#DBEAFE] rounded-full w-7 h-7
                                   flex items-center justify-center">
                    {step.num}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 bg-[#2563EB] rounded-xl flex items-center
                                  justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed flex-grow">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}