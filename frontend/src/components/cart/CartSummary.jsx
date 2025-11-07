import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CartSummary = () => {
  const { cart } = useCart();

  const cartItems = Array.isArray(cart?.items)
    ? cart.items.filter((item) => item?.product)
    : [];

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-12 border border-gray-100 text-center space-y-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <FontAwesomeIcon icon={faBagShopping} className="text-gray-400 text-xl" />
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 text-lg font-light tracking-wide">Your cart is empty</p>
          <p className="text-gray-400 text-sm font-light">Add items to begin your collection</p>
        </div>
        <Link
          to="/products"
          className="group inline-flex items-center gap-4 bg-black text-white px-12 py-4 font-light tracking-wide hover:bg-gray-800 transition-all duration-500"
        >
          <span>Explore Collection</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="transform group-hover:translate-x-1 transition-transform duration-300" 
          />
        </Link>
      </div>
    );
  }

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-8 border border-gray-100 space-y-8">
      <h3 className="text-3xl font-light text-black tracking-tight border-b border-gray-100 pb-4">
        Order Summary
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light tracking-wide">Subtotal</span>
          <span className="text-black font-light text-lg">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light tracking-wide">Shipping</span>
          <span className="text-black font-light text-lg">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {subtotal < 50 && (
          <div className="text-sm text-gray-500 font-light text-center py-2 border-y border-gray-100">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </div>
        )}
        
        <div className="flex justify-between items-center text-xl border-t border-gray-100 pt-4">
          <span className="text-black font-light tracking-wide">Total</span>
          <span className="text-black font-light">${total.toFixed(2)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="group w-full bg-black text-white py-4 px-8 font-light tracking-wide hover:bg-gray-800 transition-all duration-500 flex items-center justify-center gap-3"
      >
        <span>Proceed to Checkout</span>
        <FontAwesomeIcon 
          icon={faArrowRight} 
          className="transform group-hover:translate-x-1 transition-transform duration-300" 
        />
      </Link>

      <div className="text-center space-y-2">
        <p className="text-gray-400 text-xs font-light tracking-wide">
          Secure checkout • Encrypted payment
        </p>
        <p className="text-gray-400 text-xs font-light">
          Free returns within 60 days
        </p>
      </div>
    </div>
  );
};

export default CartSummary;