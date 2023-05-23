
function ChatBubbleRecived({ message }) {
  const messageTime = new Date(message.created).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="recived">
      <div className="message">{message.content}</div>
      <div className="time">{messageTime}</div>
    </div>
  );
}

export default ChatBubbleRecived;
