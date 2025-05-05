'use client';

import { useState } from 'react';
import useAuthStore from '../stores/useAuthStore';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const {isAuthenticated,accessToken} = useAuthStore()

  console.log(accessToken)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call
    console.log('Submitting:', form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">
        {/* Info Section */}
        <div className="bg-blue-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-blue-100 mb-6">
              We'd love to hear from you. Whether you have a question or just want to say hi,
              our team is ready to help.
            </p>
            <ul className="space-y-4 text-blue-100">
              <li><strong>📍 Address:</strong> 123 Web St, Developer City</li>
              <li><strong>📞 Phone:</strong> (123) 456-7890</li>
              <li><strong>📧 Email:</strong> contact@example.com</li>
            </ul>
          </div>
          <p className="text-sm text-blue-200 mt-10">© 2025 YourCompany</p>
        </div>

        {/* Contact Form */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
          {submitted ? (
            <div className="text-green-600 font-medium">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
