import React, { useEffect, useRef } from "react";

import styles from "./chatBox.module.css";

import Message from "./Message";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useSelectedChatContext } from "../../context/SelectedChatContext";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";

export default function Messages() {
  const { loading, getMessages } = useGetMessages();
  useListenMessages();
  const { messages, selectedChat } = useSelectedChatContext();
  const { authUser } = useAuthContext();
  // display the messages grouped by date
  const groupedMessages = groupMessagesByDate(messages);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

      {Object.keys(groupedMessages).map((dateKey) => (
        <div key={dateKey}>
          <div className="text-center text-muted my-2">{dateKey}</div>
          {groupedMessages[dateKey].map((message) => (
            <Message
              key={message._id}
              message={message.content}
              isSender={message.senderId == authUser.id}
              timestamp={message.createdAt}
            />
          ))}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
