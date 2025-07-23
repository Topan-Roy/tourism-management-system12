// src/components/SliderBanner.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    img: 'https://i.ibb.co/p6D1dSqZ/longest-sea-beach-in.jpg',
    title: 'Cox’s Bazar',
    desc: 'Longest sea beach in the world — a paradise for beach lovers.'
  },
  {
    img: 'https://i.ibb.co/DnZFDG1/images.jpg',
    title: 'Sundarbans',
    desc: 'Explore the largest mangrove forest and spot the Royal Bengal Tiger.'
  },
  {
    img: 'https://i.ibb.co/4nwYwnLM/woman-wearing-hill-tribe-dress-sitting-hut-green-tea-field-335224-770.jpg',
    title: 'Sylhet',
    desc: 'Green valleys, tea gardens, and mystic rivers await your journey.'
  }
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="h-[60vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
