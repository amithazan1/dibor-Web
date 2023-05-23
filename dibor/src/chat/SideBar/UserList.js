import SidebarItem from "./SideBarItem";
//makes a list out of the contacts
function UserList({chats,token,setActiveChatId,activeChatId}) {
     
  const userList = chats.map((chat, key) => {
    console.log("Active id is " + activeChatId)
        const isActive = chat.id === activeChatId; // check if this user is the active user
    return <SidebarItem chat={chat} key={key} token={token} activeChatId={activeChatId} setActiveChatId={setActiveChatId} isActive={isActive} />
    });
   
  return (
    <div>
       {userList}
  </div>
  );
}

export default UserList;
