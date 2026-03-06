'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, DollarSign, ShoppingCart, FileText, User } from 'lucide-react';

export default function BusinessDashboard() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            fetchOrders(parsedUser.email);
        }
    }, []);

    const fetchOrders = async (userEmail: string) => {
        try {
            const response = await fetch(`/api/business-orders?email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
                setStats({
                    totalOrders: data.stats.totalOrders,
                    totalSpent: data.stats.totalSpent,
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-[#666666] mt-2">
                    {user?.businessName} - {user?.businessType}
                </p>
            </div>

            {/* Business Info Card */}
            <div className="bg-gradient-to-br from-[#2D5F3F] to-[#1f4428] text-white rounded-lg p-6 mb-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{user?.businessName}</h2>
                        <p className="text-[#E8D4C4] mb-4 capitalize">{user?.businessType} Business</p>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-[#D4A574]">Email:</span> {user?.email}</p>
                            <p><span className="text-[#D4A574]">Account Type:</span> Business / Wholesale</p>
                        </div>
                    </div>
                    <User className="text-[#D4A574]" size={48} />
                </div>
            </div>

            {/* Stats Grid - Only Total Orders and Total Spent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">{stats.totalOrders}</p>
                            <p className="text-xs text-[#999999] mt-1">Bulk Quotes & Sample Kits</p>
                        </div>
                        <ShoppingCart className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Spent</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">${stats.totalSpent.toFixed(2)}</p>
                            <p className="text-xs text-[#999999] mt-1">Sample Kits Only</p>
                        </div>
                        <DollarSign className="text-[#D4A574]" size={40} />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5] mb-8">
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/consumer"
                        className="px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                    >
                        Browse Products
                    </Link>
                    <Link
                        href="/business/pricing"
                        className="px-6 py-3 border-2 border-[#2D5F3F] text-[#2D5F3F] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                    >
                        Bulk Pricing
                    </Link>
                    <Link
                        href="/business/compliance"
                        className="px-6 py-3 border-2 border-[#2D5F3F] text-[#2D5F3F] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                    >
                        Compliance Docs
                    </Link>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Recent Orders</h2>
                {loading ? (
                    <p className="text-[#666666]">Loading...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                        <ShoppingCart className="mx-auto mb-4 text-[#D4A574]" size={48} />
                        <p className="text-[#666666] mb-4">No orders yet</p>
                        <Link
                            href="/business/pricing"
                            className="inline-block px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                        >
                            Request Bulk Quote
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E5DDD5]">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Order ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Type</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Products</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Total</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 10).map((order: any) => (
                                    <tr key={order._id} className="border-b border-[#E5DDD5] hover:bg-[#FAF8F5]">
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C] font-mono">
                                            #{order._id.slice(-6)}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.orderType === 'bulk-quote'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                {order.orderType === 'bulk-quote' ? 'Bulk Quote' : 'Sample Kit'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C]">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C]">
                                            {order.products?.length || 0} products
                                        </td>
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C] font-semibold">
                                            ${order.totalAmount?.toFixed(2) || '0.00'}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : order.status === 'processing'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Business Resources */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/business/compliance" className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
                    <FileText className="w-12 h-12 text-[#D4A574] mb-4" />
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Compliance Vault</h3>
                    <p className="text-sm text-[#666666]">
                        Access FDA, HACCP, and ISO certifications
                    </p>
                </Link>

                <Link href="/business/pricing" className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
                    <DollarSign className="w-12 h-12 text-[#D4A574] mb-4" />
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Bulk Pricing</h3>
                    <p className="text-sm text-[#666666]">
                        Calculate tiered pricing for bulk orders
                    </p>
                </Link>

                <Link href="/business/sample-kit" className="bg-white p-6 rounded-lg border border-[#E5DDD5] hover:shadow-lg transition">
                    <Package className="w-12 h-12 text-[#D4A574] mb-4" />
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Sample Kit</h3>
                    <p className="text-sm text-[#666666]">
                        Order a refundable sample kit
                    </p>
                </Link>
            </div>
        </div>
    );
}
