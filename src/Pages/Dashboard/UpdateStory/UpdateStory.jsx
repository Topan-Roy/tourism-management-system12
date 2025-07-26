import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateStory = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure(); // ✅ fixed here
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/stories/${id}`)
            .then(res => setStory(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    const handleRemoveImage = (img) => {
        setRemovedImages([...removedImages, img]);
        setStory({
            ...story,
            images: story.images.filter(i => i !== img)
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file)); // preview
        setNewImages([...newImages, ...urls]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedStory = {
            title: form.title.value,
            text: form.text.value
        };

        try {
            // 1. Update title & text
            await axiosSecure.put(`/stories/${id}`, updatedStory);

            // 2. Remove old images ($pull)
            if (removedImages.length > 0) {
                await axiosSecure.patch(`/stories/remove-images/${id}`, { images: removedImages });
            }

            // 3. Add new images ($push)
            if (newImages.length > 0) {
                await axiosSecure.patch(`/stories/add-images/${id}`, { images: newImages });
            }

            Swal.fire('Success!', 'Story updated successfully!', 'success');
            navigate('/dashboard/my-story');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update story', 'error');
        }
    };

    if (!story) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    defaultValue={story.title}
                    className="input input-bordered w-full"
                    placeholder="Story Title"
                    required
                />
                <textarea
                    name="text"
                    defaultValue={story.text}
                    className="textarea textarea-bordered w-full"
                    rows={5}
                    placeholder="Story Text"
                    required
                ></textarea>

                <label className="block font-semibold">Existing Images:</label>
                <div className="grid grid-cols-3 gap-3">
                    {story.images?.map((img, idx) => (
                        <div key={idx} className="relative">
                            <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(img)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <label className="block font-semibold mt-4">Add New Images:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered w-full"
                />
                {newImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        {newImages.map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded" />
                        ))}
                    </div>
                )}

                <button type="submit" className="btn btn-primary mt-4">Update Story</button>
            </form>
        </div>
    );
};

export default UpdateStory;
