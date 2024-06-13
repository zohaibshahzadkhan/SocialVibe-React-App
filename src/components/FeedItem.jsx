import React, { useState } from "react";
import { Link } from "react-router-dom";

const FeedItem = ({ post, deletePost }) => {
  const [showExtraModal, setShowExtraModal] = useState(false);

  const toggleExtraModal = () => {
    setShowExtraModal(!showExtraModal);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img
            src={post.created_by.get_avatar}
            alt="Avatar"
            className="w-[40px] rounded-full"
          />

          <p>
            <strong>
              <Link to={`/profile/${post.created_by.id}`}>
                {post.created_by.name}
              </Link>
            </strong>
          </p>
        </div>

        <p className="text-gray-600">{post.created_at_formatted} ago</p>
      </div>

      {post.attachments && post.attachments.length > 0 && (
        <div>
          {posts.attachments.map((image) => (
            <img
              key={image.id}
              src={image.get_image}
              alt="Attachment"
              className="w-full mb-4 rounded-xl"
            />
          ))}
        </div>
      )}

      <p>{post.body}</p>

      <div className="my-6 flex justify-between">
        <div className="flex space-x-6 items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="text-gray-500 text-xs">
              {post.likes_count} likes
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <Link to={`/post/${post.id}`} className="text-gray-500 text-xs">
              {post.comments_count} comments
            </Link>
          </div>

          {post.is_private && (
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <span>Is private</span>
            </div>
          )}
        </div>

        <div>
          <div onClick={toggleExtraModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      {showExtraModal && (
        <div>
          <div className="flex space-x-6 items-center">
            <div
              className="flex items-center space-x-2"
              onClick={() => deletePost(post.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <span className="text-red-500 text-xs">Delete post</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedItem;
