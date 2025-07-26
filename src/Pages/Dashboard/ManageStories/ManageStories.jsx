import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const ManageStories = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this story?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it"
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/stories/${id}`);
            if (res.data.deletedCount) {
                Swal.fire("Deleted!", "Story has been deleted.", "success");
                refetch();
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/update-story/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-2xl gap-6 p-6">
            {stories.map(story => (
                <div key={story._id} className="card bg-gray-300 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-black">{story.title}</h2>
                        <p className="text-sm text-gray-600">{story.description}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {story.images.map((img, i) => (
                                <img key={i} src={img} alt="Story" className="w-full h-24 object-cover rounded" />
                            ))}
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button onClick={() => handleEdit(story._id)} className="btn btn-sm btn-primary">Edit</button>
                            <button onClick={() => handleDelete(story._id)} className="btn btn-sm btn-error">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            {stories.length === 0 && <p className="text-center col-span-3 text-gray-500">No stories found.</p>}
        </div>
    );
};

export default ManageStories;
