import React from "react";

function SidebarItem({ chat, setActiveChatId, isActive }) {
  const handleClick = () => {
    setActiveChatId(chat.id);
  };

  const getLastMessageTime = () => {
    if (chat.lastMessage && chat.lastMessage.created) {
      const createdTime = new Date(chat.lastMessage.created);
      return createdTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
    
    return "";
  };

  return (
    <a
      href="#"
      className={`list-group-item list-group-item-action py-3 lh-sm ${
        isActive ? "active" : ""
      }`}
      aria-current="true"
      onClick={handleClick}
    >
      <div className="row align-items-center">
        <div className="col-2">
          <img
            src={chat.user.profilePic}
            className="img-fluid rounded-circle profileImage"
            alt="Your Image"
          />
        </div>
        <div className="col-9">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1 contactName">{chat.user.displayName}</div>
          </div>
          <div className="mb-1 small">
            {chat.lastMessage && chat.lastMessage.content ? (
              chat.lastMessage.content.length > 70 ? (
                chat.lastMessage.content.substring(0, 70) + "..."
              ) : (
                chat.lastMessage.content
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-1">
          <div className="row small">
            {getLastMessageTime()}
          </div>
          <span className="position-relative  badge rounded-pill unreadMessages small"></span>
        </div>
      </div>
    </a>
  );
}

export default SidebarItem;
