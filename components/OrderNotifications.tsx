'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export default function OrderNotifications() {
    const [orders, setOrders] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [newOrderCount, setNewOrderCount] = useState(0);

    useEffect(() => {
        fetchOrders();

        // Check for new orders every 15 seconds
        const interval = setInterval(() => {
            fetchOrders();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();

            if (data.success) {
                // Get orders from last 24 hours
                const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                const recentOrders = data.orders.filter((order: any) =>
                    new Date(order.createdAt) > oneDayAgo
                ).slice(0, 5);

                setOrders(recentOrders);

                // Count pending orders as "new"
                const pendingCount = data.orders.filter((order: any) =>
                    order.status === 'pending'
                ).length;
                setNewOrderCount(pendingCount);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 hover:bg-[#FAF8F5] rounded-lg transition"
            >
                <Bell size={24} className="text-[#2C2C2C]" />
                {newOrderCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {newOrderCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-[#E5DDD5] z-50">
                    <div className="p-4 border-b border-[#E5DDD5]">
                        <h3 className="font-bold text-[#2C2C2C]">Recent Orders</h3>
                        <p className="text-sm text-[#666666]">{newOrderCount} pending orders</p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {orders.length === 0 ? (
                            <div className="p-4 text-center text-[#666666]">
                                No recent orders
                            </div>
                        ) : (
                            orders.map((order) => (
                                <Link
                                    key={order._id}
                                    href="/admin/orders"
                                    onClick={() => setShowDropdown(false)}
                                    className="block p-4 hover:bg-[#FAF8F5] border-b border-[#E5DDD5] last:border-b-0"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-semibold text-[#2C2C2C] text-sm">
                                            Order #{order._id.slice(-6)}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : order.status === 'processing'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : order.status === 'shipped'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-green-100 text-green-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#666666]">
                                        ${order.totalAmount.toFixed(2)} • {order.items.length} items
                                    </p>
                                    <p className="text-xs text-[#999999] mt-1">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </Link>
                            ))
                        )}
                    </div>

                    <Link
                        href="/admin/orders"
                        onClick={() => setShowDropdown(false)}
                        className="block p-4 text-center text-[#2D5F3F] font-semibold hover:bg-[#FAF8F5] border-t border-[#E5DDD5]"
                    >
                        View All Orders
                    </Link>
                </div>
            )}
        </div>
    );
}
