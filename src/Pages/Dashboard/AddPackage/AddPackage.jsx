import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddPackage = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();
const navigate=useNavigate()
  const [tourPlan, setTourPlan] = useState([{ day: "", activity: "" }]);

  const handleTourPlanChange = (index, field, value) => {
    const updated = [...tourPlan];
    updated[index][field] = value;
    setTourPlan(updated);
  };

  const addDay = () => {
    setTourPlan([...tourPlan, { day: "", activity: "" }]);
  };

  const removeDay = (index) => {
    const updated = tourPlan.filter((_, i) => i !== index);
    setTourPlan(updated);
  };

  const onSubmit = async (data) => {
    const validTourPlan = tourPlan.filter(
      (item) => item.day.trim() && item.activity.trim()
    );

    if (validTourPlan.length === 0) {
      return Swal.fire("Warning", "Please fill at least one tour plan day", "warning");
    }

    const packageData = {
      name: user?.displayName,
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      duration: data.duration,
      location: data.location,
      images: data.photo.split(",").map((url) => url.trim()),
      tourPlan: validTourPlan,
    };

    try {
      const res = await axiosSecure.post("/packages", packageData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Package added successfully", "success");
        reset();
        setTourPlan([{ day: "", activity: "" }]);
        navigate("/all-trips"); 
      }
      
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to add package", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-lg shadow">
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

        {/* Tour Plan Section */}
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Tour Plan <span className="text-red-500">*</span></h3>
          {tourPlan.map((item, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                placeholder={`Day ${index + 1}`}
                value={item.day}
                onChange={(e) => handleTourPlanChange(index, "day", e.target.value)}
                className="w-full p-2 mb-1 border rounded"
              />
              <textarea
                placeholder="Activity details"
                value={item.activity}
                onChange={(e) => handleTourPlanChange(index, "activity", e.target.value)}
                className="w-full p-2 border rounded"
                rows={2}
              ></textarea>
              {tourPlan.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(index)}
                  className="text-red-600 text-sm mt-1"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDay}
            className="mt-2 text-blue-600 text-sm underline"
          >
            + Add another day
          </button>
        </div>

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
