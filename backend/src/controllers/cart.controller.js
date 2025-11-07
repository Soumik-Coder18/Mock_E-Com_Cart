import CartService from "../services/cart.service.js";
import apiResponse from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const cartController = {
  getCart: asyncHandler(async (req, res) => {
    const cart = await CartService.getCart();
    res.status(200).json(new apiResponse(200, cart, 'Cart retrieved successfully'));
  }),

  addItemToCart: asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    
    if (!productId) {
      throw new apiError(400, 'Product ID is required');
    }

    const cart = await CartService.addItemToCart(productId, quantity || 1);
    res.status(200).json(new apiResponse(200, cart, 'Item added to cart successfully'));
  }),

  updateCartItem: asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      throw new apiError(400, 'Quantity is required');
    }

    const cart = await CartService.updateCartItem(productId, quantity);
    res.status(200).json(new apiResponse(200, cart, 'Cart item updated successfully'));
  }),

  removeItemFromCart: asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const cart = await CartService.removeItemFromCart(productId);
    res.status(200).json(new apiResponse(200, cart, 'Item removed from cart successfully'));
  }),

  clearCart: asyncHandler(async (req, res) => {
    const cart = await CartService.clearCart();
    res.status(200).json(new apiResponse(200, cart, 'Cart cleared successfully'));
  })
};

export default cartController;