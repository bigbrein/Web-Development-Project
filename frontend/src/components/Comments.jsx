import { useState, useEffect } from "react";
import CommentDetails from "./CommentDetails.jsx";

function Comments({ postID, authorID }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/comments/${postID}`,
        );
        const data = await response.json();

        if (response.ok) {
          setComments(data);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [postID]);

  return (
    <>
      {comments &&
        comments.map((comment) => {
          <CommentDetails authorID={authorID} comment={comment} />;
        })}
    </>
  );
}

export default Comments;
