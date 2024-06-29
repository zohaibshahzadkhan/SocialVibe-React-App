import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const submitForm = async () => {
    try {
      if (!query) {
        setUsers([]);
        setPosts([]);
      } else {
        const response = await axios.post('/api/search', { query });
        setUsers(response.data.users);
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        users,
        posts,
        submitForm,
        setUsers,
        setPosts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
