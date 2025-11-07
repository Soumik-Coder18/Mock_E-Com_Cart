import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Cart = () => {
  const { cart, loading } = useCart();

  const cartItems = Array.isArray(cart?.items)
    ? cart.items.filter((item) => item?.product)
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-black tracking-tight mb-4">
          Shopping Cart
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto"></div>
        <p className="text-gray-600 font-light tracking-wide mt-4">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your collection
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="xl:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-0 border border-gray-100 bg-white">
              {cartItems.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-gray-100 bg-white">
              <p className="text-gray-500 text-lg font-light tracking-wide">
                Your cart is waiting to be filled
              </p>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="xl:col-span-1">
          <CartSummary />
        </div>
      </div>

      {/* Continue Shopping Link */}
      {cartItems.length > 0 && (
        <div className="text-center mt-12">
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          <a 
            href="/products" 
            className="inline-flex items-center gap-3 text-gray-600 hover:text-black font-light tracking-wide transition-colors duration-300 group"
          >
            <span>Continue Exploring</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;