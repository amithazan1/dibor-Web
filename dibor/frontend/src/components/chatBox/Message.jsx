import React from "react";
import styles from "./chatBox.module.css";

export default function Message({ message, time, isSender }) {
  return (
    <div
      className={`d-flex m-1 p-2 ${
        isSender ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`rounded ${styles["chat-bubble"]} ${
          isSender ? styles.sender : styles.receiver
        }`}
      >
        <div className="m-2">{message}</div>
        <div className="text-muted small text-end me-1">{time}</div>
      </div>
    </div>
  );
}
