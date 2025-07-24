import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const MyBookings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['my-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    const handleView = (id) => {
        console.log("View Booking", id);
    };

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This booking will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/bookings/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire("Deleted!", "Your booking has been deleted.", "success");
                    refetch();
                }
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete booking", "error");
            }
        }
    };

    const formatDate = (iso) => {
        return new Date(iso).toLocaleDateString();
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Package</th>
                        
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking._id}>
                            <td>{index + 1}</td>
                            <td className="max-w-[180px] truncate">{booking.
                                packageName}</td>
                           
                            <td>{formatDate(booking.
                                tourDate)}</td>
                            <td>৳{booking.price}</td>
                            <td>
                                <span
                                    className={`badge ${booking.payment_status === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {booking.payment_status || 'unpaid'}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => handleView(booking._id)}
                                    className="btn btn-xs btn-outline"
                                >
                                    View
                                </button>
                                {booking.payment_status !== "paid" && (
                                    <button
                                        onClick={() => handlePay(booking._id)}
                                        className="btn btn-xs btn-primary text-black"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(booking._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No bookings found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;
