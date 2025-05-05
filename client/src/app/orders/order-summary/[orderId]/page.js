'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/app/lib/axiosInstance';

export default function OrderPreviewPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [canceling, setCanceling] = useState(false);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${orderId}/`);
        setOrder(res.data);
        setCanceled(res.data.is_canceled || false); // if field exists
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Could not load order data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancel = async () => {
    setCanceling(true);
    try {
      const res = await axiosInstance.patch(`/orders/${orderId}/`, {
        is_canceled: true,
      });
      setOrder(res.data);
      setCanceled(true);
    } catch (err) {
      console.error('Failed to cancel order:', err);
      setError('Could not cancel order.');
    } finally {
      setCanceling(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <p className="text-gray-700 mb-2">Total: ${order.total_price}</p>
      <p className="text-gray-600 mb-4">Placed on: {new Date(order.created_at).toLocaleString()}</p>

      <h2 className="text-lg font-semibold mb-3">Items:</h2>
      <ul className="divide-y">
        {order.items.map((item) => (
          <li key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ${item.product.price}
              </p>
            </div>
            <div className="text-sm font-semibold">
              ${(item.quantity * parseFloat(item.product.price)).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      {!canceled ? (
        <button
          onClick={handleCancel}
          disabled={canceling}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          {canceling ? 'Canceling...' : 'Cancel Order'}
        </button>
      ) : (
        <div className="mt-6 text-red-700 text-center font-semibold">Order Canceled</div>
      )}
    </div>
  );
}
