import React, { useEffect } from "react";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";
import { useFriendship } from "../context/FriendshipContext";
import { useToast } from "../context/ToastContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { postUser, getUserFeed } = usePosts();
  const { userId } = useParams();
  const { user, removeToken } = useUser();
  const { sendFriendshipRequest, canSendFriendshipRequest } = useFriendship();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      if (userId) {
        getUserFeed(userId);
      }
    }
  }, [userId]);

  const handleSendRequest = () => {
    if (canSendFriendshipRequest) {
      sendFriendshipRequest(userId, { showToast });
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const isOwnProfile = user.id === postUser.id;

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={postUser.get_avatar || "https://via.placeholder.com/50"}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <p className="font-bold">{postUser.name || "User Name"}</p>
          <p className="text-gray-500">
            {postUser.email || "user@example.com"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-around">
        <div>
          <Link
            to={`/profile/${userId}/friends`}
            className="font-bold text-blue-500"
          >
            Friends
          </Link>
          <p>{postUser.friends_count || 0}</p>
        </div>
        <div>
          <p className="font-bold">Posts</p>
          <p>{postUser.posts_count || 0}</p>
        </div>
      </div>
      <div className="mt-6">
        {!isOwnProfile ? (
          <button
            className="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg"
            onClick={handleSendRequest}
            disabled={!canSendFriendshipRequest}
          >
            {canSendFriendshipRequest
              ? "Send friendship request"
              : "Request Sent"}
          </button>
        ) : (
          <div className="space-y-4">
            <Link
              to="/profile/edit"
              className="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg mr-2"
            >
              Edit
            </Link>
            <button
              onClick={handleLogout}
              className="inline-block py-4 px-3 bg-red-600 text-xs text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
