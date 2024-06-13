import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const FriendshipContext = createContext();

export const useFriendship = () => useContext(FriendshipContext);

export const FriendshipProvider = ({ children }) => {
  const [canSendFriendshipRequest, setCanSendFriendshipRequest] =
    useState(true);
  const [friendshipRequests, setFriendshipRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});

  const sendFriendshipRequest = async (userId, toastStore) => {
    try {
      const response = await axios.post(`/api/friends/${userId}/request/`);
      setCanSendFriendshipRequest(false);

      if (response.data.message === "request already sent") {
        toastStore.showToast(
          5000,
          "The request has already been sent!",
          "bg-red-300"
        );
      } else {
        toastStore.showToast(5000, "The request was sent!", "bg-emerald-300");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getFriends = async (userId) => {
    try {
      const response = await axios.get(`/api/friends/${userId}/`);
      setFriendshipRequests(response.data.requests);
      setFriends(response.data.friends);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(`/api/friends/${userId}/${status}/`);
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <FriendshipContext.Provider
      value={{
        canSendFriendshipRequest,
        sendFriendshipRequest,
        getFriends,
        friends,
        friendshipRequests,
        handleRequest,
      }}
    >
      {children}
    </FriendshipContext.Provider>
  );
};
