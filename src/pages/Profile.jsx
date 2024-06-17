import React, { useEffect } from "react";
import FeedForm from "../components/FeedForm";
import FeedItem from "../components/FeedItem";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";

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
    <div className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
      <div className="main-left col-span-1 space-y-4">
        <ProfileInfo />
      </div>
      <div className="main-center col-span-3 space-y-4">
        {user.id === postUser.id ? (
          <div className="bg-white border border-gray-200 rounded-lg">
            <FeedForm />
          </div>
        ) : null}
        {posts.map((post) => (
          <div
            className="p-4 bg-white border border-gray-200 rounded-lg"
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
