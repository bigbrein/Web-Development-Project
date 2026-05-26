import { useEffect, useState } from "react";
import PostDetails from "../components/postDetails";

const HomePage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/home");
      const responseJson = await response.json();

      if (response.ok) {
        setPosts(responseJson);
      }
    };

    fetchPosts();
  }, []);

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
