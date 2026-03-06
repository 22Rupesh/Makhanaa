'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isDragging, setIsDragging] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleImageUpload = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setImagePreview(base64String);
            setFormData(prev => ({ ...prev, image: base64String }));
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const removeImage = () => {
        setImagePreview('');
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
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
                alert('Product added successfully!');
                router.push('/admin/products');
            } else {
                setError(data.message || 'Failed to add product');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                <h1 className="text-3xl font-bold text-[#2C2C2C] font-serif mb-6">Add New Product</h1>

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
                                placeholder="Himalayan Salt Fox Nuts"
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
                                placeholder="Savory"
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
                            placeholder="Describe your product..."
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
                                placeholder="12.99"
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
                                placeholder="100g"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                            Product Image *
                        </label>

                        {!imagePreview ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition ${isDragging
                                    ? 'border-[#2D5F3F] bg-[#A8D5BA]/10'
                                    : 'border-[#E5DDD5] hover:border-[#2D5F3F]'
                                    }`}
                            >
                                <Upload className="mx-auto mb-4 text-[#666666]" size={48} />
                                <p className="text-[#2C2C2C] font-semibold mb-2">
                                    Drag and drop your image here
                                </p>
                                <p className="text-sm text-[#666666] mb-4">or</p>
                                <label className="inline-block px-6 py-2 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition cursor-pointer">
                                    Choose from device
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-[#999999] mt-4">
                                    Supports: JPG, PNG, GIF (Max 5MB)
                                </p>
                            </div>
                        ) : (
                            <div className="relative border-2 border-[#E5DDD5] rounded-lg p-4">
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                >
                                    <X size={16} />
                                </button>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-contain rounded-lg"
                                />
                            </div>
                        )}
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
                            disabled={loading}
                            className="px-8 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
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
