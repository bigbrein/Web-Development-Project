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
      <div className="">
        <nav className="flex items-center p-5">
          <div className="text-2xl font-bold text-white">
            <Link to="/">HobbyHub</Link>
          </div>
          <ul className="flex gap-5 ms-auto items-center">
            <li className="text-white">Home </li>
            <li className="text-white">About</li>
            <li className="text-white">Contact</li>
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
