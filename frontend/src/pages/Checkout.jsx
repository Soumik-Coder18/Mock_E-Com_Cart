import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../hooks/useCart';
import orderService from '../services/orderService';

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

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <CheckoutForm onSubmit={handleSubmitOrder} loading={loading} />
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;