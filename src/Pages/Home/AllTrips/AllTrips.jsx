import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import useAxios from "../../../hooks/useAxios";

const AllTrips = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search State
  const axiosPublic = useAxios();

  useEffect(() => {
    axiosPublic.get("/packages").then((res) => {
      // ✅ দাম অনুযায়ী descending sort
      const sorted = res.data.sort((a, b) => b.price - a.price);
      setPackages(sorted);
    });
  }, [axiosPublic]);

  // ✅ Search অনুযায়ী filter করা data
  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Trips
      </h2>

      {/* 🔎 Search Box */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#443dff]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 transition duration-300"
          >
            <img
              src={pkg.images?.[0]}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">
              {pkg.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">📍 {pkg.location}</p>
            <p className="text-gray-800 dark:text-gray-200 font-medium">৳ {pkg.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.duration}</p>

            <Link to={`/packages/${pkg._id}`}>
              <button className="mt-3 bg-[#443dff] text-white px-4 py-2 rounded hover:bg-[#2c28c9] transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
