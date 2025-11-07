import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../hooks/useCart';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmitOrder = async (customerData) => {
    try {
      setLoading(true);
      await orderService.createOrder(customerData);
      
      await clearCart();
      navigate('/orders', { 
        state: { message: 'Order placed successfully!' } 
      });
    } catch (error) {
      alert('Failed to place order: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const cartItems = Array.isArray(cart?.items) ? cart.items : [];
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FontAwesomeIcon icon={faBagShopping} className="text-gray-400 text-2xl" />
        </div>
        <h1 className="text-4xl font-light text-black tracking-tight mb-4">Checkout</h1>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-600 font-light tracking-wide mb-8">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-light tracking-wide hover:bg-gray-800 transition-all duration-500"
        >
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="transform group-hover:-translate-x-1 transition-transform duration-300" 
          />
          <span>Explore Collection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-black tracking-tight mb-4">
          Checkout
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light tracking-wide">
          Complete your purchase with confidence
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-light text-black tracking-wide mb-2">
              Shipping & Payment
            </h2>
            <p className="text-gray-600 font-light text-sm">
              Secure encrypted transaction
            </p>
          </div>
          <CheckoutForm onSubmit={handleSubmitOrder} loading={loading} />
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-light text-black tracking-wide mb-2">
              Order Summary
            </h2>
            <p className="text-gray-600 font-light text-sm">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your order
            </p>
          </div>
          <OrderSummary />
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-12 text-center space-y-6">
            <LoadingSpinner size="lg" />
            <div className="space-y-2">
              <p className="text-black font-light tracking-wide text-lg">
                Processing Your Order
              </p>
              <p className="text-gray-600 font-light text-sm">
                Please wait while we secure your purchase
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;