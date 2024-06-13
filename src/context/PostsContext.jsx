import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
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

  const getUserFeed = async (userId) => {
    try {
      const response = await axios.get(`/api/posts/profile/${userId}`);
      setPosts(response.data);
    } catch (err) {
      console.error("error", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async (formData) => {
    try {
      const response = await axios.post("/api/posts/create", formData);

      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, loading, error, submitPost, getUserFeed, getFeed }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the Posts context
export const usePosts = () => {
  return useContext(PostsContext);
};
