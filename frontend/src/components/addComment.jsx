import { useState, useContext } from "react";
import { useUploadComment } from "../hooks/useUploadComment";
import { CommentsContext } from "../context/CommentsContext";

function AddComment({ postID, authorID }) {
  const [comment, setComment] = useState("");
  const { uploadComment, error, isLoading } = useUploadComment();
  const { addComment } = useContext(CommentsContext);

  const handlePostComment = async (e) => {
    e.preventDefault();
    const { success, data } = await uploadComment(
      postID,
      authorID,
      comment.trim(),
    );

    if (success && data) {
      addComment(postID, data);
    }

    setComment("");
  };

  return (
    <>
      <form onSubmit={handlePostComment} className="flex flex-col flex-1">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Write a comment..."
          className="rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
        ></textarea>
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
        )}
        <div className="flex justify-end mt-3">
          {!isLoading ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Post Comment
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            >
              Posting...
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default AddComment;
