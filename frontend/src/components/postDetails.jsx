import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostDetails = ({ post }) => {
  const [authorInfo, setAuthorInfo] = useState(null);

  const getUserInfo = async (authorID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${authorID}`,
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const info = await getUserInfo(post.authorID);
      setAuthorInfo(info);
    };
    fetchAuthorInfo();
  }, [post.authorID]);

  return (
    <>
      <div className="flex flex-col gap-2 p-4 rounded text-start">
        {authorInfo && (
          <Link
            to={`/users/${authorInfo.username}`}
            className="flex items-center gap-3"
          >
            <div>
              <img
                src={authorInfo.profileImgURL}
                alt={`${authorInfo.username}'s profile`}
                className="w-7 h-7 rounded-full "
              />
            </div>
            <div className="flex items-center gap-2">
              <p to={`/users/${authorInfo.username}`} className="font-semibold">
                u/{authorInfo.username}
              </p>
              {" • "}
              <p className="text-sm mt-0.5 text-gray-500">{post.createdAt}</p>
            </div>
          </Link>
        )}
        <div className="ms-10 flex flex-col gap-2">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500">{post.body}</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default PostDetails;
