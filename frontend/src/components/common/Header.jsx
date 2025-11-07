import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBagShopping, 
  faUser,
  faHouse,
  faBox,
  faReceipt
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { cart } = useCart();

  // Safely handle undefined cart
  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="bg-white border-b border-gray-100 backdrop-blur-sm bg-white/95 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-light text-lg">TN</span>
            </div>
            <span className="text-2xl font-light text-black tracking-tight">
              TrendNest
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black group transition-all duration-300 py-2"
            >
              <FontAwesomeIcon 
                icon={faHouse} 
                className="text-sm group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="font-light tracking-wide">Home</span>
            </Link>
            
            <Link 
              to="/products" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black group transition-all duration-300 py-2"
            >
              <FontAwesomeIcon 
                icon={faBox} 
                className="text-sm group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="font-light tracking-wide">Collection</span>
            </Link>
            
            <Link 
              to="/orders" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black group transition-all duration-300 py-2"
            >
              <FontAwesomeIcon 
                icon={faReceipt} 
                className="text-sm group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="font-light tracking-wide">Orders</span>
            </Link>
            
            {/* Cart with Badge */}
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black group relative transition-all duration-300 py-2"
            >
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faBagShopping} 
                  className="text-sm group-hover:scale-110 transition-transform duration-300" 
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white font-medium">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="font-light tracking-wide">Cart</span>
            </Link>

            {/* User Account */}
            <Link 
              to="/account" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black group transition-all duration-300 py-2"
            >
              <FontAwesomeIcon 
                icon={faUser} 
                className="text-sm group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="font-light tracking-wide">Account</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Subtle Bottom Border Animation */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </header>
  );
};

export default Header;