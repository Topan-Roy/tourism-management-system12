import React from 'react';
import { motion } from 'framer-motion'; // ✅ Step 1: Import motion

const destinations = [
  {
    id: 1,
    name: 'Cox’s Bazar',
    country: 'Bangladesh',
    image: 'https://i.ibb.co/8LK180VM/photo-1587302525159-2363f54affd4.jpg',
  },
  {
    id: 2,
    name: 'Sundarbans',
    country: 'Bangladesh',
    image: 'https://i.ibb.co/tpRmzNj8/sundarban.jpg',
  },
  {
    id: 3,
    name: 'Bandarban',
    country: 'Bangladesh',
    image: 'https://i.ibb.co/TMWCTFfX/Nilachal-Bandarban-Chittagong.jpg',
  },
];

// ✅ Optional: Animation config (stagger effect)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const PopularDestinations = () => {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">🌍 Popular Destinations</h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {destinations.map((place) => (
          <motion.div
            key={place.id}
            variants={item}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img src={place.image} alt={place.name} className="h-56 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl text-black font-semibold">{place.name}</h3>
              <p className="text-gray-500">{place.country}</p>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PopularDestinations;
