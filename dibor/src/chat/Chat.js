
import { useState ,useEffect} from "react";
import TopBar from './textBox/topBar/TopBar';
import TextBox from './textBox/TextBox';
import UserInfo from './UserInfo'
import TopButtons from './SideBar/TopButtons';
import { users } from './SideBar/users';
import UserList from './SideBar/UserList';
import './Chat.css';

//this is the main chat page
function Chat({ setCurrentUser, currentUser }) {

  //state var for search messeges
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [totalFoundMessages, setTotalFoundMessages] = useState(0);
  const [messageQuery, setmessageQuery] = useState("");

  //the clicked user state
  const [activeUserName, setActiveUserName] = useState();

  //the state for the contact search qurey
  const [query, setQuery] = useState("")

  //the users list after filters
  const [filteredUsers, setFilteredUsers] = useState(users);
  //find the active user in database
  const activeUser = users.find(user => user.name === activeUserName) || { name: "", messages: [], lastMsg: "", lastMsgTime: "", numOflastMsgs: 0};




  useEffect(() => {
    setFilteredUsers(users.filter(user => user.name.toLowerCase().startsWith(query.toLowerCase())));
    
  }, [query]);

  const updateList = function (user) {
    users.push(user);
    setFilteredUsers([...filteredUsers, user]);
    
  }


  useEffect(() => {
    if (activeUser) {
         const numOflastMsgs =0;

      activeUser.numOflastMsgs = 0;
       setActiveUserName(activeUser.name); 
  const updatedUser = {
    ...activeUser,
   numOflastMsgs
    
  };
  const updatedFilteredUsers = filteredUsers.map(user => (user.name === activeUser.name ? updatedUser : user));
  setFilteredUsers(updatedFilteredUsers);
  }
  }, [activeUserName]);


  const addMsg = function (message,timestamp) {
    if (activeUser) {
      const newMessage = {
    text: message,
    timestamp: timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  };
      activeUser.messages = [...activeUser.messages, newMessage];

      const updatedMessages = [...activeUser.messages, newMessage];
      const lastMsg = "you: " + message;
      const lastMsgTime = timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      activeUser.lastMsg = lastMsg;
      activeUser.lastMsgTime = lastMsgTime;

      
      setActiveUserName(activeUser.name);
      const updatedUser = {
        ...activeUser,
        messages: updatedMessages,
        lastMsg,
        lastMsgTime,
    
      };
      const updatedFilteredUsers = filteredUsers.map(user => (user.name === activeUser.name ? updatedUser : user));
      setFilteredUsers(updatedFilteredUsers);
    }
};



  return (
   <>

      {/*main card of the app */}
  <div className="card chatbox">
    <div className="card-body">
      {/*upper bar of the chat*/}
      <div className="row top-bar">
        <div className="col-4 d-flex justify-content-start align-items-center chatsBar">
              <TopButtons setQuery={setQuery}  updateList={updateList}  setCurrentUser={setCurrentUser}  currentUser={currentUser} />
          </div>
        <div className="col-8 ">
              <TopBar activeUser={activeUser} setmessageQuery={setmessageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
                totalFoundMessages={totalFoundMessages} messageQuery={messageQuery } />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {/* Sidebar */}
             <div className="list-group list-group-flush border-bottom side-bar">
            <div className="scrollarea">
                  <UserList users={filteredUsers} setActiveUserName={setActiveUserName} activeUserName={activeUserName} />
              {/* add more list items here */}
            </div>
          </div>
        </div>
        {/*the chat*/}
        <div className="col-8">
              <TextBox activeUser={activeUser} addMsg={addMsg} messageQuery={messageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
              setTotalFoundMessages={setTotalFoundMessages } />
        </div>
      </div>
    </div>
  </div>
     <UserInfo currentUser={currentUser} />

</>

  );
}

export default Chat;
