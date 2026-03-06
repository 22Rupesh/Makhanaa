'use client';

import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Search, Filter } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
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

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        if (!confirm(`Update order status to ${newStatus}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Order status updated successfully');
                fetchOrders();
            } else {
                alert(data.message || 'Failed to update order status');
            }
        } catch (error) {
            alert('Error updating order status');
        }
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

    const filteredOrders = orders.filter((order: any) => {
        const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesRole = filterRole === 'all' || order.userId?.role === filterRole;
        return matchesSearch && matchesStatus && matchesRole;
    });

    // Separate orders by customer type
    const customerOrders = filteredOrders.filter((order: any) => order.userId?.role === 'user');
    const businessOrders = filteredOrders.filter((order: any) => order.userId?.role === 'business');

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">Order Management</h1>
                    <p className="text-[#666666] mt-2">Track and manage all orders</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order ID or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                        />
                    </div>
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                >
                    <option value="all">All Customers</option>
                    <option value="user">Retail Customers</option>
                    <option value="business">Business Customers</option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <p className="text-sm text-[#666666] mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-[#2D5F3F]">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <p className="text-sm text-[#666666] mb-1">Customer Orders</p>
                    <p className="text-2xl font-bold text-[#2D5F3F]">
                        {orders.filter((o: any) => o.userId?.role === 'user').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <p className="text-sm text-[#666666] mb-1">Business Orders</p>
                    <p className="text-2xl font-bold text-[#2D5F3F]">
                        {orders.filter((o: any) => o.userId?.role === 'business').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <p className="text-sm text-[#666666] mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {orders.filter((o: any) => o.status === 'pending').length}
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-[#666666]">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-[#E5DDD5]">
                    <p className="text-[#666666]">No orders found</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Customer Orders Section */}
                    {customerOrders.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4">
                                🛍️ Customer Orders ({customerOrders.length})
                            </h2>
                            <div className="space-y-4">
                                {customerOrders.map((order: any) => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onStatusUpdate={handleStatusUpdate}
                                        getStatusIcon={getStatusIcon}
                                        getStatusColor={getStatusColor}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Business Orders Section */}
                    {businessOrders.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4">
                                🏢 Business Orders ({businessOrders.length})
                            </h2>
                            <div className="space-y-4">
                                {businessOrders.map((order: any) => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onStatusUpdate={handleStatusUpdate}
                                        getStatusIcon={getStatusIcon}
                                        getStatusColor={getStatusColor}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function OrderCard({ order, onStatusUpdate, getStatusIcon, getStatusColor }: any) {
    return (
        <div className="bg-white rounded-lg p-6 border border-[#E5DDD5] shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-[#2C2C2C]">Order #{order.orderId}</h3>
                    <p className="text-sm text-[#666666]">
                        {order.userId?.name} ({order.userId?.email})
                    </p>
                    <p className="text-xs text-[#999999]">
                        Placed: {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <select
                        value={order.status}
                        onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold border-2 ${getStatusColor(order.status)}`}
                    >
                        <option value="pending">PENDING</option>
                        <option value="processing">PROCESSING</option>
                        <option value="shipped">SHIPPED</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                    </select>
                </div>
            </div>

            {/* Order Items */}
            <div className="mb-4 bg-[#FAF8F5] rounded-lg p-4">
                <h4 className="font-semibold text-sm text-[#2C2C2C] mb-2">Items:</h4>
                <div className="space-y-1">
                    {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="text-[#2C2C2C]">
                                {item.productName} × {item.quantity}
                            </span>
                            <span className="text-[#666666]">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#E5DDD5] flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#2D5F3F]">${order.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="text-sm">
                <p className="font-semibold text-[#2C2C2C] mb-1">Shipping Address:</p>
                <p className="text-[#666666]">
                    {order.shippingAddress.name}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
            </div>
        </div>
    );
}
