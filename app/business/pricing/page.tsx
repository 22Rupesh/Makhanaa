'use client';

import { useState, useEffect } from 'react';
import { Mail, Download, Plus, X } from 'lucide-react';

const pricingTiers = [
  { min: 50, max: 200, pricePerKg: 14.50, label: 'Starter' },
  { min: 201, max: 500, pricePerKg: 13.20, label: 'Growth' },
  { min: 501, max: 1000, pricePerKg: 12.50, label: 'Scaling' },
  { min: 1001, max: 5000, pricePerKg: 11.80, label: 'Enterprise' },
  { min: 5001, max: 10000, pricePerKg: 10.80, label: 'Wholesale' }
];

function getPricingTier(quantity: number) {
  return pricingTiers.find(tier => quantity >= tier.min && quantity <= tier.max) || pricingTiers[pricingTiers.length - 1];
}

interface SelectedProduct {
  productId: string;
  productName: string;
  quantity: number;
}

export default function PricingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([
    { productId: '', productName: '', quantity: 500 }
  ]);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [customSizeKg, setCustomSizeKg] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProductSelection = () => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, { productId: '', productName: '', quantity: 500 }]);
    }
  };

  const removeProductSelection = (index: number) => {
    if (selectedProducts.length > 1) {
      setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    }
  };

  const updateProductSelection = (index: number, field: string, value: any) => {
    const updated = [...selectedProducts];
    if (field === 'productId') {
      const product = products.find(p => p._id === value);
      updated[index] = {
        ...updated[index],
        productId: value,
        productName: product?.name || ''
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setSelectedProducts(updated);
  };

  const totalQuantity = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
  const tier = getPricingTier(totalQuantity);
  const pricePerKg = tier.pricePerKg;
  const subtotal = totalQuantity * pricePerKg;
  const shippingCost = totalQuantity <= 1000 ? 500 : totalQuantity <= 5000 ? 1000 : 1500;
  const totalCost = subtotal + shippingCost;

  const handleRequestQuote = async () => {
    if (!companyName || !contactEmail || !country) {
      alert('Please fill in all required fields (Company Name, Email, and Country)');
      return;
    }

    const validProducts = selectedProducts.filter(p => p.productId);
    if (validProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email quote
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: validProducts.map(p => ({
            name: p.productName,
            quantity: p.quantity
          })),
          totalQuantity,
          pricingTier: `${tier.label} - $${tier.pricePerKg}/kg`,
          pricePerKg: tier.pricePerKg.toFixed(2),
          estimatedTotal: totalCost.toFixed(2),
          packagingType: `${customSizeKg}kg bags (${Math.ceil(totalQuantity / customSizeKg)} cartons)`,
          companyName,
          buyerEmail: contactEmail,
          country
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
            orderType: 'bulk-quote',
            userEmail: contactEmail,
            companyName,
            country,
            products: validProducts.map(p => ({
              name: p.productName,
              quantity: p.quantity
            })),
            totalQuantity,
            totalAmount: totalCost,
            notes: `Pricing Tier: ${tier.label} - $${tier.pricePerKg}/kg, Packaging: ${customSizeKg}kg bags`,
          }),
        });

        alert('✅ Quote request sent successfully! We\'ll respond within 24 hours.');
        // Reset form
        setCompanyName('');
        setContactEmail('');
        setCountry('');
        setSelectedProducts([{ productId: '', productName: '', quantity: 500 }]);
      } else {
        alert('❌ Failed to send quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error sending quote:', error);
      alert('❌ An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadQuote = () => {
    alert(`Downloaded quote for ${totalQuantity}kg Fox Nuts - Total: $${totalCost.toFixed(2)}`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          Bulk Pricing Calculator
        </h1>
        <p className="text-xl text-[#666666]">
          Transparent pricing that scales with your order volume
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Calculator */}
        <div>
          <div className="bg-white rounded-lg p-8 border border-[#E5DDD5] mb-8">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
              Calculate Your Price
            </h2>

            {/* Product Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-[#2C2C2C] font-bold">
                  Select Products:
                </label>
                {selectedProducts.length < 3 && (
                  <button
                    onClick={addProductSelection}
                    className="text-[#2D5F3F] hover:text-[#1f4428] font-semibold flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {selectedProducts.map((selected, index) => (
                  <div key={index} className="border border-[#E5DDD5] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-[#666666]">Product {index + 1}</span>
                      {selectedProducts.length > 1 && (
                        <button
                          onClick={() => removeProductSelection(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <select
                      value={selected.productId}
                      onChange={(e) => updateProductSelection(index, 'productId', e.target.value)}
                      className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 mb-3"
                    >
                      <option value="">Select a product...</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>
                          {product.name} - {product.flavor}
                        </option>
                      ))}
                    </select>

                    <div>
                      <label className="block text-sm text-[#666666] mb-2">
                        Quantity: <span className="text-[#D4A574] font-bold">{selected.quantity}kg</span>
                      </label>
                      <input
                        type="range"
                        value={selected.quantity}
                        onChange={(e) => updateProductSelection(index, 'quantity', Number(e.target.value))}
                        min={50}
                        max={10000}
                        step={50}
                        className="w-full h-2 bg-[#E5DDD5] rounded-lg appearance-none cursor-pointer accent-[#2D5F3F]"
                      />
                      <div className="flex justify-between text-xs text-[#666666] mt-1">
                        <span>50kg</span>
                        <span>10,000kg</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#FAF8F5] rounded-lg">
                <div className="flex justify-between">
                  <span className="text-[#666666] font-semibold">Total Quantity:</span>
                  <span className="text-[#2D5F3F] font-bold text-lg">{totalQuantity.toLocaleString()}kg</span>
                </div>
              </div>
            </div>

            {/* Pricing Tier Info */}
            <div className="bg-[#FAF8F5] rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#2C2C2C] font-bold">Your Tier:</span>
                <span className="bg-[#D4A574] text-white px-4 py-1 rounded-full font-bold">
                  {tier.label}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Quantity Range:</span>
                  <span className="text-[#2C2C2C] font-semibold">{tier.min.toLocaleString()}-{tier.max.toLocaleString()}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Price per kg:</span>
                  <span className="text-[#2D5F3F] font-bold text-lg">${tier.pricePerKg.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Packaging */}
            <div className="mb-8">
              <label className="block text-[#2C2C2C] font-bold mb-4">
                Packaging Size Preference:
              </label>
              <select
                value={customSizeKg}
                onChange={(e) => setCustomSizeKg(Number(e.target.value))}
                className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2"
              >
                <option value={100}>100kg bags (Standard)</option>
                <option value={50}>50kg bags</option>
                <option value={25}>25kg bags</option>
                <option value={5}>5kg bags (Retail)</option>
              </select>
              <p className="text-sm text-[#666666] mt-2">
                Total cartons: <span className="font-bold">{Math.ceil(totalQuantity / customSizeKg)}</span>
              </p>
            </div>
          </div>

          {/* Request Quote Form */}
          <div className="bg-[#2D5F3F] text-white rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 font-serif">Request Official Quote</h3>

            {/* Product Summary */}
            <div className="mb-4 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-[#E8D4C4] mb-2">Selected Products:</p>
              {selectedProducts.filter(p => p.productId).map((p, i) => (
                <div key={i} className="text-sm mb-1">
                  <span className="font-semibold">{p.productName}</span>: {p.quantity}kg
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-white/20">
                <div className="flex justify-between text-sm">
                  <span>Total Quantity:</span>
                  <span className="font-bold">{totalQuantity}kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price Tier:</span>
                  <span className="font-bold">{tier.label} (${tier.pricePerKg}/kg)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name *"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50"
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50"
                required
              />
              <input
                type="text"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50"
                required
              />
              <button
                onClick={handleRequestQuote}
                disabled={isSubmitting}
                className="w-full bg-[#D4A574] hover:bg-[#c09660] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                {isSubmitting ? 'Sending...' : 'Request Quote'}
              </button>
            </div>
            <p className="text-xs text-[#E8D4C4] mt-4">
              We'll send you a formal quote within 24 hours
            </p>
          </div>
        </div>

        {/* Right Column - Price Breakdown */}
        <div>
          {/* Price Breakdown Card */}
          <div className="bg-gradient-to-br from-[#2D5F3F] to-[#1f4428] text-white rounded-lg p-8 mb-8 sticky top-20">
            <h2 className="text-2xl font-bold mb-8 font-serif">Price Breakdown</h2>

            <div className="space-y-4 mb-8 pb-8 border-b border-white/20">
              <div className="flex justify-between">
                <span className="text-[#E8D4C4]">Product:</span>
                <span className="font-bold text-lg">${(totalQuantity * pricePerKg).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#E8D4C4]">
                <span>{totalQuantity.toLocaleString()}kg × ${pricePerKg}/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E8D4C4]">Shipping:</span>
                <span className="font-bold text-lg">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#E8D4C4]">
                <span>EST. via DHL/FedEx</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-[#D4A574]">Total Cost:</span>
              <span className="text-4xl font-bold">${totalCost.toFixed(2)}</span>
            </div>

            <button
              onClick={handleDownloadQuote}
              className="w-full bg-[#D4A574] hover:bg-[#c09660] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download Invoice
            </button>
          </div>

          {/* Pricing Tiers Table */}
          <div className="bg-white rounded-lg p-8 border border-[#E5DDD5]">
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-6 font-serif">
              Pricing Tiers
            </h3>
            <div className="space-y-3">
              {pricingTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border-2 transition ${totalQuantity >= tier.min && totalQuantity <= tier.max
                    ? 'border-[#D4A574] bg-[#D4A574]/10'
                    : 'border-[#E5DDD5] bg-white hover:bg-[#FAF8F5]'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#2C2C2C]">{tier.label}</div>
                      <div className="text-sm text-[#666666]">
                        {tier.min.toLocaleString()}-{tier.max.toLocaleString()}kg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#D4A574] text-lg">
                        ${tier.pricePerKg.toFixed(2)}/kg
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-[#A8D5BA]/10 rounded-lg p-8 border border-[#A8D5BA] mt-8">
            <h3 className="font-bold text-[#2D5F3F] mb-4">What's Included?</h3>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li className="flex gap-2">
                <span className="text-[#2D5F3F] font-bold">✓</span>
                <span>Transparent, all-inclusive pricing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#2D5F3F] font-bold">✓</span>
                <span>Worldwide shipping available</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#2D5F3F] font-bold">✓</span>
                <span>Batch-specific quality certifications</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#2D5F3F] font-bold">✓</span>
                <span>Custom packaging available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-[#D4A574] text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 font-serif">
          Need Help with Your Quote?
        </h2>
        <p className="text-lg mb-8 text-[#FAF8F5]">
          Our B2B team is ready to discuss custom packaging, payment terms, and logistics
        </p>
        <a href="mailto:business@foxnuts.com">
          <button className="bg-white text-[#D4A574] px-8 py-3 rounded-lg font-semibold hover:bg-[#FAF8F5] transition">
            Contact Our B2B Team
          </button>
        </a>
      </div>
    </main>
  );
}
