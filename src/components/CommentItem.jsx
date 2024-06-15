import React from "react";
import { Link } from "react-router-dom";

const CommentItem = ({ comment }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <img src={comment.created_by.get_avatar} alt="Avatar" className="w-[40px] h-[40px] rounded-full" />
        
        <p>
          <strong>
            <Link to={`/profile/${comment.created_by.id}`}>{comment.created_by.name}</Link>
          </strong>
        </p>
      </div>

      <div>
        <p className="text-gray-600">{comment.created_at_formatted} ago</p>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentItem;
