import React, { useEffect, useState } from 'react';
import FeedForm from '../components/FeedForm';
import FeedItem from '../components/FeedItem';
import { usePosts } from '../context/PostsContext';
import { useUser } from '../context/UserContext';
import Loading from '../components/Loading';

function Feed() {
  const { posts, getFeed, setPosts } = usePosts();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user.isAuthenticated) {
      getFeed()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [user.isAuthenticated]);

  const deletePost = id => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
      <div className="main-center col-span-4 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <FeedForm />
        </div>
        {loading ? (
          <Loading />
        ) : (
          posts.map(post => (
            <div
              className="p-4 bg-white border border-gray-200 rounded-lg"
              key={post.id}
            >
              <FeedItem post={post} onDeletePost={deletePost} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
