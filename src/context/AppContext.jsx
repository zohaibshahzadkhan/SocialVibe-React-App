import React from "react";
import { ToastProvider } from "./ToastContext";
import { UserProvider } from "./UserContext";
import { PostsProvider } from "./PostsContext";
import { SearchProvider } from "./SearchContext";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <PostsProvider>
        <SearchProvider>
        <ToastProvider>{children}</ToastProvider>
        </SearchProvider>
      </PostsProvider>
    </UserProvider>
  );
};

export default AppProviders;
