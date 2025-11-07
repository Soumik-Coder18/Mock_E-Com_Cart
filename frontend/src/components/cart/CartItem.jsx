import { useCart } from '../../hooks/useCart';

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
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-600">${product.price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || loading}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
        >
          -
        </button>
        
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={loading}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="text-lg font-bold text-gray-900">
        ${(product.price * item.quantity).toFixed(2)}
      </div>

      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-red-600 hover:text-red-800 disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;