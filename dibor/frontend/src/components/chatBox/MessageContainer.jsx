import React from "react";
import UserTop from "./UserTop";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

export default function MessageContainer() {
  return (
    <div className="d-flex flex-column h-100">
      <UserTop />
      <Messages />
      <MessageInput />
    </div>
  );
}
