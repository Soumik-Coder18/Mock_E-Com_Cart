import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { apiError } from "../utils/apiError.js";

class CartService {
  async getCart() {
    let cart = await Cart.findOne().populate('items.product');
    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
      await cart.save();
    }
    return cart;
  }

  async addItemToCart(productId, quantity = 1) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new apiError(404, 'Product not found');
    }
    if (!product.inStock) {
      throw new apiError(400, 'Product is out of stock');
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity
      });
    }

    await this.calculateTotalPrice(cart);
    await cart.save();
    return await cart.populate('items.product');
  }

  async updateCartItem(productId, quantity) {
    if (quantity < 1) {
      throw new apiError(400, 'Quantity must be at least 1');
    }

    const cart = await Cart.findOne();
    if (!cart) {
      throw new apiError(404, 'Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      throw new apiError(404, 'Item not found in cart');
    }

    cart.items[itemIndex].quantity = quantity;
    await this.calculateTotalPrice(cart);
    await cart.save();
    return await cart.populate('items.product');
  }

  async removeItemFromCart(productId) {
    const cart = await Cart.findOne();
    if (!cart) {
      throw new apiError(404, 'Cart not found');
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await this.calculateTotalPrice(cart);
    await cart.save();
    return await cart.populate('items.product');
  }

  async clearCart() {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
    } else {
      cart.items = [];
      cart.totalPrice = 0;
    }
    await cart.save();
    return cart;
  }

  async calculateTotalPrice(cart) {
    await cart.populate('items.product');
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}

export default new CartService();