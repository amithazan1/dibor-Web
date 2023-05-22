
import blank_profile_picture from '../blank-profile-picture.svg';

//this is the contacts on the side of the chat
function SidebarItem({ name, lastMsg, lastMsgTime, numOflastMsgs, image ,setActiveUserName,isActive }) {
  

  const handleClick = () => {
    setActiveUserName(name);
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
            src={image}
            className="img-fluid rounded-circle profileImage"
            alt="Your Image"
          />
        </div>
        <div className="col-9">
          <div className="d-flex w-100 justify-content-between">
            <div className="mb-1 contactName">{name}</div>
          </div>
          <div className="mb-1 small">  {lastMsg.length > 70 ? lastMsg.substring(0, 70) + "..." : lastMsg}</div>
        </div>
        <div className="col-1">
          <div className="row small"> {lastMsgTime}</div>
          <span className="position-relative  badge rounded-pill unreadMessages small">
            {numOflastMsgs}
          </span>
        </div>
      </div>
    </a>
  );
}

export default SidebarItem;
