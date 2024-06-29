import React from 'react';
import PropTypes from 'prop-types';
import { ToastProvider } from './ToastContext';
import { UserProvider } from './UserContext';
import { PostsProvider } from './PostsContext';
import { SearchProvider } from './SearchContext';
import { FriendshipProvider } from './FriendshipContext';

function AppProviders({ children }) {
  return (
    <ToastProvider>
      <UserProvider>
        <PostsProvider>
          <SearchProvider>
            <FriendshipProvider>{children}</FriendshipProvider>
          </SearchProvider>
        </PostsProvider>
      </UserProvider>
    </ToastProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
