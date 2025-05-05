'use client';

import Link from 'next/link';

export default function ShopPage() {
  return (
    <div className="bg-gray-50">

      {/* Shop Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Explore Our Collection</h2>
          <p className="text-xl mb-8">Find the best deals on your favorite products</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <div className="flex space-x-8">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
              All Products
            </button>
            <button className="bg-gray-100 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-200 transition">
              Best Sellers
            </button>
            <button className="bg-gray-100 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-200 transition">
              New Arrivals
            </button>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Product Listings Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Product Card 1 */}
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

            {/* Product Card 2 */}
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

            {/* Product Card 3 */}
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

            {/* Product Card 4 */}
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

      {/* Featured Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">Shop By Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {/* Category 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/path-to-category-image.jpg" alt="Category 1" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Category Name</h4>
                <Link href="/category/1">
                  <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/path-to-category-image.jpg" alt="Category 2" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Category Name</h4>
                <Link href="/category/2">
                  <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/path-to-category-image.jpg" alt="Category 3" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Category Name</h4>
                <Link href="/category/3">
                  <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Category 4 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/path-to-category-image.jpg" alt="Category 4" className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Category Name</h4>
                <Link href="/category/4">
                  <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
