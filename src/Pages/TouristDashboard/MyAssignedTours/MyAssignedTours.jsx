import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyAssignedTours = () => {
    const [assignedTours, setAssignedTours] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // fetch assigned bookings
    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/bookings/assigned?email=${user.email}`)
                .then((res) => setAssignedTours(res.data))
                .catch((err) => console.error(err));
        }
    }, [user?.email, axiosSecure]);

    // update tour status (Accept / Reject)
    const updateStatus = async (id, status) => {
        try {
            const confirm = await Swal.fire({
                title: `Are you sure you want to ${status} this tour?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, ${status} it!`,
            });

            if (confirm.isConfirmed) {
                const res = await axiosSecure.patch(`/bookings/${id}/status`, { status });
                if (res.data.modifiedCount > 0) {
                    Swal.fire(`Tour ${status}ed!`, "", "success");
                    setAssignedTours((prev) =>
                        prev.map((tour) =>
                            tour._id === id ? { ...tour, status } : tour
                        )
                    );
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Tourist</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    No assigned tours found.
                                </td>
                            </tr>
                        )}
                        {assignedTours.map((tour) => (
                            <tr key={tour._id}>
                                <td>{tour.packageName}</td>
                                <td>{tour.touristName}</td>
                                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                                <td>${tour.price}</td>
                                <td>
                                    <span className="capitalize badge">{tour.status}</span>
                                    <br />
                                    <small className="text-xs text-gray-500">
                                        {tour.payment_status === "paid" ? "Paid" : "Not Paid"}
                                    </small>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        disabled={!(tour.status === "in-review" && tour.payment_status === "paid")}
                                        onClick={() => updateStatus(tour._id, "accepted")}
                                        className="btn btn-sm btn-success"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        disabled={!(tour.status === "pending" || tour.status === "in-review")}
                                        onClick={() => updateStatus(tour._id, "rejected")}
                                        className="btn btn-sm btn-error"
                                    >
                                        Reject
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTours;
