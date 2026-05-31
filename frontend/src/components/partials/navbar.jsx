import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { Link } from "react-router-dom";

import "../../styles.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add_circle"
      />

      <div className="bg-gray-800">
        <nav className="flex items-center p-3">
          <div className="text-2xl font-bold text-white">
            <Link to="/">HobbyHub</Link>
          </div>
          <ul className="flex gap-5 ms-auto items-center">
            {user && (
              <li className="text-white">
                <button className="text-white font-bold py-2 px-4 rounded hover:ring-2 hover:ring-white-500 focus:ring-opacity-50">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined">
                      add_circle
                    </span>
                    <Link to="/create">Create Post</Link>
                  </div>
                </button>
              </li>
            )}
            {!user && (
              <li className="text-white">
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="text-white">
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
