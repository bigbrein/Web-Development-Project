import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddComment from "./addComment.jsx";
import Comments from "./Comments.jsx";

import defaultProfileImage from "../assets/default-profile.png";
import thumbsUp from "../assets/icons/thumbs_up.svg";
import thumbsUpFill from "../assets/icons/thumbs_up_filled.svg";
import thumbsDown from "../assets/icons/thumbs_down.svg";
import thumbsDownFill from "../assets/icons/thumbs_down_filled.svg";
import commentsIcon from "../assets/icons/comment.svg";

import { useGetUserInfo } from "../hooks/useGetUserInfo";

const PostDetails = ({ post }) => {
  const [authorInfo, setAuthorInfo] = useState(null);
  const { getUserInfo } = useGetUserInfo();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const info = await getUserInfo(post.authorID);
      setAuthorInfo(info);
    };
    fetchAuthorInfo();
  }, [getUserInfo, post.authorID]);

  return (
    <>
      <div className="flex flex-col gap-2 p-4 rounded text-start">
        {(authorInfo && (
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
        )) || (
          <div className="flex items-center gap-3">
            <div>
              <img
                src={defaultProfileImage}
                alt="User's profile"
                className="w-7 h-7 rounded-full "
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 h-4 mt-1 me-1 bg-gray-700 rounded-md font-semibold"></span>
              {" • "}
            </div>
            <span className="w-48 h-4 mt-1 bg-gray-700 rounded-md font-semibold"></span>
          </div>
        )}
        <div className="ms-10 flex flex-col gap-2">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500">{post.body}</p>
        </div>
        <div className="flex flex-1 justify-evenly items-center">
          <div className="flex items-center gap-4">
            <button
              className="transition-colors hover:bg-gray-200/10 p-2 rounded"
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
            >
              <img src={liked ? thumbsUpFill : thumbsUp} alt="Thumbs up" />
            </button>
            <p className="text-md font-semibold">{1}</p>
            <button
              className="transition-colors hover:bg-gray-200/10 p-2 rounded"
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
            >
              <img
                src={disliked ? thumbsDownFill : thumbsDown}
                alt="Thumbs down"
              />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="transition-colors hover:bg-gray-200/10 p-2 rounded"
              onClick={() => setCommentsVisible(!commentsVisible)}
            >
              <img src={commentsIcon} alt="Comments" />
              {post.commentsCount > 0 && (
                <span className="text-md font-semibold ms-2">
                  {post.commentsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {commentsVisible && (
        <>
          <AddComment postID={post._id} />
          <Comments postID={post._id} authorID={post.authorID} />
        </>
      )}

      <hr className="border-gray-600" />
    </>
  );
};

export default PostDetails;
