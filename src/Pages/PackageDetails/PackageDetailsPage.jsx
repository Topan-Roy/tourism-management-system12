import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PackageGallery from "./PackageGallery";


const PackageDetailsPage = () => {
    const { id } = useParams();

    const axios = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [tourDate, setTourDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState("");

    // Fetch package data
    const { data: packageData = {} } = useQuery({
        queryKey: ["package", id],
        queryFn: async () => {
            const res = await axios.get(`/packages/${id}`);
            return res.data;
        },
    });

    // Fetch guides
    const { data: guides = [] } = useQuery({
        queryKey: ["guides"],
        queryFn: async () => {
            const res = await axios.get("/guides");
            return res.data;
        },
    });

    // Handle Booking Submit
    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingInfo = {
            packageId: packageData._id,
            packageName: packageData.title,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            price: packageData.price,
            tourDate,
            guideName: selectedGuide,
            status: "pending",
        };

        try {
            const res = await axios.post("/bookings", bookingInfo);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Confirm your Booking",
                    icon: "success",
                    confirmButtonText: "Go to My Bookings",
                }).then(() => {
                    navigate("/dashboard/my-bookings");
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Booking Failed", "Something went wrong", "error");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Gallery */}
            <div className="">
                <PackageGallery></PackageGallery>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
               <img src={packageData.images} alt="Package" className="w-full h-auto" />
            </div> */}

            {/* About Tour */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">About the Tour</h2>
                <p className="text-gray-700">{packageData.description}</p>
            </div>

            {/* Tour Plan */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
                <ul className="space-y-3 list-disc pl-5">
                    {packageData.tourPlan?.map((plan, idx) => (
                        <li key={idx}>
                            <strong>Day {plan.day}:</strong> {plan.activities}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tour Guide List */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-3">Meet Our Tour Guides</h2>
                <div className="flex flex-wrap gap-3">
                    {guides?.map((guide) => (
                        <button
                            key={guide._id}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                            onClick={() => navigate(`/guides/${guide._id}`)}
                        >
                            {guide.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white text-black p-6 shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-4">Book This Tour</h2>
                <form onSubmit={handleBooking} className="space-y-4">
                    {/* Title */}
                    <input
                        type="text"
                        value={packageData.title || ""}
                        className="w-full border p-2 rounded mb-3"
                        readOnly
                    />
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        className="w-full border p-2 rounded"
                        readOnly
                    />
                    <input
                        type="email"
                        value={user?.email || ""}
                        className="w-full border p-2 rounded"
                        readOnly
                    />
                    <input
                        type="text"
                        value={user?.photoURL || ""}
                        className="w-full border p-2 rounded"
                        readOnly
                    />
                    <input
                        type="number"
                        value={packageData.price || ""}
                        className="w-full border p-2 rounded"
                        readOnly
                    />
                    <div>
                        <label className="block mb-1 font-medium">Tour Date</label>
                        <DatePicker
                            selected={tourDate}
                            onChange={(date) => setTourDate(date)}
                            className="w-full border p-2 rounded"
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Select Tour Guide</label>
                        <select
                            value={selectedGuide}
                            onChange={(e) => setSelectedGuide(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="" disabled>
                                Choose a guide
                            </option>
                            {guides?.map((guide) => (
                                <option key={guide._id} value={guide.name}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PackageDetailsPage;
