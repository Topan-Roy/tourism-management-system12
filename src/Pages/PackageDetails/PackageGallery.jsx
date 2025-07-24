import React from 'react';

const PackageGallery = () => {
  const images = [
    "https://i.ibb.co/DnZFDG1/images.jpg", // 0
    "https://i.ibb.co/DnZFDG1/images.jpg", // 1
    "https://i.ibb.co/DnZFDG1/images.jpg", // 2
    "https://i.ibb.co/DnZFDG1/images.jpg", // 3
  ];

  return (
    <section className="max-w-5xl  mx-auto px-4 my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Tour Package Gallery</h2>

      {/* First Image Full Width */}
      <div className="mb-4">
        <img
          src={images[0]}
          alt="Gallery Image 1"
          className="w-full h-[300px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Next 3 Images in Grid */}
      <div className="grid grid-cols-3 gap-4">
        <img
          src={images[1]}
          alt="Gallery Image 2"
          className="w-full h-[200px] object-cover rounded-xl"
        />
        <img
          src={images[2]}
          alt="Gallery Image 3"
          className="w-full h-[200px] object-cover rounded-xl"
        />
        <img
          src={images[3]}
          alt="Gallery Image 4"
          className="w-full h-[200px] object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default PackageGallery;
