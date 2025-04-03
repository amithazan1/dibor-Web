import { useState } from "react";

export default function Chat({ id, displayName, profilePic }) {
  return (
    <>
      <img
        src={profilePic}
        alt="User Profile"
        className="rounded-circle border ms-2 me-2"
        style={{
          width: "50px",
          height: "50px",
          maxHeight: "50px",
          maxWidth: "50px",
          objectFit: "fill",
        }}
      />
      {displayName}
    </>
  );
}
