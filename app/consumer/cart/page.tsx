'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, clearCart, totalPrice, addItem } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-[#D4A574]" />
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif">Your Cart is Empty</h1>
          <p className="text-[#666666] mb-8 text-lg">Start adding some delicious Makhana snacks!</p>
          <Link
            href="/consumer"
            className="inline-flex items-center gap-2 bg-[#2D5F3F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1f4428] transition"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => setShowCheckout(false)}
            className="mb-6 flex items-center gap-2 text-[#2D5F3F] hover:text-[#1f4428] transition"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-serif">Checkout</h1>

            {/* Order Summary */}
            <div className="mb-8 pb-8 border-b border-[#E5DDD5]">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Order Summary</h2>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <span className="text-[#2C2C2C]">{item.name} x {item.quantity}</span>
                  <span className="font-semibold text-[#2C2C2C]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-[#2C2C2C]">Subtotal:</span>
                <span className="text-xl font-bold text-[#2D5F3F]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-[#2C2C2C]">Shipping:</span>
                <span className="text-xl font-bold text-[#2D5F3F]">$5.00</span>
              </div>
              <div className="border-t border-[#E5DDD5] pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-[#2C2C2C]">Total:</span>
                <span className="text-2xl font-bold text-[#D4A574]">${(totalPrice + 5).toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Form */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Payment Method</h2>
              <select className="w-full px-4 py-2 border border-[#E5DDD5] rounded-lg text-[#2C2C2C]">
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>PayPal</option>
                <option>Apple Pay</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 px-6 py-3 border border-[#E5DDD5] rounded-lg text-[#2C2C2C] font-semibold hover:bg-[#FAF8F5] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Order placed successfully! (Demo - No backend)');
                  clearCart();
                  setShowCheckout(false);
                }}
                className="flex-1 px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-8 font-serif">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm flex items-center gap-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-lg bg-[#FAF8F5] flex items-center justify-center">
                  {item.image.startsWith('data:image') ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : item.image.startsWith('/') || item.image.startsWith('http') ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-6xl">{item.image}</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2C2C2C]">{item.name}</h3>
                  <p className="text-[#666666] mb-2">${item.price.toFixed(2)} each</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-[#FAF8F5] w-fit px-3 py-2 rounded-lg">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          addItem({ ...item, quantity: -1 });
                        }
                      }}
                      className="text-[#2D5F3F] hover:text-[#1f4428] transition"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-3 text-[#2C2C2C] font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      className="text-[#2D5F3F] hover:text-[#1f4428] transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#D4A574] mb-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition flex items-center gap-2 justify-end"
                  >
                    <Trash2 size={20} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-20">
              <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">Order Summary</h2>

              {/* Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-[#E5DDD5]">
                <div className="flex justify-between text-[#2C2C2C]">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#2C2C2C]">
                  <span>Shipping:</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-[#2C2C2C]">
                  <span>Tax:</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#E5DDD5]">
                <span className="text-xl font-bold text-[#2C2C2C]">Total:</span>
                <span className="text-2xl font-bold text-[#D4A574]">
                  ${(totalPrice + 5 + totalPrice * 0.1).toFixed(2)}
                </span>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  href="/consumer/checkout"
                  className="block w-full text-center bg-[#2D5F3F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1f4428] transition"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/consumer"
                  className="block w-full text-center px-6 py-3 border border-[#E5DDD5] text-[#2C2C2C] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Clear Cart */}
              {items.length > 0 && (
                <button
                  onClick={() => clearCart()}
                  className="w-full mt-4 text-red-500 hover:text-red-700 transition text-sm"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
