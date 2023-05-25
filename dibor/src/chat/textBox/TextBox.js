import { useState, useRef, useEffect } from "react";
import ChatBubbleSent from './ChatBubbleSent'
import ChatBubbleRecived from "./ChatBubbleRecived";
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001/');
//all of the text logic
function TextBox({activeUserChat,showUsers,token,activeChatId,messageQuery,currentMessageIndex,setCurrentMessageIndex,setTotalFoundMessages}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const chatRef = useRef(null);

 const isDisabled = activeChatId === 0
  const [messages, setMessages] = useState([]);
  const [messagesRecived, setmessagesRecived] = useState([]);

   const joinRoom = () => {
    if (activeChatId !== "") {
        console.log("enterd chat"+ activeChatId)
        socket.emit("enterChat", activeChatId)
      }
  };


  useEffect(() => {
      joinRoom();
      getMessages();
}, [activeChatId]);



  const getMessages = async function () {

    if (activeChatId != 0) {
  // Assuming you have the token stored in a variable called 'token'
    const res = await fetch(`http://localhost:5000/api/Chats/${activeChatId}/Messages`, {
     method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${token}`,
      },

  });

    const data = await res.json(); // Extract the JSON data from the response

    setMessages(data);
  
}
  // You can add code here to handle the response
  };
  
  useEffect(() => {
  // Listen for 'new-message' event

    socket.on('recivedMessage', (data) => {
      getMessages();
    });

  }, [socket]);
  
 

  const sendMessage = async function (sendmsg) {

  // Assuming you have the token stored in a variable called 'token'

    const res = await fetch(`http://localhost:5000/api/Chats/${activeChatId}/Messages`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':` Bearer ${token}`,
      },
    body: JSON.stringify({ msg: sendmsg }), // Use object property shorthand

  });

    
  

  // You can add code here to handle the response
};

  
const handleSendClick = async () => {
  const newMessage = inputValue.trim();
  if (newMessage !== "") {
    await sendMessage(newMessage); // Wait for sendMessage to complete
    socket.emit('sendMessage',{message: newMessage,room:activeChatId});
    getMessages();
    setInputValue("");
    inputRef.current.focus();
    showUsers();

  }
};
  



  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  
  

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  useEffect(() => {
    let count = 0;
    if (messageQuery !== "") {
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i].content.toLowerCase();
        if (message.includes(messageQuery)) {
          count++;
        }
      }
     
    }

  setTotalFoundMessages(count);
  setCurrentMessageIndex(0);
}, [messageQuery,messages]);



  useEffect(() => {

    const messagesInChat = chatRef.current.querySelectorAll('.message');

    for (let i = 0; i < messagesInChat.length; i++) {

           messagesInChat[i].classList.remove("selected");

    }
    if (messageQuery !== "") {

      let count = 0;

      for (let i = 0; i < messagesInChat.length; i++) {
        const message = messagesInChat[i].outerText.toLowerCase();

        if (message.includes(messageQuery)) {

          if (count === currentMessageIndex) {

            const messageElement = messagesInChat[i];

                      messageElement.classList.add("selected");

            const { offsetTop, offsetHeight } = messageElement;
            const chatHeight = chatRef.current.offsetHeight;
            const scrollTop = offsetTop - (chatHeight / 2) + (offsetHeight / 2);
            chatRef.current.scrollTo({
              top: scrollTop,
              behavior: 'smooth',
            });
            break;
          }
          count++;
        }
      }
    }
}, [currentMessageIndex,messageQuery,messages]);



  useEffect(() => {

    // Scroll the chat container to the bottom
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    
  }, [messages]);

  

  return (
    <>
<div className="text chats" ref={chatRef}>
  <div className="chat-container">
    {messages.length > 0 ? (
      [...messages].map((message, index) => (
        message.sender.username !== activeUserChat.user.username ? (
          <ChatBubbleSent key={index} message={message} />
        ) : (
          <ChatBubbleRecived key={index} message={message} />
        )
      ))
    ) : (
      <p>No messages available.</p>
    )}
  </div>
</div>




      <div className="input-container">
        <div className="input-group sendMsg">
          <input
            ref={inputRef}
            id="message-input"
            type="text"
            className="form-control"
            placeholder="Type your message here"
            aria-label="Type your message here"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyDown}
                  disabled={isDisabled}

          />
          <button
            type="button"
            className="btn"
            id="send-btn"
            onClick={handleSendClick}
                  disabled={isDisabled}

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
              
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="liveAlertPlaceholder"></div>

    </>
  );
}

export default TextBox;
