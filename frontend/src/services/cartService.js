import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const cartService = {
  // Get cart
  getCart: async () => {
    const response = await api.get(API_ENDPOINTS.CART);
    // Backend returns { statusCode, data: cart, message, success }
    // Extract the cart data from the response
    return response.data.data || { items: [], totalPrice: 0 };
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post(API_ENDPOINTS.CART, { productId, quantity });
    // Backend returns { statusCode, data: cart, message, success }
    // Extract the cart data from the response
    return response.data.data || { items: [], totalPrice: 0 };
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    const response = await api.put(`${API_ENDPOINTS.CART}/${productId}`, { quantity });
    // Backend returns { statusCode, data: cart, message, success }
    // Extract the cart data from the response
    return response.data.data || { items: [], totalPrice: 0 };
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await api.delete(`${API_ENDPOINTS.CART}/${productId}`);
    // Backend returns { statusCode, data: cart, message, success }
    // Extract the cart data from the response
    return response.data.data || { items: [], totalPrice: 0 };
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete(`${API_ENDPOINTS.CART}/clear`);
    // Backend returns { statusCode, data: cart, message, success }
    // Extract the cart data from the response
    return response.data.data || { items: [], totalPrice: 0 };
  }
};

export default cartService;