//chat bubbble for sending messeges

function ChatBubbleSent({ message }) {
  return (
    <div className="chat-bubble sent">
      <div className="message">{message.text}</div>
      <div className="time">{message.timestamp}</div>
    </div>
  );
}

export default ChatBubbleSent

