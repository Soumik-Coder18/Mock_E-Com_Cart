import express from 'express';
import cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/', cartController.addItemToCart);
router.put('/:productId', cartController.updateCartItem);
router.delete('/clear', cartController.clearCart);
router.delete('/:productId', cartController.removeItemFromCart);

export default router;