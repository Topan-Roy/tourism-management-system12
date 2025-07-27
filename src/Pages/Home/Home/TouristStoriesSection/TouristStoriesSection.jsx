import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FacebookShareButton } from 'react-share';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';


const TouristStoriesSection = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure
      .get('/stories/random?limit=4')
      .then((res) => {
        setStories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching stories:', err);
      });
  }, [axiosSecure]);

  const handleShare = (storyId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const url = `${window.location.origin}/story/${storyId}`;
    navigator.clipboard.writeText(url);
    alert('Story link copied! Now you can share.');
  };

  return (
    <div className="py-10 px-4 md:px-8 bg-gray-300 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Tourist Stories</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 w-60">
              {story.images.map((img, i) => (
                <img key={i} src={img} alt="Story" className=" bg-white rounded-xl shadow-md overflow-hidden" />
              ))}
            </div>

            <p className="text-gray-600 mb-4">
              {story.description?.slice(0, 120)}...
            </p>

            <div className="flex flex-wrap gap-3">
              <FacebookShareButton url={`${window.location.origin}/story/${story._id}`}>
                <button className="btn btn-sm btn-info">Share on Facebook</button>
              </FacebookShareButton>

              <button
                onClick={() => handleShare(story._id)}
                className="btn btn-sm btn-secondary"
              >
                Copy Link
              </button>

              <button
                onClick={() => navigate(`/story/${story._id}`)}
                className="btn btn-sm btn-outline"
              >
                Read Details
              </button>
            </div>
          </div>
        ))}

      </div>

      <div className="mt-8 text-center">
  <button
    onClick={() => navigate('/dashboard/my-story')} 
    className="btn btn-primary"
  >
    See All Stories
  </button>
</div>

    </div>
  );
};

export default TouristStoriesSection;
