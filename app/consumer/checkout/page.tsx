'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        paymentMethod: 'credit_card',
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            setFormData(prev => ({
                ...prev,
                name: parsed.name,
                email: parsed.email,
            }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: items.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount: totalPrice,
                shippingAddress: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                },
                paymentMethod: formData.paymentMethod,
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (data.success) {
                clearCart();
                alert(`Order placed successfully! Order ID: ${data.order.orderId}`);
                router.push('/consumer/dashboard');
            } else {
                alert(data.message || 'Failed to place order');
            }
        } catch (error) {
            alert('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">Your cart is empty</h1>
                    <Link href="/consumer">
                        <button className="bg-[#2D5F3F] text-white px-6 py-3 rounded-lg hover:bg-[#1f4428] transition">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/consumer/cart" className="flex items-center gap-2 text-[#2D5F3F] hover:underline mb-8">
                <ArrowLeft size={20} />
                Back to Cart
            </Link>

            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-serif">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-lg p-6 border border-[#E5DDD5]">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck className="text-[#2D5F3F]" size={24} />
                                <h2 className="text-xl font-bold text-[#2C2C2C]">Shipping Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        placeholder="Street address"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">State</label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        className="w-full p-3 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg p-6 border border-[#E5DDD5]">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="text-[#2D5F3F]" size={24} />
                                <h2 className="text-xl font-bold text-[#2C2C2C]">Payment Method</h2>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 border border-[#E5DDD5] rounded-lg cursor-pointer hover:border-[#2D5F3F]">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit_card"
                                        checked={formData.paymentMethod === 'credit_card'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-semibold text-[#2C2C2C]">Credit Card</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-[#E5DDD5] rounded-lg cursor-pointer hover:border-[#2D5F3F]">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={formData.paymentMethod === 'paypal'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-semibold text-[#2C2C2C]">PayPal</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-[#E5DDD5] rounded-lg cursor-pointer hover:border-[#2D5F3F]">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash_on_delivery"
                                        checked={formData.paymentMethod === 'cash_on_delivery'}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-4 h-4"
                                    />
                                    <span className="font-semibold text-[#2C2C2C]">Cash on Delivery</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2D5F3F] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#1f4428] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : `Place Order - $${totalPrice.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg p-6 border border-[#E5DDD5] sticky top-8">
                        <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-[#2C2C2C]">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="text-[#666666]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[#E5DDD5] pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#666666]">Subtotal</span>
                                <span className="text-[#2C2C2C]">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#666666]">Shipping</span>
                                <span className="text-green-600 font-semibold">FREE</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#E5DDD5]">
                                <span className="text-[#2C2C2C]">Total</span>
                                <span className="text-[#2D5F3F]">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
