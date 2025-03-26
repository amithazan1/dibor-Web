import React from "react";

import styles from "./chatBox.module.css";

import Message from "./Message";

export default function Messages() {
  return (
    <>
      <div
        className={`d-flex flex-column border-start h-100 w-100 overflow-y-auto ${styles["chat-background"]}`}
      >
        <Message message={"hii"} isSender={true} time={"12:49"} />
        <Message message={"hii"} isSender={false} time={"12:49"} />
        <Message
          message={
            "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
          }
          isSender={true}
          time={"12:49"}
        />
        <Message message={"hii"} isSender={false} time={"12:49"} />
      </div>
    </>
  );
}
