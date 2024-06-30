import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedForm from '../components/FeedForm';
import FeedItem from '../components/FeedItem';
import { usePosts } from '../context/PostsContext';
import { useUser } from '../context/UserContext';
import ProfileInfo from '../components/ProfileInfo';
import '../styles/Profile.css';
import Loading from '../components/Loading';

function Profile() {
  const { user } = useUser();
  const { posts, getUserFeed, setPosts } = usePosts();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user.isAuthenticated && userId) {
      getUserFeed(userId)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [user.isAuthenticated, userId]);

  const deletePost = id => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  return (
    <div className="profile-page max-w-7xl mx-auto grid gap-4">
      <div className="profile-info">
        <ProfileInfo />
      </div>
      <div className="profile-posts">
        <div className="feed-form-container bg-white border border-gray-200 rounded-lg mb-4">
          <FeedForm />
        </div>
        {loading ? (
          <Loading />
        ) : (
          posts.map(post => (
            <div
              className="p-4 bg-white border border-gray-200 rounded-lg mb-4"
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

export default Profile;
