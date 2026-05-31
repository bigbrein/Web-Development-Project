import { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost.js";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createPost, isLoading, error } = useCreatePost();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await createPost(title.trim(), content.trim());

    if (success) {
      setTitle("");
      setContent("");

      navigate("/");
    }
  };

  return (
    <>
      <form
        className="mx-auto mt-10 p-5 rounded-lg flex flex-col gap-5 w-3/4 max-w-200"
        onSubmit={handleSubmit}
      >
        <p className="text-3xl text-start font-bold">Create Post</p>
        <input
          type="text"
          placeholder="Title*"
          className="bg-gray border border-gray-300 rounded-lg p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border border-gray-300 rounded-lg p-2 min-h-50"
          placeholder="Body Text (Optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
};

export default NewPostForm;
