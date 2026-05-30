import { useAuthContext } from "./useAuthContext.js";
import { authActionTypes } from "../context/contextActionTypes.js";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.err);
      return { success: false, error: data.err };
    }

    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: authActionTypes.LOGIN, payload: data });
    setIsLoading(false);

    return { success: true, data };
  };

  return { login, isLoading, error };
};
