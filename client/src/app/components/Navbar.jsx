'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthStore from '../stores/useAuthStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, initializeAuthState, loading } = useAuthStore();

  useEffect(() => {
    initializeAuthState();
  }, [initializeAuthState]);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-3xl font-bold tracking-wide">
            E-Shop
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/shop" className="hover:text-gray-300">Shop</Link>
          <Link href="/products" className="hover:text-gray-300">Products</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          <Link href="/cart" className="hover:text-gray-300">Cart</Link>

          {/* Auth Links */}
          {loading ? (
            <span className="text-sm text-gray-300">Checking auth...</span>
          ) : isAuthenticated ? (
            <Link href="/auth/logout" className="hover:text-gray-300">Logout</Link>
          ) : (
            <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-center space-y-4 py-4">
          <Link href="/" className="block py-2 text-xl">Home</Link>
          <Link href="/shop" className="block py-2 text-xl">Shop</Link>
          <Link href="/about" className="block py-2 text-xl">About</Link>
          <Link href="/contact" className="block py-2 text-xl">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
