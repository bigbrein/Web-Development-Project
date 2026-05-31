import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

import Posts from "../components/posts.jsx";

const HomePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <>
      <div className="flex flex-1">
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
