'use client';

import Link from 'next/link';
import { Clock, Users, ChefHat } from 'lucide-react';

const recipes = [
  {
    id: 1,
    title: 'Spiced Fox Nuts Mix - Party Snack',
    description: 'A savory blend perfect for gatherings and celebrations',
    image: '/images/recipe-spiced-mix.png',
    prepTime: '10 mins',
    servings: '8 people',
    difficulty: 'Easy',
    ingredients: [
      '2 cups Raw Fox Nuts',
      '2 tbsp Coconut Oil',
      '1 tbsp Cumin Seeds',
      '½ tsp Chili Powder',
      'Sea Salt to taste'
    ],
    instructions: [
      'Heat coconut oil in a large pan over medium heat',
      'Add cumin seeds and let them crackle (30 seconds)',
      'Add Raw Fox Nuts and stir continuously for 5-7 minutes',
      'Add chili powder and salt, mix well',
      'Spread on a plate to cool before serving'
    ]
  },
  {
    id: 2,
    title: 'Sweet Fox Nuts Kheer - Dessert',
    description: 'A traditional Indian dessert made light with Fox Nuts',
    image: '/images/recipe-kheer.png',
    prepTime: '30 mins',
    servings: '4 people',
    difficulty: 'Medium',
    ingredients: [
      '1 cup Raw Fox Nuts',
      '2 cups Milk',
      '¼ cup Sugar',
      '4 Cardamom Pods',
      'Almonds & Cashews for garnish'
    ],
    instructions: [
      'Soak Fox Nuts in water for 5 minutes, then drain',
      'Heat milk in a heavy-bottomed pan',
      'Add soaked Fox Nuts and cardamom pods',
      'Simmer for 15-20 minutes until Fox Nuts becomes soft',
      'Add sugar and cook for another 5 minutes',
      'Garnish with nuts and serve warm or chilled'
    ]
  },
  {
    id: 3,
    title: 'Fox Nuts Energy Bars - On-the-Go',
    description: 'Protein-packed bars perfect for office and gym',
    image: '/images/recipe-energy-bars.png',
    prepTime: '45 mins',
    servings: '12 bars',
    difficulty: 'Easy',
    ingredients: [
      '1 cup Raw Fox Nuts (roasted)',
      '½ cup Almond Butter',
      '⅓ cup Honey',
      '½ cup Dates (chopped)',
      'Almonds & Dark Chocolate chips'
    ],
    instructions: [
      'Roast Fox Nuts in a dry pan until crispy (5 mins)',
      'Mix almond butter and honey in a bowl',
      'Add roasted Fox Nuts and chopped dates',
      'Mix in almonds and chocolate chips',
      'Press mixture in a parchment-lined pan',
      'Refrigerate for 30 minutes and cut into bars'
    ]
  },
  {
    id: 4,
    title: 'Fox Nuts Chia Pudding - Breakfast',
    description: 'A nutritious bowl to start your day',
    image: '/images/recipe-chia-pudding.png',
    prepTime: '15 mins',
    servings: '2 people',
    difficulty: 'Very Easy',
    ingredients: [
      '½ cup Raw Fox Nuts (crushed)',
      '1 cup Coconut Milk',
      '2 tbsp Chia Seeds',
      '1 tbsp Honey',
      'Fresh Berries & Coconut Flakes'
    ],
    instructions: [
      'Crush Raw Fox Nuts into small pieces',
      'Mix coconut milk and chia seeds',
      'Let sit for 5 minutes to thicken',
      'Add crushed Fox Nuts and honey',
      'Pour into bowls and top with berries and coconut',
      'Serve immediately or refrigerate overnight'
    ]
  },
  {
    id: 5,
    title: 'Fox Nuts Curry - Main Dish',
    description: 'A savory curry that pairs perfectly with rice or bread',
    image: '/images/recipe-curry.png',
    prepTime: '40 mins',
    servings: '4 people',
    difficulty: 'Medium',
    ingredients: [
      '2 cups Raw Fox Nuts',
      '2 Onions (diced)',
      '1 tbsp Ginger-Garlic Paste',
      '2 Tomatoes (chopped)',
      'Coconut Milk & Spices'
    ],
    instructions: [
      'Sauté onions until golden in oil',
      'Add ginger-garlic paste and cook for 1 minute',
      'Add tomatoes and cook until soft (5 mins)',
      'Add Raw Fox Nuts and cook for 10 minutes',
      'Add coconut milk and spices, simmer for 15 minutes',
      'Serve hot with rice or roti'
    ]
  },
  {
    id: 6,
    title: 'Fox Nuts Popcorn - Movie Night',
    description: 'A healthier popcorn alternative for snacking',
    image: '/images/recipe-popcorn.png',
    prepTime: '20 mins',
    servings: '3 people',
    difficulty: 'Easy',
    ingredients: [
      '2 cups Raw Fox Nuts',
      '2 tbsp Coconut Oil',
      '½ tsp Garlic Powder',
      '½ tsp Paprika',
      'Nutritional Yeast & Salt'
    ],
    instructions: [
      'Heat coconut oil in a large pot over medium-high heat',
      'Add Raw Fox Nuts in batches and stir constantly',
      'Fox Nuts will pop and become white (5-7 mins)',
      'Transfer to a bowl and season immediately',
      'Mix garlic powder, paprika, salt, and nutritional yeast',
      'Toss with the Fox Nuts popcorn and serve hot'
    ]
  }
];

export default function RecipesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#2C2C2C] mb-4 font-serif">
          Fox Nuts Recipe Hub
        </h1>
        <p className="text-xl text-[#666666]">
          Delicious and nutritious recipes to inspire your cooking
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg overflow-hidden border border-[#E5DDD5] hover:shadow-lg transition group"
          >
            {/* Recipe Image */}
            <div className="h-40 flex items-center justify-center overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Recipe Info */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-2">
                {recipe.title}
              </h2>
              <p className="text-[#666666] text-sm mb-4">
                {recipe.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-[#E5DDD5]">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-[#D4A574]" />
                  <span className="text-[#2C2C2C] font-semibold">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-[#D4A574]" />
                  <span className="text-[#2C2C2C] font-semibold">{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ChefHat size={16} className="text-[#D4A574]" />
                  <span className="text-[#2C2C2C] font-semibold">{recipe.difficulty}</span>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-[#2D5F3F] hover:bg-[#1f4428] text-white py-2 rounded-lg font-semibold transition">
                View Full Recipe
              </button>

              {/* Quick Ingredients Preview */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-[#2C2C2C] mb-2">Key Ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.slice(0, 3).map((ing, i) => (
                    <span key={i} className="text-xs bg-[#FAF8F5] text-[#2D5F3F] px-2 py-1 rounded">
                      {ing.split('(')[0].trim()}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span className="text-xs bg-[#FAF8F5] text-[#2D5F3F] px-2 py-1 rounded">
                      +{recipe.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-[#2D5F3F] to-[#1f4428] text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 font-serif">
          Ready to Cook? Stock Your Pantry!
        </h2>
        <p className="text-lg mb-8 text-[#E8D4C4]">
          Get all the Fox Nuts varieties you need for these recipes
        </p>
        <Link href="/consumer">
          <button className="bg-[#D4A574] hover:bg-[#c09660] text-[#2C2C2C] px-8 py-3 rounded-lg font-semibold transition">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Tips Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#A8D5BA]/10 rounded-lg p-6 border border-[#A8D5BA]">
          <h3 className="font-bold text-[#2D5F3F] mb-2 text-lg">🌾 Storage Tips</h3>
          <p className="text-[#666666] text-sm">
            Keep Fox Nuts in an airtight container away from moisture. Properly stored, it stays fresh for 6 months.
          </p>
        </div>
        <div className="bg-[#D4A574]/10 rounded-lg p-6 border border-[#D4A574]">
          <h3 className="font-bold text-[#D4A574] mb-2 text-lg">✨ Quality Tips</h3>
          <p className="text-[#666666] text-sm">
            Our organic Fox Nuts is hand-selected and quality-tested. Free from additives and preservatives.
          </p>
        </div>
        <div className="bg-[#2D5F3F]/10 rounded-lg p-6 border border-[#2D5F3F]">
          <h3 className="font-bold text-[#2D5F3F] mb-2 text-lg">🍽️ Cooking Tips</h3>
          <p className="text-[#666666] text-sm">
            Raw Fox Nuts can be roasted, boiled, or fried. Always cook at medium heat to preserve nutrients.
          </p>
        </div>
      </div>
    </main>
  );
}
