'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'snacks',
        flavor: '',
        weight: '100g',
        inStock: true,
        featured: false,
    });

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();

            if (data.success) {
                setFormData({
                    name: data.product.name,
                    description: data.product.description,
                    price: data.product.price.toString(),
                    image: data.product.image,
                    category: data.product.category,
                    flavor: data.product.flavor,
                    weight: data.product.weight,
                    inStock: data.product.inStock,
                    featured: data.product.featured,
                });
            } else {
                setError('Product not found');
            }
        } catch (err) {
            setError('Error loading product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Product updated successfully!');
                router.push('/admin/products');
            } else {
                setError(data.message || 'Failed to update product');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-[#666666]">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-[#2D5F3F] hover:underline mb-6"
            >
                <ArrowLeft size={20} />
                Back to Products
            </Link>

            <div className="bg-white rounded-lg shadow-md border border-[#E5DDD5] p-8">
                <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif mb-6">Edit Product</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                                Flavor *
                            </label>
                            <input
                                type="text"
                                name="flavor"
                                value={formData.flavor}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                                required
                            >
                                <option value="snacks">Snacks</option>
                                <option value="organic">Organic</option>
                                <option value="flavored">Flavored</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                                Weight
                            </label>
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                            Image (Emoji or URL) *
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F] focus:ring-1 focus:ring-[#2D5F3F]"
                            required
                        />
                    </div>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#2D5F3F] border-[#E5DDD5] rounded focus:ring-[#2D5F3F]"
                            />
                            <span className="text-sm font-semibold text-[#2C2C2C]">In Stock</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#2D5F3F] border-[#E5DDD5] rounded focus:ring-[#2D5F3F]"
                            />
                            <span className="text-sm font-semibold text-[#2C2C2C]">Featured Product</span>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/products"
                            className="px-8 py-3 border-2 border-[#E5DDD5] text-[#2C2C2C] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
