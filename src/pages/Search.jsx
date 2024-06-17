import React from 'react';
import FeedItem from '../components/FeedItem';
import PeopleYouMayKnow from '../components/PeopleYouMayKnow';
import Trends from '../components/Trends';
import { useSearch } from '../context/SearchContext';

const Search = () => {
  const {
    query,
    setQuery,
    users,
    posts,
    submitForm,
    setUsers,
    setPosts
  } = useSearch();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue === '') {
      setUsers([]);
      setPosts([]);
    }
  };

  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };


  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="p-4 flex space-x-4">
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

        {query && (
          <>
            {users.length > 0 && (
              <div className="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 text-center bg-gray-100 rounded-lg"
                  >
                    <a href={`/profile/${user.id}`}>
                      <img
                        src={user.get_avatar}
                        alt="avatar"
                        className="mb-6 rounded-full"
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
            )}

            {posts.length > 0 && (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <FeedItem post={post} onDeletePost={deletePost}/>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
