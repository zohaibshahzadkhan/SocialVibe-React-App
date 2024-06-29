import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
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

  const memoizedValue = useMemo(
    () => ({
      query,
      setQuery,
      users,
      posts,
      submitForm,
      setUsers,
      setPosts,
    }),
    [query, setQuery, users, posts]
  );

  return (
    <SearchContext.Provider value={memoizedValue}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
