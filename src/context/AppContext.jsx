import React from "react";
import { ToastProvider } from "./ToastContext";
import { UserProvider } from "./UserContext";
import { PostsProvider } from "./PostsContext";
import { SearchProvider } from "./SearchContext";
import { FriendshipProvider } from "./FriendshipContext";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <PostsProvider>
        <SearchProvider>
          <FriendshipProvider>
            <ToastProvider>{children}</ToastProvider>
          </FriendshipProvider>
        </SearchProvider>
      </PostsProvider>
    </UserProvider>
  );
};

export default AppProviders;
