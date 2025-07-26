import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";


const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios();
const { user } = useAuth();
  const onSubmit = async (data) => {
    const packageData = {
       name: user?.displayName,
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      duration: data.duration,
      location: data.location,
      images: data.photo,
    };

    try {
      const res = await axiosSecure.post("/packages", packageData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Package added successfully", "success");
        reset();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to add package", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto  rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Package Title"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("location", { required: true })}
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("duration", { required: true })}
          type="text"
          placeholder="Duration (e.g., 3 days 2 nights)"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("price", { required: true })}
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Package Description"
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>
        <input
          {...register("photo", { required: true })}
          type="text"
          placeholder="Image URLs (comma separated)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
