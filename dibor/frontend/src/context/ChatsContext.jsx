import { createContext, useContext, useState } from "react";

const ChatsContext = createContext();

export const useChatsContext = () => {
  return useContext(ChatsContext);
};

export const ChatsContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};
