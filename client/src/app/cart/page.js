'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosInstance from '../lib/axiosInstance';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cart-items/', { withCredentials: true });
        console.log(response.data);
        setCart(response.data);  // Assuming the response is an array of cart items
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Could not fetch cart items');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post(
        'http://localhost:8000/api/cart/remove-from-cart/',
        { product_id: productId },
        { withCredentials: true }
      );
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    }
  };

  const handleDecrementFromCart = async (productId) => {
    const product = cart.find(item => item.product.id === productId);
    
    if (product && product.quantity === 1) {
      // If only one item left, remove the item
      handleRemoveFromCart(productId);
    } else {
      try {
        await axios.post(
          'http://localhost:8000/api/cart/decrement-from-cart/',
          { product_id: productId, quantity: 1 },
          { withCredentials: true }
        );
        setCart(prevCart => {
          const updatedItems = prevCart.map(item => 
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return updatedItems;
        });
      } catch (err) {
        console.error('Error decrementing item quantity:', err);
        setError('Failed to update item quantity');
      }
    }
  };

  // Increment cart item quantity
  const handleIncrementFromCart = async (productId) => {
    try {
      await axios.post(
        'http://localhost:8000/api/cart-items/add_to_cart/',
        { product_id: productId, quantity: 1 },
        { withCredentials: true }
      );
      setCart(prevCart => {
        const updatedItems = prevCart.map(item => 
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedItems;
      });
    } catch (err) {
      console.error('Error incrementing item quantity:', err);
      setError('Failed to update item quantity');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post(
        'http://localhost:8000/api/orders/checkout/',
        {},
        { withCredentials: true }
      );

      console.log('Checkout success:', response.data);
      const orderId = response.data.id
      router.push(`/orders/order-summary/${orderId}`);  // or wherever you want to go after success
    } catch (err) {
      const errorMessage = err.response.data.detail
      if (errorMessage == "Authentication credentials were not provided."){
        setError('Please login to continue.')
        router.push(`/auth/login?next=/cart`);
      }else{

        setError('Checkout failed. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg text-red-600">{error}</div>;
  }

  if (!cart || cart.length === 0) {
    return <div className="text-center py-10 text-lg">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img
                src={item.product.image_url || '/placeholder.png'}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="font-semibold text-xl">{item.product.name}</h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-lg font-semibold">${item.product.price}</div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrementFromCart(item.product.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrementFromCart(item.product.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-2xl font-semibold">
          Total: $
          {cart.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0).toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
