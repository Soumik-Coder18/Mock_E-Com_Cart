import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import orderService from '../services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCalendar, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-black tracking-tight mb-4">
          Order History
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light tracking-wide">
          Your curated collection journey
        </p>
      </div>

      {location.state?.message && (
        <div className="bg-gray-100 border border-gray-300 text-black px-6 py-4 mb-8 font-light tracking-wide">
          {location.state.message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-24 border border-gray-100 bg-white">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faBox} className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-600 text-lg font-light tracking-wide mb-2">No orders found</p>
          <p className="text-gray-400 text-sm font-light">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => {
            const orderItems = Array.isArray(order?.items)
              ? order.items.filter((item) => item?.product)
              : [];

            return (
              <div key={order?._id ?? index} className="bg-white border border-gray-100 p-8 hover:shadow-lg transition-all duration-500">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-black tracking-wide">
                      Order #{(order?._id || '').slice(-8) || 'N/A'}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-600 font-light text-sm">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                        <span>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-sm" />
                        <span>{order?.customer?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-sm font-light tracking-wide border ${
                    order.status === 'completed' 
                      ? 'border-green-200 text-green-800 bg-green-50' 
                      : 'border-yellow-200 text-yellow-800 bg-yellow-50'
                  }`}>
                    {order.status === 'completed' && (
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    )}
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.product._id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-b-0">
                      <div className="flex-1">
                        <span className="text-black font-light tracking-wide">
                          {item.product.name}
                        </span>
                        <span className="text-gray-500 text-sm font-light ml-2">
                          x {item.quantity}
                        </span>
                      </div>
                      <span className="text-black font-light">
                        ${((item.price ?? item.product.price ?? 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {orderItems.length === 0 && (
                    <p className="text-gray-500 text-sm font-light text-center py-4">
                      No items available for this order
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-xl font-light text-black tracking-tight">
                    Total: ${Number(order?.totalAmount ?? 0).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;