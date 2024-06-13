import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { user } = useUser();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeed = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("error", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      getFeed();
    }
  }, [user.isAuthenticated]);

  return (
    <PostsContext.Provider value={{ posts, loading, error }}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the Posts context
export const usePosts = () => {
  return useContext(PostsContext);
};
