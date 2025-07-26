import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const ManageProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.displayName || "",
    photo: user?.photoURL || "",
  });

  // 🔰 State to hold full user data from DB (including role)
  const [dbUser, setDbUser] = useState(null);

  // 🔄 Fetch user from MongoDB by email
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleEditOpen = () => setIsModalOpen(true);
  const handleEditClose = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // ✅ Update Firebase profile
      await updateUserProfile(editData.name, editData.photo);

      // ✅ Update user in MongoDB
      await axiosSecure.patch(`/users/${user.email}`, {
        name: editData.name,
        photo: editData.photo,
      });

      // ✅ Refetch updated user
      const res = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(res.data);

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      handleEditClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Welcome, {user?.displayName}!
      </h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <p className="text-lg text-gray-700 font-medium mb-1">
          Name: {user?.displayName}
        </p>
        <p className="text-gray-600 mb-1">Email: {user?.email}</p>
        <p className="text-gray-600 mb-4">
          Role: <strong className="capitalize">{dbUser?.role || "tourist"}</strong>
        </p>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleEditOpen} className="btn btn-primary btn-sm">
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/join-as-guide")}
            className="btn  btn-sm"
          >
            Apply As Tour Guide
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl text-black font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-black text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={editData.photo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={dbUser?.role || "tourist"}
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed capitalize"
                  disabled
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={handleEditClose} className="btn btn-outline btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
