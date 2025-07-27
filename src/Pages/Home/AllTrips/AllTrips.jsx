import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import useAxios from "../../../hooks/useAxios";

const AllTrips = () => {
  const [packages, setPackages] = useState([]);
  const axiosPublic = useAxios();

  useEffect(() => {
    axiosPublic.get("/packages").then((res) => {
      setPackages(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={pkg.images?.[0]}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{pkg.title}</h3>
            <p className="text-gray-600">📍 {pkg.location}</p>
            <p className="text-gray-800 font-medium">৳ {pkg.price}</p>
            <p className="text-sm text-gray-500">{pkg.duration}</p>

            {/* ✅ ঠিক path */}
            <Link to={`/packages/${pkg._id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
