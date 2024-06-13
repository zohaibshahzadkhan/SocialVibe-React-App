import React, { useState, useEffect } from "react";
import FeedForm from "../components/FeedForm";
import FeedItem from "../components/FeedItem";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";
import { useFriendship } from "../context/FriendshipContext";
import { useToast } from "../context/ToastContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { postUser, getUserFeed } = usePosts();
  const { userId } = useParams();
  const { user } = useUser();
  const { sendFriendshipRequest, canSendFriendshipRequest } = useFriendship();
  const { showToast } = useToast();

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

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={postUser.avatar || "https://via.placeholder.com/50"}
          alt="Profile"
          className="w-16 h-16 rounded-full"
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
        <button
          className="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg"
          onClick={handleSendRequest}
          disabled={!canSendFriendshipRequest}
        >
          {canSendFriendshipRequest
            ? "Send friendship request"
            : "Request Sent"}
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useUser();
  const { posts, getUserFeed, postUser } = usePosts();
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
        <ProfileInfo user={user} />
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
            <FeedItem post={post} deletePost={deletePost} />
          </div>
        ))}
      </div>
      <div className="main-right col-span-1 space-y-4">
        <PeopleYouMayKnow />
        <Trends />
      </div>
    </div>
  );
};

export default Profile;
