import React, { useEffect } from "react";
import FeedForm from "../components/FeedForm";
import FeedItem from "../components/FeedItem";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useUser();
  const { posts, getUserFeed, postUser, setPosts } = usePosts();
  const { userId } = useParams();

  useEffect(() => {
    if (user.isAuthenticated && userId) {
      getUserFeed(userId);
    }
  }, [user.isAuthenticated, userId]);

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="profile-page max-w-7xl mx-auto grid gap-4">
      <div className="profile-info">
        <ProfileInfo />
      </div>
      <div className="profile-posts">
        {user.id === postUser.id ? (
          <div className="feed-form-container bg-white border border-gray-200 rounded-lg mb-4">
            <FeedForm />
          </div>
        ) : null}
        {posts.map((post) => (
          <div
            className="p-4 bg-white border border-gray-200 rounded-lg mb-4"
            key={post.id}
          >
            <FeedItem post={post} onDeletePost={deletePost} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
