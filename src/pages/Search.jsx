import React, { useState } from 'react';
import FeedItem from '../components/FeedItem';
import { useSearch } from '../context/SearchContext';
import useLoading from '../hooks/useLoading'; // Import the custom hook
import '../styles/Search.css';

const Search = () => {
  const { query, setQuery, users, posts, submitForm, setUsers, setPosts } =
    useSearch();
  const [searched, setSearched] = useState(false); // State to track if search button has been clicked
  const { loading, handleLoading } = useLoading(submitForm); // Use the custom hook

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue === '') {
      setUsers([]);
      setPosts([]);
    }
    setSearched(false); // Reset searched state when input changes
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearched(true); // Set searched state to true when search button is clicked
    handleLoading(); // Trigger loading action with custom hook
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-4 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={handleSearchSubmit} className="p-4 flex space-x-4">
            <input
              type="search"
              value={query}
              onChange={handleInputChange}
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

        {searched && !loading && ( // Display results only when search is completed and not loading
          <>
            {users.length > 0 ? (
              <div className="p-4 bg-white border border-gray-200 rounded-lg users-grid">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 text-center bg-gray-100 rounded-lg"
                  >
                    <a href={`/profile/${user.id}`}>
                      <img
                        src={user.get_avatar}
                        alt="avatar"
                        className="user-avatar mb-6 mx-auto"
                      />
                      <p>
                        <strong>{user.name}</strong>
                      </p>
                    </a>
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
            ) : (
              <p className="text-center text-gray-500 mt-4">
                No users found
              </p>
            )}

            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <FeedItem post={post} onDeletePost={deletePost} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                No posts found
              </p>
            )}
          </>
        )}

        {loading && searched && ( // Display loading message only after search is clicked
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Search;
