import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate(`/users/${user.username}`);
    setDropdownOpen(false);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add_circle,logout,person"
      />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            HobbyHub
          </Link>

          {/* Right Menu */}
          <ul className="flex gap-3 items-center">
            {user && (
              <>
                <li>
                  <Link
                    to="/create"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                  >
                    <span className="material-symbols-outlined text-xl">
                      add_circle
                    </span>
                    <span>Create</span>
                  </Link>
                </li>

                {/* Profile Dropdown */}
                <li className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    {userInfo?.profileImgURL ? (
                      <img
                        src={userInfo.profileImgURL}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          person
                        </span>
                        <span>Profile</span>
                      </button>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          logout
                        </span>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}

            {!user && (
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
