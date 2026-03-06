'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, Package, DollarSign, User, Mail, Phone, MapPin, FileText } from 'lucide-react';

// Kit Orders Management - Updated UI v2
export default function AdminKitOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        fetchKitOrders();
    }, []);

    const fetchKitOrders = async () => {
        try {
            const response = await fetch('/api/business-orders');
            const data = await response.json();

            if (data.success) {
                // Filter only sample kit orders
                const kitOrders = data.orders.filter((order: any) => order.orderType === 'sample-kit');
                setOrders(kitOrders);
            }
        } catch (error) {
            console.error('Error fetching kit orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/business-orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Order status updated successfully!');
                fetchKitOrders();
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            } else {
                alert('❌ Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('❌ An error occurred');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        completed: orders.filter(o => o.status === 'completed').length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    };

    return (
        <div className="lg:ml-64 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2 font-serif">
                    Kit Orders Management
                </h1>
                <p className="text-[#666666]">
                    Manage sample kit orders from business customers
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-[#2C2C2C]">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Processing</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Completed</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-[#2D5F3F]">${stats.totalRevenue.toFixed(0)}</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg p-6 mb-8 border border-[#E5DDD5]">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
                        <input
                            type="text"
                            placeholder="Search by company, email, or order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] text-[#2C2C2C]"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] text-[#2C2C2C] min-w-[200px]"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <p className="text-sm text-[#666666] mt-4">
                    Showing {filteredOrders.length} of {orders.length} kit orders
                </p>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F]"></div>
                        <p className="text-[#666666] mt-4">Loading kit orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="mx-auto mb-4 text-[#D4A574]" size={48} />
                        <p className="text-[#666666]">No kit orders found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F8F9FA] border-b border-[#E5DDD5]">
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Order ID</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Company</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Contact</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Email</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Products</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Amount</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Date</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-semibold text-sm">Status</th>
                                    <th className="px-6 py-4 text-center text-[#2C2C2C] font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, idx) => (
                                    <tr key={order._id} className="border-b border-[#E5DDD5] hover:bg-[#F8F9FA] transition">
                                        <td className="px-6 py-4 text-[#2C2C2C] font-mono text-sm">
                                            #{order._id.slice(-8)}
                                        </td>
                                        <td className="px-6 py-4 text-[#2C2C2C] font-medium">
                                            {order.companyName}
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            {order.contactName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            {order.userEmail}
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            {order.products?.length || 0} varieties
                                        </td>
                                        <td className="px-6 py-4 text-[#2D5F3F] font-semibold">
                                            ${order.totalAmount?.toFixed(2) || '50.00'}
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : order.status === 'processing'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition bg-[#2D5F3F] hover:bg-[#1f4428] text-white text-sm"
                                            >
                                                <FileText size={16} />
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#E5DDD5] flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#2C2C2C] font-serif">
                                Sample Kit Order Details
                            </h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-[#666666] hover:text-[#2C2C2C] text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E5DDD5]">
                                <h3 className="font-semibold text-[#2C2C2C] mb-3">Order Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[#666666] mb-1">Order ID</p>
                                        <p className="font-mono font-medium text-[#2C2C2C]">#{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#666666] mb-1">Date</p>
                                        <p className="font-medium text-[#2C2C2C]">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#666666] mb-1">Products</p>
                                        <p className="font-medium text-[#2C2C2C]">{selectedOrder.products?.length || 0} varieties</p>
                                    </div>
                                    <div>
                                        <p className="text-[#666666] mb-1">Amount</p>
                                        <p className="font-semibold text-[#2D5F3F] text-lg">${selectedOrder.totalAmount?.toFixed(2) || '50.00'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Company Info */}
                            <div>
                                <h3 className="font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
                                    <User size={20} className="text-[#D4A574]" />
                                    Company Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[#666666] mb-1">Company Name</p>
                                        <p className="font-medium text-[#2C2C2C]">{selectedOrder.companyName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#666666] mb-1">Contact Name</p>
                                        <p className="font-medium text-[#2C2C2C]">{selectedOrder.contactName || 'N/A'}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Mail size={16} className="text-[#D4A574] mt-1" />
                                        <div>
                                            <p className="text-[#666666] mb-1">Email</p>
                                            <p className="font-medium text-[#2C2C2C]">{selectedOrder.userEmail}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Phone size={16} className="text-[#D4A574] mt-1" />
                                        <div>
                                            <p className="text-[#666666] mb-1">Phone</p>
                                            <p className="font-medium text-[#2C2C2C]">{selectedOrder.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-[#D4A574] mt-1" />
                                        <div>
                                            <p className="text-[#666666] mb-1">Country</p>
                                            <p className="font-medium text-[#2C2C2C]">{selectedOrder.country || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[#666666] mb-1">Business Type</p>
                                        <p className="font-medium text-[#2C2C2C] capitalize">{selectedOrder.businessType || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div>
                                <h3 className="font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
                                    <Package size={20} className="text-[#D4A574]" />
                                    Sample Kit Contents
                                </h3>
                                <div className="border border-[#E5DDD5] rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-[#F8F9FA]">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#2C2C2C]">Product Name</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-[#2C2C2C]">Flavor</th>
                                                <th className="px-4 py-3 text-right text-sm font-semibold text-[#2C2C2C]">Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.products?.map((product: any, idx: number) => (
                                                <tr key={idx} className="border-t border-[#E5DDD5]">
                                                    <td className="px-4 py-3 text-[#2C2C2C]">{product.name}</td>
                                                    <td className="px-4 py-3 text-[#666666] capitalize">{product.flavor || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-right font-medium text-[#2C2C2C]">{product.weight || '300g'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedOrder.notes && (
                                <div>
                                    <h3 className="font-semibold text-[#2C2C2C] mb-2">Additional Notes</h3>
                                    <p className="text-sm text-[#666666] bg-[#F8F9FA] p-3 rounded-lg border border-[#E5DDD5]">
                                        {selectedOrder.notes}
                                    </p>
                                </div>
                            )}

                            {/* Status Update */}
                            <div>
                                <h3 className="font-semibold text-[#2C2C2C] mb-3">Update Order Status</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder._id, 'pending')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${selectedOrder.status === 'pending'
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            }`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder._id, 'processing')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${selectedOrder.status === 'processing'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                            }`}
                                    >
                                        Processing
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder._id, 'completed')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${selectedOrder.status === 'completed'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#E5DDD5]">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-full bg-[#2D5F3F] hover:bg-[#1f4428] text-white py-3 rounded-lg font-semibold transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
