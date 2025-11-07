import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },

  // Get in-stock products
  getInStockProducts: async () => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/in-stock`);
    return response.data;
  },

  // Create product (admin)
  createProduct: async (productData) => {
    const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
  },

  // Update product (admin)
  updateProduct: async (id, productData) => {
    const response = await api.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, productData);
    return response.data;
  },

  // Delete product (admin)
  deleteProduct: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  }
};

export default productService;