import { useState } from "react";
import { useUploadComment } from "../hooks/useUploadComment";

function AddComment({ postID }) {
  const [comment, setComment] = useState("");
  const { uploadComment, error, isLoading } = useUploadComment();

  const handlePostComment = async (e) => {
    e.preventDefault();
    await uploadComment(postID, comment.trim());
    setComment("");
  };

  return (
    <>
      <form onSubmit={handlePostComment} className="mt-4 flex flex-col flex-1">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Write a comment..."
          className="rounded-md  mx-4 p-2 bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-500 focus:outline-none"
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1 mx-4">{error}</p>}
        <div className="flex justify-end my-3 mx-7">
          {!isLoading ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
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
