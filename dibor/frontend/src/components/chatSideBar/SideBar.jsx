import React from "react";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";
import TopBar from "./TopBar";

import useGetChats from "../../hooks/useGetChats";
import useListenChats from "../../hooks/useListenChats";
import { useChatsContext } from "../../context/ChatsContext";

export default function SideBar() {
  useListenChats();
  const { loading } = useGetChats();
  const { chats } = useChatsContext();

  const usersInfo = chats.map((chat) => {
    return chat.chatWith;
  });
  console.log("chatsInfo", usersInfo);
  return (
    <div>
      <TopBar />
      <ChatList loading={loading} chats={usersInfo} />
    </div>
  );
}
