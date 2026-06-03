import { useParams } from "react-router-dom";
import { useGetUserInfoByUsername } from "../hooks/useGetUserInfo";
import { useEffect, useState } from "react";
import Navbar from "../components/partials/navbar";
import "../styles.css";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();
  const { getUserInfoByUsername, error } = useGetUserInfoByUsername();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const { data } = await getUserInfoByUsername(username);
        setUserInfo(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [getUserInfoByUsername, username]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="p-8 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              Error
            </h2>
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </>
    );
  }

  if (!userInfo) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div>
            <p className="text-gray-500">User not found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Profile Header Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-800">
            {/* Header with avatar and info */}
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {userInfo.username?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userInfo.username}
                </h1>

                {userInfo.bio && (
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {userInfo.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.postCount || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Posts
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.commentCount || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Comments
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.followerCount || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Followers
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              {userInfo.email && (
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 flex-shrink-0">
                    mail
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {userInfo.email}
                  </span>
                </div>
              )}

              {userInfo.joinedDate && (
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 flex-shrink-0">
                    calendar_today
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    Joined{" "}
                    {new Date(userInfo.joinedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {userInfo.location && (
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 flex-shrink-0">
                    location_on
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {userInfo.location}
                  </span>
                </div>
              )}

              {userInfo.website && (
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 flex-shrink-0">
                    language
                  </span>
                  <a
                    href={userInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {userInfo.website}
                  </a>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Follow User
              </button>
            </div>
          </div>

          {/* About Section */}
          {userInfo.about && (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {userInfo.about}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
