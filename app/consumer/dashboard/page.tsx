'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Settings, LogOut, ShoppingBag, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        router.push('/');
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="text-yellow-500" size={20} />;
            case 'processing':
                return <Package className="text-blue-500" size={20} />;
            case 'shipped':
                return <Truck className="text-purple-500" size={20} />;
            case 'delivered':
                return <CheckCircle className="text-green-500" size={20} />;
            case 'cancelled':
                return <XCircle className="text-red-500" size={20} />;
            default:
                return <Package className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'processing':
                return 'bg-blue-100 text-blue-700';
            case 'shipped':
                return 'bg-purple-100 text-purple-700';
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#2D5F3F] mb-8 font-serif">My Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 space-y-2">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'orders' ? 'bg-[#2D5F3F] text-white' : 'hover:bg-[#FAF8F5] text-[#2C2C2C]'
                            }`}
                    >
                        <ShoppingBag size={20} /> My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'settings' ? 'bg-[#2D5F3F] text-white' : 'hover:bg-[#FAF8F5] text-[#2C2C2C]'
                            }`}
                    >
                        <Settings size={20} /> Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-50 transition mt-8"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white border border-[#E5DDD5] rounded-lg p-8">
                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6">Order History</h2>

                            {loading ? (
                                <p className="text-[#666666]">Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="mx-auto text-[#E5DDD5] mb-4" size={64} />
                                    <p className="text-[#666666] mb-4">No orders yet</p>
                                    <Link href="/consumer">
                                        <button className="bg-[#2D5F3F] text-white px-6 py-2 rounded-lg hover:bg-[#1f4428] transition">
                                            Start Shopping
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order: any) => (
                                        <div key={order._id} className="bg-[#FAF8F5] rounded-lg p-6 border border-[#E5DDD5]">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-[#2C2C2C]">
                                                        Order #{order.orderId}
                                                    </h3>
                                                    <p className="text-sm text-[#666666]">
                                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(order.status)}
                                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="space-y-2 mb-4">
                                                {order.items.map((item: any, index: number) => (
                                                    <div key={index} className="flex justify-between text-sm">
                                                        <span className="text-[#2C2C2C]">
                                                            {item.productName} × {item.quantity}
                                                        </span>
                                                        <span className="text-[#666666]">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Total */}
                                            <div className="pt-4 border-t border-[#E5DDD5] flex justify-between items-center">
                                                <span className="font-bold text-[#2C2C2C]">Total</span>
                                                <span className="font-bold text-[#2D5F3F] text-lg">
                                                    ${order.totalAmount.toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="mt-4 pt-4 border-t border-[#E5DDD5]">
                                                <p className="text-sm font-semibold text-[#2C2C2C] mb-1">Shipping To:</p>
                                                <p className="text-sm text-[#666666]">
                                                    {order.shippingAddress.name}<br />
                                                    {order.shippingAddress.address}<br />
                                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                                                </p>
                                            </div>

                                            {/* Order Tracking */}
                                            {order.status !== 'cancelled' && (
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className={`flex-1 h-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-200' : 'bg-green-200'}`} />
                                                        <div className={`flex-1 h-2 rounded-full mx-2 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-200' : 'bg-gray-200'}`} />
                                                        <div className={`flex-1 h-2 rounded-full mx-2 ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-200' : 'bg-gray-200'}`} />
                                                        <div className={`flex-1 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-200' : 'bg-gray-200'}`} />
                                                    </div>
                                                    <div className="flex justify-between text-xs text-[#666666] mt-2">
                                                        <span>Pending</span>
                                                        <span>Processing</span>
                                                        <span>Shipped</span>
                                                        <span>Delivered</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6">Account Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={user?.name || ''}
                                        disabled
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Role</label>
                                    <input
                                        type="text"
                                        value={user?.role || ''}
                                        disabled
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg bg-gray-50 capitalize"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
