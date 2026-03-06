'use client';

import Link from 'next/link';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';

export default function ConsumerShop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { addItem } = useCart();

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

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });

    setAddedToCart(product._id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <main className="w-full px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          Discover Your Perfect Fox Nuts
        </h1>
        <p className="text-xl text-[#666666] mb-8">
          Premium, organic snacks from the heart of Bihar
        </p>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg p-8 mb-8 border border-[#E5DDD5]">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 font-serif">
            Why Fox Nuts Over Popcorn?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#2D5F3F]">
                  <th className="text-left py-3 px-4 text-[#2C2C2C] font-semibold">Nutrient</th>
                  <th className="text-left py-3 px-4 text-[#2C2C2C] font-semibold">Fox Nuts</th>
                  <th className="text-left py-3 px-4 text-[#2C2C2C] font-semibold">Popcorn</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nutrient: 'Calories (per oz)', makhana: '106', popcorn: '110' },
                  { nutrient: 'Protein (g)', makhana: '2.6g ✓', popcorn: '3.5g' },
                  { nutrient: 'Fiber (g)', makhana: '1.4g', popcorn: '3.5g ✓' },
                  { nutrient: 'Fat (g)', makhana: '0.1g ✓', popcorn: '6.0g' },
                  { nutrient: 'Magnesium', makhana: 'High ✓', popcorn: 'Low' }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#FAF8F5]' : 'bg-white'}>
                    <td className="py-3 px-4 text-[#2C2C2C]">{row.nutrient}</td>
                    <td className="py-3 px-4 bg-[#A8D5BA]/20 text-[#2D5F3F] font-semibold">{row.makhana}</td>
                    <td className="py-3 px-4 text-[#666666]">{row.popcorn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#666666] mt-4">
            *Nutritional data per USDA comparison. Makhana is naturally lower in fat and rich in minerals.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${selectedCategory === 'all'
            ? 'bg-[#2D5F3F] text-white'
            : 'bg-white text-[#2D5F3F] border border-[#2D5F3F]'
            }`}
        >
          All Products
        </button>
        <button
          onClick={() => setSelectedCategory('organic')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${selectedCategory === 'organic'
            ? 'bg-[#2D5F3F] text-white'
            : 'bg-white text-[#2D5F3F] border border-[#2D5F3F]'
            }`}
        >
          Organic
        </button>
        <button
          onClick={() => setSelectedCategory('flavored')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${selectedCategory === 'flavored'
            ? 'bg-[#2D5F3F] text-white'
            : 'bg-white text-[#2D5F3F] border border-[#2D5F3F]'
            }`}
        >
          Flavored
        </button>
        <button
          onClick={() => setSelectedCategory('premium')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${selectedCategory === 'premium'
            ? 'bg-[#2D5F3F] text-white'
            : 'bg-white text-[#2D5F3F] border border-[#2D5F3F]'
            }`}
        >
          Premium
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-[#666666]">Loading products...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-[#E5DDD5]">
          <p className="text-xl text-[#666666] mb-4">No products available yet</p>
          <p className="text-sm text-[#999999]">Products will appear here once added by admin</p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map(product => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden border border-[#E5DDD5] hover:shadow-lg transition group">
              {/* Product Image */}
              <div className="h-48 flex items-center justify-center group-hover:scale-105 transition overflow-hidden bg-[#FAF8F5]">
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
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-8xl">{product.image}</div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#666666] text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-[#D4A574] text-sm font-semibold mb-4">
                  {product.flavor}
                </p>

                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Price and Actions */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#2D5F3F]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="p-2 hover:bg-[#FAF8F5] rounded-lg transition"
                  >
                    <Heart
                      size={24}
                      className={favorites.includes(product._id) ? 'fill-red-500 text-red-500' : 'text-[#D4A574]'}
                    />
                  </button>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${addedToCart === product._id
                      ? 'bg-green-500 text-white'
                      : product.inStock
                        ? 'bg-[#D4A574] text-white hover:bg-[#c09660]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {addedToCart === product._id ? (
                      <>
                        <Check size={20} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </>
                    )}
                  </button>
                  <Link href={`/consumer/product/${product._id}`}>
                    <button className="w-full bg-[#2D5F3F] hover:bg-[#1f4428] text-white py-2 rounded-lg font-semibold transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
