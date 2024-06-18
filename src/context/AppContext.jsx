import React from 'react';
import { ToastProvider } from './ToastContext';
import { UserProvider } from './UserContext';
import { PostsProvider } from './PostsContext';
import { SearchProvider } from './SearchContext';
import { FriendshipProvider } from './FriendshipContext';

const AppProviders = ({ children }) => {
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
};

export default AppProviders;
