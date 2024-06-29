import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFriendship } from '../context/FriendshipContext';
import { usePosts } from '../context/PostsContext';
import { useToast } from '../context/ToastContext';
import useLoading from '../hooks/useLoading';

function Friends() {
  const { postUser, getUserFeed } = usePosts();
  const { userId: paramUserId } = useParams();
  const { friends, friendshipRequests, handleRequest, getFriends } =
    useFriendship();
  const { showToast } = useToast();

  const [requests, setRequests] = useState([]);

  const { loading: loadingFriends, handleLoading: handleGetFriends } =
    useLoading(getFriends);
  const { loading: loadingFeed, handleLoading: handleGetUserFeed } =
    useLoading(getUserFeed);

  useEffect(() => {
    const loadData = async () => {
      await handleGetFriends(paramUserId);
      await handleGetUserFeed(paramUserId);
    };
    loadData();
  }, [paramUserId]);

  useEffect(() => {
    setRequests(friendshipRequests);
  }, [friendshipRequests]);

  const incrementFriendCount = () => {
    postUser.friends_count += 1;
  };

  const removeRequest = userId => {
    const updatedRequests = requests.filter(
      request => request.created_by.id !== userId
    );
    setRequests(updatedRequests);
  };

  const handleAcceptRequest = async userId => {
    try {
      await handleRequest('accepted', userId);
      incrementFriendCount();
      removeRequest(userId);
      showToast(5000, 'Friend request accepted!', 'bg-emerald-500');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async userId => {
    try {
      await handleRequest('rejected', userId);
      removeRequest(userId);
      showToast(5000, 'Friend request rejected!', 'bg-red-500');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (loadingFriends || loadingFeed) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-2">
        <div className="p-4 bg-white border border-gray-200 text-center rounded-lg shadow-md">
          <img
            src={postUser.get_avatar || 'https://via.placeholder.com/50'}
            className="w-24 h-24 rounded-full mx-auto mb-4"
            alt="User Avatar"
          />
          <p className="text-xl font-semibold text-gray-800">{postUser.name}</p>
          <div className="mt-2 flex justify-center">
            <div className="text-gray-500 mr-4">
              <p className="text-sm font-medium">{postUser.friends_count}</p>
              <p className="text-xs">Friends</p>
            </div>
            <div className="text-gray-500">
              <p className="text-sm font-medium">{postUser.posts_count}</p>
              <p className="text-xs">Posts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 space-y-4">
        {requests.length > 0 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Friendship requests
            </h2>
            {requests.map(friendshipRequest => (
              <div
                key={friendshipRequest.id}
                className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm mb-4"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={friendshipRequest.created_by.get_avatar}
                    className="w-16 h-16 rounded-full"
                    alt="Requestor Avatar"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      <Link to={`/profile/${friendshipRequest.created_by.id}`}>
                        {friendshipRequest.created_by.name}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500">
                      {friendshipRequest.created_by.friends_count} friends •{' '}
                      {friendshipRequest.created_by.posts_count} posts
                    </p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
                    onClick={() =>
                      handleAcceptRequest(friendshipRequest.created_by.id)
                    }
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                    onClick={() =>
                      handleRejectRequest(friendshipRequest.created_by.id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {friends.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {friends.map(friend => (
              <div
                key={friend.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={friend.get_avatar}
                    className="w-16 h-16 rounded-full"
                    alt="Friend Avatar"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      <Link to={`/profile/${friend.id}`}>{friend.name}</Link>
                    </p>
                    <p className="text-sm text-gray-500">
                      {friend.friends_count} friends • {friend.posts_count}{' '}
                      posts
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
