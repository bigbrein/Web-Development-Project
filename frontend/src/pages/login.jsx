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
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                HobbyHub
              </h1>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign In
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Welcome back to your hobbies
              </p>
            </div>

            {/* Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => submitHandler(e, email, password)}
            >
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <a
                    href="https://google.com"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  Logging in...
                </button>
              ) : (
                <button
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  type="submit"
                >
                  Sign In
                </button>
              )}
            </form>

            {/* Divider */}
            <div className="mt-6 mb-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  New to HobbyHub?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-gray-600 dark:text-gray-400">
              <a
                href="/register"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
