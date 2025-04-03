import React, { useEffect } from "react";

import styles from "./chatBox.module.css";

import Message from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useSelectedChatContext } from "../../context/SelectedChatContext";
import { useAuthContext } from "../../context/AuthContext";

export default function Messages() {
  const { loading, getMessages } = useGetMessages();
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
      {loading && <p>Loading messages...</p>}

      {messages.length === 0 && !loading && (
        <p>Send a message to start the conversation</p>
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
