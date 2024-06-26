import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usePosts } from '../context/PostsContext';
import { useUser } from '../context/UserContext';

function FeedItem({ post, onDeletePost }) {
  const [showExtraModal, setShowExtraModal] = useState(false);
  const { likePost, deletePost } = usePosts();
  const { user } = useUser();

  const handleLike = () => {
    likePost(post.id);
  };

  const handleDelete = () => {
    deletePost(post.id, onDeletePost);
  };

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
            className="w-[40px] h-[40px] rounded-full"
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
          {post.attachments.map(image => (
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
              className="w-6 h-6 cursor-pointer"
              onClick={handleLike}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleLike();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Like"
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
            <Link
              to={`/post/${post.id}`}
              className="text-gray-500 text-xs cursor-pointer"
            >
              {post.comments_count} comments
            </Link>
          </div>
        </div>
        {user && user.id === post.created_by.id && (
          <div>
            <div
              className="cursor-pointer"
              onClick={toggleExtraModal}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  toggleExtraModal();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Toggle options"
            >
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
        )}
      </div>

      {showExtraModal && user && user.id === post.created_by.id && (
        <div>
          <div className="flex justify-end space-x-6 items-center">
            <div
              className="cursor-pointer"
              onClick={handleDelete}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleDelete();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Delete post"
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
}

FeedItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created_by: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      get_avatar: PropTypes.string.isRequired,
    }).isRequired,
    created_at_formatted: PropTypes.string.isRequired,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        get_image: PropTypes.string.isRequired,
      })
    ),
    body: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    comments_count: PropTypes.number.isRequired,
  }).isRequired,
  onDeletePost: PropTypes.func.isRequired,
};

export default FeedItem;
