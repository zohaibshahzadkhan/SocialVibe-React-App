import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useToast } from './ToastContext';

const FriendshipContext = createContext();

export const useFriendship = () => useContext(FriendshipContext);

export function FriendshipProvider({ children }) {
  const { showToast } = useToast();
  const [canSendFriendshipRequest, setCanSendFriendshipRequest] =
    useState(true);
  const [friendshipRequests, setFriendshipRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  const sendFriendshipRequest = async userId => {
    try {
      const response = await axios.post(`/api/friends/${userId}/request/`);
      setCanSendFriendshipRequest(false);

      if (response.data.message === 'request already sent') {
        showToast(5000, 'The request has already been sent!', 'bg-red-500');
      } else {
        showToast(5000, 'The request was sent!', 'bg-emerald-500');
      }
    } catch (error) {
      console.error('Error sending friendship request:', error);
    }
  };

  const getFriends = async userId => {
    try {
      const response = await axios.get(`/api/friends/${userId}/`);
      setFriendshipRequests(response.data.requests);
      setCanSendFriendshipRequest(response.data.can_send_request);
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(`/api/friends/${userId}/${status}/`);
      if (status === 'accepted') {
        const updatedFriends = [...friends];
        const acceptedRequest = friendshipRequests.find(
          req => req.created_by.id === userId
        );
        updatedFriends.push(acceptedRequest.created_by);
        setFriends(updatedFriends);
      }
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  const memoizedValue = useMemo(
    () => ({
      canSendFriendshipRequest,
      sendFriendshipRequest,
      getFriends,
      friends,
      friendshipRequests,
      handleRequest,
    }),
    [
      canSendFriendshipRequest,
      sendFriendshipRequest,
      getFriends,
      friends,
      friendshipRequests,
      handleRequest,
    ]
  );

  return (
    <FriendshipContext.Provider value={memoizedValue}>
      {children}
    </FriendshipContext.Provider>
  );
}

FriendshipProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FriendshipProvider;
