import React from "react";

import styles from "./chatBox.module.css";

export default function UserTop() {
  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center border-bottom border-start">
        <div>
          <img
            src="/profilePic-default.png"
            className={styles["top-bar-user-image"]}
          />
          User name
        </div>
      </div>
    </>
  );
}
