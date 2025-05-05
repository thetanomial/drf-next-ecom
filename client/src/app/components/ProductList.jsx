'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/',)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link href={`/products/${product.id}`}>
          <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={product.image_url || '/placeholder.png'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">
  {product.description.length > 100
    ? product.description.slice(0, 100) + '...'
    : product.description}
</p>
              <div className="mt-2 text-blue-600 font-bold">${product.price}</div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
