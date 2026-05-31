import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin.js";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

import "../styles.css";
import Navbar from "../components/partials/navbar";

function LoginPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const submitHandler = async (e, email, password) => {
    e.preventDefault();

    const { success } = await login(email.trim(), password.trim());

    if (!success) {
      setPassword("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-h-screen rounded-lg flex flex-1">
        <form
          className="my-auto mx-auto p-8 rounded-md flex flex-col gap-5 w-lg"
          onSubmit={(e) => submitHandler(e, email, password)}
        >
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <div className="mt-8">
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <p className="mt-1 text-sm text-end ">
              Forgot Password?{" "}
              <a
                href="https://google.com"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Click here!
              </a>
            </p>
          </div>
          {error && <p className="text-red-300">{error}</p>}
          {isLoading ? (
            <button
              disabled
              className="bg-blue-900 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Logging in...
            </button>
          ) : (
            <button
              disabled={isLoading}
              className="bg-blue-500 transition-colors hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Login
            </button>
          )}
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:text-blue-700">
              Register here!
            </a>
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
}

export default LoginPage;
