import { useEffect, useState } from "react";
import PostDetails from "../components/postDetails";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
  }, [user]);

  return (
    <>
      <div className="my-5">
        {posts &&
          posts.map((post) => <PostDetails key={post._id} post={post} />)}
      </div>
    </>
  );
};

export default HomePage;
