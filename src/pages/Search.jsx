import React, { useState } from "react";
import FeedItem from "../components/FeedItem";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";

const Search = () => {
  const avatarUrl =
    "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826";

  const dummyUsers = [
    {
      id: 1,
      name: "User One",
      get_avatar: avatarUrl,
      friends_count: 10,
      posts_count: 5,
    },
    {
      id: 2,
      name: "User Two",
      get_avatar: avatarUrl,
      friends_count: 15,
      posts_count: 8,
    },
    {
      id: 3,
      name: "User Three",
      get_avatar: avatarUrl,
      friends_count: 20,
      posts_count: 12,
    },
  ];

  const dummyPosts = [
    {
      id: 1,
      created_by: {
        id: 1,
        name: "John Doe",
        get_avatar:
          "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
      },
      created_at_formatted: "2 hours",
      body: "This is a sample post body.",
      attachments: [
        {
          id: 1,
          get_image:
            "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826",
        },
      ],
      likes_count: 10,
      comments_count: 5,
      is_private: false,
    },
  ];

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(dummyUsers);
  const [posts, setPosts] = useState(dummyPosts);

  const submitForm = (e) => {
    e.preventDefault();
    // Filter users and posts based on the query if needed
    // Example:
    // const filteredUsers = dummyUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    // const filteredPosts = dummyPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    // setUsers(filteredUsers);
    // setPosts(filteredPosts);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={submitForm} className="p-4 flex space-x-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What are you looking for?"
            />
            <button
              type="submit"
              className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </button>
          </form>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 text-center bg-gray-100 rounded-lg"
            >
              <img
                src={user.get_avatar}
                alt="avatar"
                className="mb-6 rounded-full"
              />
              <p>
                <strong>{user.name}</strong>
              </p>
              <div className="mt-6 flex space-x-8 justify-around">
                <p className="text-xs text-gray-500">
                  {user.friends_count} friends
                </p>
                <p className="text-xs text-gray-500">
                  {user.posts_count} posts
                </p>
              </div>
            </div>
          ))}
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white border border-gray-200 rounded-lg"
          >
            <FeedItem post={post} />
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

export default Search;
