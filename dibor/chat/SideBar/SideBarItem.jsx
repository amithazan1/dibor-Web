import React from "react";

function SidebarItem({ socket,deleteContact,chat, setActiveChatId, isActive }) {
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

   const deleteId = () => {
     deleteContact(chat.id)
     socket.emit("deleteUserChat", { username:chat.user.username , chatId: chat.id })

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
            src={chat.user?.profilePic}
            className="img-fluid rounded-circle profileImage"
            alt="Your Image"
          />
        </div>
        <div className="col-9">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1 contactName">{chat.user?.displayName}</div>
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
      {isActive && (<button type="button" onClick={deleteId} className="btn btn-outline-secondary deleteButton">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
</svg>
                  <span className="visually-hidden">Button</span>
                </button>
        )}
       </a>
  );
}

export default SidebarItem;
