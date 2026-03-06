'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    businessName: '',
    businessType: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push(data.redirectUrl);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (data.success) {
        setIsLogin(true);
        setError('');
        alert('Registration successful! Please login.');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#E8D4C4] to-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-[#2D5F3F] font-serif">Fox Nuts India</h1>
          <p className="text-sm text-[#666666]">Premium Superfood Snacks from India to USA</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Welcome Message */}
          <div className="space-y-6">
            <div>
              <h2 className="text-5xl font-bold text-[#2C2C2C] font-serif mb-4">
                Welcome to<br />Fox Nuts India
              </h2>
              <p className="text-xl text-[#666666] mb-6">
                Discover premium, organic Fox Nuts snacks that fuel your healthy lifestyle
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🛍️</div>
                <div>
                  <h3 className="font-bold text-[#2D5F3F]">Shop for Yourself</h3>
                  <p className="text-sm text-[#666666]">Browse our premium Fox Nuts collection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-3xl">🏢</div>
                <div>
                  <h3 className="font-bold text-[#2D5F3F]">Source for Business</h3>
                  <p className="text-sm text-[#666666]">Bulk wholesale solutions with transparent pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-bold text-[#2D5F3F]">Fast & Secure</h3>
                  <p className="text-sm text-[#666666]">Quick delivery from India to USA</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-[#E5DDD5]">
                <p className="text-xs font-semibold text-[#2D5F3F]">✓ FDA Compliant</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-[#E5DDD5]">
                <p className="text-xs font-semibold text-[#2D5F3F]">✓ 100% Organic</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-[#E5DDD5]">
                <p className="text-xs font-semibold text-[#2D5F3F]">✓ Premium Quality</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Register Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#E5DDD5]">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 bg-[#FAF8F5] p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${isLogin
                  ? 'bg-[#2D5F3F] text-white'
                  : 'text-[#666666] hover:text-[#2D5F3F]'
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${!isLogin
                  ? 'bg-[#2D5F3F] text-white'
                  : 'text-[#666666] hover:text-[#2D5F3F]'
                  }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#2D5F3F]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2D5F3F] text-white py-3 rounded-lg font-semibold hover:bg-[#1f4428] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#2D5F3F]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">Minimum 6 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    I am registering as
                  </label>
                  <select
                    value={registerData.role}
                    onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                    className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                  >
                    <option value="user">👤 Individual Customer</option>
                    <option value="business">🏢 Business / Wholesale</option>
                  </select>
                </div>

                {/* Business Fields (conditional) */}
                {registerData.role === 'business' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={registerData.businessName}
                        onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                        placeholder="Your Company Name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        Business Type
                      </label>
                      <select
                        value={registerData.businessType}
                        onChange={(e) => setRegisterData({ ...registerData, businessType: e.target.value })}
                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-2 focus:ring-[#2D5F3F]/20"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="retailer">Retailer</option>
                        <option value="distributor">Distributor</option>
                        <option value="restaurant">Restaurant / Cafe</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2D5F3F] text-white py-3 rounded-lg font-semibold hover:bg-[#1f4428] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-[#E5DDD5] bg-white/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#666666]">
          <p>© 2026 Fox Nuts India. Premium Superfood Snacks from India to USA.</p>
        </div>
      </footer>
    </div>
  );
}
