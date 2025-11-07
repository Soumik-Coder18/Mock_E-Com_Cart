import Order from "../models/order.model.js";
import CartService from "./cart.service.js";
import Product from "../models/product.model.js";
import { apiError } from "../utils/apiError.js";

class CheckoutService {
  async createOrder(customerInfo) {
    const cart = await CartService.getCart();
    
    if (!cart || cart.items.length === 0) {
      throw new apiError(400, 'Cart is empty');
    }

    // Validate stock availability
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product.inStock) {
        throw new apiError(400, `Product "${product.name}" is out of stock`);
      }
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = cart.totalPrice;

    const order = new Order({
      items: orderItems,
      totalAmount,
      customer: {
        name: customerInfo.name,
        email: customerInfo.email
      },
      status: 'pending'
    });

    await order.save();
    
    // Clear the cart after successful order
    await CartService.clearCart();

    return await order.populate('items.product');
  }

  async getAllOrders() {
    return await Order.find({}).populate('items.product').sort({ createdAt: -1 });
  }

  async getOrderById(id) {
    return await Order.findById(id).populate('items.product');
  }

  async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    ).populate('items.product');
  }
}

export default new CheckoutService();