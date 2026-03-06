'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type?: 'one-time' | 'subscription';
  frequency?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Get user ID and load cart on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const userIdFromStorage = user.email || user._id || 'guest';
        setUserId(userIdFromStorage);

        // Load user-specific cart
        const cartKey = `cart_${userIdFromStorage}`;
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (user-specific)
  useEffect(() => {
    if (isLoaded && userId) {
      const cartKey = `cart_${userId}`;
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  }, [items, isLoaded, userId]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i =>
        i.id === item.id &&
        i.type === item.type &&
        i.frequency === item.frequency
      );

      if (existing) {
        return prev.map(i =>
          (i.id === item.id && i.type === item.type && i.frequency === item.frequency)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    // Also clear from localStorage
    if (userId) {
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
