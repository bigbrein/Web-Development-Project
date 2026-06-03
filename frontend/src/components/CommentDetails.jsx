import { useEffect, useState } from "react";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import defaultProfileImage from "../assets/default-profile.png";

function CommentDetails({ comment }) {
  const { getUserInfo } = useGetUserInfo();
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const info = await getUserInfo(comment.author);
      setAuthorInfo(info);
    };

    fetchAuthorInfo();
  }, [comment.author, getUserInfo]);

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      {authorInfo ? (
        <img
          src={authorInfo.profileImgURL}
          alt={`${authorInfo.username}'s profile`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <img
          src={defaultProfileImage}
          alt="User's profile"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
      )}
      <div className="text-start flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          u/{authorInfo?.username || "unknown"}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-1 break-words">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

export default CommentDetails;
