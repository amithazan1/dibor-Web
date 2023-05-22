import { useState, useRef, useEffect } from "react";
import ChatBubbleSent from './ChatBubbleSent'

//all of the text logic
function TextBox({activeUser, addMsg,messageQuery,currentMessageIndex,setCurrentMessageIndex,setTotalFoundMessages}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const chatRef = useRef(null);

 const isDisabled = activeUser.name === ""

  
  const handleSendClick = () => {
    const newMessage = inputValue.trim();
    const timestamp = new Date();
    if (newMessage !== "") {
      addMsg(newMessage,timestamp);
      setInputValue("");
      inputRef.current.focus();
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
      for (let i = 0; i < activeUser.messages.length; i++) {
        const message = activeUser.messages[i].text.toLowerCase();
        if (message.includes(messageQuery)) {
          count++;
        }
      }
     
    }

  setTotalFoundMessages(count);
  setCurrentMessageIndex(0);
}, [messageQuery,activeUser]);


  useEffect(() => {
          const messages = chatRef.current.querySelectorAll('.message');

    for (let i = 0; i < activeUser.messages.length; i++) {

           messages[i].classList.remove("selected");

    }
    if (messageQuery !== "") {

      let count = 0;

      for (let i = 0; i < activeUser.messages.length; i++) {
        const message = activeUser.messages[i].text.toLowerCase();

        if (message.includes(messageQuery)) {

          if (count === currentMessageIndex) {

            const messageElement = messages[i];
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
}, [currentMessageIndex,messageQuery,activeUser]);



  useEffect(() => {
    // Scroll the chat container to the bottom
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [activeUser?.messages]);

  return (
    <>
      <div className="text chats"  ref={chatRef}>
        <div className="chat-container">

          {activeUser?.messages?.map((message, index) => (
            <ChatBubbleSent key={index} message={message} />
          ))}
          <div className="input-container"></div>
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
    </>
  );
}

export default TextBox;
