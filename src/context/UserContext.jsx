import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { useToast } from "./ToastContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState({
    isAuthenticated: false,
    id: null,
    name: null,
    email: null,
    access: null,
    refresh: null,
    avatar: null,
  });
  const [errors, setErrors] = useState([]);

  const initStoreCalled = useRef(false);

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

  const signup = (form) => {
    const newErrors = [];

    if (!form.name) newErrors.push("Name is required");
    if (!form.email) newErrors.push("Email is required");
    if (!form.password1) newErrors.push("Password is required");
    if (form.password1 !== form.password2)
      newErrors.push("Passwords must match");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      axios
        .post("/api/signup/", form)
        .then((response) => {
          if (response.data.message === "success") {
            showToast(
              5000,
              "The user is registered. Please log in",
              "bg-emerald-500"
            );
          } else {
            const data = JSON.parse(response.data.message);
            for (const key in data) {
              setErrors((prevErrors) => [...prevErrors, data[key][0].message]);
            }
            showToast(
              5000,
              "Something went wrong. Please try again",
              "bg-red-500"
            );
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const login = async (form) => {
    const newErrors = [];
    if (!form.email) newErrors.push("Email is required");
    if (!form.password) newErrors.push("Password is required");

    setErrors(newErrors);
    if (newErrors.length === 0) {
      try {
        const response = await axios.post("/api/login/", form);
        setToken(response.data);

        const userResponse = await axios.get("/api/me/", {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        });
        setUserInfo(userResponse.data);
        return { success: true };
      } catch (error) {
        console.error("error", error);
        setErrors([
          "The email or password is incorrect! Or the user is not activated!",
        ]);
        return { success: false };
      }
    } else {
      return { success: false };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setToken,
        removeToken,
        setUserInfo,
        initStore,
        errors,
        login,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};