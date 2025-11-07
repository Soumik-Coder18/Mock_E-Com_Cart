import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import cartService from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      // cartService now returns the cart data directly
      const cartData = await cartService.getCart();
      setCart(cartData || { items: [], totalPrice: 0 });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
      console.error('Error fetching cart:', err);
      // Don't throw, just log the error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      await cartService.addToCart(productId, quantity);
      await fetchCart(); // Refresh cart after adding
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add to cart';
      setError(errorMessage);
      console.error('Error adding to cart:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      await cartService.removeFromCart(productId);
      await fetchCart(); // Refresh cart after removing
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to remove from cart';
      setError(errorMessage);
      console.error('Error removing from cart:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      await cartService.updateCartItem(productId, quantity);
      await fetchCart(); // Refresh cart after updating
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update quantity';
      setError(errorMessage);
      console.error('Error updating quantity:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await cartService.clearCart();
      await fetchCart(); // Refresh cart after clearing
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to clear cart';
      setError(errorMessage);
      console.error('Error clearing cart:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refetchCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};