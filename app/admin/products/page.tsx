'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert('Product deleted successfully');
                fetchProducts();
            } else {
                alert(data.message || 'Failed to delete product');
            }
        } catch (error) {
            alert('Error deleting product');
        }
    };

    const filteredProducts = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif">Products</h1>
                    <p className="text-[#666666] mt-2">Manage your fox nuts products</p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="flex items-center gap-2 px-6 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md border border-[#E5DDD5] overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-[#666666]">Loading...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-[#666666]">
                        {searchTerm ? 'No products found matching your search.' : 'No products yet. Add your first product!'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#FAF8F5]">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Product</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Price</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Category</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Status</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#2C2C2C]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product: any) => (
                                    <tr key={product._id} className="border-t border-[#E5DDD5] hover:bg-[#FAF8F5]">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 rounded-lg bg-[#FAF8F5] flex items-center justify-center overflow-hidden">
                                                    {product.image.startsWith('data:image') ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : product.image.startsWith('/') || product.image.startsWith('http') ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-3xl">{product.image}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#2C2C2C]">{product.name}</p>
                                                    <p className="text-sm text-[#666666]">{product.flavor}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-[#2C2C2C]">${product.price}</td>
                                        <td className="py-4 px-6 text-[#2C2C2C] capitalize">{product.category}</td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${product.inStock
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/products/edit/${product._id}`}
                                                    className="p-2 text-[#2D5F3F] hover:bg-[#A8D5BA]/20 rounded-lg transition"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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
