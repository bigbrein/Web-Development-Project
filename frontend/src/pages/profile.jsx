import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/partials/navbar";

function Profile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <h1>Profile</h1>
    </>
  );
}

export default Profile;
