import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const cartService = {
  // Get cart
  getCart: async () => {
    const response = await api.get(API_ENDPOINTS.CART);
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post(API_ENDPOINTS.CART, { productId, quantity });
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    const response = await api.put(`${API_ENDPOINTS.CART}/${productId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await api.delete(`${API_ENDPOINTS.CART}/${productId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete(`${API_ENDPOINTS.CART}/clear`);
    return response.data;
  }
};

export default cartService;