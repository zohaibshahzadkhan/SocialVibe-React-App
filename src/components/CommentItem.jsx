import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CommentItem({ comment }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <img
          src={comment.created_by.get_avatar}
          alt="Avatar"
          className="w-[40px] h-[40px] rounded-full"
        />

        <p>
          <strong>
            <Link to={`/profile/${comment.created_by.id}`}>
              {comment.created_by.name}
            </Link>
          </strong>
        </p>
      </div>

      <div>
        <p className="text-gray-600">{comment.created_at_formatted} ago</p>
        <p>{comment.body}</p>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    created_by: PropTypes.shape({
      get_avatar: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    created_at_formatted: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentItem;
