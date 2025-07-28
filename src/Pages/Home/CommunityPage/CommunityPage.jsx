import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const CommunityPage = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxios();
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (user) {
          const token = await user.getIdToken(); 

          const res = await axiosPublic.get("/stories", {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });

          setStories(res.data);
        } else {
          console.log("User not logged in");
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    fetchStories();
  }, [axiosPublic, user]); 

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">🌍 Community Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white shadow rounded p-4">
            <img
              src={story.images?.[0]}
              alt="Story"
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl text-black font-semibold mt-3">
              {story.title || "Travel Story"}
            </h3>
            <p className="text-gray-600 mt-2">{story.text}</p>
            <p className="text-sm text-gray-400 mt-1">
              👤 {story.userName || "Anonymous"}
            </p>

            <div className="mt-4">
              <FacebookShareButton
                url={"https://your-live-site-url.com/community"}
                quote={story.text}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
