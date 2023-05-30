
import { useState ,useEffect} from "react";
import TopBar from './textBox/topBar/TopBar';
import TextBox from './textBox/TextBox';
import TopButtons from './SideBar/TopButtons';
import UserList from './SideBar/UserList';
import jwtDecode from 'jwt-decode';
import UserInfo from "./UserInfo";
import NotificationList from "../NotificationList"
import './Chat.css';

//this is the main chat page
function Chat({socket, setToken, token }) {

  //state var for search messeges
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [totalFoundMessages, setTotalFoundMessages] = useState(0);
  const [messageQuery, setmessageQuery] = useState("");

  //the clicked chat state
  const [activeChatId, setActiveChatId] = useState(0);

  //the state for the contact search qurey
  const [query, setQuery] = useState("")


    const [notification, setNotification] = useState([])

  //contacts
  const [contacts, setContacts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  //find the active user in database
const activeUserChat = contacts.find(chat => chat.id === activeChatId) || { user: { username: '', displayName: '' } };
console.log(activeChatId)

    const [userNameInfo, setUserNameInfo] = useState({username:"",displayName:"",profilePic:""});


  useEffect(() => {
    setFilteredUsers(contacts.filter(chat => chat.user.displayName.toLowerCase().startsWith(query.toLowerCase())));
    
  }, [query]);





  const showUsers = async function () {

  // Assuming you have the token stored in a variable called 'token'

  const res = await fetch('http://localhost:12345/api/Chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (res.ok) {
    const data = await res.json(); // Extract the JSON data from the response
    setFilteredUsers(data)
    setContacts(data)
  } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }

  // You can add code here to handle the response
  };
  
     const joinUserRoom = (username) => {
        console.log("enterd user room "+ username)
        socket.emit("enterUserChat", username)
   };
  
  
const showCurrentUser = async function (getUser) {
 

  console.log("username is :" + getUser);

    const res = await fetch(`http://localhost:12345/api/Users/${getUser}`, {
     method: 'get',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      },

    });
       if (res.ok) {
         const data = await res.json(); // Extract the JSON data from the response
         console.log(data[0])
         const user   = { username: data[0].username, displayName: data[0].displayName, profilePic: data[0].profilePic };
         setUserNameInfo(user);
               console.log(user)
         console.log(userNameInfo)
         joinUserRoom( data[0].username);


    } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }

  // You can add code here to handle the response
};
  
  
  const getLoggedInUser = async function () {
            console.log("token is" + token)

    if (token) {
      try {
        // Decode the JWT to extract its payload
        const decodedToken = jwtDecode(token);
        console.log("token is" + token)
        // Retrieve the username from the decoded token
        await showCurrentUser(decodedToken.UserName);
      } catch (error) {
        // Handle error if the token is invalid or decoding fails
        setToken(0);
        console.error('Error decoding or verifying JWT:', error);
      }
    }
  }
   

  function removeNotification() {
      setNotification(notification => notification.slice(1))

}




useEffect(() => {
  const handleReceivedMessage = async (data) => {
    await showUsers();

     const notifiy = { from: data.from, message: data.message, time:data.time };
    
      setNotification(notification => [...notification,notifiy])
      
    setTimeout(() => {
      removeNotification(notifiy);
    }, 3000);
  };

  socket.on('recivedMessageAlert', handleReceivedMessage);

  return () => {
    socket.off('recivedMessageAlert', handleReceivedMessage);
  };
}, [socket]);

   
  useEffect(() => {
    getLoggedInUser();
        showUsers();

}, [token]);

  return (
    <>
      
      {/*main card of the app */}
  
  <div className="card chatbox">
    <div className="card-body">
      {/*upper bar of the chat*/}
      <div className="row top-bar">
        <div className="col-4 d-flex justify-content-start align-items-center chatsBar">
              <TopButtons setToken={setToken} userNameInfo={userNameInfo} showUsers={showUsers} token={token} setQuery={setQuery} />
          </div>
        <div className="col-8 ">
              <TopBar  activeUserChat={activeUserChat} setmessageQuery={setmessageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
                totalFoundMessages={totalFoundMessages} messageQuery={messageQuery } />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          {/* Sidebar */}
             <div className="list-group list-group-flush border-bottom side-bar">
            <div className="scrollarea">
                  <UserList token={token} chats={filteredUsers} setActiveChatId={setActiveChatId} activeChatId={activeChatId} />
              {/* add more list items here */}
            </div>
          </div>
        </div>
        {/*the chat*/}
        <div className="col-8">
              <TextBox socket={socket } activeUserChat={activeUserChat} showUsers={showUsers} token={token} activeChatId={activeChatId}  messageQuery={messageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
              setTotalFoundMessages={setTotalFoundMessages } />
        </div>
      </div>
    </div>
      </div>
      
      <UserInfo userNameInfo={userNameInfo} />
      <NotificationList notification={notification }> </NotificationList>

</>

  );
}

export default Chat;
