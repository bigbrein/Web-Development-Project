import { createContext, useCallback, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});
  const [commentTrigger, setCommentTrigger] = useState({});

  const addComment = useCallback((postID, comment) => {
    setComments((prev) => ({
      ...prev,
      [postID]: [comment, ...(prev[postID] || [])],
    }));
    setCommentTrigger((prev) => ({
      ...prev,
      [postID]: Date.now(),
    }));
  }, []);

  const setCommentsForPost = useCallback((postID, commentsArray) => {
    setComments((prev) => ({
      ...prev,
      [postID]: commentsArray,
    }));
  }, []);

  const getCommentsForPost = useCallback(
    (postID) => {
      return comments[postID] || [];
    },
    [comments],
  );

  return (
    <CommentsContext.Provider
      value={{
        comments,
        addComment,
        setCommentsForPost,
        getCommentsForPost,
        commentTrigger,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
