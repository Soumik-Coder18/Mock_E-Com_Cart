export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const PRODUCT_CATEGORIES = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home',
  'Sports'
];

// API Endpoints - now relative to base URL which already includes /api
export const API_ENDPOINTS = {
  PRODUCTS: `/products`,
  CART: `/cart`,
  CHECKOUT: `/checkout`
};