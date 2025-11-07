import express from 'express';
import productRoutes from './products.route.js';
import cartRoutes from './cart.route.js';
import checkoutRoutes from './checkout.route.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);

export default router;