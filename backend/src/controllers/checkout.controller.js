import CheckoutService from "../services/checkout.service.js";
import apiResponse from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const checkoutController = {
  createOrder: asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new apiError(400, 'Customer name and email are required');
    }

    const order = await CheckoutService.createOrder({ name, email });
    res.status(201).json(new apiResponse(201, order, 'Order created successfully'));
  }),

  getAllOrders: asyncHandler(async (req, res) => {
    const orders = await CheckoutService.getAllOrders();
    res.status(200).json(new apiResponse(200, orders, 'Orders retrieved successfully'));
  }),

  getOrderById: asyncHandler(async (req, res) => {
    const order = await CheckoutService.getOrderById(req.params.id);
    if (!order) {
      throw new apiError(404, 'Order not found');
    }
    res.status(200).json(new apiResponse(200, order, 'Order retrieved successfully'));
  }),

  updateOrderStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      throw new apiError(400, 'Valid status is required (pending or completed)');
    }

    const order = await CheckoutService.updateOrderStatus(req.params.id, status);
    if (!order) {
      throw new apiError(404, 'Order not found');
    }
    res.status(200).json(new apiResponse(200, order, 'Order status updated successfully'));
  })
};

export default checkoutController;