import { useAuthContext } from "./useAuthContext";

export const usePostLike = () => {
  const { user } = useAuthContext();

  const likePost = async (postID) => {
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            action: "like",
            userID: user._id,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Failed to like post" };
      }

      const updatedPost = await response.json();
      return { success: true, data: updatedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { likePost };
};

export const usePostDislike = () => {
  const { user } = useAuthContext();

  const dislikePost = async (postID) => {
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            action: "dislike",
            userID: user._id,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.error || "Failed to dislike post",
        };
      }

      const updatedPost = await response.json();
      return { success: true, data: updatedPost };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { dislikePost };
};
