import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCompleteRegisteration } from "../hooks/useCompleteRegisteration.js";
import { UseParseImage } from "../hooks/useParseImage.js";

import Navbar from "../components/partials/navbar";

function InputInfo() {
  const { completeRegistration, isLoading, error } = useCompleteRegisteration();

  // const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } else if (user.username !== null) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: implement parseImage;
    const parsedImageURL = UseParseImage();

    const { success } = await completeRegistration(username, parsedImageURL);

    if (success) {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-h-screen rounded-lg flex flex-1">
        <form
          className="mx-auto my-auto p-8 rounded-md flex flex-col gap-5 w-md items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full ">
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
              type="text"
              placeholder="Username"
              required
              minLength={3}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {error && (
              <p className="text-start my-2 text-red-500 text-sm">{error}</p>
            )}
          </div>
          {isLoading ? (
            <button
              className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
              type="button"
              disabled
            >
              Completing Registration...
            </button>
          ) : (
            <button
              className="transition-colors bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              Complete Registration
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default InputInfo;
