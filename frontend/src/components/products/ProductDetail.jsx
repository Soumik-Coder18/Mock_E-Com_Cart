import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import LoadingSpinner from '../common/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[600px] object-cover bg-gray-50"
          />
          {!product.inStock && (
            <div className="absolute top-6 left-6 bg-black text-white px-4 py-2 text-sm font-light tracking-wide">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-light text-black tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light tracking-wide">
              {product.description}
            </p>
          </div>

          <div className="text-4xl font-light text-black tracking-tight">
            ${product.price}
          </div>

          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-4 py-2 text-sm font-light tracking-wide border ${
              product.inStock 
                ? 'border-black text-black' 
                : 'border-gray-300 text-gray-400'
            }`}>
              {product.inStock ? 'Available' : 'Out of Stock'}
            </span>
          </div>

          {product.inStock && (
            <div className="space-y-6 pt-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-6">
                <label className="text-black font-light tracking-wide text-lg">Quantity:</label>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faMinus} className="text-sm" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center text-black font-light text-lg border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="group w-full bg-black text-white py-4 px-8 font-light tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-500 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <FontAwesomeIcon 
                      icon={faBagShopping} 
                      className="text-sm group-hover:scale-110 transition-transform duration-300" 
                    />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;