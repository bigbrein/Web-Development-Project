import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCompleteRegisteration } from "../hooks/useCompleteRegisteration.js";
import { UseParseImage } from "../hooks/useParseImage.js";

import Navbar from "../components/partials/navbar";

function InputInfo() {
  const { completeRegistration, isLoading, error } = useCompleteRegisteration();

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedImageURL =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    if (profilePicture) {
      parsedImageURL = await UseParseImage(profilePicture);
    }

    const { success } = await completeRegistration(username, parsedImageURL);

    if (success) {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Your Profile
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Profile Picture
                </label>
                <div className="flex flex-col items-start gap-4">
                  {profilePreview && (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  placeholder="Choose a username"
                  required
                  minLength={3}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              {isLoading ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Completing Registration...
                </button>
              ) : (
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  type="submit"
                >
                  Complete Registration
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputInfo;
