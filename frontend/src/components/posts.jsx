import { useEffect, useState } from "react";
import PostDetails from "../components/postDetails";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const responseJson = await response.json();

      if (response.ok) {
        setPosts(responseJson);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [navigate, user]);

  return (
    <div className="w-full flex-1">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {posts ? (
          posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostDetails key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Be the first to create a post!
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
