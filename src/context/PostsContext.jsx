import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ id: null, comments: [] });
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [postUser, setPostUser] = useState({});
  const [body, setBody] = useState('');

  const getPost = postId => {
    axios
      .get(`/api/posts/${postId}/`)
      .then(response => {
        setPost(response.data.post);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  };

  const likePost = id => {
    axios
      .post(`/api/posts/${id}/like/`)
      .then(response => {
        if (response.data.message === 'like created') {
          setPosts(prevPosts =>
            prevPosts.map(p =>
              p.id === id ? { ...p, likes_count: p.likes_count + 1 } : p
            )
          );
        }
      })
      .catch(error => {
        console.error('Error liking post:', error);
      });
  };

  const incrementPostCount = () => {
    setPostUser(prevUser => ({
      ...prevUser,
      posts_count: (prevUser.posts_count || 0) + 1,
    }));
  };

  const decrementPostCount = () => {
    setPostUser(prevUser => ({
      ...prevUser,
      posts_count: Math.max((prevUser.posts_count || 0) - 1, 0),
    }));
  };

  const getFeed = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching feed:', err);
      setErrorState(err);
    } finally {
      setLoading(false);
    }
  };

  const getUserFeed = async userId => {
    try {
      const response = await axios.get(`/api/posts/profile/${userId}`);
      setPosts(response.data.posts);
      setPostUser(response.data.user);
    } catch (err) {
      console.error('Error fetching user feed:', err);
      setErrorState(err);
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async formData => {
    try {
      const response = await axios.post('/api/posts/create', formData);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      incrementPostCount();
    } catch (err) {
      console.error('Error submitting post:', err);
      setErrorState(err);
    }
  };

  const deletePost = (postId, onDeleteSuccess) => {
    axios
      .delete(`/api/posts/${postId}/delete`)
      .then(() => {
        decrementPostCount();
        onDeleteSuccess(postId);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  const submitPostForm = postId => {
    axios
      .post(`/api/posts/${postId}/comment/`, { body })
      .then(response => {
        setPost(prevPost => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data],
          comments_count: prevPost.comments_count + 1,
        }));
        setBody('');
      })
      .catch(error => {
        console.error('Error submitting post form:', error);
      });
  };

  const memoizedValue = useMemo(
    () => ({
      posts,
      loading,
      error: errorState,
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
    }),
    [
      posts,
      loading,
      errorState,
      submitPost,
      getUserFeed,
      getFeed,
      postUser,
      likePost,
      getPost,
      post,
      submitPostForm,
      body,
      deletePost,
      incrementPostCount,
      decrementPostCount,
    ]
  );

  return (
    <PostsContext.Provider value={memoizedValue}>
      {children}
    </PostsContext.Provider>
  );
}

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostsProvider;
