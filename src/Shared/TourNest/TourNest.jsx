import React from 'react';
import logo from '/images.png'; 
import { Link } from 'react-router'; 

const TourNest = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex items-end gap-1">
          <img className="mb-1 h-10 w-10 object-cover rounded-full" src={logo} alt="TourNest Logo" />
          <p className="text-3xl font-extrabold text-fuchsia-700 dark:text-white">TourNest</p>
        </div>
      </Link>
    </div>
  );
};

export default TourNest;
