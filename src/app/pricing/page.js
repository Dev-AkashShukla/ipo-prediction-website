import PricingSection from '@/components/home/PricingSection';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your investment needs. All plans include 14-day money-back guarantee.
          </p>
        </div>
      </div>
      
      <PricingSection />

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I switch plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges accordingly.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! All paid plans come with a 14-day free trial. No credit card required to start. Cancel anytime during the trial period.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are secure and encrypted.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes! We offer a 14-day money-back guarantee. If you're not satisfied with our service, contact us for a full refund within 14 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
