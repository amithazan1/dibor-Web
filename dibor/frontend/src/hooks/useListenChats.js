import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useChatsContext } from "../context/ChatsContext";

const useListenChats = () => {
  const { socket } = useSocketContext();
  const { setChats } = useChatsContext();

  useEffect(() => {
    socket?.on("newChat", (newChat) => {
      setChats((prev) => [...prev, newChat]);
    });

    return () => socket?.off("newChat");
  }, [socket, setChats]);
};

export default useListenChats;
