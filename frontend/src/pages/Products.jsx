import { useState } from 'react';
import ProductList from '../components/products/ProductList';
import { useProducts } from '../hooks/useProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const { products = [], loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light text-black tracking-tight mb-4">
          The Collection
        </h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          Discover our curated selection of premium essentials, meticulously crafted for the modern lifestyle
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12 relative">
        <div className="relative">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
          />
          <input
            type="text"
            placeholder="Search our collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 bg-white px-12 py-4 font-light tracking-wide focus:outline-none focus:border-black transition-all duration-500"
          />
        </div>
        {searchTerm && (
          <p className="text-gray-600 font-light text-sm mt-3 text-center">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        )}
      </div>

      {error && (
        <div className="bg-gray-100 border border-gray-300 text-black px-6 py-4 mb-8 text-center font-light tracking-wide">
          {error}
        </div>
      )}

      <ProductList products={filteredProducts} loading={loading} />
    </div>
  );
};

export default Products;