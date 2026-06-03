import { useState } from "react";

export const useGetUserInfo = () => {
  const getUserInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      return null;
    }
  };
  return { getUserInfo };
};

export const useGetUserInfoByUsername = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfoByUsername = async (username) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/username/${username}`,
      );
      const responseJson = await response.json();
      return { success: true, data: responseJson };
    } catch (err) {
      setError(err);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserInfoByUsername, error, isLoading };
};
