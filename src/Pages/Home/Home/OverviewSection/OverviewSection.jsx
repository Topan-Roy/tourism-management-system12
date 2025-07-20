import React from 'react';
import overviewImg from '/updates.jpg'; 

const OverviewSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#F9F9F9] to-white py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Part */}
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-[#0F172A]">Why Choose <span className="text-[#0ea5e9]">TourNest?</span></h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            TourNest is more than just a tourism site — it’s your personalized gateway to discovering the world. Whether you're looking for hidden gems, cultural journeys, or luxury escapes — we’ve got something tailored just for you.
          </p>
          <ul className="list-disc list-inside mt-6 space-y-2 text-gray-700">
            <li>Authentic experiences with local tour guides</li>
            <li>Secure and easy booking process</li>
            <li>Customer-first support and flexible plans</li>
            <li>Curated packages for every travel mood</li>
          </ul>
        </div>

        {/* Image Part */}
        <div>
          <img
            src={overviewImg}
            alt="Tour Overview"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
