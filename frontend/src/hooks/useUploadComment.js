import { useAuthContext } from "./useAuthContext";

import { useState } from "react";

export const useUploadComment = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadComment = async (postID, authorID, content) => {
    setIsLoading(true);
    setError(null);

    try {
      const newComment = {
        parentPost: postID,
        author: authorID,
        content: content,
      };

      const response = await fetch(`http://localhost:3000/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newComment),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to upload comment");
        return { success: false };
      }

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadComment, error, isLoading };
};
