import express from 'express';
import checkoutController from '../controllers/checkout.controller.js';

const router = express.Router();

router.post('/', checkoutController.createOrder);
router.get('/', checkoutController.getAllOrders);
router.get('/:id', checkoutController.getOrderById);
router.put('/:id/status', checkoutController.updateOrderStatus);

export default router;