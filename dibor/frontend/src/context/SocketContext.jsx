import { useState, createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const PORT = 12345;

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(`https://dibor-web.onrender.com`, {
        query: {
          userId: authUser.id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUser", (data) => setOnlineUsers(data));

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
