'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, TrendingUp, Users, DollarSign, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        fetchAllData();

        // Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchAllData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchAllData = async () => {
        await Promise.all([
            fetchProducts(),
            fetchOrders(),
            fetchUsers(),
        ]);
        setLastUpdated(new Date());
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
                setStats((prev) => ({
                    ...prev,
                    totalProducts: data.products.length,
                }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();

            if (data.success) {
                const totalRevenue = data.orders.reduce((sum: number, order: any) =>
                    sum + order.totalAmount, 0
                );
                setStats((prev) => ({
                    ...prev,
                    totalOrders: data.orders.length,
                    totalRevenue: totalRevenue,
                }));
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();

            if (data.success) {
                setStats((prev) => ({
                    ...prev,
                    totalUsers: data.users.length,
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">Dashboard</h1>
                    <p className="text-[#666666] mt-2">Welcome to your admin panel</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-[#666666]">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                    <button
                        onClick={fetchAllData}
                        className="p-2 hover:bg-[#FAF8F5] rounded-lg transition"
                        title="Refresh data"
                    >
                        <RefreshCw size={20} className="text-[#2D5F3F]" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Products</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">{stats.totalProducts}</p>
                        </div>
                        <Package className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Orders</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">{stats.totalOrders}</p>
                        </div>
                        <TrendingUp className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">${stats.totalRevenue.toFixed(2)}</p>
                        </div>
                        <DollarSign className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Users</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">{stats.totalUsers}</p>
                        </div>
                        <Users className="text-[#D4A574]" size={40} />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5] mb-8">
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/admin/products/add"
                        className="px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                    >
                        Add New Product
                    </Link>
                    <Link
                        href="/admin/users/add"
                        className="px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                    >
                        Add New User
                    </Link>
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 border-2 border-[#2D5F3F] text-[#2D5F3F] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                    >
                        Manage Products
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="px-6 py-3 border-2 border-[#2D5F3F] text-[#2D5F3F] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                    >
                        View Orders
                    </Link>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Recent Products</h2>
                {loading ? (
                    <p className="text-[#666666]">Loading...</p>
                ) : products.length === 0 ? (
                    <p className="text-[#666666]">No products yet. Add your first product!</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E5DDD5]">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Price</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Category</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2C2C2C]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(0, 5).map((product: any) => (
                                    <tr key={product._id} className="border-b border-[#E5DDD5] hover:bg-[#FAF8F5]">
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C]">{product.name}</td>
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C]">${product.price}</td>
                                        <td className="py-3 px-4 text-sm text-[#2C2C2C]">{product.category}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${product.inStock
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
