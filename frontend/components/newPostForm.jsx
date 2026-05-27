import { useState } from "react";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
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
        >
          Post
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
