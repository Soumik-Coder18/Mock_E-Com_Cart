import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const { cart } = useCart();

  const cartItems = Array.isArray(cart?.items)
    ? cart.items.filter((item) => item?.product)
    : [];

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${(cart.totalPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span>${(cart.totalPrice || 0).toFixed(2)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 text-center block"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;