import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faMapMarkerAlt, 
  faCity, 
  faHashtag,
  faShieldHalved,
  faLock
} from '@fortawesome/free-solid-svg-icons';

const CheckoutForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const { cart } = useCart();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const cartItems = Array.isArray(cart?.items) ? cart.items : [];
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-100 bg-white">
        <p className="text-gray-600 font-light tracking-wide">Your cart is empty</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="relative">
          <label className="block text-black font-light tracking-wide mb-3 text-lg">
            Full Name *
          </label>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faUser} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-black font-light tracking-wide mb-3 text-lg">
            Email *
          </label>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Address */}
        <div className="md:col-span-2 relative">
          <label className="block text-black font-light tracking-wide mb-3 text-lg">
            Address *
          </label>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faMapMarkerAlt} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
              placeholder="Street address"
            />
          </div>
        </div>

        {/* City */}
        <div className="relative">
          <label className="block text-black font-light tracking-wide mb-3 text-lg">
            City *
          </label>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faCity} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
              placeholder="City"
            />
          </div>
        </div>

        {/* ZIP Code */}
        <div className="relative">
          <label className="block text-black font-light tracking-wide mb-3 text-lg">
            ZIP Code *
          </label>
          <div className="relative">
            <FontAwesomeIcon 
              icon={faHashtag} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
              placeholder="ZIP / Postal code"
            />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faShieldHalved} className="text-gray-500" />
          <p className="text-gray-600 font-light tracking-wide text-sm">
            Your information is secure and encrypted. We never share your details with third parties.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="group w-full bg-black text-white py-4 px-8 font-light tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Order...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faLock} className="text-sm" />
            <span>Complete Purchase</span>
          </>
        )}
      </button>

      {/* Required Fields Note */}
      <p className="text-gray-400 text-xs font-light text-center tracking-wide">
        * Required fields
      </p>
    </form>
  );
};

export default CheckoutForm;