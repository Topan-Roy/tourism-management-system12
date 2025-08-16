import React from 'react';
import { motion } from 'framer-motion'; 
import overviewImg from '/updates.jpg'; 

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OverviewSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-[#F9F9F9] to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <motion.div
        className="grid md:grid-cols-2 gap-10 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Text Part */}
        <motion.div variants={textVariants}>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">
            Why Choose <span className="text-[#0ea5e9] dark:text-[#38bdf8]">TourNest?</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            TourNest is more than just a tourism site — it’s your personalized gateway to discovering the world.
            Whether you're looking for hidden gems, cultural journeys, or luxury escapes — we’ve got something tailored just for you.
          </p>
          <motion.ul className="list-disc list-inside  mt-6 space-y-2 text-black dark:text-white">
            {[
              "Authentic experiences with local tour guides",
              "Secure and easy booking process",
              "Customer-first support and flexible plans",
              "Curated packages for every travel mood"
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                whileHover={{ scale: 1.05, color: "#0ea5e9" }}
                className="cursor-pointer transition-colors duration-300"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Image Part */}
        <motion.div variants={imageVariants}>
          <img
            src={overviewImg}
            alt="Tour Overview"
            className="rounded-2xl shadow-xl w-full object-cover border-2 border-gray-300 dark:border-gray-700 transition-colors duration-500 hover:scale-105"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OverviewSection;
