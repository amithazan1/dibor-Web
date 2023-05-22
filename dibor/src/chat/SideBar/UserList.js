import SidebarItem from "./SideBarItem";
//makes a list out of the contacts
function UserList({users,setActiveUserName,activeUserName}) {
     
  const userList = users.map((user, key) => {
        const isActive = user.name === activeUserName; // check if this user is the active user
      return <SidebarItem {...user} key={key} setActiveUserName={setActiveUserName} isActive={isActive} />
    });
   
  return (
    <div>
       {userList}
  </div>
  );
}

export default UserList;
