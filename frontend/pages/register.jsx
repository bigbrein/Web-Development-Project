import { useState } from "react";

import "../src/styles.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e, _email, _password, _confirmPassword) => {
    e.preventDefault();

    if (_password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/.test(_password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
      return;
    }

    if (_confirmPassword !== _password) {
      setError("Passwords do not match");
      return;
    }

    const requestBody = {
      email: _email,
      password: _password,
    };

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      setError(responseJson.message || "Registration failed");
      return;
    } else {
      // Redirect to home page
    }
  };

  return (
    <div className="w-full max-h-screen rounded-lg flex flex-1">
      <form
        className="my-auto mx-auto p-8 rounded-md flex flex-col gap-5 w-lg"
        onSubmit={(e) =>
          submitHandler(
            e,
            email.trim(),
            password.trim(),
            confirmPassword.trim(),
          )
        }
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
            onInput={(e) => {
              setPassword(e.target.value);

              if (confirmPassword.trim() !== e.target.value.trim()) {
                setError("Passwords do not match");
              } else {
                setError(null);
              }
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
            onInput={(e) => {
              setConfirmPassword(e.target.value);

              if (password.trim() !== e.target.value.trim()) {
                setError("Passwords do not match");
              } else {
                setError(null);
              }
            }}
            required
          />
        </div>
        {error && <p className="text-red-300">{error}</p>}
        <button
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
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default RegisterPage;
