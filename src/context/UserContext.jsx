import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
    access: null,
    refresh: null,
    avatar: null,
  });

  useEffect(() => {
    initStore();
  }, []);

  const initStore = () => {
    if (localStorage.getItem("user.access")) {
      console.log("User has access!");

      setUser({
        access: localStorage.getItem("user.access"),
        refresh: localStorage.getItem("user.refresh"),
        id: localStorage.getItem("user.id"),
        name: localStorage.getItem("user.name"),
        email: localStorage.getItem("user.email"),
        avatar: localStorage.getItem("user.avatar"),
        isAuthenticated: true,
      });
      refreshToken();
    }
  };

  const setToken = (data) => {
    setUser((prevUser) => ({
      ...prevUser,
      access: data.access,
      refresh: data.refresh,
      isAuthenticated: true,
    }));

    localStorage.setItem("user.access", data.access);
    localStorage.setItem("user.refresh", data.refresh);
  };

  const removeToken = () => {
    console.log("removeToken");

    setUser({
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      access: null,
      refresh: null,
      avatar: null,
    });

    localStorage.removeItem("user.access");
    localStorage.removeItem("user.refresh");
    localStorage.removeItem("user.id");
    localStorage.removeItem("user.name");
    localStorage.removeItem("user.email");
    localStorage.removeItem("user.avatar");
  };

  const setUserInfo = (userInfo) => {
    setUser((prevUser) => ({
      ...prevUser,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar,
    }));

    localStorage.setItem("user.id", userInfo.id);
    localStorage.setItem("user.name", userInfo.name);
    localStorage.setItem("user.email", userInfo.email);
    localStorage.setItem("user.avatar", userInfo.avatar);
  };

  const refreshToken = () => {
    axios
      .post("/api/refresh/", {
        refresh: user.refresh,
      })
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          access: response.data.access,
        }));

        localStorage.setItem("user.access", response.data.access);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.access;
      })
      .catch((error) => {
        removeToken();
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setToken,
        removeToken,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User context
export const useUser = () => {
  return useContext(UserContext);
};
