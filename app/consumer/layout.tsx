'use client';

import React from "react";
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useState } from 'react';
import { CartProvider, useCart } from '@/lib/cart-context';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#2D5F3F] font-serif">
            Makhana 🌾
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-[#FAF8F5] rounded-full px-4 py-2 mr-4 border border-transparent focus-within:border-[#D4A574] transition w-64">
              <Search size={18} className="text-[#666666]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#2C2C2C] placeholder-[#999999]"
              />
            </div>
            <Link href="/consumer" className="text-[#2C2C2C] hover:text-[#2D5F3F] transition">
              Shop
            </Link>
            <Link href="/consumer/quiz" className="text-[#2C2C2C] hover:text-[#2D5F3F] transition">
              Take Quiz
            </Link>
            <Link href="/consumer/recipes" className="text-[#2C2C2C] hover:text-[#2D5F3F] transition">
              Recipes
            </Link>
            <div className="h-4 w-px bg-[#E5DDD5]" />

            {/* Auth Links */}
            {isLoggedIn ? (
              <Link href="/consumer/dashboard" className="flex items-center gap-2 text-[#2D5F3F] font-semibold hover:bg-[#FAF8F5] px-3 py-2 rounded transition">
                <div className="w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-[#2C2C2C] hover:text-[#2D5F3F] transition font-medium">
                  Login
                </Link>
                <Link href="/register" className="text-[#2C2C2C] hover:text-[#2D5F3F] transition font-medium">
                  Register
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link href="/consumer/cart" className="relative flex items-center gap-2 text-[#2D5F3F] hover:bg-[#FAF8F5] px-3 py-2 rounded transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4A574] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-[#E5DDD5]">
            <div className="flex items-center bg-[#FAF8F5] rounded-lg px-4 py-2 m-4 border border-[#E5DDD5]">
              <Search size={18} className="text-[#666666]" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#2C2C2C]"
              />
            </div>
            <Link href="/consumer" className="block py-2 text-[#2C2C2C] hover:text-[#2D5F3F]">
              Shop
            </Link>
            <Link href="/consumer/quiz" className="block py-2 text-[#2C2C2C] hover:text-[#2D5F3F]">
              Take Quiz
            </Link>
            <Link href="/consumer/recipes" className="block py-2 text-[#2C2C2C] hover:text-[#2D5F3F]">
              Recipes
            </Link>
            <Link href="/consumer/cart" className="block py-2 text-[#2C2C2C] hover:text-[#2D5F3F]">
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF8F5]">
        <NavBar />

        {/* Content */}
        {children}

        {/* Footer */}
        <footer className="bg-[#2D5F3F] text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Makhana</h3>
              <p className="text-[#E8D4C4] text-sm">Premium organic Makhana snacks from India</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="text-[#E8D4C4] text-sm space-y-2">
                <li><Link href="/consumer">Products</Link></li>
                <li><Link href="/consumer/quiz">Find Your Flavor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Learn</h3>
              <ul className="text-[#E8D4C4] text-sm space-y-2">
                <li><Link href="/consumer/recipes">Recipes</Link></li>
                <li><a href="#nutrition">Nutrition</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Business</h3>
              <p className="text-[#E8D4C4] text-sm"><Link href="/">Wholesale Portal</Link></p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-[#A8D5BA] text-center text-[#E8D4C4] text-sm">
            <p>&copy; 2026 Makhana India. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
