import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTag, 
  faTruck, 
  faShieldHalved, 
  faRotateLeft, 
  faBox 
} from '@fortawesome/free-solid-svg-icons';

const OrderSummary = () => {
  const { cart } = useCart();
  
  const cartItems = Array.isArray(cart?.items) ? cart.items.filter(item => item?.product) : [];
  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-white border border-gray-100 p-8">
      <h3 className="text-2xl font-light text-black tracking-tight mb-6 pb-4 border-b border-gray-100">
        Order Summary
      </h3>
      
      {/* Order Items */}
      <div className="space-y-6 mb-6">
        {cartItems.map((item) => (
          <div key={item.product._id} className="flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="font-light text-black tracking-wide text-lg leading-tight">
                  {item.product.name}
                </p>
                <p className="text-gray-600 text-sm font-light mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-light text-black text-lg">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-100 pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTag} className="text-gray-400 text-sm" />
            <span className="text-gray-600 font-light tracking-wide">Subtotal</span>
          </div>
          <span className="text-black font-light">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTruck} className="text-gray-400 text-sm" />
            <span className="text-gray-600 font-light tracking-wide">Shipping</span>
          </div>
          <span className="text-black font-light">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 50 && (
          <div className="bg-gray-50 border border-gray-200 p-4 text-center">
            <p className="text-gray-600 font-light text-sm tracking-wide">
              Add <span className="text-black">${(50 - subtotal).toFixed(2)}</span> more for free shipping
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-black h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center text-xl border-t border-gray-100 pt-4">
          <span className="text-black font-light tracking-wide">Total</span>
          <span className="text-black font-light">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faShieldHalved} className="text-gray-500 text-xl" />
            </div>
            <p className="text-xs text-gray-500 font-light">Secure Payment</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faRotateLeft} className="text-gray-500 text-xl" />
            </div>
            <p className="text-xs text-gray-500 font-light">Easy Returns</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faBox} className="text-gray-500 text-xl" />
            </div>
            <p className="text-xs text-gray-500 font-light">Fast Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;