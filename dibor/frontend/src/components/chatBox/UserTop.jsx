import React from "react";

import styles from "./chatBox.module.css";

export default function UserTop({ id, displayName, profilePic }) {
  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center border-bottom border-start">
        <div>
          <img
            src={profilePic}
            className={` rounded-circle ${styles["top-bar-user-image"]}`}
          />
          {displayName}
        </div>
      </div>
    </>
  );
}
