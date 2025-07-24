import { useForm } from "react-hook-form";


import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const ApplyAsGuide = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const guideApplication = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      phone: data.phone,
      location: data.location,
      experience: data.experience,
      status: "pending", // default
    };

    try {
      const res = await axiosSecure.post("/guides", guideApplication);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your application has been submitted.", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">Apply as a Tour Guide</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label className="block mb-1">Experience</label>
          <textarea
            {...register("experience", { required: true })}
            className="w-full textarea textarea-bordered"
          ></textarea>
        </div>

        <button className="btn btn-primary w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyAsGuide;
