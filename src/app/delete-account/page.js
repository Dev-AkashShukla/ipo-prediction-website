'use client';
import Link from 'next/link';
import { Trash2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Deletion</h1>
          <p className="text-gray-600 text-sm">We value your privacy. Follow the steps below to delete your Finnotia account.</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4A90E2]" />
            How to delete your account
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Via Finnotia App (Recommended)</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Open the Finnotia app &gt; Go to <strong>Profile</strong> &gt; Tap on <strong>Delete Account</strong>. 
                  Follow the on-screen instructions (OTP/Password verification) to permanently remove your data.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#4A90E2] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Via Email Request</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">
                  If you cannot access the app, send an email to our support team from your registered email address.
                </p>
                <a href="mailto:support@finnotia.com" className="inline-flex items-center gap-2 text-[#4A90E2] font-semibold text-xs hover:underline">
                  <Mail className="w-4 h-4" />
                  support@finnotia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Note:</strong> Once deleted, your profile information, saved preferences, IPO tracking history, and all other account data will be permanently removed and <strong>cannot be recovered.</strong>
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Return to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}