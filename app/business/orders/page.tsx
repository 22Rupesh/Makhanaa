'use client';

import { useState, useEffect } from 'react';
import { Package, Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react';

export default function BusinessOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const bulkOrders = orders.filter(o => o.orderType === 'bulk-quote');
  const sampleKitOrders = orders.filter(o => o.orderType === 'sample-kit');

  const stats = {
    totalOrders: orders.length,
    bulkQuotes: bulkOrders.length,
    sampleKits: sampleKitOrders.length,
    totalSpent: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          My Orders
        </h1>
        <p className="text-[#666666] text-lg">
          Track your bulk quotes and sample kit orders
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#2D5F3F] to-[#1f4428] text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold opacity-90">Total Orders</h3>
            <Package size={24} className="opacity-75" />
          </div>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
          <p className="text-xs opacity-75 mt-2">All time</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-[#E5DDD5]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[#666666]">Bulk Quotes</h3>
            <FileText size={24} className="text-[#D4A574]" />
          </div>
          <p className="text-4xl font-bold text-[#2D5F3F]">{stats.bulkQuotes}</p>
          <p className="text-xs text-[#999999] mt-2">Quote requests</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-[#E5DDD5]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[#666666]">Sample Kits</h3>
            <Package size={24} className="text-[#D4A574]" />
          </div>
          <p className="text-4xl font-bold text-[#2D5F3F]">{stats.sampleKits}</p>
          <p className="text-xs text-[#999999] mt-2">Ordered</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-[#E5DDD5]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[#666666]">Total Spent</h3>
            <DollarSign size={24} className="text-[#D4A574]" />
          </div>
          <p className="text-4xl font-bold text-[#2D5F3F]">${stats.totalSpent.toFixed(2)}</p>
          <p className="text-xs text-[#999999] mt-2">Sample kits</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg border border-[#E5DDD5] p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4 font-serif">Order Status Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-3">
              <TrendingUp className="text-yellow-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-[#666666] mt-1">Pending</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-3">
              <Package className="text-blue-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
            <p className="text-sm text-[#666666] mt-1">Processing</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3">
              <FileText className="text-green-600" size={32} />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-[#666666] mt-1">Completed</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
        <div className="p-6 border-b border-[#E5DDD5]">
          <h2 className="text-2xl font-bold text-[#2C2C2C] font-serif">Order History</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F]"></div>
            <p className="text-[#666666] mt-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto mb-4 text-[#D4A574]" size={64} />
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No orders yet</h3>
            <p className="text-[#666666] mb-6">Start by requesting a bulk quote or ordering a sample kit</p>
            <div className="flex gap-4 justify-center">
              <a
                href="/business/pricing"
                className="bg-[#2D5F3F] hover:bg-[#1f4428] text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Request Bulk Quote
              </a>
              <a
                href="/business/sample-kit"
                className="border-2 border-[#2D5F3F] text-[#2D5F3F] hover:bg-[#FAF8F5] px-6 py-3 rounded-lg font-semibold transition"
              >
                Order Sample Kit
              </a>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5DDD5]">
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Order ID</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Type</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Date</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Products</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Quantity</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Amount</th>
                  <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="px-6 py-4 text-[#2C2C2C] font-mono text-sm">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.orderType === 'bulk-quote'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                        }`}>
                        {order.orderType === 'bulk-quote' ? 'Bulk Quote' : 'Sample Kit'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#666666] text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D4A574]" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#666666] text-sm">
                      {order.products?.length || 0} items
                    </td>
                    <td className="px-6 py-4 text-[#2C2C2C] font-semibold">
                      {order.orderType === 'bulk-quote'
                        ? `${order.totalQuantity?.toLocaleString() || 0} kg`
                        : `${order.products?.length || 0} varieties`
                      }
                    </td>
                    <td className="px-6 py-4 text-[#2D5F3F] font-bold">
                      ${order.totalAmount?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                        }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-[#FAF8F5] rounded-lg p-6 border border-[#E5DDD5]">
        <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Need Help?</h3>
        <p className="text-[#666666] text-sm mb-4">
          If you have questions about your orders or need assistance, please contact our team.
        </p>
        <a
          href="mailto:business@foxnuts.com"
          className="inline-block bg-[#2D5F3F] hover:bg-[#1f4428] text-white px-6 py-2 rounded-lg font-semibold transition text-sm"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
