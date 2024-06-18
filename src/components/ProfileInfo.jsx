import React, { useEffect } from "react";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";
import { useFriendship } from "../context/FriendshipContext";
import { useToast } from "../context/ToastContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/ProfileInfo.css";

const ProfileInfo = () => {
  const { postUser, getUserFeed } = usePosts();
  const { userId } = useParams();
  const { user, removeToken } = useUser();
  const {
    sendFriendshipRequest,
    canSendFriendshipRequest,
    getFriends,
    friends,
  } = useFriendship();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUserFeed(userId);
      getFriends(userId);
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
  const isFriend = friends.some((friend) => friend.id === userId);

  if (!postUser || !postUser.id) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={postUser.get_avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p className="profile-name">{postUser.name || "User Name"}</p>
          <p className="profile-email">
            {postUser.email || "user@example.com"}
          </p>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <Link to={`/profile/${userId}/friends`} className="stat-link">
            Friends
          </Link>
          <p className="stat-count">{postUser.friends_count || 0}</p>
        </div>
        <div className="stat-item">
          <p className="stat-label">Posts</p>
          <p className="stat-count">{postUser.posts_count || 0}</p>
        </div>
      </div>
      <div className="profile-actions">
        {!isOwnProfile && !isFriend ? (
          <button
            className="action-button"
            onClick={handleSendRequest}
            disabled={!canSendFriendshipRequest}
          >
            {canSendFriendshipRequest
              ? "Send friendship request"
              : "Request Sent"}
          </button>
        ) : isOwnProfile ? (
          <div className="own-profile-actions">
            <Link to="/profile/edit" className="edit-button">
              Edit
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileInfo;
