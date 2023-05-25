
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

  //the clicked chat state
  const [activeChatId, setActiveChatId] = useState(0);

  //the state for the contact search qurey
  const [query, setQuery] = useState("")

  //contacts
  const [contacts, setContacts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  //find the active user in database
const activeUserChat = contacts.find(chat => chat.id === activeChatId) || { user: { username: '', displayName: '' } };

  console.log("active user is ")
  console.log(activeUserChat)

  const [token, setToken] = useState("");


  useEffect(() => {
    setFilteredUsers(contacts.filter(chat => chat.user.displayName.toLowerCase().startsWith(query.toLowerCase())));
    
  }, [query]);

  const updateList = function (user) {
   
    
  }

  /*
  useEffect(() => {
    if (activeUserChat) {
      const numOflastMsgs = 0;

      activeUserChat.numOflastMsgs = 0;
      setActiveChatId(activeUserChat.name);
      const updatedUser = {
        ...activeUserChat,
        numOflastMsgs
    
      };
      const updatedFilteredUsers = filteredUsers.map(user => (user.name === activeUserChat.name ? updatedUser : user));
      setFilteredUsers(updatedFilteredUsers);
    }
  }, [activeChatId]);

*/

  

const connectFirst = async function () {
  console.log("connecting");
  const data = {
    username: 'admin',
    password: '123456'
  };

  const res = await fetch('http://localhost:5000/api/Tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // Check if the response is successful
  if (res.ok) {
    
     const responseText = await res.text(); // Get the response text
setToken(responseText)
    
    // You can add code here to handle the token
  } else {
    console.log("Error:", res.status);
    // Handle the error if the response is not successful
  }
};

  const connectSecond = async function () {
  console.log("connecting");
  const data = {
    username: 'simon1',
    password: 'Sf159357'
  };

  const res = await fetch('http://localhost:5000/api/Tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // Check if the response is successful
  if (res.ok) {
    
     const responseText = await res.text(); // Get the response text
setToken(responseText)
    
    // You can add code here to handle the token
  } else {
    console.log("Error:", res.status);
    // Handle the error if the response is not successful
  }
  };
  
    const connectThird = async function () {
  console.log("connecting");
  const data = {
    username: 'admin2',
    password: '123456'
  };

  const res = await fetch('http://localhost:5000/api/Tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // Check if the response is successful
  if (res.ok) {
    
     const responseText = await res.text(); // Get the response text
setToken(responseText)
    
    // You can add code here to handle the token
  } else {
    console.log("Error:", res.status);
    // Handle the error if the response is not successful
  }
};

  const addUserMine = async function () {
    console.log("add users");
     const data = {
    username: 'admin2'
  }

  // Assuming you have the token stored in a variable called 'token'

    const res = await fetch('http://localhost:12345/api/Chats', {
     method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${token}`,
      },
          'body': JSON.stringify(data)

  });

  console.log(JSON.stringify(res));

  // You can add code here to handle the response
};

  const addUserHemi = async function () {
    console.log("add users");
     const data = {
    username: 'admin2'
  }

  // Assuming you have the token stored in a variable called 'token'

    const res = await fetch('http://localhost:5000/api/Chats', {
     method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${token}`,
      },
          'body': JSON.stringify(data)

  });

  console.log(JSON.stringify(res));

  // You can add code here to handle the response
};

const showUsers = async function () {
  console.log("show users");

  // Assuming you have the token stored in a variable called 'token'

  const res = await fetch('http://localhost:5000/api/Chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (res.ok) {
    const data = await res.json(); // Extract the JSON data from the response
    console.log(data); // Log the response data
    setFilteredUsers(data)
    setContacts(data)
  } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }

  // You can add code here to handle the response
};
  
  const showUsersMe = async function () {
  console.log("show users");

  // Assuming you have the token stored in a variable called 'token'

  const res = await fetch('http://localhost:12345/api/Chats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (res.ok) {
    const data = await res.json(); // Extract the JSON data from the response
    console.log(data); // Log the response data
    setFilteredUsers(data)
    setContacts(data)
  } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }

  // You can add code here to handle the response
};
  

  return (
    <>
      <button onClick={connectFirst}>connectFirst</button>
            <button onClick={connectSecond}>connectSecond</button>
            <button onClick={connectThird}>connectThird</button>

      <button onClick={showUsers}>showUsersHemi</button>
            <button onClick={showUsersMe}>showUsersMine</button>

      <button onClick={addUserMine}>addUserMine</button>
      <button onClick={addUserHemi}>addUserHemi</button>

      {/*main card of the app */}
  <div className="card chatbox">
    <div className="card-body">
      {/*upper bar of the chat*/}
      <div className="row top-bar">
        <div className="col-4 d-flex justify-content-start align-items-center chatsBar">
              <TopButtons showUsers={showUsers} token={token} setQuery={setQuery}  updateList={updateList}  setCurrentUser={setCurrentUser}  currentUser={currentUser} />
          </div>
        <div className="col-8 ">
              <TopBar activeUserChat={activeUserChat} setmessageQuery={setmessageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
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
              <TextBox activeUserChat={activeUserChat} showUsers={showUsers} token={token} activeChatId={activeChatId}  messageQuery={messageQuery} currentMessageIndex={currentMessageIndex} setCurrentMessageIndex={setCurrentMessageIndex}
              setTotalFoundMessages={setTotalFoundMessages } />
        </div>
      </div>
    </div>
  </div>

</>

  );
}

export default Chat;
