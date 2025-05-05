'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [message, setMessage] = useState('');
  const [inCart, setInCart] = useState(false);  // Track if the product is in the cart

  useEffect(() => {
    // Fetch the product details
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Check if the product is already in the cart
    axios.get('http://localhost:8000/api/cart-items/')
      .then(res => {
        const cartItems = res.data;
        const isInCart = cartItems.some(item => item.product.id === parseInt(id));
        setInCart(isInCart);
      })
      .catch(err => {
        console.error('Error checking cart:', err);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      setMessage('');
      await axios.post('http://localhost:8000/api/cart-items/add_to_cart/', {
        "product_id": parseInt(id),
        "quantity": 1,
      },{ 
        withCredentials: true  // Ensure the cookie is included with the request
      });
      setInCart(true);  // Product added to cart
      setMessage('Added to cart!');
      toast.success(`${product.name} added to cart`)
    } catch (err) {
      console.error('Error adding to cart:', err);
      setMessage('Failed to add to cart.');
      toast.error(`${product.name} failed to add to cart.`)
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      setRemoving(true);
      setMessage('');
      await axios.post(`http://localhost:8000/api/cart/remove-from-cart/`, {
        "product_id": parseInt(id),
      },{ 
        withCredentials: true  // Ensure the cookie is included with the request
      });
      setInCart(false);  // Product removed from cart
      setMessage('Removed from cart!');
      toast.success(`${product.name} removed from cart!`)
    } catch (err) {
      console.error('Error removing from cart:', err);
      setMessage('Failed to remove from cart.');
      toast.error(`${product.name} failed to remove from cart`)
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-lg">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl text-blue-600 font-bold mb-4">${product.price}</div>
          
          {/* Add to Cart Button */}
          {!inCart ? (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          ) : (
            <button
              onClick={handleRemoveFromCart}
              disabled={removing}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
              {removing ? 'Removing...' : 'Remove from Cart'}
            </button>
          )}

          {/* Message */}
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
