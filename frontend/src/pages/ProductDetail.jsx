import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductDetail from '../components/products/ProductDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import productService from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-gray-400">!</span>
        </div>
        <h2 className="text-3xl font-light text-black tracking-tight mb-4">Product Not Found</h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
        <p className="text-gray-600 font-light tracking-wide mb-8">{error}</p>
        <a 
          href="/products" 
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-light tracking-wide hover:bg-gray-800 transition-all duration-500"
        >
          <span>Back to Collection</span>
        </a>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;