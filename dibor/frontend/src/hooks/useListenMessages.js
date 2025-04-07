import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { useSelectedChatContext } from "../context/SelectedChatContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useSelectedChatContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => socket.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
