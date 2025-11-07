import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faEye } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();
  const [itemLoading, setItemLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setItemLoading(true);
      await addToCart(product._id, 1);
    } catch (error) {
      alert('Failed to add item to cart');
    } finally {
      setItemLoading(false);
    }
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      {/* Image Container - Fixed Height */}
      <div className="relative overflow-hidden bg-gray-50 flex-shrink-0">
        <Link to={`/products/${product._id}`} className="block h-80">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
        
        {/* Quick View Button */}
        <Link 
          to={`/products/${product._id}`}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
        >
          <FontAwesomeIcon icon={faEye} className="text-black text-sm" />
        </Link>

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-light tracking-wide">
            OUT OF STOCK
          </div>
        )}
      </div>
      
      {/* Content - Flexible Height */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/products/${product._id}`} className="flex-grow-0">
          <h3 className="text-xl font-light text-black mb-3 group-hover:text-gray-700 transition-colors duration-300 tracking-wide line-clamp-2 min-h-[3.5rem] flex items-start">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light line-clamp-3 tracking-wide flex-grow min-h-[4.5rem]">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto flex-shrink-0">
          <span className="text-2xl font-light text-black tracking-tight whitespace-nowrap">
            ${product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || itemLoading}
            className={`
              group relative flex items-center gap-3 px-4 py-2 font-light tracking-wide transition-all duration-500 border whitespace-nowrap
              ${product.inStock 
                ? 'bg-black text-white hover:bg-gray-800 border-black' 
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }
              ${itemLoading ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            {itemLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FontAwesomeIcon 
                  icon={faBagShopping} 
                  className={`text-sm transition-transform duration-300 ${
                    product.inStock ? 'group-hover:scale-110' : ''
                  }`} 
                />
                <span>
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;