'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Edit, Trash2, Search, Plus } from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await response.json();

            if (data.success) {
                alert('User role updated successfully');
                fetchUsers();
            } else {
                alert(data.message || 'Failed to update user role');
            }
        } catch (error) {
            alert('Error updating user role');
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert('User deleted successfully');
                fetchUsers();
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            alert('Error deleting user');
        }
    };

    const filteredUsers = users.filter((user: any) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">User Management</h1>
                    <p className="text-[#666666] mt-2">Manage all users and their roles</p>
                </div>
                <Link
                    href="/admin/users/add"
                    className="flex items-center gap-2 px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                >
                    <Plus size={20} />
                    Add User
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                        />
                    </div>
                </div>

                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                >
                    <option value="all">All Roles</option>
                    <option value="user">Customers</option>
                    <option value="business">Business</option>
                    <option value="admin">Admins</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md border border-[#E5DDD5] overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-[#666666]">Loading...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-[#666666]">
                        {searchTerm || filterRole !== 'all' ? 'No users found matching your filters.' : 'No users yet.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#FAF8F5]">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">User</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Role</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Business Info</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Joined</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user: any) => (
                                    <tr key={user._id} className="border-t border-[#E5DDD5] hover:bg-[#FAF8F5]">
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-semibold text-[#2C2C2C]">{user.name}</p>
                                                <p className="text-sm text-[#666666]">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className="px-3 py-1 border border-[#E5DDD5] rounded-lg text-sm focus:outline-none focus:border-[#2D5F3F]"
                                            >
                                                <option value="user">Customer</option>
                                                <option value="business">Business</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.role === 'business' ? (
                                                <div className="text-sm">
                                                    <p className="font-semibold text-[#2C2C2C]">{user.businessName}</p>
                                                    <p className="text-[#666666] capitalize">{user.businessType}</p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-[#999999]">N/A</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-[#666666]">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Delete user"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Total Customers</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">
                                {users.filter((u: any) => u.role === 'user').length}
                            </p>
                        </div>
                        <Users className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Business Accounts</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">
                                {users.filter((u: any) => u.role === 'business').length}
                            </p>
                        </div>
                        <Users className="text-[#D4A574]" size={40} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-[#E5DDD5]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#666666] mb-1">Admins</p>
                            <p className="text-2xl font-bold text-[#2D5F3F]">
                                {users.filter((u: any) => u.role === 'admin').length}
                            </p>
                        </div>
                        <Users className="text-[#D4A574]" size={40} />
                    </div>
                </div>
            </div>
        </div>
    );
}
