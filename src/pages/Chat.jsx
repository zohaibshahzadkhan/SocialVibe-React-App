import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState({});
  const [body, setBody] = useState("");

  useEffect(() => {
    getConversations();
  }, []);

  const avatarUrl =
    "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1718112683~exp=1718116283~hmac=f4c0d0d3d51bbbb6f09968f606e51c5c12064661816ea6c9f8ae374ea8697d9e&w=826";

  const dummyConversations = [
    {
      id: 1,
      users: [
        { id: 1, name: "User One", get_avatar: avatarUrl },
        { id: 2, name: "User Two", get_avatar: avatarUrl },
      ],
      modified_at_formatted: "2 hours",
      messages: [
        {
          id: 1,
          body: "Hello!",
          created_by: { id: 1, get_avatar: avatarUrl },
          created_at_formatted: "1 hour",
        },
        {
          id: 2,
          body: "Hi there!",
          created_by: { id: 2, get_avatar: avatarUrl },
          created_at_formatted: "45 minutes",
        },
      ],
    },
    {
      id: 2,
      users: [
        { id: 1, name: "User One", get_avatar: avatarUrl },
        { id: 3, name: "User Three", get_avatar: avatarUrl },
      ],
      modified_at_formatted: "3 hours",
      messages: [
        {
          id: 3,
          body: "How are you?",
          created_by: { id: 1, get_avatar: avatarUrl },
          created_at_formatted: "2 hours",
        },
        {
          id: 4,
          body: "Good, thanks!",
          created_by: { id: 3, get_avatar: avatarUrl },
          created_at_formatted: "1.5 hours",
        },
      ],
    },
  ];

  const getConversations = () => {
    setConversations(dummyConversations);
    if (dummyConversations.length) {
      setActiveConversation(dummyConversations[0]);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newMessage = {
      id: Date.now(),
      body,
      created_by: { id: 1, get_avatar: avatarUrl },
      created_at_formatted: "just now",
    };
    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setBody("");
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-left col-span-1">
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center justify-between cursor-pointer ${
                  activeConversation.id === conversation.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-center space-x-2">
                  {conversation.users.map(
                    (user) =>
                      user.id !== 1 && ( // Filter out the current user
                        <React.Fragment key={user.id}>
                          <img
                            src={user.get_avatar}
                            alt="avatar"
                            className="w-[40px] rounded-full"
                          />
                          <p className="text-xs font-bold">{user.name}</p>
                        </React.Fragment>
                      )
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {conversation.modified_at_formatted} ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-center col-span-3 space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex flex-col flex-grow p-4">
            {activeConversation.messages &&
              activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full mt-2 space-x-3 max-w-md ${
                    message.created_by.id === 1 ? "ml-auto justify-end" : ""
                  }`}
                >
                  {message.created_by.id !== 1 && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                      <img
                        src={message.created_by.get_avatar}
                        alt="avatar"
                        className="w-[40px] rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <div
                      className={`${
                        message.created_by.id === 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300"
                      } p-3 rounded-l-lg rounded-br-lg`}
                    >
                      <p className="text-sm">{message.body}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {message.created_at_formatted} ago
                    </span>
                  </div>
                  {message.created_by.id === 1 && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                      <img
                        src={message.created_by.get_avatar}
                        alt="avatar"
                        className="w-[40px] rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <form onSubmit={submitForm}>
            <div className="p-4">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="p-4 w-full bg-gray-100 rounded-lg"
                placeholder="What do you want to say?"
              />
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between">
              <button
                type="submit"
                className="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
