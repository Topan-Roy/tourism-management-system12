import React from 'react';
import { motion } from 'framer-motion';

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

// Animation config
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const PopularDestinations = () => {
  return (
    <section className="py-16 mt-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 transition-colors duration-500">
        🌍 Popular Destinations
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {destinations.map((place) => (
          <motion.div
            key={place.id}
            variants={item}
            className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500 hover:shadow-xl"
          >
            <img
              src={place.image}
              alt={place.name}
              className="h-56 md:h-64 w-full object-cover transition-all duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-semibold transition-colors duration-500">
                {place.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 transition-colors duration-500">
                {place.country}
              </p>
              <button className="mt-3 px-4 py-2 bg-[#443dff] text-white rounded hover:bg-[#443dff] transition-colors duration-300">
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
