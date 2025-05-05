'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/app/stores/useAuthStore';

export default function LogoutPage() {
  const { isAuthenticated, logout } = useAuthStore();
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Perform logout when the component mounts
    logout();

    // Check authentication state after logout
    if (!isAuthenticated) {
      setMessage('Logged out successfully');
      setTimeout(() => {
        router.push('/'); // Redirect to homepage or any other page after some time
      }, 2000); // 2 seconds delay for the message to show
    } else {
      setMessage('Logout failed');
    }
  }, [isAuthenticated, logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Logging Out</h2>
        <div className="text-center text-lg">{message}</div>
      </div>
    </div>
  );
}
