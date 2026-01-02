'use client';
import { Mail, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PLAY_STORE_URL, CONTACT_INFO, GRADIENTS } from '../../lib/constants';
import AndroidIcon from '../../components/ui/AndroidIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // ✅ Your Web3Forms Access Key
  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY';
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      setRecaptchaLoaded(true);
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setRecaptchaLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => setRecaptchaLoaded(true));
    };
    document.head.appendChild(script);
  }, [RECAPTCHA_SITE_KEY]);

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('validation_error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get reCAPTCHA token
      let recaptchaToken = null;
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { 
          action: 'contact_form' 
        });
      }

      // ✅ Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `Contact Form: ${formData.subject}`,
          message: formData.message,
          from_name: 'FINNOTIA Contact Form',
          'g-recaptcha-response': recaptchaToken,
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        // Check for specific Web3Forms errors
        if (result.message && result.message.includes('spam')) {
          setSubmitStatus('spam');
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          
          {/* Main Form */}
          <section className="lg:col-span-3 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">Send a Message</h2>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs sm:text-sm text-green-800 font-semibold">
                  ✓ Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-800 font-semibold">
                  ✗ Something went wrong. Please try again.
                </p>
              </div>
            )}

            {/* Validation Error */}
            {submitStatus === 'validation_error' && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-800 font-semibold">
                  ⚠ Please fill all required fields.
                </p>
              </div>
            )}

            {/* Spam Detected */}
            {submitStatus === 'spam' && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs sm:text-sm text-orange-800 font-semibold">
                  🤖 Security check failed. Please try again.
                </p>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white disabled:opacity-50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white disabled:opacity-50"
                    placeholder="your@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white disabled:opacity-50"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white resize-none disabled:opacity-50"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !recaptchaLoaded}
                className={`w-full bg-gradient-to-r ${GRADIENTS.primary} text-white px-4 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* reCAPTCHA Badge Info */}
              {RECAPTCHA_SITE_KEY && (
                <p className="text-[10px] text-gray-400 text-center">
                  Protected by reCAPTCHA • <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Privacy</a> • <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Terms</a>
                </p>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-3">
            
            {/* App Download Card */}
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

            {/* Contact Information Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Contact Info</h2>
              
              <div className="space-y-3">
                {/* Email */}
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

                {/* Response Time Badge */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-semibold text-green-800">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Trust Badge Footer */}
        <footer className="text-center mt-4 sm:mt-8 px-4">
          <p className="text-xs text-gray-500">
            🔒 Your information is secure and will never be shared
          </p>
        </footer>
      </div>
    </div>
  );
}