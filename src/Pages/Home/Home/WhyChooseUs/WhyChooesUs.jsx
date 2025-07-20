import React from 'react';
import { FaHeadset, FaStar, FaWallet } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">🌟 Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <FaStar className="text-4xl mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top Rated Guides</h3>
            <p className="text-gray-600">Our tour guides are highly experienced and rated by thousands of travelers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <FaWallet className="text-4xl mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600">We offer competitive prices with no hidden fees or extra charges.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <FaHeadset className="text-4xl mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Need help? Our support team is available round the clock to assist you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
