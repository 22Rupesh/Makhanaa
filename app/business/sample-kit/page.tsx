'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SampleKitPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    expectedVolume: '',
    agreeToTerms: false
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        // Take first 4 products for sample kit
        setProducts(data.products.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };


  const handleSubmit = async () => {
    if (!formData.companyName || !formData.email || !formData.businessType) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Send email with order details
      const response = await fetch('/api/send-sample-kit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          businessType: formData.businessType,
          expectedVolume: formData.expectedVolume,
          products: products.map(p => ({
            name: p.name,
            weight: p.weight || '300g',
            flavor: p.flavor,
            description: p.description
          }))
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Create business order record
        await fetch('/api/business-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderType: 'sample-kit',
            userEmail: formData.email,
            companyName: formData.companyName,
            contactName: formData.contactName,
            phone: formData.phone,
            country: formData.country,
            businessType: formData.businessType,
            products: products.map(p => ({
              name: p.name,
              weight: p.weight || '300g',
              flavor: p.flavor
            })),
            totalQuantity: products.length,
            totalAmount: 50, // $50 for sample kit
            notes: `Expected Volume: ${formData.expectedVolume || 'Not specified'}`,
          }),
        });

        setOrderPlaced(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setStep(1);
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            country: '',
            businessType: '',
            expectedVolume: '',
            agreeToTerms: false
          });
          setOrderPlaced(false);
        }, 3000);
      } else {
        alert('❌ Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ An error occurred. Please try again later.');
    }
  };

  if (orderPlaced) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="mb-6">
            <CheckCircle2 className="w-16 h-16 text-[#2D5F3F] mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif">
            Order Confirmed! ✓
          </h1>
          <p className="text-xl text-[#666666] mb-6">
            Your sample kit order has been received
          </p>
          <div className="bg-[#FAF8F5] rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#2D5F3F] mb-4">What Happens Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">Confirmation Email (24 hrs)</h3>
                  <p className="text-[#666666] text-sm">We'll send you order details and payment link</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">Sample Kit Ships (48 hrs)</h3>
                  <p className="text-[#666666] text-sm">Your $50 kit will be packaged and dispatched</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">You Test (2 weeks)</h3>
                  <p className="text-[#666666] text-sm">Evaluate quality and place your bulk order</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">Get $50 Refunded</h3>
                  <p className="text-[#666666] text-sm">When you place your first bulk order (100kg+)</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#666666]">
            Confirmation sent to: <span className="font-bold">{formData.email}</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          Business Sampler Box - $50
        </h1>
        <p className="text-xl text-[#666666]">
          Try our quality before committing to bulk orders
        </p>
      </div>

      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-[#D4A574] to-[#c09660] text-white rounded-lg p-8 mb-12">
        <div className="flex gap-4 items-start">
          <AlertCircle size={32} className="flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2 font-serif">
              100% Refundable on Your First Bulk Order
            </h2>
            <p className="text-[#FAF8F5] mb-2">
              Order this sampler kit for just $50. When you place your first bulk order of 100kg or more, we'll refund the entire $50 immediately.
            </p>
            <p className="text-sm text-[#FAF8F5]">
              ✓ No hidden fees • ✓ No commitment required • ✓ Full transparency
            </p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white rounded-lg p-8 border border-[#E5DDD5] mb-12">
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
          What's in Your Sample Kit?
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A574]"></div>
            <p className="text-[#666666] mt-4">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-[#D4A574]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#D4A574] font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C2C2C]">{product.name}</h3>
                    <p className="text-[#666666] text-sm">
                      {product.weight || '300g'} • {product.flavor || product.description || 'Premium quality'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#E5DDD5]">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#D4A574] font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">Quality Certifications</h3>
                  <p className="text-[#666666] text-sm">Digital • FDA, ISO, HACCP</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574]/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#D4A574] font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C]">Batch Lab Report</h3>
                  <p className="text-[#666666] text-sm">Digital • Heavy metals & microbial tests</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-[#666666]">No products available at the moment.</p>
            <p className="text-sm text-[#999999] mt-2">Please check back later or contact us.</p>
          </div>
        )}
      </div>

      {/* Order Form */}
      <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-[#FAF8F5] px-8 py-4 border-b border-[#E5DDD5]">
          <div className="flex justify-between items-center mb-4">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-[#2D5F3F] text-white' : 'bg-[#E5DDD5] text-[#2C2C2C]'
                  }`}>
                  {s}
                </div>
                <span className={step >= s ? 'text-[#2D5F3F] font-semibold' : 'text-[#666666]'}>
                  {s === 1 ? 'Company Info' : 'Review & Order'}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-[#E5DDD5] h-2 rounded-full">
            <div
              className="bg-[#2D5F3F] h-2 rounded-full transition-all"
              style={{ width: `${(step - 1) * 50 + 50}%` }}
            />
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
                Company Information
              </h2>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Your Company Name"
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2C2C2C] font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
                <div>
                  <label className="block text-[#2C2C2C] font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 0100"
                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                >
                  <option value="">Select Type</option>
                  <option value="retailer">Retailer / Distributor</option>
                  <option value="cafe">Café / Restaurant</option>
                  <option value="manufacturer">Food Manufacturer</option>
                  <option value="corporate">Corporate / B2B</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Expected Monthly Volume
                </label>
                <select
                  name="expectedVolume"
                  value={formData.expectedVolume}
                  onChange={handleInputChange}
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                >
                  <option value="">Select Range</option>
                  <option value="100-500">100-500kg</option>
                  <option value="500-1000">500-1,000kg</option>
                  <option value="1000-5000">1,000-5,000kg</option>
                  <option value="5000+">5,000kg+</option>
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1"
                />
                <label className="text-[#666666] text-sm">
                  I agree to the terms and conditions. By ordering, I understand that the $50 will be refunded when I place a bulk order of 100kg or more.
                </label>
              </div>

              <button
                onClick={() => formData.agreeToTerms && setStep(2)}
                disabled={!formData.agreeToTerms}
                className="w-full bg-[#2D5F3F] hover:bg-[#1f4428] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
              >
                Continue to Review
              </button>
            </div>
          )}

          {/* Step 2: Review & Order */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
                Review Your Order
              </h2>

              <div className="bg-[#FAF8F5] rounded-lg p-6 mb-8">
                <h3 className="font-bold text-[#2C2C2C] mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Business:</span>
                    <span className="font-semibold text-[#2C2C2C]">{formData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Contact:</span>
                    <span className="font-semibold text-[#2C2C2C]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Sample Kit:</span>
                    <span className="font-semibold text-[#2C2C2C]">Business Sampler ({products.length} varieties)</span>
                  </div>
                  <div className="border-t border-[#E5DDD5] pt-3 mt-3 flex justify-between">
                    <span className="font-bold text-[#2C2C2C]">Total:</span>
                    <span className="text-2xl font-bold text-[#D4A574]">$50.00</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#A8D5BA]/10 border border-[#A8D5BA] rounded-lg p-6 mb-8">
                <h3 className="font-bold text-[#2D5F3F] mb-3">Refund Guarantee</h3>
                <p className="text-[#666666] text-sm">
                  If you place a bulk order of 100kg or more within 6 months, we'll refund your $50 sample kit fee immediately.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-[#E5DDD5] text-[#2C2C2C] py-3 rounded-lg font-semibold hover:border-[#2D5F3F] transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#2D5F3F] hover:bg-[#1f4428] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
          Questions?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'How long does shipping take?',
              a: 'Standard shipping is 7-14 days. We use DHL or FedEx depending on your location.'
            },
            {
              q: 'When will I get the refund?',
              a: 'Immediately upon confirmation of your 100kg+ bulk order. You can use it as a credit.'
            },
            {
              q: 'Do you ship internationally?',
              a: 'Yes! We ship to 50+ countries. Shipping costs calculated at checkout.'
            },
            {
              q: 'What if I\'m not satisfied?',
              a: 'You have 30 days to request a full refund, no questions asked.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
              <h3 className="font-bold text-[#2C2C2C] mb-2">{faq.q}</h3>
              <p className="text-[#666666] text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
