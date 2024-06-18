import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ id: null, comments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postUser, setPostUser] = useState({});
  const [body, setBody] = useState('');

  const getPost = (postId) => {
    axios
      .get(`/api/posts/${postId}/`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const likePost = (id) => {
    axios
      .post(`/api/posts/${id}/like/`)
      .then((response) => {
        if (response.data.message === 'like created') {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id
                ? { ...post, likes_count: post.likes_count + 1 }
                : post
            )
          );
        }
      })
      .catch((error) => {
        console.log('Error liking post:', error);
      });
  };

  const incrementPostCount = () => {
    setPostUser((prevUser) => ({
      ...prevUser,
      posts_count: (prevUser.posts_count || 0) + 1,
    }));
  };

  const decrementPostCount = () => {
    setPostUser((prevUser) => ({
      ...prevUser,
      posts_count: Math.max((prevUser.posts_count || 0) - 1, 0),
    }));
  };

  const getFeed = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('error', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getUserFeed = async (userId) => {
    try {
      const response = await axios.get(`/api/posts/profile/${userId}`);
      setPosts(response.data.posts);
      setPostUser(response.data.user);
    } catch (err) {
      console.error('error', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async (formData) => {
    try {
      const response = await axios.post('/api/posts/create', formData);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      incrementPostCount();
    } catch (error) {
      console.error('error', error);
    }
  };

  const deletePost = (postId, onDeleteSuccess) => {
    axios
      .delete(`/api/posts/${postId}/delete`)
      .then(() => {
        decrementPostCount();
        onDeleteSuccess(postId, onDeleteSuccess);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const submitPostForm = (postId) => (e) => {
    e.preventDefault();
    axios
      .post(`/api/posts/${postId}/comment/`, { body })
      .then((response) => {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data],
          comments_count: prevPost.comments_count + 1,
        }));
        setBody('');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        submitPost,
        getUserFeed,
        getFeed,
        postUser,
        likePost,
        getPost,
        post,
        submitPostForm,
        setBody,
        body,
        deletePost,
        setPosts,
        incrementPostCount,
        decrementPostCount,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the Posts context
export const usePosts = () => {
  return useContext(PostsContext);
};
