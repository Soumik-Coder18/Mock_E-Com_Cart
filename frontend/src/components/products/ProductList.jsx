import ProductCard from '../common/ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-500 text-lg font-light tracking-wide">No products found.</p>
        <p className="text-gray-400 text-sm font-light mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;