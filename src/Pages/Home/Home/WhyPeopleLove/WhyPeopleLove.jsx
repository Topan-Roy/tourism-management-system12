import React from 'react';
import { FaSmile, FaMapMarkedAlt, FaWallet } from 'react-icons/fa';

const WhyPeopleLove = () => {
  const features = [
    {
      icon: <FaSmile className="text-4xl text-[#0ea5e9]" />,
      title: "Trusted by Thousands",
      description: "Thousands of happy travelers choose TourNest every year for our unmatched service and experience."
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-[#0ea5e9]" />,
      title: "Explore Hidden Gems",
      description: "We connect you with local guides who help you discover places beyond typical tourist spots."
    },
    {
      icon: <FaWallet className="text-4xl text-[#0ea5e9]" />,
      title: "Best Price Guarantee",
      description: "Enjoy premium packages and accommodations at the most competitive prices, guaranteed."
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-10 text-[#0F172A]">Why People <span className="text-[#0ea5e9]">Love TourNest</span></h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div key={idx} className="bg-[#F9FAFB] p-8 rounded-2xl shadow hover:shadow-xl transition">
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPeopleLove;
