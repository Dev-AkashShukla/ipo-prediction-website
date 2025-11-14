'use client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

// Note: For client components in Next.js 14, metadata should be exported from parent layout or page.js file
// This component focuses on structured data and semantic HTML

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon at ' + formData.email);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Structured data for Contact page
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'FINNOTIA',
      url: 'https://finnotia.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-98765-43210',
          contactType: 'customer support',
          email: 'support@finnotia.com',
          availableLanguage: ['English', 'Hindi'],
          areaServed: 'IN',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                Get in <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-xl text-gray-600">
                Have questions about IPO predictions or stock analysis? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <section className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors"
                      placeholder="John Doe"
                      aria-label="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      aria-label="Your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                      aria-label="Message subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                      aria-label="Your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="Send message"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </section>

              {/* Contact Info */}
              <div className="space-y-8">
                <section className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <address className="space-y-6 not-italic">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                        <a 
                          href="mailto:support@finnotia.com"
                          className="text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                          support@finnotia.com
                        </a>
                        <br />
                        <a 
                          href="mailto:contact@finnotia.com"
                          className="text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                          contact@finnotia.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-teal-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                        <a 
                          href="tel:+919876543210"
                          className="text-gray-600 hover:text-teal-600 transition-colors"
                        >
                          +91 98765 43210
                        </a>
                        <p className="text-gray-600 text-sm">Mon-Fri, 9AM-6PM IST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                        <p className="text-gray-600">
                          Mumbai<br />
                          Maharashtra<br />
                          India
                        </p>
                      </div>
                    </div>
                  </address>
                </section>

                <aside className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Get IPO Predictions</h3>
                  <p className="mb-6">
                    Get AI-powered IPO predictions and real-time market analysis. Download FINNOTIA and start investing smarter today.
                  </p>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.finnotia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                    aria-label="Download FINNOTIA app from Google Play Store"
                  >
                    Download App
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}