import React from "react";
import { IoSend } from "react-icons/io5";

import styles from "./chatBox.module.css";

export default function MessageInput() {
  return (
    <div className="d-flex p-2 border-top">
      <input
        type="text"
        className="form-control me-2 "
        placeholder="Type a message..."
      />
      <button
        className={`btn btn btn-success rounded-circle border ${styles["send-btn"]}`}
      >
        <IoSend />
      </button>
    </div>
  );
}
