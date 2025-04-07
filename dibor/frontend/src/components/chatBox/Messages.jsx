import React, { useEffect } from "react";

import styles from "./chatBox.module.css";

import Message from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useSelectedChatContext } from "../../context/SelectedChatContext";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";

export default function Messages() {
  const { loading, getMessages } = useGetMessages();
  useListenMessages();
  const { messages, selectedChat } = useSelectedChatContext();
  const { authUser } = useAuthContext();

  console.log(messages);

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
  }, [selectedChat]);

  return (
    <div
      className={`d-flex flex-column border-start h-100 w-100 overflow-y-auto ${styles["chat-background"]}`}
    >
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {messages.length === 0 && !loading && (
        <div className="d-flex justify-content-center">
          Send a message to start the conversation
        </div>
      )}

      {messages.map((message) => (
        <Message
          key={message._id}
          message={message.content}
          isSender={message.senderId == authUser.id}
          timestamp={message.createdAt}
        />
      ))}
    </div>
  );
}
