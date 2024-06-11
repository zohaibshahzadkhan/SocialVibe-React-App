import React from "react";
import { ToastProvider } from "./ToastContext";

const AppProviders = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default AppProviders;
