import React from "react";
import { ToastProvider } from "./ToastContext";
import { UserProvider } from "./UserContext";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <ToastProvider>{children}</ToastProvider>
    </UserProvider>
  );
};

export default AppProviders;
