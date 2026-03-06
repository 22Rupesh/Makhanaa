'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Minus, Plus, Truck, Shield, Leaf, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [frequency, setFrequency] = useState('4weeks');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateDelivery = () => {
    if (deliveryZip) {
      const today = new Date();
      const delivery = new Date(today.getTime() + (3 + Math.random() * 3) * 24 * 60 * 60 * 1000);
      setDeliveryDate(delivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
  };

  const handleAddToCart = () => {
    const finalPrice = isSubscription ? Number((product.price * 0.85).toFixed(2)) : product.price;

    addItem({
      id: product._id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: product.image,
      type: isSubscription ? 'subscription' : 'one-time',
      frequency: isSubscription ? frequency : undefined
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-[#666666]">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-[#666666]">Product not found</p>
        <div className="text-center mt-4">
          <Link href="/consumer" className="text-[#2D5F3F] hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#2D5F3F] hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg h-96 flex items-center justify-center sticky top-20 overflow-hidden border border-[#E5DDD5]">
          {product.image.startsWith('data:image') ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : product.image.startsWith('/') || product.image.startsWith('http') ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-9xl">{product.image}</div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2 font-serif">
                {product.name}
              </h1>
              <p className="text-xl text-[#666666] mb-4">
                {product.description}
              </p>
              <p className="text-lg text-[#D4A574] font-semibold">
                {product.flavor}
              </p>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-[#FAF8F5] rounded-lg transition"
            >
              <Heart
                size={28}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-[#D4A574]'}
              />
            </button>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.inStock ? '✓ In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-[#2D5F3F] mb-6">
            ${product.price.toFixed(2)}
            <span className="text-sm text-[#666666] font-normal ml-2">/ {product.weight}</span>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-[#E5DDD5]">
            <div className="flex flex-col items-center text-center">
              <Leaf size={24} className="text-[#2D5F3F] mb-2" />
              <span className="text-sm text-[#2C2C2C] font-semibold">100% Organic</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield size={24} className="text-[#2D5F3F] mb-2" />
              <span className="text-sm text-[#2C2C2C] font-semibold">FDA Certified</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck size={24} className="text-[#2D5F3F] mb-2" />
              <span className="text-sm text-[#2C2C2C] font-semibold">Free Shipping</span>
            </div>
          </div>

          {/* Subscription Toggle */}
          <div className="mb-6 p-4 bg-[#A8D5BA]/10 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="purchase-type"
                checked={!isSubscription}
                onChange={() => setIsSubscription(false)}
                className="w-4 h-4"
              />
              <span className="text-[#2C2C2C] font-semibold">One-time Purchase</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input
                type="radio"
                name="purchase-type"
                checked={isSubscription}
                onChange={() => setIsSubscription(true)}
                className="w-4 h-4"
              />
              <span className="text-[#2C2C2C] font-semibold">
                Subscribe & Save <span className="text-[#D4A574] ml-2">15%</span>
              </span>
            </label>

            {isSubscription && (
              <div className="mt-4">
                <label className="block text-[#2C2C2C] font-semibold mb-2">
                  Delivery Frequency:
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2"
                >
                  <option value="2weeks">Every 2 weeks</option>
                  <option value="4weeks">Every 4 weeks</option>
                  <option value="8weeks">Every 8 weeks</option>
                </select>
              </div>
            )}
          </div>

          {/* Delivery Calculator */}
          <div className="mb-6 p-4 bg-[#FAF8F5] rounded-lg border border-[#E5DDD5]">
            <label className="block text-[#2C2C2C] font-semibold mb-2">
              Check Delivery Availability:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ZIP code"
                value={deliveryZip}
                onChange={(e) => setDeliveryZip(e.target.value)}
                className="flex-1 border border-[#E5DDD5] rounded-lg px-4 py-2"
              />
              <button
                onClick={handleCalculateDelivery}
                className="bg-[#2D5F3F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1f4428] transition"
              >
                Check
              </button>
            </div>
            {deliveryDate && (
              <p className="text-[#2D5F3F] font-semibold mt-2">
                ✓ Arrives by <span className="text-lg">{deliveryDate}</span>
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[#2C2C2C] font-semibold">Quantity:</span>
            <div className="flex items-center border border-[#E5DDD5] rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-[#FAF8F5] transition"
              >
                <Minus size={20} />
              </button>
              <span className="px-6 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-[#FAF8F5] transition"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition shadow-md mb-4 flex items-center justify-center gap-2 ${!product.inStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-[#2D5F3F] hover:bg-[#1f4428] text-white'
              }`}
          >
            {!product.inStock ? (
              'Out of Stock'
            ) : addedToCart ? (
              <>
                <Check size={24} />
                Added to Cart!
              </>
            ) : (
              <>
                Add to Cart • ${((isSubscription ? product.price * 0.85 : product.price) * quantity).toFixed(2)}
              </>
            )}
          </button>

          {/* Product Info */}
          <div className="space-y-4 mt-8 pt-8 border-t border-[#E5DDD5]">
            <div>
              <h3 className="font-bold text-[#2C2C2C] mb-2">Product Details</h3>
              <div className="text-sm text-[#666666] space-y-1">
                <p><span className="font-semibold">Category:</span> {product.category}</p>
                <p><span className="font-semibold">Weight:</span> {product.weight}</p>
                <p><span className="font-semibold">Flavor:</span> {product.flavor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
