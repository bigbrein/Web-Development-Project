import { useState, useEffect, useContext } from "react";
import CommentDetails from "./CommentDetails.jsx";
import { CommentsContext } from "../context/CommentsContext";

function Comments({ postID }) {
  const [comments, setComments] = useState(null);
  const { setCommentsForPost, commentTrigger } = useContext(CommentsContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/comments/${postID}`,
        );
        const data = await response.json();

        if (response.ok) {
          setComments(data);
          setCommentsForPost(postID, data);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [postID, commentTrigger, setCommentsForPost]);

  return (
    <div className="flex flex-col gap-4">
      {comments &&
        comments.map((comment) => (
          <CommentDetails key={comment._id} comment={comment} />
        ))}
      {comments && comments.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No comments yet
        </p>
      )}
    </div>
  );
}

export default Comments;
