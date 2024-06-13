import React, { useState } from "react";
import FeedForm from "../components/FeedForm";
import FeedItem from "../components/FeedItem";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";
import { usePosts } from "../context/PostsContext";

const ProfileInfo = ({ user }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
    <div className="flex flex-col items-center space-y-4">
      <img
        src={user.avatar || "https://via.placeholder.com/50"}
        alt="Profile"
        className="w-16 h-16 rounded-full"
      />
      <div>
        <p className="font-bold">{user.name || "User Name"}</p>
        <p className="text-gray-500">{user.email || "user@example.com"}</p>
      </div>
    </div>
    <div className="mt-4 flex justify-around">
      <div>
        <p className="font-bold">Friends</p>
        <p>{user.friendsCount || 0}</p>
      </div>
      <div>
        <p className="font-bold">Posts</p>
        <p>{user.postsCount || 0}</p>
      </div>
    </div>
  </div>
);

const Feed = () => {
  const { posts, loading, error } = usePosts();
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     created_by: {
  //       id: 1,
  //       name: "John Doe",
  //       get_avatar:
  //         "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
  //     },
  //     created_at_formatted: "2 hours",
  //     body: "This is a sample post body.",
  //     attachments: [
  //       {
  //         id: 1,
  //         get_image:
  //           "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
  //       },
  //     ],
  //     likes_count: 10,
  //     comments_count: 5,
  //     is_private: false,
  //   },

  //   {
  //     id: 2,
  //     created_by: {
  //       id: 2,
  //       name: "John Doe",
  //       get_avatar:
  //         "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
  //     },
  //     created_at_formatted: "2 hours",
  //     body: "This is a sample post body.",
  //     attachments: [],
  //     likes_count: 10,
  //     comments_count: 5,
  //     is_private: false,
  //   },
  // ]);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
    friendsCount: 23,
    postsCount: 34,
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
      <div className="main-left col-span-1 space-y-4">
        <ProfileInfo user={user} />
      </div>
      <div className="main-center col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <FeedForm />
        </div>
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

export default Feed;
