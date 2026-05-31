import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { authActionTypes } from "../context/contextActionTypes";

export const useCompleteRegisteration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, dispatch } = useAuthContext();

  const completeRegistration = async (username, profileImgURL) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/register/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            username,
            profileImgURL,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw Error(data.err || "Failed to complete registration");
      }

      localStorage.setItem("user", JSON.stringify(data));
      await dispatch({
        type: authActionTypes.LOGIN,
        payload: data,
      });

      return { success: true, data };
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { completeRegistration, isLoading, error };
};
