'use client';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you at ' + formData.email);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-6 sm:py-12 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Ultra Compact */}
        <header className="text-center mb-6 mt-12 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
            Get in <span className="bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto px-2">
            Have questions? We'd love to hear from you.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
          
          {/* Main Form - Takes more space on desktop */}
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Send a Message</h2>
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
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white"
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
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white"
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
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white"
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
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 focus:outline-none transition-all bg-gray-50/50 focus:bg-white resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#4A90E2] to-[#2E5AAD] text-white px-5 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Sidebar - Compact Info Cards */}
          <aside className="lg:col-span-2 space-y-4">
            
            {/* App Download Card */}
            <div className="bg-gradient-to-br from-[#4A90E2] to-[#2E5AAD] rounded-2xl shadow-xl p-5 sm:p-6 text-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48A10.44 10.44 0 001 18h22a10.44 10.44 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-1">Get FINNOTIA</h3>
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                    Real-time IPO alerts & analysis on your phone
                  </p>
                </div>
              </div>
              <a 
                href="https://play.google.com/store/apps/details?id=com.finnotia"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-[#4A90E2] px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-lg hover:bg-gray-50 active:scale-95 transition-all duration-200"
              >
                Download Now
              </a>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Contact Info</h2>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#4A90E2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-gray-900 mb-1">Email Us</h3>
                    <div className="space-y-0.5">
                      {/* <a 
                        href="mailto:support@finnotia.com" 
                        className="block text-xs sm:text-sm text-gray-600 hover:text-[#4A90E2] transition-colors truncate"
                      >
                        support@finnotia.com
                      </a> */}
                      <a 
                        href="mailto:contact@finnotia.com" 
                        className="block text-xs sm:text-sm text-gray-600 hover:text-[#4A90E2] transition-colors truncate"
                      >
                        contact@finnotia.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time Badge */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-semibold text-green-800">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Need Quick Help?</h3>
              <div className="space-y-2">
                <a href="#faq" className="block text-xs text-gray-600 hover:text-[#4A90E2] transition-colors">
                  → Frequently Asked Questions
                </a>
                <a href="#support" className="block text-xs text-gray-600 hover:text-[#4A90E2] transition-colors">
                  → Support Center
                </a>
                <a href="#guides" className="block text-xs text-gray-600 hover:text-[#4A90E2] transition-colors">
                  → User Guides
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Trust Badge Footer */}
        <footer className="text-center mt-6 sm:mt-10 px-4">
          <p className="text-xs text-gray-500">
            🔒 Your information is secure and will never be shared with third parties
          </p>
        </footer>
      </div>
    </div>
  );
}