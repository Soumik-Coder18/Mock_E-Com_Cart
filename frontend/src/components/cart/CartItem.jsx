import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../common/LoadingSpinner';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, loading } = useCart();
  const product = item?.product;

  if (!product) {
    return null;
  }

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(product._id, newQuantity);
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(product._id);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  return (
    <div className="flex items-center space-x-8 bg-white p-8 border-b border-gray-100 group hover:bg-gray-50 transition-all duration-500">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover bg-gray-50"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <h3 className="text-2xl font-light text-black tracking-wide">
          {product.name}
        </h3>
        <p className="text-lg text-gray-600 font-light">${product.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || loading}
          className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          <FontAwesomeIcon icon={faMinus} className="text-sm group-hover:scale-110 transition-transform duration-300" />
        </button>
        
        <span className="w-16 text-center text-xl font-light text-black tracking-wide">
          {loading ? <LoadingSpinner size="sm" /> : item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={loading}
          className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-2xl font-light text-black tracking-tight min-w-[120px] text-right">
        ${(product.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-500 group"
      >
        <FontAwesomeIcon 
          icon={faTrash} 
          className="text-lg group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
    </div>
  );
};

export default CartItem;