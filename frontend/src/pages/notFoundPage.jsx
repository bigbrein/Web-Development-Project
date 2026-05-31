import { Link } from "react-router-dom";
import Navbar from "../components/partials/navbar";

function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className="w-full max-h-screen rounded-lg flex flex-1">
        <div className="my-auto mx-auto p-8 rounded-md flex flex-col gap-5 w-lg">
          <h2 className="text-3xl font-bold text-white">
            404 - Page Not Found
          </h2>
          <p className="text-white">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="font-bold bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default NotFoundPage;
