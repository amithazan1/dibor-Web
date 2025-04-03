import React, { useRef } from "react";
import { IoSend } from "react-icons/io5";

import styles from "./chatBox.module.css";
import { useSendMessage } from "../../hooks/useSendMessage";

export default function MessageInput() {
  const { loading, sendMessage } = useSendMessage();
  const messageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value.trim();
    if (!message) return;

    await sendMessage(message);
    messageRef.current.value = ""; // Clear input on submit
  };

  return (
    <div className="d-flex p-2 border-top">
      <input
        ref={messageRef}
        type="text"
        className="form-control me-2"
        placeholder="Type a message..."
      />
      <button
        className={`btn btn-success rounded-circle border ${styles["send-btn"]}`}
        disabled={loading}
        onClick={handleSubmit}
      >
        <IoSend />
      </button>
    </div>
  );
}
