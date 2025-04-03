import React from "react";
import UserTop from "./UserTop";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSelectedChatContext } from "../../context/SelectedChatContext";

export default function MessageContainer() {
  const { selectedChat, setSelectedChat } = useSelectedChatContext();
  return !selectedChat ? (
    <p>No chat selected yet</p>
  ) : (
    <div className="d-flex flex-column h-100">
      <UserTop {...selectedChat} />
      <Messages />
      <MessageInput />
    </div>
  );
}
