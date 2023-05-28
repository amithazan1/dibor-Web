
import { useState ,useEffect} from "react";
import TopBar from './textBox/topBar/TopBar';
import TextBox from './textBox/TextBox';
import TopButtons from './SideBar/TopButtons';
import UserList from './SideBar/UserList';
import jwtDecode from 'jwt-decode';
import UserInfo from "./UserInfo";
import './Chat.css';

//this is the main chat page
function Chat({setToken,token }) {

  //state var for search messeges
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [totalFoundMessages, setTotalFoundMessages] = useState(0);
  const [messageQuery, setmessageQuery] = useState("");

  //the clicked chat state
  const [activeChatId, setActiveChatId] = useState(0);

  //the state for the contact search qurey
  const [query, setQuery] = useState("")

  //contacts
  const [contacts, setContacts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  //find the active user in database
const activeUserChat = contacts.find(chat => chat.id === activeChatId) || { user: { username: '', displayName: '' } };


    const [userNameInfo, setUserNameInfo] = useState({});


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
  
  const getLoggedInUser = function () {
            console.log("token is" + token)

    if (token) {
      try {
        // Decode the JWT to extract its payload
        const decodedToken = jwtDecode(token);
        console.log("token is" + token)
        // Retrieve the username from the decoded token
        showCurrentUser(decodedToken.UserName);

      } catch (error) {
        // Handle error if the token is invalid or decoding fails
        setToken(0);
        console.error('Error decoding or verifying JWT:', error);
      }
    }
  }


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
         setUserNameInfo(data);

    } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }

  // You can add code here to handle the response
};
  
   
useEffect(() => {
  getLoggedInUser();
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
              <TextBox userNameInfo={userNameInfo } activeUserChat={activeUserChat} showUsers={showUsers} token={token} activeChatId={activeChatId}  messageQuery={messageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
              setTotalFoundMessages={setTotalFoundMessages } />
        </div>
      </div>
    </div>
  </div>
     <UserInfo userNameInfo={userNameInfo} />

</>

  );
}

export default Chat;
