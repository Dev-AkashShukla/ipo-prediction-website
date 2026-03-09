'use client';
// src/app/delete-account/page.js
import Link from 'next/link';
import { Trash2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Delete Account | FINNOTIA',
  description: 'Learn how to permanently delete your FINNOTIA account and all associated data.',
  alternates: { canonical: 'https://finnotia.com/delete-account' },
};

const steps = [
  {
    num: '1',
    title: 'Via Finnotia App (Recommended)',
    body: 'Open the Finnotia app → Go to Profile → Tap Delete Account. Follow the on-screen instructions (OTP / Password verification) to permanently remove your data.',
    extra: null,
  },
  {
    num: '2',
    title: 'Via Email Request',
    body: 'If you cannot access the app, send a request from your registered email address to our support team.',
    extra: { label: 'support@finnotia.com', href: 'mailto:support@finnotia.com' },
  },
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] " style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Trash2 className="w-5 h-5 text-red-600" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Delete Your Account</h1>
          <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
            We respect your privacy. Follow the steps below to permanently delete your FINNOTIA account.
          </p>
        </div>

        {/* Steps card */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm mb-3">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4A90E2]" strokeWidth={2} />
            How to Delete Your Account
          </h2>

          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 bg-[#4A90E2] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-[13px] mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-1.5">{s.body}</p>
                  {s.extra && (
                    <a href={s.extra.href} className="inline-flex items-center gap-1.5 text-[#4A90E2] font-semibold text-xs hover:underline">
                      <Mail className="w-3.5 h-3.5" />
                      {s.extra.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6">
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <strong>⚠️ Note:</strong> Once deleted, your profile, saved preferences, IPO tracking history, and all
            account data will be permanently removed and <strong>cannot be recovered.</strong>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            Return to Home <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}