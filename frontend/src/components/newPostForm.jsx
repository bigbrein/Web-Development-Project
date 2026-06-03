import { useState } from "react";
import { useCreatePost } from "../hooks/useCreatePost.js";
import { useNavigate } from "react-router-dom";
import { UseParseImage } from "../hooks/useParseImage.js";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { createPost, isLoading, error } = useCreatePost();

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageURL = null;
    if (postImage) {
      imageURL = await UseParseImage(postImage);
    }

    const { success } = await createPost(
      title.trim(),
      content.trim(),
      imageURL,
    );

    if (success) {
      setTitle("");
      setContent("");
      setPostImage(null);
      setImagePreview("");
      navigate("/");
    }
  };

  return (
    <>
      <form
        className="mx-auto mt-10 p-5 rounded-lg flex flex-col gap-5 w-3/4 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Post
        </h2>

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title*"
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-2 min-h-40 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Body Text (supports markdown, optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Post Image (Optional)
          </label>
          <div className="flex flex-col gap-3">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Post preview"
                className="max-w-xs h-auto rounded-lg border border-gray-300 dark:border-gray-600"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
