import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import orderService from '../services/orderService';

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
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {location.state?.message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {location.state.message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => {
            const orderItems = Array.isArray(order?.items)
              ? order.items.filter((item) => item?.product)
              : [];

            return (
              <div key={order?._id ?? index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                      Order #{(order?._id || '').slice(-6) || 'N/A'}
                  </h3>
                  <p className="text-gray-600">
                      Placed on {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                  {orderItems.map((item) => (
                    <div key={item.product._id} className="flex justify-between">
                    <span>
                        {item.product.name} x {item.quantity}
                    </span>
                      <span>${((item.price ?? item.product.price ?? 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  {orderItems.length === 0 && (
                    <p className="text-gray-500 text-sm">No items available for this order.</p>
                  )}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold">Total: ${Number(order?.totalAmount ?? 0).toFixed(2)}</span>
                  <span className="text-sm text-gray-600">
                    Customer: {order?.customer?.name || 'Unknown'}
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