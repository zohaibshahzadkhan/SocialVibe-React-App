import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFriendship } from "../context/FriendshipContext";
import { useUser } from "../context/UserContext";
import { usePosts } from "../context/PostsContext";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow";
import Trends from "../components/Trends";

const Friends = () => {
  const { user } = useUser();
  const { postUser} = usePosts()
  const {
    friends,
    friendshipRequests,
    handleRequest,
    getFriends,
  } = useFriendship();

  useEffect(() => {
    if (user.isAuthenticated) {
      getFriends(user.id);
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-1">
        <div className="p-4 bg-white border border-gray-200 text-center rounded-lg">
          <img
            src={user.get_avatar || "https://via.placeholder.com/50"}
            className="mb-6 rounded-full"
            alt="User Avatar"
          />
          <p>
            <strong>{user.name}</strong>
          </p>
          <div className="mt-6 flex space-x-8 justify-around">
            <p className="text-xs text-gray-500">
              {postUser.friends_count} friends
            </p>
            <p className="text-xs text-gray-500">{postUser.posts_count} posts</p>
          </div>
        </div>
      </div>

      <div className="main-center col-span-2 space-y-4">
        {friendshipRequests.length > 0 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h2 className="mb-6 text-xl">Friendship requests</h2>
            {friendshipRequests.map((friendshipRequest) => (
              <div
                className="p-4 text-center bg-gray-100 rounded-lg"
                key={friendshipRequest.id}
              >
                <img
                  src={friendshipRequest.created_by.get_avatar}
                  className="mb-6 mx-auto rounded-full"
                  alt="Requestor Avatar"
                />
                <p>
                  <strong>
                    <Link to={`/profile/${friendshipRequest.created_by.id}`}>
                      {friendshipRequest.created_by.name}
                    </Link>
                  </strong>
                </p>
                <div className="mt-6 flex space-x-8 justify-around">
                  <p className="text-xs text-gray-500">
                    {friendshipRequest.created_by.friends_count} friends
                  </p>
                  <p className="text-xs text-gray-500">
                    {friendshipRequest.created_by.posts_count} posts
                  </p>
                </div>
                <div className="mt-6 space-x-4">
                  <button
                    className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
                    onClick={() =>
                      handleRequest("accepted", friendshipRequest.created_by.id)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="inline-block py-4 px-6 bg-red-600 text-white rounded-lg"
                    onClick={() =>
                      handleRequest("rejected", friendshipRequest.created_by.id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            <hr />
          </div>
        )}

        {friends.length > 0 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4">
            {friends.map((user) => (
              <div
                className="p-4 text-center bg-gray-100 rounded-lg"
                key={user.id}
              >
                <img
                  src={user.get_avatar}
                  className="mb-6 rounded-full"
                  alt="Friend Avatar"
                />
                <p>
                  <strong>
                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                  </strong>
                </p>
                <div className="mt-6 flex space-x-8 justify-around">
                  <p className="text-xs text-gray-500">
                    {user.friends_count} friends
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.posts_count} posts
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="main-right col-span-1 space-y-4">
        <PeopleYouMayKnow />
        <Trends />
      </div>
    </div>
  );
};

export default Friends;
