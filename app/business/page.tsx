'use client';

import Link from 'next/link';
import { Shield, TrendingUp, FileText, Zap, CheckCircle2 } from 'lucide-react';

export default function BusinessPage() {
  return (
    <main className="w-full px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          Premium Bulk Supply for B2B Partners
        </h1>
        <p className="text-xl text-[#666666] mb-8">
          FDA-registered, ISO 22000 certified, and fair-trade Fox Nuts supply directly from our Bihar facility
        </p>

        {/* Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
            <FileText className="w-12 h-12 text-[#D4A574] mb-4" />
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Compliance Vault</h3>
            <p className="text-[#666666] text-sm mb-4">
              Access all FDA, HACCP, and ISO certifications with batch-specific lab reports
            </p>
            <Link href="/business/compliance">
              <button className="text-[#D4A574] font-semibold hover:text-[#c09660] transition">
                View Documents →
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
            <TrendingUp className="w-12 h-12 text-[#D4A574] mb-4" />
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Bulk Pricing</h3>
            <p className="text-[#666666] text-sm mb-4">
              Calculate tiered pricing from 50kg to 10,000kg with instant shipping estimates
            </p>
            <Link href="/business/pricing">
              <button className="text-[#D4A574] font-semibold hover:text-[#c09660] transition">
                Calculate Price →
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
            <Zap className="w-12 h-12 text-[#D4A574] mb-4" />
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Sample Kit</h3>
            <p className="text-[#666666] text-sm mb-4">
              Order a refundable sample kit to verify quality before making a bulk commitment
            </p>
            <Link href="/business/sample-kit">
              <button className="text-[#D4A574] font-semibold hover:text-[#c09660] transition">
                Order Sample →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16 py-12 border-y border-[#E5DDD5]">
        <div>
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-6 font-serif">
            Why Partner With Fox Nuts India?
          </h2>
          <div className="space-y-4">
            {[
              { icon: Shield, title: 'FDA Registered', desc: 'Full facility inspection and compliance documentation' },
              { icon: CheckCircle2, title: 'ISO 22000 Certified', desc: 'Highest food safety standards for peace of mind' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Direct-from-source bulk rates with no middlemen' },
              { icon: FileText, title: 'Transparent Supply Chain', desc: 'Complete traceability from farm to your facility' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <item.icon className="w-6 h-6 text-[#D4A574] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#2C2C2C]">{item.title}</h4>
                  <p className="text-[#666666] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#2D5F3F] to-[#1f4428] text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 font-serif">Quick Stats</h3>
          <div className="space-y-6">
            {[
              { number: '500kg+', label: 'Minimum bulk orders we handle' },
              { number: '₹10.80', label: 'Starting price per kg' },
              { number: '2-3 weeks', label: 'Standard delivery timeline' },
              { number: '10,000kg', label: 'Maximum order we can fulfill' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-[#D4A574]">{stat.number}</div>
                <div className="text-[#E8D4C4]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-serif">
          Our Product Lines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Raw Organic Fox Nuts',
              desc: 'Unseasoned, organic fox nuts for your own processing or branding',
              min: '50kg',
              price: '$10.80/kg'
            },
            {
              title: 'Pre-Flavored Varieties',
              desc: 'Himalayan Salt, Peri-Peri, BBQ, Honey & more - ready-to-resell',
              min: '100kg',
              price: '$14.50/kg'
            }
          ].map((product, i) => (
            <div key={i} className="bg-white p-8 rounded-lg border-2 border-[#E5DDD5]">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3 font-serif">
                {product.title}
              </h3>
              <p className="text-[#666666] mb-6">{product.desc}</p>
              <div className="bg-[#FAF8F5] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#2C2C2C] font-semibold">Minimum Order:</span>
                  <span className="text-[#D4A574] font-bold">{product.min}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#2C2C2C] font-semibold">Starting at:</span>
                  <span className="text-[#2D5F3F] font-bold text-lg">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#D4A574] text-white rounded-lg p-12 text-center mt-16">
        <h2 className="text-3xl font-bold mb-4 font-serif">
          Ready to Source Wholesale Fox Nuts?
        </h2>
        <p className="text-lg mb-8 text-[#FAF8F5]">
          Start with our sample kit or jump straight to pricing calculations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/business/sample-kit">
            <button className="bg-white text-[#D4A574] px-8 py-3 rounded-lg font-semibold hover:bg-[#FAF8F5] transition">
              Order Sample Kit
            </button>
          </Link>
          <Link href="/business/pricing">
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Calculate Bulk Pricing
            </button>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-serif">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What is your minimum order quantity?',
              a: 'We accept bulk orders starting from 50kg. However, we recommend ordering at least 100kg to get our best pricing.'
            },
            {
              q: 'How long does delivery take?',
              a: 'Standard delivery takes 2-3 weeks from order confirmation. We ship via DHL or FedEx for faster international delivery.'
            },
            {
              q: 'Can I see compliance documents before ordering?',
              a: 'Absolutely! Visit our Compliance Vault to download all FDA, HACCP, and ISO certificates.'
            },
            {
              q: 'Do you offer custom branding or private label?',
              a: 'Yes! We offer private label services with a minimum order of 500kg. Contact us for custom quotes.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
              <h4 className="font-bold text-[#2C2C2C] mb-2">{faq.q}</h4>
              <p className="text-[#666666]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
