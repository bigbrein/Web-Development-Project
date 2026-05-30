import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup.js";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

import Navbar from "../components/partials/navbar.jsx";

import "../styles.css";

function RegisterPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isLoading, error } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      error("Passwords do not match");
      return;
    }

    await signup(email.trim(), password.trim());
  };

  const guestLoginHandler = async (e) => {
    e.preventDefault();

    console.log("Logging in as guest...");
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-h-screen rounded-lg flex flex-1">
        <form
          className="my-auto mx-auto p-8 rounded-md flex flex-col gap-5 w-lg"
          onSubmit={(e) => submitHandler(e)}
        >
          <h2 className="text-3xl font-bold text-white">Register</h2>
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
          <div className="text-start">
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
          </div>
          <div className="text-start">
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none w-full"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          {error && <p className="text-red-300">{error}</p>}
          <button
            disabled={isLoading}
            className="bg-blue-500 transition-colors hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
            type="submit"
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here!
            </a>
          </p>
          <p className="text-white font-bold">OR</p>
          <button
            className="font-bold bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
            onClick={(e) => guestLoginHandler(e)}
          >
            Login as guest
          </button>
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

export default RegisterPage;
