import SidebarItem from "./SideBarItem";
//makes a list out of the contacts
function UserList({ socket, deleteContact, chats, token, setActiveChatId, activeChatId }) {
  
  
     
  const userList = chats.map((chat, key) => {
        const isActive = (chat.id === activeChatId); // check if this user is the active user
    return <SidebarItem socket={socket} deleteContact={deleteContact} chat={chat} key={key} token={token} activeChatId={activeChatId} setActiveChatId={setActiveChatId} isActive={isActive} />
    });
   
  return (
    <div>
       {userList}
  </div>
  );
}

export default UserList;
