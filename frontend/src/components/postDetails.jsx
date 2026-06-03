import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

import AddComment from "./addComment.jsx";
import Comments from "./Comments.jsx";

import defaultProfileImage from "../assets/default-profile.png";
import thumbsUp from "../assets/icons/thumbs_up.svg";
import thumbsUpFill from "../assets/icons/thumbs_up_filled.svg";
import thumbsDown from "../assets/icons/thumbs_down.svg";
import thumbsDownFill from "../assets/icons/thumbs_down_filled.svg";
import commentsIcon from "../assets/icons/comment.svg";
import shareIcon from "../assets/icons/share.svg";

import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { usePostLike, usePostDislike } from "../hooks/usePostLike";
import { useAuthContext } from "../hooks/useAuthContext";

const PostDetails = ({ post }) => {
  const [authorInfo, setAuthorInfo] = useState(null);
  const [postData, setPostData] = useState(post);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const { getUserInfo } = useGetUserInfo();
  const { likePost } = usePostLike();
  const { dislikePost } = usePostDislike();
  const { user } = useAuthContext();

  const hasUserLiked = postData.upvotes?.includes(user?._id);
  const hasUserDisliked = postData.downvotes?.includes(user?._id);

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      const info = await getUserInfo(post.authorID);
      setAuthorInfo(info);
    };
    fetchAuthorInfo();
  }, [getUserInfo, post.authorID]);

  const handleLike = async () => {
    if (!user) return;

    const newUpvotes = hasUserLiked
      ? postData.upvotes.filter((id) => id !== user._id)
      : [...postData.upvotes, user._id];

    setPostData({
      ...postData,
      upvotes: newUpvotes,
      downvotes: hasUserDisliked
        ? postData.downvotes.filter((id) => id !== user._id)
        : postData.downvotes,
    });

    await likePost(postData._id);
  };

  const handleDislike = async () => {
    if (!user) return;

    const newDownvotes = hasUserDisliked
      ? postData.downvotes.filter((id) => id !== user._id)
      : [...postData.downvotes, user._id];

    setPostData({
      ...postData,
      downvotes: newDownvotes,
      upvotes: hasUserLiked
        ? postData.upvotes.filter((id) => id !== user._id)
        : postData.upvotes,
    });

    await dislikePost(postData._id);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/posts/${postData._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: postData.title,
          text: postData.body?.substring(0, 100) || "",
          url: shareUrl,
        });
      } catch {
        console.log("Share cancelled or failed");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Link copied!");
        setTimeout(() => setShareMessage(""), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mb-4">
        {/* Post Header */}
        <div className="p-3">
          {authorInfo ? (
            <Link
              to={`/users/${authorInfo.username}`}
              className="flex items-center gap-2"
            >
              <img
                src={authorInfo.profileImgURL}
                alt={`${authorInfo.username}'s profile`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                u/{authorInfo.username}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                • {new Date(postData.createdAt).toLocaleDateString()}
              </span>
            </Link>
          ) : (
            <div>
              <img
                src={defaultProfileImage}
                alt="User's profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="px-3 pb-3">
          <h2 className="mx-10 text-start font-bold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h2>
          {post.body && (
            <div className="text-start mx-10 text-gray-700 dark:text-gray-300 text-sm prose dark:prose-invert prose-sm max-w-none">
              <Markdown>{post.body}</Markdown>
            </div>
          )}
          {post.imageURL && (
            <img
              src={post.imageURL}
              alt="Post"
              className="mt-3 mx-auto rounded max-w-full max-h-80 object-cover"
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="px-3 py-2 flex gap-4 items-center border-t border-gray-200 dark:border-gray-800">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <img
              src={hasUserLiked ? thumbsUpFill : thumbsUp}
              alt="Thumbs up"
              className="w-4 h-4"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {postData.upvotes?.length || 0}
            </span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <img
              src={hasUserDisliked ? thumbsDownFill : thumbsDown}
              alt="Thumbs down"
              className="w-4 h-4"
            />
          </button>

          {/* Comments Button */}
          <button
            onClick={() => setCommentsVisible(!commentsVisible)}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <img src={commentsIcon} alt="Comments" className="w-4 h-4" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {postData.commentCount || 0}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Share post"
          >
            <span className="material-symbols-outlined text-sm text-gray-600 dark:text-gray-400">
              <img src={shareIcon} alt="Share" className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* Share Message */}
        {shareMessage && (
          <div className="px-3 py-2 text-xs text-green-600 dark:text-green-400">
            {shareMessage}
          </div>
        )}
      </div>

      {/* Comments Section */}
      {commentsVisible && (
        <div className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-800 mb-4">
          <div className="p-3">
            <AddComment postID={postData._id} authorID={postData.authorID} />
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Comments postID={postData._id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
