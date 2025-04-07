import React, { useState } from "react";

import Chat from "./Chat";

import styles from "./chatSideBar.module.css";
import { useSelectedChatContext } from "../../context/SelectedChatContext";

export default function ChatList({ loading, chats }) {
  const { selectedChat, setSelectedChat } = useSelectedChatContext();

  if (loading)
    return (
      <div className="d-flex justify-content-center align-itmes-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (!chats.length) return <p>No chats available</p>;

  return (
    <ul className="list-group list-group-flush h-100 w-100 overflow-y-auto">
      {chats?.map((userInfo) => (
        <li
          key={userInfo._id}
          className={`list-group-item p-2 ${styles["chat-container"]} 
                ${
                  selectedChat?._id === userInfo._id
                    ? styles["selected-chat"]
                    : ""
                }`}
          onClick={() => setSelectedChat(userInfo)}
        >
          <Chat
            id={userInfo._id}
            displayName={userInfo.displayName}
            profilePic={userInfo.profilePic}
          />
        </li>
      ))}
    </ul>
  );
}
