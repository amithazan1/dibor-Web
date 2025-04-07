import { useSocketContext } from "../../context/SocketContext";

export default function Chat({ id, displayName, profilePic }) {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(id);

  return (
    <div className="d-flex justify-content-start align-items-center">
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
      <div className="d-flex flex-column ">
        <div>{displayName}</div>
        <div>{isOnline ? " online" : "offline"}</div>
      </div>
    </div>
  );
}
