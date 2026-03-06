'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, LogOut, Menu, X, Users, ShoppingCart, FileText, Clipboard } from 'lucide-react';
import OrderNotifications from '@/components/OrderNotifications';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in and is admin
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('user');

        if (!isLoggedIn || !userData) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'admin') {
            router.push('/consumer');
            return;
        }

        setUser(parsedUser);
        setLoading(false);
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
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
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2D5F3F] text-white rounded-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#2D5F3F] text-white transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold font-serif mb-8">Fox Nuts Admin</h1>

                    <nav className="space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            href="/admin/products"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Package size={20} />
                            <span>Products</span>
                        </Link>

                        <Link
                            href="/admin/users"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Users size={20} />
                            <span>Users</span>
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <ShoppingCart size={20} />
                            <span>Orders</span>
                        </Link>

                        <Link
                            href="/admin/bulk-orders"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Clipboard size={20} />
                            <span>Bulk Orders</span>
                        </Link>

                        <Link
                            href="/admin/kit-orders"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Package size={20} />
                            <span>Kit Orders</span>
                        </Link>

                        <Link
                            href="/admin/compliance"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1f4428] transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FileText size={20} />
                            <span>Compliance</span>
                        </Link>
                    </nav>

                    <div className="absolute bottom-8 left-6 right-6">
                        <div className="mb-4 p-3 bg-[#1f4428] rounded-lg">
                            <p className="text-sm font-semibold">{user?.name}</p>
                            <p className="text-xs text-gray-300">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-[#1f4428] transition"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64">
                {/* Header with Notifications */}
                <div className="bg-white border-b border-[#E5DDD5] px-8 py-4 flex justify-end items-center">
                    <OrderNotifications />
                </div>

                <div className="p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </div>
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
