'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-5xl font-semibold mb-4">Welcome to E-Shop</h2>
          <p className="text-xl mb-8">Your one-stop shop for amazing products</p>
          <Link href="/products">
            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Example Product 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="/path-to-your-product-image.jpg" alt="Product 1" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Product Name</h4>
                <p className="text-gray-600 mt-2">$29.99</p>
                <Link href="/products/1">
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
            {/* Example Product 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="/path-to-your-product-image.jpg" alt="Product 2" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Product Name</h4>
                <p className="text-gray-600 mt-2">$49.99</p>
                <Link href="/products/2">
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
            {/* Example Product 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="/path-to-your-product-image.jpg" alt="Product 3" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Product Name</h4>
                <p className="text-gray-600 mt-2">$19.99</p>
                <Link href="/products/3">
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
            {/* Example Product 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="/path-to-your-product-image.jpg" alt="Product 4" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Product Name</h4>
                <p className="text-gray-600 mt-2">$39.99</p>
                <Link href="/products/4">
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h3 className="text-3xl font-semibold mb-6">Want the Best Deals?</h3>
        <p className="text-xl mb-8">Sign up for our newsletter and get exclusive offers.</p>
        <Link href="/subscribe">
          <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Subscribe Now
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-lg">&copy; 2025 E-Shop. All rights reserved.</p>
          <div className="space-x-8 mt-4">
            <Link href="/privacy" className="text-white hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="text-white hover:text-gray-400">Terms & Conditions</Link>
            <Link href="/contact" className="text-white hover:text-gray-400">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
