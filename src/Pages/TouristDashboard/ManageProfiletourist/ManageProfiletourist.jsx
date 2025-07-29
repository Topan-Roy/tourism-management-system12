import React, {  useState } from 'react';

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const ManageProfiletourist = () => {
  const { user, updateUserProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(user?.photoURL || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photo);
      Swal.fire('Success', 'Profile updated successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
        console.log(error)
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">👋 Welcome, {user?.displayName}</h2>

      <div className="bg-base-200 p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold">{user?.displayName}</h3>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-2">
          ✏️ Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-md w-11/12 md:w-[400px]">
            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user?.email}
                  disabled
                />
              </div>

              <div>
                <label className="label">Role</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value="Tourist"
                  disabled
                />
              </div>

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfiletourist;
