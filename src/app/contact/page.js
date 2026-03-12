'use client';
// src/app/contact/page.js

import { useState } from 'react';
import { Mail, Send, Loader2, Clock, MapPin, Headphones } from 'lucide-react';
import { PLAY_STORE_URL, CONTACT_INFO } from '../../lib/constants';
import AndroidIcon from '../../components/ui/AndroidIcon';
import { useRecaptcha, useWeb3Forms } from '../../hooks';
import { FormStatusMessage, RecaptchaNotice } from '../../components/forms';
import PageHero from '../../components/shared/PageHero';

const initialFormData = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [formData, setFormData]               = useState(initialFormData);
  const [validationError, setValidationError] = useState(null);

  const { isLoaded: recaptchaLoaded, verify }       = useRecaptcha();
  const { submit, isSubmitting, status, resetStatus } = useWeb3Forms();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setValidationError('validation_error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError('email_error'); return;
    }
    setValidationError(null);
    const captchaResult = await verify('contact_form');
    if (!captchaResult.success) { setValidationError('spam'); return; }
    const result = await submit(formData, {
      subject:  `[FINNOTIA Contact] ${formData.subject}`,
      fromName: 'FINNOTIA Contact Form',
    });
    if (result.success) { setFormData(initialFormData); setTimeout(resetStatus, 5000); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError(null);
    if (status && status !== 'success') resetStatus();
  };

  const isDisabled    = isSubmitting || !recaptchaLoaded;
  const displayStatus = validationError || status;

  return (
    <div className="min-h-screen bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Hero ── */}
      <PageHero
        badge="Contact Us"
        title="Get in"
        titleHighlight="Touch"
        subtitle="Have questions, feedback, or need support? We'd love to hear from you."
      >
        {/* Quick info pills */}
        <div className="flex flex-wrap pt-3 gap-3">
          {[
            { icon: Clock,      label: 'Replies in 24h'    },
            { icon: Headphones, label: 'Active Support'    },
            { icon: MapPin,     label: 'Kolkata, India 🇮🇳' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
              <Icon className="w-3 h-3 text-[#60A5FA]" strokeWidth={2} />
              <span className="text-white/60 text-[10px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-5 gap-3 sm:gap-4">

          {/* ── Form ── */}
          <section className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-[#4A90E2]" strokeWidth={2} />
              Send a Message
            </h2>

            <FormStatusMessage
              status={displayStatus}
              message={displayStatus === 'success' ? "✓ Message sent! We'll get back to you soon." : undefined}
            />

            <div className="space-y-2.5">
              <div className="grid sm:grid-cols-2 gap-2.5">
                <FormInput id="name"  label="Name"  value={formData.name}  onChange={handleChange} disabled={isDisabled} placeholder="Your Name" />
                <FormInput id="email" type="email" label="Email" value={formData.email} onChange={handleChange} disabled={isDisabled} placeholder="your@email.com" />
              </div>
              <FormInput    id="subject" label="Subject" value={formData.subject} onChange={handleChange} disabled={isDisabled} placeholder="How can we help?" />
              <FormTextarea id="message" label="Message" value={formData.message} onChange={handleChange} disabled={isDisabled} placeholder="Tell us more about your inquiry..." />

              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className="w-full bg-[#0c1e35] hover:bg-[#142840] text-white px-4 py-2.5 rounded-lg font-bold text-xs
                           hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                           flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Sending...</span></>
                ) : !recaptchaLoaded ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Loading...</span></>
                ) : (
                  <><span>Send Message</span><Send className="w-3.5 h-3.5" /></>
                )}
              </button>

              <RecaptchaNotice />
            </div>
          </section>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-2 flex flex-col gap-3">

            {/* Download CTA */}
            <div className="bg-[#0c1e35] rounded-xl p-4 text-white shadow-sm">
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AndroidIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-0.5">Get FINNOTIA App</h3>
                  <p className="text-[11px] opacity-85 leading-snug">Real-time IPO alerts & market data</p>
                </div>
              </div>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-[#0c1e35] px-4 py-1.5 rounded-lg text-xs font-bold
                           hover:shadow-md hover:bg-gray-50 active:scale-95 transition-all duration-200"
              >
                Download Free
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex-1">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Contact Info</h2>
              <div className="space-y-2.5">

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#4A90E2]" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT_INFO.contactEmail}`}
                      className="text-xs text-gray-700 hover:text-[#4A90E2] transition-colors truncate block">
                      {CONTACT_INFO.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Response Time</p>
                    <p className="text-xs text-gray-700">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">Based In</p>
                    <p className="text-xs text-gray-700">Kolkata, India 🇮🇳</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  <p className="text-[11px] font-semibold text-green-800">Support is active</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-5">
          🔒 Your information is secure and will never be shared with third parties
        </p>
      </div>
    </div>
  );
}

function FormInput({ id, type = 'text', label, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-semibold text-gray-600 mb-1">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        id={id} type={type} name={id} value={value} onChange={onChange}
        required disabled={disabled} placeholder={placeholder}
        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg
                   focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none
                   transition-all bg-gray-50/50 focus:bg-white disabled:opacity-50 placeholder:text-gray-400"
      />
    </div>
  );
}

function FormTextarea({ id, label, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-semibold text-gray-600 mb-1">
        {label} <span className="text-red-400">*</span>
      </label>
      <textarea
        id={id} name={id} value={value} onChange={onChange}
        required disabled={disabled} rows={4} placeholder={placeholder}
        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg
                   focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none
                   transition-all bg-gray-50/50 focus:bg-white resize-none disabled:opacity-50 placeholder:text-gray-400"
      />
    </div>
  );
}