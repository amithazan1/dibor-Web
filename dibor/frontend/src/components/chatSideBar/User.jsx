import React from "react";

export default function User() {
  return (
    <div style={{ cursor: "pointer" }}>
      <img
        src="/profilePic-default.png"
        alt="Profile"
        className="rounded-circle border me-3 "
        style={{
          width: "30%",
          height: "30%",
          maxHeight: "50px",
          maxWidth: "50px",
        }}
      />
      {"display name"}
    </div>
  );
}
