'use client';

import { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import { PLAY_STORE_URL, CONTACT_INFO, GRADIENTS } from '../../lib/constants';
import AndroidIcon from '../../components/ui/AndroidIcon';
import { useRecaptcha, useWeb3Forms } from '../../hooks';
import { FormStatusMessage, RecaptchaNotice } from '../../components/forms';

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState(null);

  const { isLoaded: recaptchaLoaded, verify } = useRecaptcha();
  const { submit, isSubmitting, status, resetStatus } = useWeb3Forms();

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setValidationError('validation_error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('email_error');
      return;
    }

    setValidationError(null);

    // Verify reCAPTCHA
    const captchaResult = await verify('contact_form');
    if (!captchaResult.success) {
      setValidationError('spam');
      return;
    }

    // Submit form
    const result = await submit(formData, {
      subject: `[FINNOTIA Contact] ${formData.subject}`,
      fromName: 'FINNOTIA Contact Form',
    });

    if (result.success) {
      setFormData(initialFormData);
      setTimeout(resetStatus, 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError(null);
    if (status && status !== 'success') resetStatus();
  };

  const isDisabled = isSubmitting || !recaptchaLoaded;
  const displayStatus = validationError || status;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-4 mt-12 sm:mb-8 sm:mt-12">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1.5">
            Get in <span className={`bg-gradient-to-r ${GRADIENTS.primary} bg-clip-text text-transparent`}>Touch</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto px-2">
            Have questions? We'd love to hear from you.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-3 sm:gap-5">
          
          {/* Contact Form */}
          <section className="lg:col-span-3 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">Send a Message</h2>
            
            <FormStatusMessage 
              status={displayStatus} 
              message={displayStatus === 'success' ? '✓ Message sent successfully! We\'ll get back to you soon.' : undefined}
            />

            <div className="space-y-3 sm:space-y-4">
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <FormInput
                  id="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isDisabled}
                  placeholder="Your Name"
                />
                <FormInput
                  id="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isDisabled}
                  placeholder="your@example.com"
                />
              </div>

              {/* Subject */}
              <FormInput
                id="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="How can we help?"
              />

              {/* Message */}
              <FormTextarea
                id="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Tell us more about your inquiry..."
              />

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className={`w-full bg-gradient-to-r ${GRADIENTS.primary} text-white px-4 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : !recaptchaLoaded ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <RecaptchaNotice />
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-3">
            <DownloadCTA />
            <ContactInfo />
          </aside>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 sm:mt-8 px-4">
          <p className="text-xs text-gray-500">
            🔒 Your information is secure and will never be shared
          </p>
        </footer>
      </div>
    </div>
  );
}

// ============ Sub-Components ============

function FormInput({ id, type = 'text', label, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label} *
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white disabled:opacity-50"
        placeholder={placeholder}
      />
    </div>
  );
}

function FormTextarea({ id, label, value, onChange, disabled, placeholder, rows = 3 }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label} *
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        rows={rows}
        className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white resize-none disabled:opacity-50"
        placeholder={placeholder}
      />
    </div>
  );
}

function DownloadCTA() {
  return (
    <div className={`bg-gradient-to-br ${GRADIENTS.primary} rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 text-white`}>
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
          <AndroidIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold mb-0.5">Get FINNOTIA</h3>
          <p className="text-xs opacity-90 leading-snug">
            Real-time IPO alerts & analysis
          </p>
        </div>
      </div>
      <a 
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-white text-[#4A90E2] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:shadow-lg hover:bg-gray-50 active:scale-95 transition-all duration-200"
      >
        Download Now
      </a>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5">
      <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Contact Info</h2>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-[#4A90E2]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-gray-900 mb-0.5">Email Us</h3>
            <a 
              href={`mailto:${CONTACT_INFO.contactEmail}`}
              className="block text-xs text-gray-600 hover:text-[#4A90E2] transition-colors truncate"
            >
              {CONTACT_INFO.contactEmail}
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs font-semibold text-green-800">
              We respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}