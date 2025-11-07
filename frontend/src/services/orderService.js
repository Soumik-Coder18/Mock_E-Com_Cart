import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const orderService = {
  // Create order
  createOrder: async (orderData) => {
    const response = await api.post(API_ENDPOINTS.CHECKOUT, orderData);
    return response.data;
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await api.get(API_ENDPOINTS.CHECKOUT);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.CHECKOUT}/${id}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`${API_ENDPOINTS.CHECKOUT}/${id}/status`, { status });
    return response.data;
  }
};

export default orderService;