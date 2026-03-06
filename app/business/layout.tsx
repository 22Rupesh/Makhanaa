'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Search, LogOut } from 'lucide-react';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is business
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');

    if (!isLoggedIn || !userData) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'business') {
      // Redirect to appropriate portal based on role
      if (parsedUser.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/consumer');
      }
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-xl text-[#2D5F3F]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/business" className="text-2xl font-bold text-[#D4A574] font-serif">
              Fox Nuts B2B 🏢
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
              <Link href="/business/dashboard" className="text-[#2C2C2C] hover:text-[#D4A574] transition font-semibold">
                Dashboard
              </Link>
              <Link href="/business" className="text-[#2C2C2C] hover:text-[#D4A574] transition">
                Overview
              </Link>
              <Link href="/business/orders" className="text-[#2C2C2C] hover:text-[#D4A574] transition">
                Orders
              </Link>
              <Link href="/business/pricing" className="text-[#2C2C2C] hover:text-[#D4A574] transition">
                Shop
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-semibold"
              >
                <LogOut size={18} />
                Logout
              </button>
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
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#2C2C2C]"
                />
              </div>
              <Link href="/business" className="block py-2 px-4 text-[#2C2C2C] hover:text-[#D4A574]">
                Overview
              </Link>
              <Link href="/business/products" className="block py-2 px-4 text-[#2C2C2C] hover:text-[#D4A574]">
                Products
              </Link>
              <Link href="/business/orders" className="block py-2 px-4 text-[#2C2C2C] hover:text-[#D4A574]">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-2 px-4 text-red-600 hover:text-red-700 font-semibold w-full"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer className="bg-[#2D5F3F] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Fox Nuts</h3>
            <p className="text-[#E8D4C4] text-sm">Premium organic Fox Nuts from Bihar, India</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Business</h3>
            <ul className="text-[#E8D4C4] text-sm space-y-2">
              <li><Link href="/business/products">Bulk Products</Link></li>
              <li><Link href="/business/orders">My Orders</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-[#E8D4C4] text-sm space-y-2">
              <li><a href="mailto:business@foxnuts.com">business@foxnuts.com</a></li>
              <li><a href="tel:+1-555-0100">+1 (555) 0100</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Consumer Portal</h3>
            <p className="text-[#E8D4C4] text-sm"><Link href="/consumer">Shop Now</Link></p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-[#A8D5BA] text-center text-[#E8D4C4] text-sm">
          <p>&copy; 2026 Fox Nuts India. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
