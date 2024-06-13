import React from "react";
import { ToastProvider } from "./ToastContext";
import { UserProvider } from "./UserContext";
import { PostsProvider } from "./PostsContext";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <PostsProvider>
        <ToastProvider>{children}</ToastProvider>
      </PostsProvider>
    </UserProvider>
  );
};

export default AppProviders;
