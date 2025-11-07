import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faEdit,
  faSave,
  faTimes,
  faBox,
  faCalendar,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Soumik Bag',
    email: 'bagsoumik6@gmail.com',
    phone: '+91 70444 66468',
    address: 'Domjur',
    city: 'Howrah',
    zipCode: '711405',
    country: 'India'
  });

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to an API here
    console.log('Saving user data:', userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const orderItems = Array.isArray(orders) ? orders : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-black tracking-tight mb-4">
          Account Overview
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-600 font-light tracking-wide">
          Manage your profile and track your orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information Card */}
          <div className="bg-white border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-light text-black tracking-tight">
                Personal Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 text-black font-light tracking-wide hover:text-gray-700 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="text-sm" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 font-light tracking-wide hover:bg-gray-800 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faSave} className="text-sm" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 font-light tracking-wide hover:border-black transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-sm" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 bg-white px-12 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 bg-white px-12 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faPhone} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 bg-white px-12 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faMapMarkerAlt} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 bg-white px-12 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>

              {/* City & ZIP */}
              <div className="relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 bg-white px-4 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div className="relative">
                <label className="block text-black font-light tracking-wide mb-3">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={userData.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 bg-white px-4 py-3 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-gray-100 p-8">
            <h2 className="text-2xl font-light text-black tracking-tight mb-6 pb-4 border-b border-gray-100">
              Recent Orders
            </h2>
            
            {ordersLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : orderItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faBox} className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-600 font-light tracking-wide mb-2">No orders found</p>
                <p className="text-gray-400 text-sm font-light">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orderItems.slice(0, 5).map((order, index) => {
                  const orderItemsList = Array.isArray(order?.items)
                    ? order.items.filter((item) => item?.product)
                    : [];

                  return (
                    <div key={order?._id ?? index} className="border border-gray-100 p-6 hover:shadow-lg transition-all duration-500">
                      {/* Order Header */}
                      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                        <div className="space-y-1">
                          <h3 className="text-lg font-light text-black tracking-wide">
                            Order #{(order?._id || '').slice(-8) || 'N/A'}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-600 font-light text-sm">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                              <span>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-light tracking-wide border ${
                          order.status === 'completed' 
                            ? 'border-green-200 text-green-800 bg-green-50' 
                            : 'border-yellow-200 text-yellow-800 bg-yellow-50'
                        }`}>
                          {order.status === 'completed' && (
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                          )}
                          {order.status}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-4">
                        {orderItemsList.slice(0, 3).map((item) => (
                          <div key={item.product._id} className="flex justify-between items-center py-2">
                            <div className="flex-1">
                              <span className="text-black font-light text-sm">
                                {item.product.name}
                              </span>
                              <span className="text-gray-500 text-xs font-light ml-2">
                                x {item.quantity}
                              </span>
                            </div>
                            <span className="text-black font-light text-sm">
                              ${((item.price ?? item.product.price ?? 0) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {orderItemsList.length > 3 && (
                          <p className="text-gray-500 text-xs font-light text-center pt-2">
                            +{orderItemsList.length - 3} more items
                          </p>
                        )}
                      </div>

                      {/* Order Footer */}
                      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="text-lg font-light text-black tracking-tight">
                          Total: ${Number(order?.totalAmount ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Account Summary Sidebar */}
        <div className="space-y-6">
          {/* Membership Status */}
          <div className="bg-white border border-gray-100 p-6 text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-light text-black tracking-tight mb-2">
              Premium Member
            </h3>
            <p className="text-gray-600 font-light text-sm">
              Member since 2023
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-100 p-6">
            <h3 className="text-xl font-light text-black tracking-tight mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Total Orders</span>
                <span className="text-black font-light">{orderItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Total Spent</span>
                <span className="text-black font-light">
                  ${orderItems.reduce((total, order) => total + (order?.totalAmount || 0), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Avg. Order</span>
                <span className="text-black font-light">
                  ${(orderItems.reduce((total, order) => total + (order?.totalAmount || 0), 0) / (orderItems.length || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;