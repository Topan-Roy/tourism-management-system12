import { useState } from "react";
import Swal from "sweetalert2";


import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      ...formData,
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      status: "pending", 
      appliedAt: new Date(),
    };

    try {
      await axiosSecure.post("/guides", application);
      Swal.fire("Application Submitted!", "We will review soon.", "success");
      setFormData({ title: "", reason: "", cvLink: "" });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Apply to Join as a Tour Guide
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-black font-medium">Application Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="e.g., Passionate Travel Enthusiast"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-black font-medium">Why do you want to be a Tour Guide?</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Describe your motivation and passion..."
          ></textarea>
        </div>

        {/* CV Link */}
        <div>
          <label className="block text-black font-medium">CV / Resume Link</label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="https://drive.google.com/your-cv"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
