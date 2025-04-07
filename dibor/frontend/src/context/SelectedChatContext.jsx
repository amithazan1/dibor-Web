import { createContext, useContext, useState } from "react";

export const SelectedChatContext = createContext();

export const useSelectedChatContext = () => {
  return useContext(SelectedChatContext);
};

export const SelectedChatContextProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  return (
    <SelectedChatContext.Provider
      value={{ selectedChat, setSelectedChat, messages, setMessages }}
    >
      {children}
    </SelectedChatContext.Provider>
  );
};
