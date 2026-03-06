'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const quizQuestions = [
  {
    id: 'time',
    question: 'When do you usually snack?',
    options: [
      { value: 'morning', label: 'Morning Energizer' },
      { value: 'afternoon', label: 'Afternoon Pick-me-up' },
      { value: 'evening', label: 'Evening Wind-down' },
      { value: 'latenight', label: 'Late Night Indulgence' }
    ]
  },
  {
    id: 'taste',
    question: 'What flavor profile appeals to you?',
    options: [
      { value: 'spicy', label: 'Spicy & Bold' },
      { value: 'sweet', label: 'Sweet & Indulgent' },
      { value: 'savory', label: 'Savory & Subtle' },
      { value: 'plain', label: 'Pure & Simple' }
    ]
  },
  {
    id: 'style',
    question: 'What\'s your snacking style?',
    options: [
      { value: 'mindful', label: 'Mindful & Measured' },
      { value: 'binge', label: 'Indulgent & Binge-Worthy' },
      { value: 'onthego', label: 'Quick & On-the-Go' },
      { value: 'social', label: 'Sharing with Friends' }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<any>(null);

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

  const getRecommendation = (answers: Record<string, string>) => {
    if (products.length === 0) return null;

    // Match based on flavor preference
    let matchedProduct = null;

    if (answers.taste === 'spicy') {
      matchedProduct = products.find(p =>
        p.flavor?.toLowerCase().includes('spicy') ||
        p.flavor?.toLowerCase().includes('peri') ||
        p.name?.toLowerCase().includes('spicy')
      );
    } else if (answers.taste === 'sweet') {
      matchedProduct = products.find(p =>
        p.flavor?.toLowerCase().includes('sweet') ||
        p.flavor?.toLowerCase().includes('caramel') ||
        p.flavor?.toLowerCase().includes('honey')
      );
    } else if (answers.taste === 'savory') {
      matchedProduct = products.find(p =>
        p.flavor?.toLowerCase().includes('savory') ||
        p.flavor?.toLowerCase().includes('salt') ||
        p.flavor?.toLowerCase().includes('bbq')
      );
    } else if (answers.taste === 'plain') {
      matchedProduct = products.find(p =>
        p.flavor?.toLowerCase().includes('plain') ||
        p.flavor?.toLowerCase().includes('organic') ||
        p.category === 'organic'
      );
    }

    // If no match found, return first available product
    return matchedProduct || products[0];
  };

  const handleAnswer = (value: string) => {
    const newAnswers = {
      ...answers,
      [quizQuestions[currentQuestion].id]: value
    };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const recommended = getRecommendation(newAnswers);
      setRecommendation(recommended);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setRecommendation(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="text-xl text-[#666666]">Loading quiz...</p>
      </div>
    );
  }

  if (showResult && recommendation) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif">
              Your Perfect Match! 🎯
            </h1>
            <p className="text-[#666666] text-lg">
              Based on your preferences, we recommend:
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg border border-[#E5DDD5] mb-8">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 mb-6 rounded-lg bg-[#FAF8F5] flex items-center justify-center overflow-hidden">
                {recommendation.image.startsWith('data:image') ? (
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-contain"
                  />
                ) : recommendation.image.startsWith('/') || recommendation.image.startsWith('http') ? (
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-9xl">{recommendation.image}</div>
                )}
              </div>

              <h2 className="text-3xl font-bold text-[#2D5F3F] mb-2 font-serif">
                {recommendation.name}
              </h2>
              <p className="text-[#D4A574] text-xl font-semibold mb-4">
                {recommendation.flavor}
              </p>
              <p className="text-[#666666] text-center mb-6 max-w-md">
                {recommendation.description}
              </p>

              <div className="flex gap-4">
                <Link
                  href={`/consumer/product/${recommendation._id}`}
                  className="px-8 py-3 bg-[#2D5F3F] text-white rounded-lg font-semibold hover:bg-[#1f4428] transition flex items-center gap-2"
                >
                  View Product <ArrowRight size={20} />
                </Link>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 border-2 border-[#E5DDD5] text-[#2C2C2C] rounded-lg font-semibold hover:bg-[#FAF8F5] transition"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Other Recommendations */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#2C2C2C] font-serif">
              Explore Other Flavors
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter(p => p._id !== recommendation._id)
              .slice(0, 6)
              .map(product => (
                <Link
                  key={product._id}
                  href={`/consumer/product/${product._id}`}
                  className="bg-white rounded-lg p-4 border border-[#E5DDD5] hover:shadow-lg transition text-center"
                >
                  <div className="w-full h-24 mb-2 rounded-lg bg-[#FAF8F5] flex items-center justify-center overflow-hidden">
                    {product.image.startsWith('data:image') ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    ) : product.image.startsWith('/') || product.image.startsWith('http') ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-4xl">{product.image}</div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#2C2C2C]">{product.name}</p>
                  <p className="text-xs text-[#D4A574]">{product.flavor}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4 font-serif">
            Find Your Perfect Fox Nuts
          </h1>
          <p className="text-[#666666] text-lg">
            Answer a few questions to discover your ideal flavor
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#666666]">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-[#2D5F3F] font-semibold">
              {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#E5DDD5] rounded-full h-2">
            <div
              className="bg-[#2D5F3F] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg p-8 shadow-lg border border-[#E5DDD5]">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 text-center">
            {quizQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {quizQuestions[currentQuestion].options.map(option => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border-2 border-[#E5DDD5] rounded-lg hover:border-[#2D5F3F] hover:bg-[#A8D5BA]/10 transition font-semibold text-[#2C2C2C]"
              >
                {option.label}
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="mt-6 flex items-center gap-2 text-[#2D5F3F] hover:underline"
            >
              <ArrowLeft size={20} />
              Previous Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
