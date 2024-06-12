import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";

const UserContext = createContext();

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

  const initStoreCalled = useRef(false); // To track if initStore has been called

  useEffect(() => {
    if (!initStoreCalled.current) {
      initStore();
      initStoreCalled.current = true;
    }
  }, []);

  const initStore = () => {
    const access = localStorage.getItem("user.access");
    const refresh = localStorage.getItem("user.refresh");
    const id = localStorage.getItem("user.id");
    const name = localStorage.getItem("user.name");
    const email = localStorage.getItem("user.email");
    const avatar = localStorage.getItem("user.avatar");

    if (access && refresh) {
      setUser({
        access,
        refresh,
        id,
        name,
        email,
        avatar,
        isAuthenticated: true,
      });
      refreshToken(refresh);
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

  const refreshToken = (refresh) => {
    axios
      .post("/api/refresh/", { refresh })
      .then((response) => {
        const newAccessToken = response.data.access;
        setUser((prevUser) => ({
          ...prevUser,
          access: newAccessToken,
        }));

        localStorage.setItem("user.access", newAccessToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
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
        initStore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
